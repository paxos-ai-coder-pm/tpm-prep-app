import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rounds, type Round, type Question } from "../data/rounds";

function QCard({ q, qi, round }: { q: Question; qi: number; round: Round }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.018)",
        border: `1px solid ${open ? round.color + "33" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "14px",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          padding: "18px 20px",
          background: "none",
          border: "none",
          cursor: "none",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: `${round.color}66`, paddingTop: "4px", flexShrink: 0, minWidth: "22px" }}>
          {String(qi + 1).padStart(2, "0")}
        </span>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", fontWeight: 600, color: "#eeeef8", flex: 1, lineHeight: 1.55, textAlign: "left" }}>
          {q.question}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, marginTop: "4px", color: round.color }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
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
            <div style={{ padding: "4px 20px 20px 56px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ background: round.bgGlow.replace("0.12", "0.07"), border: `1px solid ${round.color}1a`, borderRadius: "10px", padding: "16px", marginBottom: "12px", marginTop: "14px" }}>
                <p style={{ fontSize: "13px", color: "rgba(238,238,248,0.65)", lineHeight: 1.75 }}>{q.hint}</p>
                {q.framework && (
                  <p style={{ fontSize: "12px", color: "#FF9900", fontFamily: "var(--font-mono)", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid rgba(255,153,0,0.12)" }}>
                    Framework: {q.framework}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {q.tags.map(tag => (
                  <span key={tag} style={{ fontSize: "9px", fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: round.color, padding: "3px 9px", borderRadius: "100px", border: `1px solid ${round.color}2a`, background: `${round.color}0d` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FOLD = 3;

export default function RoundExplorer() {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Listen for tab-change events dispatched by bento card clicks
  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<{ index: number }>).detail.index;
      setActive(idx);
      setShowAll(false);
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("roundchange", handler);
    return () => window.removeEventListener("roundchange", handler);
  }, []);

  const round = rounds[active];
  const visibleQs = showAll ? round.questions : round.questions.slice(0, FOLD);
  const remaining = round.questions.length - FOLD;

  const switchTab = (i: number) => {
    setActive(i);
    setShowAll(false);
  };

  return (
    <div ref={containerRef} id="round-explorer">
      {/* Tab pills */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
        {rounds.map((r, i) => (
          <button
            key={r.id}
            onClick={() => switchTab(i)}
            style={{
              padding: "9px 18px",
              borderRadius: "100px",
              border: `1px solid ${active === i ? r.color + "55" : "rgba(255,255,255,0.07)"}`,
              background: active === i ? r.bgGlow : "transparent",
              color: active === i ? r.color : "rgba(238,238,248,0.4)",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "none",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => {
              if (active !== i) (e.currentTarget as HTMLButtonElement).style.borderColor = r.color + "33";
            }}
            onMouseLeave={e => {
              if (active !== i) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
            }}
          >
            <span style={{ fontSize: "15px" }}>{r.icon}</span>
            {r.name}
          </button>
        ))}
      </div>

      {/* Round header bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: round.bgGlow.replace("0.12", "0.06"), border: `1px solid ${round.color}22`, borderRadius: "14px", marginBottom: "16px" }}>
        <p style={{ fontSize: "13px", color: "rgba(238,238,248,0.5)", lineHeight: 1.6, maxWidth: "580px" }}>{round.description}</p>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: `${round.color}88`, flexShrink: 0, marginLeft: "16px" }}>
          {round.questions.length} questions · {Math.floor(round.timeLimit / 60)}m each
        </span>
      </div>

      {/* Questions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {visibleQs.map((q, qi) => (
              <QCard key={q.id} q={q} qi={qi} round={round} />
            ))}
          </div>

          {!showAll && remaining > 0 && (
            <button
              onClick={() => setShowAll(true)}
              style={{ marginTop: "12px", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 18px", color: "rgba(238,238,248,0.4)", fontFamily: "var(--font-heading)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", cursor: "none", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#eeeef8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(238,238,248,0.4)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              Show {remaining} more →
            </button>
          )}
          {showAll && remaining > 0 && (
            <button
              onClick={() => setShowAll(false)}
              style={{ marginTop: "12px", background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 18px", color: "rgba(238,238,248,0.4)", fontFamily: "var(--font-heading)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", cursor: "none", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#eeeef8"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(238,238,248,0.4)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              Show less ↑
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
