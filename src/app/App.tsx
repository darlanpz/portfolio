import { AuroraBackground } from "./components/AuroraBackground";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { GallerySection } from "./components/GallerySection";
import { PhotoGallerySection } from "./components/PhotoGallerySection";
import { WebsitesSection } from "./components/WebsitesSection";
import { PDSection } from "./components/PDSection";
import { Footer } from "./components/Footer";
import { useSmoothScroll } from "./components/SmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <div className="relative isolate min-h-screen w-full flex flex-col bg-[#1a1a1a] overflow-x-clip">
      <AuroraBackground />
      <Header />
      <main className="w-full">
        <HeroSection />
      </main>
      <GallerySection />
      <PhotoGallerySection />
      <WebsitesSection />
      <PDSection />
      <Footer />
    </div>
  );
}