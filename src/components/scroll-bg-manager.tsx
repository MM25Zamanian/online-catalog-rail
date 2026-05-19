"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";

const BACKGROUND_COLORS: Record<number, string> = {
  0: "#03162a",
  1: "#03162a",
  2: "#f8f8f8",
  3: "#f8f8f8",
};

export function ScrollBackgroundManager() {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [slideHeight, setSlideHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const handeSlideHeight = () => {
      setSlideHeight(window.innerHeight);
    };

    handeSlideHeight();
    window.addEventListener("resize", handeSlideHeight);

    return () => {
      window.removeEventListener("resize", handeSlideHeight);
    };
  }, []);

  useLayoutEffect(() => {
    const target = document.body.querySelector("main");

    const handleScroll = () => {
      if (!target) return;

      setScrollTop(target.scrollTop);
    };

    handleScroll();
    target?.addEventListener("scroll", handleScroll);

    return () => {
      target?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const slideNumber = useMemo(() => {
    return Math.round(scrollTop / slideHeight);
  }, [scrollTop, slideHeight]);

  useEffect(() => {
    const activeColors = BACKGROUND_COLORS[slideNumber];

    if (activeColors) {
      document.documentElement.style.background = activeColors;
      document.body.style.background = activeColors;
    }
  }, [slideNumber]);

  return <></>;
}
