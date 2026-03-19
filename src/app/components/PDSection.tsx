import { useEffect, useRef, useState } from "react";
import imgCase1 from "@/assets/case-prop-01.png";
import imgCase2 from "@/assets/case-prop-02.png";
import imgCase3 from "@/assets/case-prop-03.png";

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(delay = 0) {
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

  return {
    ref,
    style: {
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
    },
  };
}

// ── Project card ──────────────────────────────────────────────────────────────
interface PDCardProps {
  image: string;
  alt: string;
  delay?: number;
  url: string;
}

function PDCard({ image, alt, url, delay = 0 }: PDCardProps) {
  const { ref, style } = useReveal(delay);

  return (
    <div ref={ref} style={style} className="relative rounded-[8px] shrink-0 w-full">
      <div className="aspect-[979/537] relative rounded-[8px] w-full overflow-hidden">
        <img
          alt={alt}
          className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full"
          src={image}
        />
        {/* Purple border overlay */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={alt}
          className="absolute inset-0 rounded-[8px]"
          style={{ border: "1px solid #b4a8fa" }}
        />
      </div>
    </div>
  );
}

// ── Sticky text panel ────────────────────────────────────────────────────────
function StickyText() {
  const { ref, style } = useReveal(0);

  return (
    <div className="w-full lg:w-[calc(50%-24px)] lg:flex-none">
      <div ref={ref} style={style} className="flex flex-col gap-[24px] items-start md:sticky md:top-[120px]">
        <h2
          className="text-[#e3e3e3] text-[32px] lg:text-[48px] leading-[1.2] w-full"
          style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}
        >
          Automação, Redução de Custos e Integração
        </h2>
        <p
          className="text-[#bfbfc0] text-[16px] leading-[1.5] w-full"
          style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 400 }}
        >
          Como apliquei o Product Design para reduzir o tempo de emissão dos
          documentos internacionais em 80% e automatizamos o processo de Follow
          Up em fronteira com integrações às aduanas e aos sistemas
          governamentais.
        </p>
      </div>
    </div>
  );
}

// ── Cards column ──────────────────────────────────────────────────────────────
const CARDS = [
  { 
    image: imgCase1,
    alt: "Case 1 – A Arquitetura de uma Plataforma Escalável",
    url: "https://drive.google.com/file/d/1bkpJVjxAV7rBGTRCuMHqhjz_EqQwKEYC/view?usp=drive_link", 
  },
  { 
    image: imgCase2,
    alt: "Case 2 – O Primeiro Módulo da Plataforma Propulsor",
    url: "https://drive.google.com/file/d/17sp_x9c1fen4TfW8WHgHlu31_Gnl2p50/view?usp=drive_link", 
  },
  { 
    image: imgCase3,
    alt: "Case 3 – Integração, Transparência e Automação com o Follow Up",
    url: "https://drive.google.com/file/d/1UKN3CJ84Y9auu3jB6hyEQdc39S_HFbMz/view?usp=drive_link", 
  },
];

function CardsColumn() {
  return (
    <div className="w-full lg:w-[calc(50%-24px)] lg:flex-none flex flex-col gap-[48px]">
      {CARDS.map((card, i) => (
        <PDCard key={card.alt} image={card.image} alt={card.alt} url={card.url} delay={i * 120} />
      ))}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function PDSection() {
  return (
    <section className="w-full">
      <div
        className="
          w-full max-w-[1344px] mx-auto
          px-[16px] py-[48px]
          lg:px-[48px] lg:py-[96px]
          flex flex-col lg:flex-row
          gap-[48px]
        "
      >
        <StickyText />
        <CardsColumn />
      </div>
    </section>
  );
}