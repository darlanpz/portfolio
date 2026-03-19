import imgImage128 from "figma:asset/8ac960d8179a02978a6c232d63c795c183488c62.png";
import imgImage129 from "figma:asset/c98000f137c703cc34a8653b1010a0652bc54ef0.png";
import imgImage127 from "figma:asset/7beffc09b4ab9e010b3b1ebadc81397fb197ccdb.png";

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px overflow-clip sticky top-0" data-name="Text">
      <p className="font-['Golos_Text:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[#e3e3e3] text-[48px] w-full">Automação, Redução de Custos e Integração</p>
      <p className="font-['Golos_Text:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#bfbfc0] text-[16px] w-full">Como apliquei o Product Design para reduzir o tempo de emissão dos documentos internacionais em 80% e automatizamos o processo de Follow Up em fronteira com integrações às aduanas e aos sistemas governamentais.</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[48px] items-start justify-center min-h-px min-w-px pointer-events-none relative">
      <div className="aspect-[979/537] relative rounded-[8px] shrink-0 w-full" data-name="image 128">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgImage128} />
        <div aria-hidden="true" className="absolute border border-[#b4a8fa] border-solid inset-0 rounded-[8px]" />
      </div>
      <div className="aspect-[979/537] relative rounded-[8px] shrink-0 w-full" data-name="image 129">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgImage129} />
        <div aria-hidden="true" className="absolute border border-[#b4a8fa] border-solid inset-0 rounded-[8px]" />
      </div>
      <div className="aspect-[979/537] relative rounded-[8px] shrink-0 w-full" data-name="image 127">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgImage127} />
        <div aria-hidden="true" className="absolute border border-[#b4a8fa] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="content-stretch flex gap-[48px] items-start px-[48px] py-[96px] relative size-full" data-name="Section">
      <Text />
      <Frame />
    </div>
  );
}