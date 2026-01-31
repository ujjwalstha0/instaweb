import { useEffect, useState } from "react";
import "./flag.css";

export default function App() {
  const [boost, setBoost] = useState(false);

  useEffect(() => {
    if (!boost) return;
    const t = setTimeout(() => setBoost(false), 3500);
    return () => clearTimeout(t);
  }, [boost]);

  return (
    <main className={`stage ${boost ? "boost" : ""}`} onClick={() => setBoost(true)}>
      <div className="fog" />

      <svg
        viewBox="0 0 320 460"
        className="flag"
        aria-label="Nepal flag forming from dots"
      >
        <defs>
          {/* Accurate Nepal Flag Shape */}
          <clipPath id="nepalShape">
            <path d="M40 30 L260 95 L120 175 L260 175 L40 430 Z" />
          </clipPath>

          {/* Moon & Sun */}
          <clipPath id="moon">
            <circle cx="120" cy="150" r="24" />
          </clipPath>

          <clipPath id="sun">
            <circle cx="130" cy="275" r="28" />
          </clipPath>

          {/* Dot patterns */}
          <pattern id="redDots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2.5" />
          </pattern>

          <pattern id="whiteDots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2.3" />
          </pattern>
        </defs>

        {/* Border */}
        <path
          className="border"
          d="M28 18 L280 90 L140 185 L280 185 L28 445 Z"
        />

        {/* Red field */}
        <rect
          width="100%"
          height="100%"
          clipPath="url(#nepalShape)"
          className="red"
          fill="url(#redDots)"
        />

        {/* Moon */}
        <rect
          width="100%"
          height="100%"
          clipPath="url(#moon)"
          className="symbol"
          fill="url(#whiteDots)"
        />

        {/* Sun */}
        <rect
          width="100%"
          height="100%"
          clipPath="url(#sun)"
          className="symbol"
          fill="url(#whiteDots)"
        />
      </svg>

      <p className="still">Still forming.</p>
      <p className="issued">Issued calmly.</p>
    </main>
  );
}