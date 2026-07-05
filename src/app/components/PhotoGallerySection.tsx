import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Lightbox, type LightboxItem } from "./Lightbox";
import img1 from "@/assets/photo-gallery-1.webp";
import img2 from "@/assets/photo-gallery-2.webp";
import img4 from "@/assets/photo-gallery-10.webp";
import img5 from "@/assets/photo-gallery-14.webp";
import img7 from "@/assets/photo-gallery-7.webp";
import img8 from "@/assets/photo-gallery-16.webp";
import img9 from "@/assets/photo-gallery-9.webp";
import img11 from "@/assets/photo-gallery-11.webp";
import img12 from "@/assets/photo-gallery-12.webp";
import img13 from "@/assets/photo-gallery-13.webp";
import img15 from "@/assets/photo-gallery-15.webp";
import img17 from "@/assets/photo-gallery-17.webp";
import img18 from "@/assets/photo-gallery-18.webp";
import img19 from "@/assets/photo-gallery-19.webp";
import vid1 from "@/assets/gallery-video-1.mp4";
import vid2 from "@/assets/gallery-video-2.mp4";
import vid3 from "@/assets/gallery-video-3.mp4";
import vidPoster1 from "@/assets/gallery-video-1.webp";
import vidPoster2 from "@/assets/gallery-video-2.webp";
import vidPoster3 from "@/assets/gallery-video-3.webp";

// ── Gallery media (portrait images + autoplay videos) ─────────────────────────
type MediaItem =
  | { src: string; alt: string }
  | { video: string; poster: string; alt: string };

const MEDIA: MediaItem[] = [
  { src: img1, alt: "Galeria 1" },
  { src: img2, alt: "Galeria 2" },
  { video: vid1, poster: vidPoster1, alt: "Galeria 3" },
  { src: img4, alt: "Galeria 4" },
  { src: img5, alt: "Galeria 5" },
  { video: vid2, poster: vidPoster2, alt: "Galeria 6" },
  { src: img7, alt: "Galeria 7" },
  { src: img8, alt: "Galeria 8" },
  { src: img9, alt: "Galeria 9" },
  { src: img11, alt: "Galeria 10" },
  { src: img12, alt: "Galeria 11" },
  { src: img13, alt: "Galeria 12" },
  { src: img15, alt: "Galeria 13" },
  { src: img17, alt: "Galeria 14" },
  { src: img18, alt: "Galeria 15" },
  { src: img19, alt: "Galeria 16" },
  { video: vid3, poster: vidPoster3, alt: "Galeria 17" },
];

function mediaToLb(m: MediaItem): LightboxItem {
  return "video" in m
    ? { type: "video", src: m.video, poster: m.poster }
    : { type: "image", src: m.src, alt: m.alt };
}

// ── Media renderer (image or muted autoplay video) ────────────────────────────
function Media({ item, className }: { item: MediaItem; className: string }) {
  if ("video" in item) {
    return (
      <video
        className={className}
        src={item.video}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.alt}
      />
    );
  }
  return (
    <img className={className} src={item.src} alt={item.alt} draggable={false} />
  );
}

// ── Desktop reveal wrapper ────────────────────────────────────────────────────
function RevealCard({
  delay = 0,
  className = "",
  children,
  onClick,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`${className} relative cursor-pointer hover:[scale:1.05] hover:z-10`}
      style={{
        // reveal uses the individual `translate` property so the hover `scale`
        // (below) composes with it instead of clobbering a shared `transform`.
        transition: `opacity 0.65s ease ${delay}ms, translate 0.65s ease ${delay}ms, scale 0.35s ease`,
        opacity: visible ? 1 : 0,
        translate: visible ? "0 0" : "0 28px",
      }}
    >
      {children}
    </div>
  );
}

