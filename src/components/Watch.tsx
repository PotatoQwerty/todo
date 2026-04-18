import { useEffect, useRef } from "react";

function Watch() {
  const sec = useRef<HTMLDivElement | null>(null);
  const hour = useRef<HTMLDivElement | null>(null);
  const min = useRef<HTMLDivElement | null>(null);
  const quarterMarks = [
    { label: "12", angle: 0 },
    { label: "3", angle: 90 },
    { label: "6", angle: 180 },
    { label: "9", angle: 270 },
  ];

  useEffect(() => {
    const rotate = () => {
      const d = new Date();
      const secD = (d.getSeconds() / 60) * 360;
      const minD = ((d.getMinutes() + d.getSeconds() / 60) / 60) * 360;
      const hourD = (((d.getHours() % 12) + d.getMinutes() / 60) / 12) * 360;

      if (sec.current && hour.current && min.current) {
        sec.current.style.rotate = `${secD}deg`;
        min.current.style.rotate = `${minD}deg`;
        hour.current.style.rotate = `${hourD}deg`;
      }
    };

    rotate();
    const interval = setInterval(rotate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="watch-face">
      <div className="watch-ring watch-ring-outer" />
      <div className="watch-ring watch-ring-inner" />

      <div className="watch-hand watch-hand-second" id="seconds" ref={sec} />
      <div className="watch-hand watch-hand-minute" id="minutes" ref={min} />
      <div className="watch-hand watch-hand-hour" id="hours" ref={hour} />

      {Array.from({ length: 60 }, (_, i) => i).map((i) => (
        <div
          key={i}
          style={{
            transform: `translate(-50%, -100%) rotate(${(i / 60) * 360}deg) translateY(-118px)`,
          }}
          className={`watch-tick ${i % 5 === 0 ? "watch-tick-major" : "watch-tick-minor"}`}
        />
      ))}

      {quarterMarks.map(({ label, angle }) => (
        <div
          key={label}
          className="watch-quarter"
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-100px) rotate(${-angle}deg)`,
          }}
        >
          {label}
        </div>
      ))}

      <div className="watch-center-dot" />
    </div>
  );
}

export default Watch;
