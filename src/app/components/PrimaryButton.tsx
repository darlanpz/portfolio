import svgPaths from "@/assets/svg-7wxsev1uss";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

const baseClass =
  "inline-flex items-center justify-center gap-3 py-3 px-5 bg-[#b4a8fa] hover:bg-[#8B78F7] rounded shrink-0 relative cursor-pointer border-none transition-colors duration-100 ease-[ease]";

const content = (label: string) => (
  <>
    {/* Inner bottom border overlay (from Figma) */}
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded border-b border-[#8b78f7] pointer-events-none"
    />
    <span
      className="relative shrink-0 text-[#360077] whitespace-nowrap tracking-[-0.32px] text-[16px] leading-[1]"
      style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 400 }}
    >
      {label}
    </span>
    {/* Icon */}
    <div className="w-6 h-6 relative shrink-0 overflow-hidden">
      <div className="absolute inset-[18.75%]">
        <svg
          className="absolute block w-full h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 15 15"
        >
          <path d={svgPaths.p3b93fe00} fill="#360077" />
        </svg>
      </div>
    </div>
  </>
);

export function PrimaryButton({ label, onClick, href }: PrimaryButtonProps) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>
        {content(label)}
      </a>
    );
  }

  return (
    <button className={baseClass} onClick={onClick}>
      {content(label)}
    </button>
  );
}
