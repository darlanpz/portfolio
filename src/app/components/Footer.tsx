import svgPaths from "../../imports/svg-pb5znzzzp9";
import { PrimaryButton } from "./PrimaryButton";
import { LinkButton } from "./LinkButton";

// ── Icons ──────────────────────────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg className="w-full h-full" fill="none" viewBox="0 0 19.9 20.0001">
      <path d={svgPaths.p30848300} fill="#BFBFC0" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-full h-full" fill="none" viewBox="0 0 21.5 20.5">
      <path d={svgPaths.p9526000} stroke="#BFBFC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p3ab7eb00} stroke="#BFBFC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg className="w-full h-full" fill="none" viewBox="0 0 21.5 14.5">
      <path d={svgPaths.p1e10cf80} stroke="#BFBFC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-full h-full" fill="none" viewBox="0 0 19.5 19.5">
      <path d={svgPaths.p30cc2000} stroke="#BFBFC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p168375f0} stroke="#BFBFC0" strokeWidth="1.5" />
      <path d="M15.25 4.26L15.26 4.249" stroke="#BFBFC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="w-full backdrop-blur-[40px]">
      <div className="flex flex-wrap gap-[16px] items-center justify-start md:justify-center px-[24px] py-[48px]">
        <PrimaryButton 
          label="Baixar CV" 
          href="https://docs.google.com/document/d/1AIE_xj8nXJt_l9fE_-QZChB8A6H3OJZm/edit?usp=sharing&ouid=100658739830673008130&rtpof=true&sd=true" 
        />

        <LinkButton
          label="55 9 9669 8296"
          href="https://wa.me/5596698296"
          icon={<WhatsAppIcon />}
        />

        <LinkButton
          label="/darlanpaz77"
          href="https://linkedin.com/in/darlanpaz77"
          icon={<LinkedInIcon />}
        />

        <LinkButton
          label="/darlanpaz"
          href="https://behance.net/darlanpaz"
          icon={<BehanceIcon />}
        />

        <LinkButton
          label="/darlanpaz"
          href="https://behance.net/darlanpaz"
          icon={<BehanceIcon />}
        />

        <LinkButton
          label="/darlan_paz"
          href="https://instagram.com/darlan_paz"
          icon={<InstagramIcon />}
        />
      </div>
    </footer>
  );
}