import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { GallerySection } from "./components/GallerySection";
import { WebsitesSection } from "./components/WebsitesSection";
import { PDSection } from "./components/PDSection";
import { Footer } from "./components/Footer";
import { useSmoothScroll } from "./components/SmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#1a1a1a] overflow-x-hidden">
      <Header />
      <main className="flex flex-1 md:items-center md:justify-center">
        <HeroSection />
      </main>
      <GallerySection />
      <WebsitesSection />
      <PDSection />
      <Footer />
    </div>
  );
}