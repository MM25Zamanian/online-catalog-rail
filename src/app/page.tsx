import { getDictionary } from "@/i18n";
import { WorldMap } from "@/components/world-map";
import { Slide01 } from "@/slides/01-slide";
import { Slide02 } from "@/slides/02-slide";
import { Slide03 } from "@/slides/03-slide";
import { Slide04 } from "@/slides/04-slide";
import { Slide05 } from "@/slides/05-slide";
import { Slide06 } from "@/slides/06-slide";
import { Slide07 } from "@/slides/07-slide";
import { ScrollBackgroundManager } from "@/components/scroll-bg-manager";

export default function Home() {
  const dictionary = getDictionary();

  return (
    <main className="snap-y snap-mandatory flex flex-col h-[100svh] overflow-y-auto overscroll-none scroll-smooth">
      <ScrollBackgroundManager />

      <Slide01 copy={dictionary.slide01} brand={dictionary.brand}>
        <WorldMap className="bg-transparent absolute top-0 inset-x-0" />
      </Slide01>
      <Slide02 copy={dictionary.slide02} brand={dictionary.brand} />
      <Slide03 copy={dictionary.slide03} brand={dictionary.brand} />
      <Slide04 copy={dictionary.slide04} />
      <Slide05 copy={dictionary.slide05} />
      <Slide06 copy={dictionary.slide06} />
      <Slide07 copy={dictionary.slide07} />
    </main>
  );
}