// ── Mobile carousel ───────────────────────────────────────────────────────────
function MobileCarousel({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ── Mouse drag ──────────────────────────────────────────────────────────────
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  function onMouseDown(e: React.MouseEvent) {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.pageX, scrollLeft: el.scrollLeft, moved: false };
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  }

  function onMouseUp() {
    if (!trackRef.current) return;
    drag.current.active = false;
    trackRef.current.style.cursor = "grab";
    trackRef.current.style.userSelect = "";
    // snap to nearest card after drag
    snapToNearest();
  }

  function onMouseLeave() {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
      trackRef.current.style.userSelect = "";
    }
    snapToNearest();
  }

  // ── Snap helpers ────────────────────────────────────────────────────────────
  function getCardPositions(): number[] {
    const el = trackRef.current;
    if (!el) return [];
    return Array.from(el.children).map(
      (child) => (child as HTMLElement).offsetLeft - 16 // subtract px padding
    );
  }

  function snapToNearest() {
    const el = trackRef.current;
    if (!el) return;
    const positions = getCardPositions();
    const scroll = el.scrollLeft;
    let nearest = 0;
    let minDist = Infinity;
    positions.forEach((pos, i) => {
      const dist = Math.abs(pos - scroll);
      if (dist < minDist) { minDist = dist; nearest = i; }
    });
    scrollToCard(nearest);
  }

  function scrollToCard(index: number) {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, MEDIA.length - 1));
    const positions = getCardPositions();
    el.scrollTo({ left: positions[clamped] ?? 0, behavior: "smooth" });
    setCurrentIndex(clamped);
  }

  // ── Sync index on native scroll (touch) ────────────────────────────────────
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let timeout: ReturnType<typeof setTimeout>;
    function onScroll() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const positions = getCardPositions();
        const scroll = el!.scrollLeft;
        let nearest = 0;
        let minDist = Infinity;
        positions.forEach((pos, i) => {
          const dist = Math.abs(pos - scroll);
          if (dist < minDist) { minDist = dist; nearest = i; }
        });
        setCurrentIndex(nearest);
      }, 80);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < MEDIA.length - 1;

  return (
    <div className="lg:hidden flex flex-col pb-[48px]">
      {/* Title */}
      <div className="px-[16px] pt-[48px]">
        <SectionHeading lines={["Audiovisual"]} center />
      </div>

      {/* ── Track ── */}
      <div
        ref={trackRef}
        className="flex flex-row gap-[16px] overflow-x-auto py-[48px] px-[16px]
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {MEDIA.map((card, i) => (
          <div
            key={card.alt}
            onClick={() => { if (!drag.current.moved) onOpen(mediaToLb(card)); }}
            className="relative rounded-none shrink-0 h-[360px] w-[288px] overflow-hidden cursor-pointer"
            style={{
              // last card gets right margin so it feels padded
              marginRight: i === MEDIA.length - 1 ? 16 : 0,
            }}
          >
            <Media
              item={card}
              className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-none size-full"
            />
          </div>
        ))}
      </div>

      {/* ── Navigation buttons ── */}
      <div className="flex flex-row items-center gap-[12px] px-[16px]">
        <button
          aria-label="Card anterior"
          onClick={() => scrollToCard(currentIndex - 1)}
          disabled={!canPrev}
          className="flex items-center justify-center w-[44px] h-[44px] rounded-full border transition-all duration-200"
          style={{
            borderColor: canPrev ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)",
            color: canPrev ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
            background: "transparent",
          }}
        >
          <ChevronLeft size={20} strokeWidth={1.8} />
        </button>

        <button
          aria-label="Próximo card"
          onClick={() => scrollToCard(currentIndex + 1)}
          disabled={!canNext}
          className="flex items-center justify-center w-[44px] h-[44px] rounded-full border transition-all duration-200"
          style={{
            borderColor: canNext ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)",
            color: canNext ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
            background: "transparent",
          }}
        >
          <ChevronRight size={20} strokeWidth={1.8} />
        </button>

        {/* Progress indicator */}
        <div className="flex flex-row gap-[6px] ml-[4px]">
          {MEDIA.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para card ${i + 1}`}
              onClick={() => scrollToCard(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentIndex ? 20 : 6,
                height: 6,
                background: i === currentIndex
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function PhotoGallerySection() {
  const [lb, setLb] = useState<LightboxItem | null>(null);
  return (
    <section className="w-full">
      {/* ── DESKTOP: title + bento grid — 5 columns, cards 2 and 7 span 2 columns ── */}
      <div className="hidden lg:block px-[16px] md:px-[48px] py-[48px] md:py-[96px] w-full max-w-[1344px] mx-auto">
        <SectionHeading lines={["Audiovisual"]} center />
        <div className="grid grid-cols-5 gap-[24px] content-start items-start mt-[48px] [grid-auto-flow:dense]">
        {MEDIA.map((im, i) => {
          // A few images span 2 columns for a bento rhythm (never videos)
          const wide = i % 6 === 1 && !("video" in im);
          return (
            <RevealCard
              key={im.alt}
              delay={(i % 5) * 80}
              onClick={() => setLb(mediaToLb(im))}
              className={`relative rounded-none overflow-hidden shrink-0 w-full h-[300px] ${wide ? "col-span-2" : ""}`}
            >
              <Media
                item={im}
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-none size-full"
              />
            </RevealCard>
          );
        })}
        </div>
      </div>

      {/* ── MOBILE: draggable carousel with nav ── */}
      <MobileCarousel onOpen={setLb} />

      <Lightbox item={lb} onClose={() => setLb(null)} />
    </section>
  );
}
