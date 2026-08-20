import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HelpSection from "@/components/sections/HelpSection";
import ReviewsFeed from "@/components/sections/ReviewsFeed";
import Contact from "@/components/sections/Contact";
import WavyEdge from "@/components/ui/WavyEdge";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="relative z-10">
          <WavyEdge />
          <div className="-mt-px bg-bg">
            <About />
            <HelpSection />
            <ReviewsFeed />
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
