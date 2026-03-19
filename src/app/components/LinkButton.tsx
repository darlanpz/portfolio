import { ReactNode } from "react";

interface LinkButtonProps {
  label: string;
  icon: ReactNode;
  href?: string;
}

export function LinkButton({ label, icon, href }: LinkButtonProps) {
  return (
    <a
      href={href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 py-3 px-5 rounded border border-[#bfbfc0] text-[#bfbfc0] no-underline shrink-0 whitespace-nowrap text-[16px] leading-[1] tracking-[-0.32px] transition-[border-color,background-color] duration-200 ease-[ease] hover:border-[#e3e3e3] hover:bg-white/5"
      style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 400 }}
    >
      <span className="relative shrink-0">{label}</span>
      <div className="w-6 h-6 shrink-0 flex items-center justify-center">
        {icon}
      </div>
    </a>
  );
}
