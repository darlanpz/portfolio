import svgPaths from "./svg-7wxsev1uss";

export default function Header() {
  return (
    <div className="backdrop-blur-[40px] content-stretch flex items-center justify-between p-[24px] relative size-full" data-name="Header">
      <div className="h-[22.752px] relative shrink-0 w-[154.623px]" data-name="Logo">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 154.623 22.752">
          <g id="Darlan Paz">
            <path d={svgPaths.p7945480} fill="var(--fill-0, #E3E3E3)" />
            <path d={svgPaths.p65c1b80} fill="var(--fill-0, #E3E3E3)" />
            <path d={svgPaths.p2a2c3200} fill="var(--fill-0, #E3E3E3)" />
            <path d={svgPaths.p3f0ac600} fill="var(--fill-0, #E3E3E3)" />
            <path d={svgPaths.p76bc580} fill="var(--fill-0, #E3E3E3)" />
            <path d={svgPaths.p3f36b200} fill="var(--fill-0, #E3E3E3)" />
            <path d={svgPaths.p2f720500} fill="var(--fill-0, #E3E3E3)" />
            <path d={svgPaths.p4dd0200} fill="var(--fill-0, #E3E3E3)" />
            <path d={svgPaths.p3ce94540} fill="var(--fill-0, #E3E3E3)" />
          </g>
        </svg>
      </div>
      <div className="bg-[#b4a8fa] content-stretch flex gap-[12px] items-center justify-center px-[20px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border-[#8b78f7] border-b border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#360077] text-[16px] tracking-[-0.32px] whitespace-nowrap">Baixar CV</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <path d={svgPaths.p3b93fe00} fill="var(--fill-0, #360077)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}