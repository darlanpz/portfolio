import { Logo } from "./Logo";
import { PrimaryButton } from "./PrimaryButton";

export function Header() {
  return (
    <>
      {/* Adaptive logo — its own fixed layer so mix-blend-difference blends against
          the page content behind it (Apple-style). A fixed parent creates its own
          stacking context, so the blended element must itself be the fixed one. */}
      <div className="fixed top-0 left-0 z-50 flex items-center h-[88px] px-6 mix-blend-difference pointer-events-none">
        <Logo />
      </div>

      {/* CTA — separate fixed layer (not blended) */}
      <div className="fixed top-0 right-0 z-50 flex items-center h-[88px] px-6">
        <PrimaryButton label="Fale Conosco" href="https://wa.me/55996926648" compactMobile />
      </div>
    </>
  );
}
