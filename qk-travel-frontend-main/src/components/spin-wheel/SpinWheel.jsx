import React, { useState, useRef, useCallback } from "react";
import { motion as Motion } from "framer-motion";

const SpinWheel = ({ prizes, onFinish }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const currentRotation = useRef(0);

  const segmentAngle = 360 / prizes.length;

  const spin = useCallback(() => {
    if (spinning || prizes.length === 0) return;

    setSpinning(true);

    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const randomAngle = Math.random() * 360;
    const totalRotation =
      currentRotation.current + extraSpins * 360 + randomAngle;

    setRotation(totalRotation);
    currentRotation.current = totalRotation;

    setTimeout(() => {
      const normalizedAngle = totalRotation % 360;
      // The pointer is at the top (0°). The wheel rotates clockwise.
      // Calculate which segment is at the top after rotation.
      const pointerAngle = (360 - normalizedAngle + segmentAngle / 2) % 360;
      const winningIndex =
        Math.floor(pointerAngle / segmentAngle) % prizes.length;

      setSpinning(false);
      onFinish(prizes[winningIndex]);
    }, 4500);
  }, [spinning, prizes, segmentAngle, onFinish]);

  const radius = 150;
  const center = 160;
  const svgSize = 320;

  const getSegmentPath = (index) => {
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArc = segmentAngle > 180 ? 1 : 0;

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const getLabelPosition = (index) => {
    const midAngle = ((index + 0.5) * segmentAngle - 90) * (Math.PI / 180);
    const labelRadius = radius * 0.65;
    return {
      x: center + labelRadius * Math.cos(midAngle),
      y: center + labelRadius * Math.sin(midAngle),
      angle: (index + 0.5) * segmentAngle,
    };
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-red-500 drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <Motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
          className="drop-shadow-2xl"
        >
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
          >
            {/* Outer ring */}
            <circle
              cx={center}
              cy={center}
              r={radius + 6}
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="4"
            />
            <circle
              cx={center}
              cy={center}
              r={radius + 2}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
            />

            {/* Segments */}
            {prizes.map((prize, index) => (
              <path
                key={prize.id}
                d={getSegmentPath(index)}
                fill={prize.color}
                stroke="#fff"
                strokeWidth="2"
              />
            ))}

            {/* Labels */}
            {prizes.map((prize, index) => {
              const pos = getLabelPosition(index);
              return (
                <text
                  key={`label-${prize.id}`}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize={prizes.length > 8 ? "8" : "10"}
                  fontWeight="bold"
                  transform={`rotate(${pos.angle}, ${pos.x}, ${pos.y})`}
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {(prize.label || "").length > 12
                    ? (prize.label || "").slice(0, 12) + "…"
                    : prize.label || ""}
                </text>
              );
            })}

            {/* Center circle */}
            <circle
              cx={center}
              cy={center}
              r="22"
              fill="#1e3a5f"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            <circle cx={center} cy={center} r="15" fill="#f59e0b" />
          </svg>
        </Motion.div>

        {/* Decorative dots around wheel */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = i * 18 * (Math.PI / 180);
          const dotRadius = radius + 12;
          return (
            <div
              key={i}
              className={`absolute w-2.5 h-2.5 rounded-full ${
                i % 2 === 0 ? "bg-yellow-400" : "bg-white"
              }`}
              style={{
                left: center + dotRadius * Math.cos(angle) - 5,
                top: center + dotRadius * Math.sin(angle) - 5,
              }}
            />
          );
        })}
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning}
        className={`px-10 py-3 rounded-full text-white font-bold text-lg shadow-lg transform transition-all ${
          spinning
            ? "bg-gray-400 cursor-not-allowed scale-95"
            : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 hover:-translate-y-1 hover:shadow-xl active:scale-95"
        }`}
      >
        {spinning ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Đang quay...
          </>
        ) : (
          <>
            <i className="fas fa-play mr-2"></i>
            QUAY NGAY!
          </>
        )}
      </button>
    </div>
  );
};

export default SpinWheel;
