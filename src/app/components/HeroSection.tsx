import { useEffect, useRef } from "react";
import imgPortrait from "@/assets/profile.webp";
import { LinkButton } from "./LinkButton";
import { WhatsAppIcon, LinkedInIcon, BehanceIcon } from "./Icons";
import { RotatingText } from "./RotatingText";

const links = [
  {
    label: "55 9 9669 8296",
    icon: <WhatsAppIcon size={20} />,
    href: "https://wa.me/55996698296",
  },
  {
    label: "/darlanpaz77",
    icon: <LinkedInIcon size={20} />,
    href: "https://linkedin.com/in/darlanpaz77",
  },
  {
    label: "/darlanpaz",
    icon: <BehanceIcon size={20} />,
    href: "https://behance.net/darlanpaz",
  },
];

export function HeroSection() {
  const sealRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      targetY.current = -window.scrollY * 0.09;
    };

    const animate = () => {
      currentY.current += (targetY.current - currentY.current) * 0.055;
      if (sealRef.current) {
        sealRef.current.style.transform = `translateY(${currentY.current.toFixed(2)}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section className="flex flex-row gap-12 items-start w-full max-w-[1344px] max-lg:flex-col max-lg:p-4 max-lg:gap-6 px-[16px] md:px-[48px] py-[48px] [animation:fadeInTop_0.7s_ease_both]">
      {/* Portrait image + rotating seal */}
      <div className="[flex:1_0_0] h-[512px] min-w-[600px] relative rounded-lg overflow-visible max-lg:w-full max-lg:min-w-0 max-lg:flex-none max-lg:h-[320px]">
        <img
          src={imgPortrait}
          alt="Darlan Paz"
          className="absolute inset-0 w-full h-full object-cover rounded-lg pointer-events-none max-w-none"
        />
        {/* Rotating seal — parallax wrapper */}
        <div className="absolute right-[0] -bottom-[70px] md:-bottom-[60px] md:-right-[60px]">
          <div ref={sealRef} style={{ willChange: "transform" }}>
            <RotatingText />
          </div>
        </div>
      </div>

      {/* Text column */}
      <div className="md:[flex:1_0_0] flex flex-col gap-6 overflow-hidden">
        {/* Title */}
        <div
          className="w-full whitespace-pre-wrap text-[#e3e3e3] text-[48px] leading-[1.2]"
          style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}
        >
          <p className="m-0">Design Alinhado </p>
          <p className="m-0">à Estratégia</p>
        </div>

        {/* Description */}
        <p
          className="text-[#bfbfc0] m-0 w-full text-[16px] leading-[1.5]"
          style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 400 }}
        >
          Especialista em alinhar estratégia tecnológica à utilidade humana para criar soluções que funcionam. Com sete anos de experiência, ganhei um olhar estratégico para alinhar tecnologia e negócio e ajudar a construir produtos que são simples, funcionais e acima de tudo, feito para pessoas.
        </p>

        {/* Link buttons */}
        <div className="flex flex-wrap gap-4 items-start pt-3 w-full">
          {links.map((link) => (
            <LinkButton
              key={link.label}
              label={link.label}
              icon={link.icon}
              href={link.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}