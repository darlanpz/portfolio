import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgGallery01 from "@/assets/editorial-tour-museus.png";
import imgGallery03 from "@/assets/brand-vitor-garcia.png";
import imgImage122 from "@/assets/brand-butecos.png";
import imgImage124 from "@/assets/brand-menina-bonita.png";
import imgImage130 from "@/assets/editorial-sabores-sb.png";
import imgGallery02 from "@/assets/brand-praxis-1.png";
import imgRectangle35 from "@/assets/brand-praxis-2.png";
import imgImage129 from "@/assets/pd-affemg.png";
import imgImage131 from "@/assets/graphic-museus.png";

// ── Desktop reveal wrapper ────────────────────────────────────────────────────
function RevealCard({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
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
      className={className}
      style={{
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

// ── Mobile carousel ───────────────────────────────────────────────────────────
const MOBILE_CARDS = [
  { alt: "Gallery 01", src: imgGallery01, w: 200, inner: null },
  { alt: "Gallery 03", src: imgGallery03, w: 320, inner: null },
  { alt: "Image 122",  src: imgImage122,  w: 220, inner: null },
  { alt: "Image 124",  src: imgImage124,  w: 260, inner: null },
  { alt: "Image 130",  src: imgImage130,  w: 200, inner: "h-[119.47%] left-0 top-0 w-full" },
  { alt: "Gallery 02", src: imgGallery02, w: 320, inner: null },
  { alt: "Rectangle 35", src: imgRectangle35, w: 200, inner: "h-[108.25%] left-0 top-[-8.25%] w-[128.36%]" },
  { alt: "Image 129", src: imgImage129,  w: 320, inner: null },
  { alt: "Image 131", src: imgImage131,  w: 260, inner: "h-full left-[-5.74%] top-0 w-[113.72%]" },
] as const;

function MobileCarousel() {
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
    const clamped = Math.max(0, Math.min(index, MOBILE_CARDS.length - 1));
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
  const canNext = currentIndex < MOBILE_CARDS.length - 1;

  return (
    <div className="lg:hidden flex flex-col pb-[48px]">
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
        {MOBILE_CARDS.map((card, i) => (
          <div
            key={card.alt}
            className="relative rounded-[8px] shrink-0 h-[220px]"
            style={{
              width: card.w,
              // last card gets right margin so it feels padded
              marginRight: i === MOBILE_CARDS.length - 1 ? 16 : 0,
            }}
          >
            {card.inner ? (
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
                <img
                  alt={card.alt}
                  className={`absolute max-w-none ${card.inner}`}
                  src={card.src}
                  draggable={false}
                />
              </div>
            ) : (
              <img
                alt={card.alt}
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full"
                src={card.src}
                draggable={false}
              />
            )}
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
          {MOBILE_CARDS.map((_, i) => (
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
export function GallerySection() {
  return (
    <section className="w-full">
      {/* ── DESKTOP: flex-wrap masonry-like grid ── */}
      <div className="hidden lg:flex flex-wrap content-start gap-[24px] items-start px-[16px] md:px-[48px] py-[48px] md:py-[96px] w-full max-w-[1344px] mx-auto">
        {/* Row 1 */}
        <RevealCard delay={0} className="h-[320px] relative rounded-[8px] shrink-0 w-[269.871px]">
          <img alt="Gallery 01" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgGallery01} />
        </RevealCard>
        <RevealCard delay={80} className="h-[320px] relative rounded-[8px] shrink-0 w-[612.067px]">
          <img alt="Gallery 03" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgGallery03} />
        </RevealCard>
        <RevealCard delay={160} className="h-[320px] relative rounded-[4px] shrink-0 w-[317.771px]">
          <img alt="Image 122" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgImage122} />
        </RevealCard>

        {/* Row 2 */}
        <RevealCard delay={0} className="h-[320px] relative rounded-[8px] shrink-0 w-[383.485px]">
          <img alt="Image 124" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgImage124} />
        </RevealCard>
        <RevealCard delay={80} className="h-[320px] relative rounded-[8px] shrink-0 w-[270.161px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
            <img alt="Image 130" className="absolute h-[119.47%] left-0 max-w-none top-0 w-full" src={imgImage130} />
          </div>
        </RevealCard>
        <RevealCard delay={160} className="h-[320px] relative rounded-[8px] shrink-0 w-[545.926px]">
          <img alt="Gallery 02" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgGallery02} />
        </RevealCard>

        {/* Row 3 */}
        <RevealCard delay={0} className="h-[320px] relative rounded-[8px] shrink-0 w-[269.871px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
            <img alt="Rectangle 35" className="absolute h-[108.25%] left-0 max-w-none top-[-8.25%] w-[128.36%]" src={imgRectangle35} />
          </div>
        </RevealCard>
        <RevealCard delay={80} className="h-[320px] relative rounded-[8px] shrink-0 w-[544.8px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
            <img alt="Image 129" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgImage129} />
          </div>
        </RevealCard>
        <RevealCard delay={160} className="h-[320px] relative rounded-[8px] shrink-0 w-[384.902px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
            <img alt="Image 131" className="absolute h-full left-[-5.74%] max-w-none top-0 w-[113.72%]" src={imgImage131} />
          </div>
        </RevealCard>
      </div>

      {/* ── MOBILE: draggable carousel with nav ── */}
      <MobileCarousel />
    </section>
  );
}