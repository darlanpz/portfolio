import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export type LightboxItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

/** Fullscreen media viewer. Renders in a portal above everything else.
 *  Closes on ESC, on backdrop click, or via the close button. */
export function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  if (!item) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-8"
      style={{ animation: "lbFade 0.2s ease" }}
    >
      <style>{`@keyframes lbFade { from { opacity: 0 } to { opacity: 1 } }`}</style>

      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center justify-center w-11 h-11 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X size={28} strokeWidth={1.8} />
      </button>

      <div
        className="relative flex items-center justify-center max-w-[92vw] max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.alt ?? ""}
            className="max-w-[92vw] max-h-[92vh] object-contain"
          />
        ) : (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="max-w-[92vw] max-h-[92vh] object-contain"
          />
        )}
      </div>
    </div>,
    document.body,
  );
}
