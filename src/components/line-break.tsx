import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface LineBreakProps {
  orientation?: "vertical" | "horizontal";
  direction?: "start" | "end" | "center";
  isBubble?: boolean;
  delay?: string;
}

export function LineBreak({
  className,
  orientation = "vertical",
  isBubble = true,
  direction = "center",
  delay = "1s",
  ...props
}: HTMLAttributes<HTMLDivElement> & LineBreakProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative flex items-center justify-center shrink-0",
        orientation === "vertical" ? "w-full h-3" : "w-3 h-full",
        className
      )}
    >
      <span
        className={cn(
          "rounded-full bg-foreground/20 absolute",
          orientation === "vertical" ? "w-full h-0.5" : "w-0.5 h-full"
        )}
      />
      <span
        data-reveal="line-break"
        data-orientation={orientation}
        className={cn(
          "rounded-full bg-secondary absolute z-20",
          orientation === "vertical" ? "h-0.5" : "w-0.5",

          direction === "start" && orientation === "vertical" && "start-0",
          direction === "end" && orientation === "vertical" && "end-0",

          direction === "start" && orientation === "horizontal" && "top-0",
          direction === "end" && orientation === "horizontal" && "bottom-0"
        )}
        style={{
          animationDelay: delay,
        }}
      />

      {isBubble && (
        <span className="size-2 bg-secondary absolute rotate-z-45 rounded-xs z-10" />
      )}
    </div>
  );
}
