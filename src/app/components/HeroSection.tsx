import { useEffect, useRef } from "react";
import imgDarlan from "@/assets/profileDarlan.webp";
import imgVitor from "@/assets/profileVitor.webp";

export function HeroSection() {
  const hintRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const hintCur = useRef(1);
  const imgCur = useRef(1);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const y = window.scrollY;
      const vh = window.innerHeight || 800;

      // scroll cue fades over the first ~250px
      const hintTarget = Math.max(0, 1 - y / 250);
      hintCur.current += (hintTarget - hintCur.current) * 0.12;
      if (hintRef.current) hintRef.current.style.opacity = hintCur.current.toFixed(3);

      // portraits fade out across ~85% of the viewport height
      const imgTarget = Math.max(0, 1 - y / (vh * 0.85));
      imgCur.current += (imgTarget - imgCur.current) * 0.12;
      const o = imgCur.current.toFixed(3);
      if (leftRef.current) leftRef.current.style.opacity = o;
      if (rightRef.current) rightRef.current.style.opacity = o;

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-wrap lg:flex-nowrap items-start lg:justify-between gap-6 max-lg:gap-y-0 overflow-visible [animation:fadeInTop_0.7s_ease_both]">
      {/* marching-dots keyframe for the dotted arrow */}
      <style>{`@keyframes heroDash { to { stroke-dashoffset: -11; } }`}</style>

      {/* Left portrait — hugs the left edge on desktop */}
      <div
        ref={leftRef}
        style={{
          willChange: "opacity",
          // fade toward the centre (inner edge) + a soft radial fade at the bottom
          maskImage:
            "linear-gradient(to right, #000 40%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.3) 84%, transparent 100%), radial-gradient(160% 130% at 50% -15%, #000 42%, rgba(0,0,0,0.4) 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, #000 40%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.3) 84%, transparent 100%), radial-gradient(160% 130% at 50% -15%, #000 42%, rgba(0,0,0,0.4) 78%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
        className="order-1 relative shrink-0 w-[calc(50%-12px)] lg:w-[30%] h-[50dvh] lg:h-[100dvh] rounded-tl-none rounded-tr-none rounded-bl-lg lg:rounded-bl-none rounded-br-lg overflow-hidden"
      >
        <img
          src={imgDarlan}
          alt="Darlan Paz"
          className="w-full h-full object-cover object-top scale-[1.4] origin-top pointer-events-none max-w-none"
        />
      </div>

      {/* Center text + scroll hint (evenly distributed on desktop) */}
      <div className="relative z-10 order-3 lg:order-2 lg:self-stretch w-full lg:flex-1 flex flex-col items-center text-center gap-8 lg:gap-0 max-lg:-mt-[240px] max-lg:min-h-[50dvh] max-lg:justify-center lg:justify-evenly max-lg:px-4 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Title */}
          <div
            className="whitespace-pre-wrap text-[#e3e3e3] text-[32px] lg:text-[48px] leading-[1.2]"
            style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}
          >
            <p className="m-0">Design Alinhado </p>
            <p className="m-0">à Estratégia</p>
          </div>

          {/* Description */}
          <p
            className="text-[#bfbfc0] m-0 max-w-[520px] text-[16px] lg:text-[20px] leading-[1.5]"
            style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 400 }}
          >
            Alinhamos estratégia e negócio a Product Design, Design Gráfico e Audiovisual para criar soluções simples, funcionais e feitas para pessoas.
          </p>
        </div>
      </div>

      {/* Right portrait — hugs the right edge on desktop */}
      <div
        ref={rightRef}
        style={{
          willChange: "opacity",
          // fade toward the centre (inner edge) + a soft radial fade at the bottom
          maskImage:
            "linear-gradient(to left, #000 40%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.3) 84%, transparent 100%), radial-gradient(160% 130% at 50% -15%, #000 42%, rgba(0,0,0,0.4) 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, #000 40%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.3) 84%, transparent 100%), radial-gradient(160% 130% at 50% -15%, #000 42%, rgba(0,0,0,0.4) 78%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
        className="order-2 lg:order-3 relative shrink-0 w-[calc(50%-12px)] lg:w-[30%] h-[50dvh] lg:h-[100dvh]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-tr-none rounded-tl-none rounded-br-lg lg:rounded-br-none rounded-bl-lg">
          <img
            src={imgVitor}
            alt="Vitor Garcia"
            className="w-full h-full object-cover object-top scale-[1.4] origin-top pointer-events-none max-w-none"
          />
        </div>
      </div>

      {/* Dotted down-arrow scroll cue — marching dots, fades out on scroll */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[#bfbfc0]"
        style={{ willChange: "opacity" }}
      >
        <svg width="30" height="90" viewBox="0 0 20 60" fill="none">
          <path
            d="M10 1 L10 49"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="0.5 5"
            style={{ animation: "heroDash 0.9s linear infinite" }}
          />
          <path
            d="M3.5 43 L10 51 L16.5 43"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
