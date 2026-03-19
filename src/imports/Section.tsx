import svgPaths from "./svg-cfoi8jvok4";
import imgGeminiGeneratedImageLnwe3Nlnwe3Nlnwe1 from "figma:asset/aa48706897793fc704a440d56708da69e4a0b8ec.png";

function Group() {
  return (
    <div className="absolute inset-[8.33%_8.33%_12.5%_8.33%]" data-name="Group">
      <div className="absolute inset-[-3.95%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 20.5">
          <g id="Group">
            <path d={svgPaths.p9526000} id="Vector" stroke="var(--stroke-0, #BFBFC0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3ab7eb00} id="Vector_2" stroke="var(--stroke-0, #BFBFC0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Links() {
  return (
    <div className="content-start flex flex-wrap gap-[16px] items-start pt-[12px] relative shrink-0 w-full" data-name="Links">
      <div className="content-stretch flex gap-[12px] items-center justify-center px-[20px] py-[12px] relative rounded-[4px] shrink-0" data-name="Link">
        <div aria-hidden="true" className="absolute border border-[#bfbfc0] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#bfbfc0] text-[16px] tracking-[-0.32px] whitespace-nowrap">55 9 9669 8296</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[8.33%_8.54%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9 20.0001">
              <path d={svgPaths.p30848300} fill="var(--fill-0, #BFBFC0)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[12px] items-center justify-center px-[20px] py-[12px] relative rounded-[4px] shrink-0" data-name="Link">
        <div aria-hidden="true" className="absolute border border-[#bfbfc0] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#bfbfc0] text-[16px] tracking-[-0.32px] whitespace-nowrap">/darlanpaz77</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <Group />
        </div>
      </div>
      <div className="content-stretch flex gap-[12px] items-center justify-center px-[20px] py-[12px] relative rounded-[4px] shrink-0" data-name="Link">
        <div aria-hidden="true" className="absolute border border-[#bfbfc0] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#bfbfc0] text-[16px] tracking-[-0.32px] whitespace-nowrap">/darlanpaz</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute bottom-1/4 left-[8.33%] right-[8.33%] top-[20.83%]" data-name="Vector">
            <div className="absolute inset-[-5.77%_-3.75%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 14.5">
                <path d={svgPaths.p1e10cf80} id="Vector" stroke="var(--stroke-0, #BFBFC0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px overflow-clip relative" data-name="Text">
      <div className="font-['Golos_Text:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#e3e3e3] text-[48px] w-full whitespace-pre-wrap">
        <p className="mb-0">{`Design Alinhado `}</p>
        <p>à Estratégia</p>
      </div>
      <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#bfbfc0] text-[16px] w-full">Especialista em alinhar estratégia tecnológica à utilidade humana para criar soluções que funcionam. Com sete anos de experiência, ganhei um olhar estratégico para alinhar tecnologia e negócio e ajudar a construir produtos que são simples, funcionais e acima de tudo, feito para pessoas.</p>
      <Links />
    </div>
  );
}

export default function Section() {
  return (
    <div className="content-stretch flex gap-[48px] items-start p-[48px] relative size-full" data-name="Section">
      <div className="flex-[1_0_0] h-[512px] min-h-px min-w-px relative rounded-[8px]" data-name="Gemini_Generated_Image_lnwe3nlnwe3nlnwe 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgGeminiGeneratedImageLnwe3Nlnwe3Nlnwe1} />
      </div>
      <Text />
    </div>
  );
}