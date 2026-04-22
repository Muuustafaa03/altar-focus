import { motion } from "framer-motion";

type OrbProps = {
  size?: number;
  /** progress 0..1 — when provided, draws a thin ring around the orb */
  progress?: number;
  /** halo only, no breathing (for blessing screen) */
  still?: boolean;
};

export function Orb({ size = 240, progress, still = false }: OrbProps) {
  const stroke = 1.5;
  const ringRadius = size / 2 - stroke;
  const circumference = 2 * Math.PI * ringRadius;
  const dashOffset = progress != null ? circumference * (1 - progress) : 0;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer halo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.13 305 / 0.25) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={
          still
            ? { opacity: 0.9, scale: 1.1 }
            : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }
        }
        transition={
          still
            ? { duration: 1.2, ease: "easeOut" }
            : { duration: 5, ease: "easeInOut", repeat: Infinity }
        }
      />

      {/* Progress ring (drawn behind orb) */}
      {progress != null && (
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={ringRadius}
            fill="none"
            stroke="oklch(0.94 0.005 270 / 0.06)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={ringRadius}
            fill="none"
            stroke="oklch(0.88 0.12 215 / 0.85)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke-dashoffset 1s linear",
              filter: "drop-shadow(0 0 6px oklch(0.88 0.12 215 / 0.7))",
            }}
          />
        </svg>
      )}

      {/* Core orb */}
      <motion.div
        className="relative rounded-full bg-orb"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          boxShadow:
            "inset 0 0 40px oklch(0.95 0.08 215 / 0.4), 0 0 60px oklch(0.88 0.12 215 / 0.5), 0 0 140px oklch(0.78 0.13 305 / 0.35)",
        }}
        animate={
          still
            ? { scale: 1.02, opacity: 1 }
            : {
                scale: [1, 1.06, 1],
                opacity: [0.85, 1, 0.85],
              }
        }
        transition={
          still
            ? { duration: 1.5, ease: "easeOut" }
            : { duration: 4, ease: "easeInOut", repeat: Infinity }
        }
      >
        {/* Inner highlight */}
        <div
          aria-hidden
          className="absolute rounded-full"
          style={{
            top: "15%",
            left: "20%",
            width: "30%",
            height: "25%",
            background:
              "radial-gradient(ellipse, oklch(1 0 0 / 0.5) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </div>
  );
}
