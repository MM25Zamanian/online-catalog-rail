import clsx from "clsx";
import { ReactNode } from "react";

export function Slide({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={clsx("w-screen h-[100svh] overflow-hidden snap-start snap-always shrink-0", className)}
    >
      <div className="max-w-lg mx-auto h-full w-full flex flex-col relative">{children}</div>
    </section>
  );
}
