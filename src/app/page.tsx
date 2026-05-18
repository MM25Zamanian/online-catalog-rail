import { getDictionary } from "@/i18n";
import { WorldMap } from "@/components/world-map";
import { FirstSlide } from "@/slides/first";
import { SecondSlide } from "@/slides/second";
import { ThirdSlide } from "@/slides/third";

export default function Home() {
  const dictionary = getDictionary();

  return (
    <main className="snap-y snap-mandatory flex flex-col h-[100svh] overflow-y-auto overscroll-none">
      <FirstSlide
        copy={dictionary.firstSlide}
        brand={dictionary.brand}
      >
        <WorldMap className="bg-transparent absolute top-0 inset-x-0" />
      </FirstSlide>
      <SecondSlide copy={dictionary.secondSlide} />
      <ThirdSlide copy={dictionary.thirdSlide} brand={dictionary.brand} />
    </main>
  );
}
