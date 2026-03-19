import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import svgPaths from "../../imports/svg-8c58j1dinl";
import imgImg  from "@/assets/website-bata.png";
import imgImg1 from "@/assets/website-gama.png";
import imgImg2 from "@/assets/website-jn.png";
import imgImg3 from "@/assets/website-redeorigen.png";
import imgImg4 from "@/assets/website-dotto.png";
import imgImg5 from "@/assets/website-inpalco.png";
import imgImg6 from "@/assets/website-cr3.png";

// ── Types ─────────────────────────────────────────────────────────────────────
type TechType = "figma" | "html" | "css" | "wordpress" | "elementor" | "prismic" | "next";

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    style: {
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
    },
  };
}

// ── Tech icon ─────────────────────────────────────────────────────────────────
const techPaths: Record<TechType, string> = {
  figma:      svgPaths.p19459500,
  html:       svgPaths.p360bd300,
  css:        svgPaths.p22072980,
  wordpress:  svgPaths.p26303380,
  elementor:  svgPaths.p115530c0,
  prismic:    svgPaths.p2aced400,
  next:       svgPaths.p379366f2,
};

function TechIcon({ type }: { type: TechType }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg
        className="absolute block size-full overflow-hidden"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d={techPaths[type]}
          fill="#444746"
          {...(type === "figma" ? { fillRule: "evenodd" as const, clipRule: "evenodd" as const } : {})}
        />
      </svg>
    </div>
  );
}

