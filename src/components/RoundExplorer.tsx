import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rounds, type Round, type Question } from "../data/rounds";

/* ── Question accordion card ─────────────────────────────────── */
function QCard({ q, qi, round }: { q: Question; qi: number; round: Round }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      style={{
        background: open ? `linear-gradient(135deg, ${round.bgGlow.replace("0.12","0.05")}, rgba(255,255,255,0.015))` : "rgba(255,255,255,0.018)",
        border: `1px solid ${open ? round.color + "2e" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.25s, background 0.25s",
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", padding: "16px 18px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "12px", textAlign: "left" }}
      >
        {/* Number badge */}
        <span style={{
          flexShrink: 0,
          width: "24px", height: "24px",
          borderRadius: "6px",
          background: open ? round.color + "22" : "rgba(255,255,255,0.05)",
          border: `1px solid ${open ? round.color + "44" : "rgba(255,255,255,0.08)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontSize: "10px",
          color: open ? round.color : "rgba(238,238,248,0.35)",
          transition: "all 0.25s",
          marginTop: "1px",
        }}>
          {String(qi + 1).padStart(2, "0")}
        </span>

        <span style={{ fontFamily: "var(--font-heading)", fontSize: "14px", fontWeight: 600, color: open ? "#eeeef8" : "rgba(238,238,248,0.8)", flex: 1, lineHeight: 1.55, transition: "color 0.2s" }}>
          {q.question}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0, marginTop: "3px", color: open ? round.color : "rgba(238,238,248,0.25)", transition: "color 0.25s" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 18px 18px 54px", borderTop: `1px solid ${round.color}14` }}>
              <div style={{ padding: "14px", background: round.bgGlow.replace("0.12","0.08"), border: `1px solid ${round.color}18`, borderRadius: "10px", marginBottom: "12px", marginTop: "14px" }}>
                <p style={{ fontSize: "13px", color: "rgba(238,238,248,0.65)", lineHeight: 1.75 }}>{q.hint}</p>
                {q.framework && (
                  <p style={{ fontSize: "11px", color: "#FF9900", fontFamily: "var(--font-mono)", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid rgba(255,153,0,0.12)" }}>
                    ↳ {q.framework}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {q.tags.map(tag => (
                  <span key={tag} style={{ fontSize: "9px", fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: round.color, padding: "3px 8px", borderRadius: "100px", border: `1px solid ${round.color}2a`, background: `${round.color}0c` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Sidebar round card ───────────────────────────────────────── */
function RoundCard({ round, active, onClick }: { round: Round; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        background: active
          ? `linear-gradient(135deg, ${round.bgGlow.replace("0.12","0.14")}, rgba(255,255,255,0.02))`
          : "transparent",
        border: `1px solid ${active ? round.color + "44" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "14px",
        padding: "16px 18px",
        cursor: "pointer",
        transition: "all 0.22s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = round.color + "33";
          (e.currentTarget as HTMLButtonElement).style.background = round.bgGlow.replace("0.12","0.05");
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }
      }}
    >
      {/* Active indicator line */}
      {active && (
        <div style={{ position: "absolute", left: 0, top: "12px", bottom: "12px", width: "2px", borderRadius: "0 2px 2px 0", background: round.color }} />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
        <span style={{ fontSize: "18px", lineHeight: 1 }}>{round.icon}</span>
        <span style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "13px",
          color: active ? round.color : "rgba(238,238,248,0.7)",
          transition: "color 0.2s",
          letterSpacing: "-0.01em",
        }}>
          {round.name}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingLeft: "28px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: active ? round.color + "99" : "rgba(238,238,248,0.2)" }}>
          {round.questions.length}q
        </span>
        <span style={{ width: "2px", height: "2px", borderRadius: "50%", background: "rgba(238,238,248,0.15)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: active ? round.color + "99" : "rgba(238,238,248,0.2)" }}>
          {Math.floor(round.timeLimit / 60)}m each
        </span>
      </div>
    </button>
  );
}

/* ── Main explorer ────────────────────────────────────────────── */
const FOLD = 3;

export default function RoundExplorer() {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<{ index: number }>).detail.index;
      setActive(idx);
      setShowAll(false);
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    };
    window.addEventListener("roundchange", handler);
    return () => window.removeEventListener("roundchange", handler);
  }, []);

  const round = rounds[active];
  const visibleQs = showAll ? round.questions : round.questions.slice(0, FOLD);
  const remaining = round.questions.length - FOLD;

  const switchTab = (i: number) => { setActive(i); setShowAll(false); };

  return (
    <div ref={containerRef} id="round-explorer" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "16px", alignItems: "start" }}>

      {/* ── LEFT SIDEBAR ───────────────────────────────────────── */}
      <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {rounds.map((r, i) => (
          <RoundCard key={r.id} round={r} active={active === i} onClick={() => switchTab(i)} />
        ))}
      </div>

      {/* ── RIGHT CONTENT ──────────────────────────────────────── */}
      <div style={{ minWidth: 0 }}>
        {/* Round header */}
        <div style={{
          padding: "20px 24px",
          background: `linear-gradient(135deg, ${round.bgGlow.replace("0.12","0.1")}, rgba(255,255,255,0.015))`,
          border: `1px solid ${round.color}2a`,
          borderRadius: "16px",
          marginBottom: "14px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}>
          <span style={{ fontSize: "28px", flexShrink: 0 }}>{round.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "16px", color: round.color }}>
                {round.name}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: `${round.color}66`, padding: "2px 8px", border: `1px solid ${round.color}22`, borderRadius: "100px", background: `${round.color}0a` }}>
                Round {round.id}
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(238,238,248,0.45)", lineHeight: 1.6 }}>{round.description}</p>
          </div>
          {/* Progress dots */}
          <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
            {rounds.map((_, i) => (
              <div key={i} style={{ width: i === active ? "16px" : "5px", height: "5px", borderRadius: "100px", background: i === active ? round.color : "rgba(255,255,255,0.12)", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>

        {/* Questions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {visibleQs.map((q, qi) => (
                <QCard key={q.id} q={q} qi={qi} round={round} />
              ))}
            </div>

            {!showAll && remaining > 0 && (
              <button
                onClick={() => setShowAll(true)}
                style={{ marginTop: "12px", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "9px 16px", color: "rgba(238,238,248,0.38)", fontFamily: "var(--font-heading)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", transition: "color 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#eeeef8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(238,238,248,0.38)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                Show {remaining} more →
              </button>
            )}
            {showAll && remaining > 0 && (
              <button
                onClick={() => setShowAll(false)}
                style={{ marginTop: "12px", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "9px 16px", color: "rgba(238,238,248,0.38)", fontFamily: "var(--font-heading)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", transition: "color 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#eeeef8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(238,238,248,0.38)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                Show less ↑
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
