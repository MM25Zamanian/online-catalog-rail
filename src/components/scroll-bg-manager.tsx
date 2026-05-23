"use client";

import { useLayoutEffect } from "react";

const BACKGROUND_COLORS: Record<number, string> = {
  0: "#03162a",
  1: "#f8f8f8",
  2: "#f8f8f8",
  3: "#03162a",
  4: "#03162a",
  5: "#f8f8f8",
  6: "#03162a",
};

type ScrollDirection = "up" | "down";

type CatalogMotionDetail = {
  activeIndex: number;
  direction: ScrollDirection;
  progress: number;
};

export const CATALOG_MOTION_EVENT = "catalog:motion-update";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function toProgress(value: number) {
  return clamp(value, 0, 1).toFixed(4);
}

function applyBackground(slideIndex: number) {
  const activeColor = BACKGROUND_COLORS[slideIndex];
  if (!activeColor) return;

  document.documentElement.style.background = activeColor;
  document.body.style.background = activeColor;
}

export function ScrollBackgroundManager() {
  useLayoutEffect(() => {
    const root = document.body.querySelector<HTMLElement>(
      "main[data-catalog-scroll-root='true']"
    );
    if (!root) return;

    const slides = Array.from(
      root.querySelectorAll<HTMLElement>("section[data-slide-index]")
    ).sort(
      (a, b) =>
        Number(a.dataset.slideIndex ?? 0) - Number(b.dataset.slideIndex ?? 0)
    );
    if (!slides.length) return;

    root.dataset.motionReady = "true";

    let activeIndex = 0;
    let direction: ScrollDirection = "down";
    let lastScrollTop = root.scrollTop;
    let rafId = 0;
    let isTicking = false;
    let isDestroyed = false;

    const visibilityRatios = new Map<number, number>();

    const setDirection = (nextDirection: ScrollDirection) => {
      direction = nextDirection;
      for (const slide of slides) {
        slide.dataset.direction = nextDirection;
      }
    };

    const setActiveSlide = (nextActiveIndex: number) => {
      const clampedIndex = clamp(nextActiveIndex, 0, slides.length - 1);
      if (activeIndex === clampedIndex) return;

      activeIndex = clampedIndex;
      for (let i = 0; i < slides.length; i += 1) {
        slides[i].dataset.active = i === activeIndex ? "true" : "false";
      }

      applyBackground(activeIndex);
    };

    const updateSlideProgress = () => {
      const rootRect = root.getBoundingClientRect();
      const rootCenter = rootRect.top + rootRect.height / 2;

      for (let i = 0; i < slides.length; i += 1) {
        if (Math.abs(i - activeIndex) > 1) {
          slides[i].style.setProperty("--slide-progress", "0");
          continue;
        }

        const slideRect = slides[i].getBoundingClientRect();
        const slideCenter = slideRect.top + slideRect.height / 2;
        const distanceRatio =
          Math.abs(slideCenter - rootCenter) / (rootRect.height * 0.8);
        const progress = toProgress(1 - distanceRatio);
        slides[i].style.setProperty("--slide-progress", progress);
      }
    };

    const dispatchMotionEvent = () => {
      const activeProgress = Number.parseFloat(
        slides[activeIndex].style.getPropertyValue("--slide-progress") || "0"
      );

      document.dispatchEvent(
        new CustomEvent<CatalogMotionDetail>(CATALOG_MOTION_EVENT, {
          detail: {
            activeIndex,
            direction,
            progress: clamp(activeProgress, 0, 1),
          },
        })
      );
    };

    const tick = () => {
      isTicking = false;
      if (isDestroyed) return;

      const scrollTop = root.scrollTop;
      const scrollDelta = scrollTop - lastScrollTop;

      if (Math.abs(scrollDelta) > 2) {
        setDirection(scrollDelta > 0 ? "down" : "up");
      }

      lastScrollTop = scrollTop;
      updateSlideProgress();
      dispatchMotionEvent();
    };

    const requestTick = () => {
      if (isTicking) return;
      isTicking = true;
      rafId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slide = entry.target as HTMLElement;
          const index = Number(slide.dataset.slideIndex ?? -1);
          if (index < 0) continue;
          visibilityRatios.set(index, entry.intersectionRatio);
        }

        let bestIndex = activeIndex;
        let bestRatio = visibilityRatios.get(activeIndex) ?? 0;

        visibilityRatios.forEach((ratio, index) => {
          if (ratio >= 0.6 && ratio >= bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });

        if (bestIndex !== activeIndex) {
          setActiveSlide(bestIndex);
        }

        requestTick();
      },
      {
        root,
        threshold: [0.4, 0.6, 0.8, 1],
      }
    );

    for (let i = 0; i < slides.length; i += 1) {
      slides[i].dataset.active = i === activeIndex ? "true" : "false";
      slides[i].dataset.direction = direction;
      slides[i].style.setProperty("--slide-progress", i === activeIndex ? "1" : "0");
      visibilityRatios.set(i, i === activeIndex ? 1 : 0);
      observer.observe(slides[i]);
    }

    applyBackground(activeIndex);
    root.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    requestTick();

    return () => {
      isDestroyed = true;
      root.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      observer.disconnect();
      root.dataset.motionReady = "false";

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