function TechStack({ techs }: { techs: TechType[] }) {
  return (
    <div className="flex gap-[12px] items-start w-full">
      {techs.map((t) => <TechIcon key={t} type={t} />)}
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
interface CardProps {
  title: string;
  url: string;
  image: string;
  techs: TechType[];
  delay?: number;
  /** Desktop grid placement (col + row, 1-based) */
  col: number;
  row: number;
}

function ProjectCard({ title, url, image, techs, delay = 0, col, row }: CardProps) {
  const { ref, style } = useReveal(delay);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        // Desktop explicit grid placement — overridden on mobile via grid-cols-1 auto-flow
      }}
      className={`flex flex-col gap-[16px] items-start min-w-0 lg:col-start-${col} lg:row-start-${row}`}
    >
      {/* Image */}
      <div className="relative rounded-[4px] shrink-0 w-full" style={{ aspectRatio: "389.6328125 / 212" }}>
        <img
          alt={title}
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full"
          src={image}
        />
      </div>

      {/* Name */}
      <p
        className="shrink-0 text-[#e3e3e3] text-[24px] leading-[1.2] w-full"
        style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}
      >
        {title}
      </p>

      {/* URL */}
      <a
        href={`https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 text-[#bfbfc0] text-[14px] leading-[1.5] tracking-[-0.28px] w-full hover:text-[#e3e3e3] transition-colors duration-200 underline-offset-2 hover:underline"
        style={{ fontFamily: "'Golos Text', sans-serif" }}
      >
        {url}
      </a>

      <TechStack techs={techs} />
    </div>
  );
}

// ── Section title (col 1, row 1 on desktop) ───────────────────────────────────
function SectionTitle({ mobile }: { mobile?: boolean }) {
  const { ref, style } = useReveal(0);

  return (
    <div
      ref={ref}
      style={style}
      className="lg:col-start-1 lg:row-start-1 lg:self-stretch"
    >
      <div className="flex flex-col gap-[32px] lg:gap-0 lg:justify-between lg:h-full lg:py-[48px]">
        {/* Title text */}
        <div
          className="text-[#e3e3e3] text-[32px] lg:text-[48px] leading-[1.2]"
          style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}
        >
          <p className="mb-0">Alguns projetos</p>
          <p className="mb-0">que atuei como</p>
          <p>Web Designer</p>
        </div>

        {/* Arrow icon */}
        <div className="relative shrink-0 size-[72px] overflow-hidden">
          <div className="absolute inset-[18.75%]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 45 45"
            >
              <path d={svgPaths.p9166b80} fill="#BFBFC0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Projects data ─────────────────────────────────────────────────────────────
const PROJECTS: Omit<CardProps, "delay">[] = [
  { title: "Bataiolli",  url: "www.bataiolli.com.br",     image: imgImg,  techs: ["figma", "html", "css"],                    col: 2, row: 1 },
  { title: "Gama-log",   url: "www.gama-log.com.br",      image: imgImg1, techs: ["figma", "wordpress", "elementor"],          col: 1, row: 2 },
  { title: "JN Contábil",url: "www.jncontabil.com.br",    image: imgImg2, techs: ["figma", "wordpress", "elementor"],          col: 2, row: 2 },
  { title: "Origen",     url: "www.redeorigen.com.br",    image: imgImg3, techs: ["figma", "wordpress", "elementor"],          col: 1, row: 3 },
  { title: "Dotto",      url: "www.dottoautopecas.com",   image: imgImg4, techs: ["figma", "wordpress", "elementor"],          col: 2, row: 3 },
  { title: "InPalco",    url: "www.inpalco.com.br",       image: imgImg5, techs: ["figma", "prismic", "next"],                 col: 1, row: 4 },
  { title: "CR3",        url: "www.cr3auditoria.com.br",  image: imgImg6, techs: ["figma", "next"],                            col: 2, row: 4 },
];

// ── Mobile carousel ───────────────────────────────────────────────────────────
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

  // ── Snap helpers ─────────────────────────────────────────────────────────────
  function getCardPositions(): number[] {
    const el = trackRef.current;
    if (!el) return [];
    return Array.from(el.children).map(
      (child) => (child as HTMLElement).offsetLeft - 16
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
    const clamped = Math.max(0, Math.min(index, PROJECTS.length - 1));
    const positions = getCardPositions();
    el.scrollTo({ left: positions[clamped] ?? 0, behavior: "smooth" });
    setCurrentIndex(clamped);
  }

  // ── Sync index on native scroll (touch) ──────────────────────────────────────
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
  const canNext = currentIndex < PROJECTS.length - 1;

  return (
    <div className="lg:hidden flex flex-col">
      {/* Title */}
      <div className="px-[16px] pt-[48px]">
        <SectionTitle mobile />
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex flex-row gap-[16px] overflow-x-auto py-[32px] px-[16px]
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="flex flex-col gap-[16px] items-start shrink-0"
            style={{
              width: "calc(100vw - 48px)",
              marginRight: i === PROJECTS.length - 1 ? 16 : 0,
            }}
          >
            {/* Image */}
            <div className="relative rounded-[4px] w-full" style={{ aspectRatio: "389 / 212" }}>
              <img
                alt={p.title}
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full"
                src={p.image}
                draggable={false}
              />
            </div>
            {/* Name */}
            <p
              className="text-[#e3e3e3] text-[24px] leading-[1.2] w-full"
              style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}
            >
              {p.title}
            </p>
            {/* URL */}
            <a
              href={`https://${p.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#bfbfc0] text-[14px] leading-[1.5] tracking-[-0.28px] w-full hover:text-[#e3e3e3] transition-colors duration-200 underline-offset-2 hover:underline"
              style={{ fontFamily: "'Golos Text', sans-serif" }}
              onClick={(e) => e.stopPropagation()}
            >
              {p.url}
            </a>
            <TechStack techs={p.techs} />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-row items-center gap-[12px] px-[16px] pb-[48px]">
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

        {/* Progress pills */}
        <div className="flex flex-row gap-[6px] ml-[4px]">
          {PROJECTS.map((_, i) => (
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
export function WebsitesSection() {
  return (
    <section className="w-full">
      {/* ── DESKTOP grid ── */}
      <div
        className="
          hidden lg:grid
          w-full max-w-[1344px] mx-auto
          lg:px-[48px] lg:py-[96px]
          lg:grid-cols-2
          gap-x-[48px] gap-y-[48px]
        "
      >
        <SectionTitle />
        {PROJECTS.map((p) => (
          <ProjectCard
            key={p.title}
            {...p}
            delay={p.col === 1 ? 0 : 150}
          />
        ))}
      </div>

      {/* ── MOBILE carousel ── */}
      <MobileCarousel />
    </section>
  );
}