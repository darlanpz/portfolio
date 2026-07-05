import { WhatsAppIcon } from "./Icons";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  /** On mobile, hide the label and render a square icon-only button. */
  compactMobile?: boolean;
}

// Same shape/typography as LinkButton, but filled white instead of outlined.
const baseClass = (compactMobile?: boolean) =>
  `inline-flex items-center justify-center gap-3 py-3 px-5 ${
    compactMobile ? "max-lg:px-3" : ""
  } bg-white text-[#141414] no-underline shrink-0 whitespace-nowrap text-[16px] leading-[1] tracking-[-0.32px] border-none cursor-pointer transition-colors duration-200 ease-[ease] hover:bg-[#e3e3e3]`;

const content = (label: string, compactMobile?: boolean) => (
  <>
    <span
      className={`relative shrink-0 ${compactMobile ? "max-lg:hidden" : ""}`}
      style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 400 }}
    >
      {label}
    </span>
    <div className="w-6 h-6 shrink-0 flex items-center justify-center">
      <WhatsAppIcon size={20} />
    </div>
  </>
);

export function PrimaryButton({ label, onClick, href, compactMobile }: PrimaryButtonProps) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass(compactMobile)}>
        {content(label, compactMobile)}
      </a>
    );
  }

  return (
    <button className={baseClass(compactMobile)} onClick={onClick}>
      {content(label, compactMobile)}
    </button>
  );
}
