import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { ImageBand } from "@/components/ImageBand";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Pullquote } from "@/components/Pullquote";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { RevealRoot } from "@/components/RevealRoot";

export default function Page() {
  return (
    <RevealRoot>
      <main>
        <Hero />
        <Intro />
        <Services />
        <Gallery />
        <Projects />
        <div id="process">
          <Process />
        </div>
        <Pullquote />
        <ImageBand
          src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=2400&q=80"
          alt="Hands working a piece of timber on a workbench"
          height="short"
        />
        <Contact />
        <Footer />
      </main>
    </RevealRoot>
  );
}
