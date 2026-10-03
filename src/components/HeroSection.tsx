import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import PracticeModal from "./PracticeModal";

function MagneticButton() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ display: "inline-block" }}>
      <motion.div style={{ x: sx, y: sy }}>
        <PracticeModal />
      </motion.div>
    </div>
  );
}

function SplitWords({ text, delay = 0, className = "", style = {} }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: i < words.length - 1 ? "0.28em" : 0 }}>
          <motion.span
            display="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.75, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const [hoverStat, setHoverStat] = useState<number | null>(null);

  const stats = [
    { n: "6", label: "Rounds" },
    { n: "50+", label: "Questions" },
    { n: "16", label: "LPs" },
    { n: "∞", label: "Sessions" },
  ];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 64px 80px",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 55% at 20% 50%, rgba(255,153,0,0.09) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 80% 30%, rgba(124,58,237,0.08) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 60% 80%, rgba(59,130,246,0.06) 0%, transparent 50%)", pointerEvents: "none" }} />

      {/* SVG grain */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Floating label top-left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ position: "absolute", top: "96px", left: "64px", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF9900", boxShadow: "0 0 12px #FF9900", animation: "breathe 3s ease-in-out infinite" }} />
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,153,0,0.8)" }}>
          Amazon TPM · 2025 Edition
        </span>
      </motion.div>

      {/* Year indicator top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ position: "absolute", top: "96px", right: "64px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(238,238,248,0.2)", letterSpacing: "0.1em" }}
      >
        ©2025
      </motion.div>

      {/* Large scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ position: "absolute", right: "64px", bottom: "90px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
      >
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(238,238,248,0.25)", writingMode: "vertical-rl" }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "48px", background: "linear-gradient(180deg, rgba(255,153,0,0.6), transparent)" }}
        />
      </motion.div>

      {/* Main headline */}
      <div style={{ maxWidth: "1100px" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(52px,9vw,110px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "32px" }}>
          <div>
            <SplitWords text="Six rounds." delay={0.3} style={{ color: "#eeeef8" }} />
          </div>
          <div>
            <SplitWords text="One offer." delay={0.55} style={{ background: "linear-gradient(135deg,#FF9900 0%,#FFD700 50%,#FF6B00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} />
          </div>
        </div>

        {/* Sub row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "32px", marginBottom: "56px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.8vw,17px)", color: "rgba(238,238,248,0.5)", maxWidth: "440px", lineHeight: 1.75 }}
          >
            Stop rehearsing. Start training. 16 LPs, system design deep-dives, and a practice mode that simulates every round of the Amazon loop — with a timer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          style={{ display: "flex", gap: "40px", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "32px" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoverStat(i)}
              onMouseLeave={() => setHoverStat(null)}
              style={{ cursor: "default", transition: "transform 0.2s", transform: hoverStat === i ? "translateY(-4px)" : "none" }}
            >
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: hoverStat === i ? "#FF9900" : "#eeeef8", transition: "color 0.2s", letterSpacing: "-0.03em" }}>{s.n}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(238,238,248,0.3)", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
