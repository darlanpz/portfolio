import imgGallery01 from "figma:asset/4694d3ffa5db03eb480ff210b5f96cad4cf3a25a.png";
import imgGallery03 from "figma:asset/0bb8aa0174dea2198fd3b57b6a46dd35dcd63475.png";
import imgImage122 from "figma:asset/363f154297ab1d3f8b623195223b1e95048fc4e5.png";
import imgImage124 from "figma:asset/68978040febabb97c54397100bb60be72fa5ca8e.png";
import imgImage130 from "figma:asset/70e7d6b5114ee6b2ae8bf82b65889cfff586a8f3.png";
import imgGallery02 from "figma:asset/4e01c51bff3c7d53e9f5ff40f4c53ae9c0432c46.png";
import imgRectangle35 from "figma:asset/5db6a09d5bbef9307391f5328a0953252a5a68a7.png";
import imgImage129 from "figma:asset/818f0dabbfffcc4620213c9186087802c35336c0.png";
import imgImage131 from "figma:asset/ac860402eb2eaea8893177600b343601def0cc3b.png";

export default function Gallery() {
  return (
    <div className="content-start flex flex-wrap gap-[24px] items-start px-[48px] py-[96px] relative size-full" data-name="Gallery">
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[269.871px]" data-name="Gallery_01">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgGallery01} />
      </div>
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[612.067px]" data-name="Gallery_03">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgGallery03} />
      </div>
      <div className="h-[320px] relative rounded-[4px] shrink-0 w-[317.771px]" data-name="image 122">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgImage122} />
      </div>
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[383.485px]" data-name="image 124">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgImage124} />
      </div>
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[270.161px]" data-name="image 130">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
          <img alt="" className="absolute h-[119.47%] left-0 max-w-none top-0 w-full" src={imgImage130} />
        </div>
      </div>
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[545.926px]" data-name="Gallery_02">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgGallery02} />
      </div>
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[269.871px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
          <img alt="" className="absolute h-[108.25%] left-0 max-w-none top-[-8.25%] w-[128.36%]" src={imgRectangle35} />
        </div>
      </div>
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[544.8px]" data-name="image 129">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgImage129} />
      </div>
      <div className="h-[320px] relative rounded-[8px] shrink-0 w-[384.902px]" data-name="image 131">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
          <img alt="" className="absolute h-full left-[-5.74%] max-w-none top-0 w-[113.72%]" src={imgImage131} />
        </div>
      </div>
    </div>
  );
}