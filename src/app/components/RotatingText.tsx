export function RotatingText() {
  const text = "Graphic Design  •  Product Design  •  Web Design";
  const radius = 54;
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      className="w-[140px] h-[140px] opacity-[0.45] mix-blend-difference [animation:rotateSlow_14s_linear_infinite]"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="sealCircleTrack"
            d={`M ${cx},${cy} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text fill="#e3e3e3" style={{ fontSize: "14px", letterSpacing: "0.5px" }}>
          <textPath href="#sealCircleTrack" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
