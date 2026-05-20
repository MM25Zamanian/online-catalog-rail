import { cn } from "@/lib/utils";

export function LineBreak({ className }: { className?: string }) {
  return (
    <div className={cn("w-full relative", className)}>
      <hr className="border-t-secondary border-t-1 opacity-50" />

      <span className="size-2 bg-secondary absolute top-1/2 start-1/2 rotate-z-45 -translate-x-1 -translate-y-1"></span>
    </div>
  );
}
