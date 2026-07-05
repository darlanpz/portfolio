import { useEffect, useRef, useState } from "react";

// ── Reveal on scroll ──────────────────────────────────────────────────────────
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

// ── Section heading: title lines + arrow ──────────────────────────────────────
export function SectionHeading({ lines, center = false }: { lines: string[]; center?: boolean }) {
  const { ref, style } = useReveal(0);

  return (
    <div
      ref={ref}
      style={style}
      className={`text-[#e3e3e3] text-[32px] lg:text-[48px] leading-[1.2] ${center ? "text-center" : ""}`}
    >
      <div style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}>
        {lines.map((line, i) => (
          <p key={i} className="mb-0">{line}</p>
        ))}
      </div>
    </div>
  );
}
