import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";

export type MotionProfile = "hero" | "content" | "services" | "map" | "contact";

type SlideProps = {
  slideIndex: number;
  motionProfile: MotionProfile;
  className?: string;
  children?: ReactNode;
};

export function Slide({
  slideIndex,
  motionProfile,
  className,
  children,
}: SlideProps) {
  const style = {
    "--slide-progress": "0",
  } as CSSProperties;

  return (
    <section
      data-slide-index={slideIndex}
      data-motion-profile={motionProfile}
      data-active="false"
      data-direction="down"
      style={style}
      className={clsx(
        "w-screen h-[100svh] overflow-hidden snap-center snap-always shrink-0",
        className
      )}
    >
      <div className="max-w-lg mx-auto h-full w-full flex flex-col relative">
        {children}
      </div>
    </section>
  );
}
