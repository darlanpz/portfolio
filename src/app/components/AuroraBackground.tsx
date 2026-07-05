import { useEffect, useRef } from "react";

/**
 * Ambient animated background (à la Google Stitch): soft, slowly drifting
 * coloured "aurora" blobs plus a glow that trails the cursor. Sits fixed
 * behind all page content (sections are transparent, so it shows through).
 */
export function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { ...target };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const loop = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      if (ref.current) {
        ref.current.style.setProperty("--mx", `${cur.x}px`);
        ref.current.style.setProperty("--my", `${cur.y}px`);
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ ["--mx" as string]: "50vw", ["--my" as string]: "50vh" }}
    >
      <style>{`
        @keyframes auroraA { 0%,100%{ transform: translate(-8%,-10%) scale(1); } 50%{ transform: translate(10%,8%) scale(1.25); } }
        @keyframes auroraB { 0%,100%{ transform: translate(8%,10%) scale(1.1); } 50%{ transform: translate(-10%,-6%) scale(0.9); } }
        @keyframes auroraC { 0%,100%{ transform: translate(0%,6%) scale(1); } 50%{ transform: translate(-8%,-8%) scale(1.22); } }
      `}</style>

      {/* Drifting aurora blobs */}
      <div
        className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(139,120,247,0.38), transparent 65%)", animation: "auroraA 22s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[-20%] right-[-12%] w-[52vw] h-[52vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(90,120,235,0.30), transparent 65%)", animation: "auroraB 27s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[28%] left-[34%] w-[46vw] h-[46vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(214,120,200,0.22), transparent 65%)", animation: "auroraC 31s ease-in-out infinite" }}
      />

      {/* Cursor-following glow */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(520px circle at var(--mx) var(--my), rgba(180,168,250,0.14), transparent 60%)" }}
      />
    </div>
  );
}
