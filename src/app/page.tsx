import { getDictionary } from "@/i18n";
import { WorldMap } from "@/components/world-map";
import { FirstSlide } from "@/slides/01-first";
import { SecondSlide } from "@/slides/02-second";
import { ThirdSlide } from "@/slides/03-third";
import { ScrollBackgroundManager } from "@/components/scroll-bg-manager";
import { FourthSlide } from "@/slides/04-fourth";

export default function Home() {
  const dictionary = getDictionary();

  return (
    <main className="snap-y snap-mandatory flex flex-col h-[100svh] overflow-y-auto overscroll-none scroll-smooth">
      <ScrollBackgroundManager />

      <FirstSlide copy={dictionary.firstSlide} brand={dictionary.brand}>
        <WorldMap className="bg-transparent absolute top-0 inset-x-0" />
      </FirstSlide>
      <SecondSlide copy={dictionary.secondSlide} />
      <ThirdSlide copy={dictionary.thirdSlide} brand={dictionary.brand} />
      <FourthSlide />
    </main>
  );
}
