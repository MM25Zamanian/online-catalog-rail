"use client";

import RailImage from "#/rail-train.webp";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export function FirstSlideHeroImage({ alt }: { alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setIsMount(true);
    });
  });

  return (
    <div className="absolute inset-0 bg-radial from-foreground/20 to-transparent">
      <Image
        src={RailImage}
        alt={alt}
        fill
        preload
        onLoad={() => setIsLoaded(true)}
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          "object-cover [transition:_opacity_200ms_100ms_ease-in-out,_filter_700ms_300ms_ease-in-out]",
          isLoaded && isMount
            ? "opacity-100 contrast-100 grayscale-0"
            : "opacity-0 contrast-90 grayscale-100"
        )}
      />
    </div>
  );
}
