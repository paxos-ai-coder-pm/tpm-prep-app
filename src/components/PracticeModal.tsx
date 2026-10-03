import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rounds, type Round, type Question } from "../data/rounds";

type Rating = "nailed" | "needs-work" | "struggled" | "skip";

interface QResult {
  questionId: string;
  question: string;
  rating: Rating;
  timeUsed: number;
}

type Screen = "select" | "practice" | "results";

export default function PracticeModal() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("select");
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState<QResult[]>([]);
  const [sessionResults, setSessionResults] = useState<QResult[]>([]);

  const currentQ: Question | undefined = selectedRound?.questions[qIndex];

  const ratingConfig: Record<Rating, { label: string; color: string; bg: string }> = {
    nailed:      { label: "Nailed it ✓",   color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
    "needs-work":{ label: "Needs work",     color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
    struggled:   { label: "Struggled",      color: "#f87171", bg: "rgba(248,113,113,0.12)" },
    skip:        { label: "Skip →",         color: "#818cf8", bg: "rgba(129,140,248,0.08)" },
  };

  useEffect(() => {
    if (screen !== "practice" || !selectedRound) return;
    setTimeLeft(selectedRound.timeLimit);
    setShowHint(false);
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(id); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [qIndex, screen, selectedRound]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function handleOpen() {
    setOpen(true);
    setScreen("select");
    setResults([]);
    setQIndex(0);
    setSelectedRound(null);
  }

  function handleClose() {
    setOpen(false);
    setScreen("select");
  }

  function startRound(round: Round) {
    setSelectedRound(round);
    setQIndex(0);
    setResults([]);
    setScreen("practice");
  }

  const handleRate = useCallback((rating: Rating) => {
    if (!currentQ || !selectedRound) return;
    const result: QResult = {
      questionId: currentQ.id,
      question: currentQ.question,
      rating,
      timeUsed: selectedRound.timeLimit - timeLeft,
    };
    const newResults = [...results, result];
    setResults(newResults);

    const isLast = qIndex >= selectedRound.questions.length - 1;
    if (isLast) {
      setSessionResults(newResults);
      setScreen("results");
    } else {
      setQIndex(i => i + 1);
    }
  }, [currentQ, selectedRound, results, qIndex, timeLeft]);

  const pct = selectedRound ? Math.round((qIndex / selectedRound.questions.length) * 100) : 0;
  const timePct = selectedRound ? (timeLeft / selectedRound.timeLimit) * 100 : 100;
  const timerColor = timePct > 50 ? "#4ade80" : timePct > 25 ? "#fbbf24" : "#f87171";

  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, "0");

  const resultCounts = {
    nailed:      sessionResults.filter(r => r.rating === "nailed").length,
    "needs-work":sessionResults.filter(r => r.rating === "needs-work").length,
    struggled:   sessionResults.filter(r => r.rating === "struggled").length,
    skip:        sessionResults.filter(r => r.rating === "skip").length,
  };
  const score = Math.round(
    ((resultCounts.nailed * 100 + resultCounts["needs-work"] * 55 + resultCounts.struggled * 20) /
      Math.max(sessionResults.filter(r => r.rating !== "skip").length, 1))
  );

  return (
    <>
      <button
        onClick={handleOpen}
        className="practice-btn"
        style={{
          background: "linear-gradient(135deg, #FF9900 0%, #FF6B00 100%)",
          color: "#000",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "15px",
          padding: "14px 32px",
          borderRadius: "100px",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.02em",
          boxShadow: "0 0 40px rgba(255,153,0,0.35)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(255,153,0,0.5)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(255,153,0,0.35)";
        }}
      >
        Start Practice Session →
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(6,6,10,0.92)",
              backdropFilter: "blur(20px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{
                background: "#0c0c14",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "24px",
                width: "100%",
                maxWidth: "760px",
                maxHeight: "90vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
              }}
            >
              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "13px", fontFamily: "var(--font-heading)", fontWeight: 600, color: "#FF9900", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {screen === "select" ? "Practice Mode" : screen === "results" ? "Results" : selectedRound?.name}
                  </span>
                  {screen === "practice" && selectedRound && (
                    <span style={{ fontSize: "12px", color: "rgba(238,238,248,0.4)", fontFamily: "var(--font-mono)" }}>
                      {qIndex + 1} / {selectedRound.questions.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "rgba(238,238,248,0.6)", cursor: "pointer", fontSize: "18px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  ×
                </button>
              </div>

              {/* Progress bar (practice mode) */}
              {screen === "practice" && (
                <div style={{ height: "2px", background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    animate={{ width: `${pct}%` }}
                    transition={{ ease: "linear" }}
                    style={{ height: "100%", background: "linear-gradient(90deg, #FF9900, #FF6B00)" }}
                  />
                </div>
              )}

              {/* Body */}
              <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
                <AnimatePresence mode="wait">
                  {screen === "select" && (
                    <motion.div key="select" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                      <p style={{ color: "rgba(238,238,248,0.5)", marginBottom: "24px", fontSize: "14px" }}>
                        Choose a round to practice. Each session walks you through real-style interview questions with a timer, hints, and self-rating.
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px" }}>
                        {rounds.map(round => (
                          <button
                            key={round.id}
                            onClick={() => startRound(round)}
                            style={{
                              background: `linear-gradient(135deg, ${round.bgGlow.replace("0.12", "0.06")} 0%, transparent 60%), rgba(255,255,255,0.02)`,
                              border: `1px solid rgba(255,255,255,0.08)`,
                              borderRadius: "16px",
                              padding: "18px 20px",
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLButtonElement).style.borderColor = round.color + "55";
                              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                              (e.currentTarget as HTMLButtonElement).style.transform = "none";
                            }}
                          >
                            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{round.icon}</div>
                            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "14px", color: round.color, marginBottom: "4px" }}>{round.name}</div>
                            <div style={{ fontSize: "12px", color: "rgba(238,238,248,0.45)", lineHeight: 1.5 }}>{round.description}</div>
                            <div style={{ marginTop: "10px", fontSize: "11px", color: "rgba(238,238,248,0.3)", fontFamily: "var(--font-mono)" }}>
                              {round.questions.length} questions · {Math.floor(round.timeLimit / 60)}m each
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {screen === "practice" && currentQ && selectedRound && (
                    <motion.div key={`q-${qIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                      {/* Timer */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {currentQ.tags.map(t => (
                            <span key={t} style={{ fontSize: "10px", fontFamily: "var(--font-heading)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: selectedRound.color, padding: "3px 9px", borderRadius: "100px", border: `1px solid ${selectedRound.color}33`, background: `${selectedRound.color}0f` }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "60px", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                            <motion.div
                              animate={{ width: `${timePct}%`, backgroundColor: timerColor }}
                              transition={{ duration: 0.5 }}
                              style={{ height: "100%", borderRadius: "2px" }}
                            />
                          </div>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: timerColor, minWidth: "42px" }}>
                            {mins}:{secs}
                          </span>
                        </div>
                      </div>

                      {/* Question */}
                      <p style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 700, lineHeight: 1.45, color: "#eeeef8", marginBottom: "28px" }}>
                        {currentQ.question}
                      </p>

                      {/* Hint toggle */}
                      <button
                        onClick={() => setShowHint(h => !h)}
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 16px", cursor: "pointer", fontSize: "13px", color: "rgba(238,238,248,0.55)", width: "100%", textAlign: "left", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                      >
                        <span>💡 Coaching hint</span>
                        <span style={{ fontSize: "16px", transition: "transform 0.2s", transform: showHint ? "rotate(180deg)" : "none" }}>⌄</span>
                      </button>

                      <AnimatePresence>
                        {showHint && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden", marginBottom: "12px" }}
                          >
                            <div style={{ background: "rgba(255,153,0,0.06)", border: "1px solid rgba(255,153,0,0.15)", borderRadius: "12px", padding: "14px 16px" }}>
                              <p style={{ fontSize: "13px", color: "rgba(238,238,248,0.7)", lineHeight: 1.65, marginBottom: currentQ.framework ? "10px" : 0 }}>
                                {currentQ.hint}
                              </p>
                              {currentQ.framework && (
                                <p style={{ fontSize: "12px", color: "#FF9900", fontFamily: "var(--font-mono)", marginTop: "8px" }}>
                                  Framework: {currentQ.framework}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Rating buttons */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px", marginTop: "24px" }}>
                        {(Object.entries(ratingConfig) as [Rating, typeof ratingConfig[Rating]][]).map(([key, cfg]) => (
                          <button
                            key={key}
                            onClick={() => handleRate(key)}
                            style={{
                              padding: "14px",
                              borderRadius: "12px",
                              border: `1px solid ${cfg.color}33`,
                              background: cfg.bg,
                              color: cfg.color,
                              fontFamily: "var(--font-heading)",
                              fontWeight: 600,
                              fontSize: "14px",
                              cursor: "pointer",
                              transition: "transform 0.15s, box-shadow 0.15s",
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
                          >
                            {cfg.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {screen === "results" && (
                    <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                      <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div style={{ fontSize: "56px", fontFamily: "var(--font-heading)", fontWeight: 900, background: "linear-gradient(135deg,#FF9900,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                          {score}%
                        </div>
                        <p style={{ color: "rgba(238,238,248,0.5)", fontSize: "14px", marginTop: "4px" }}>
                          {score >= 80 ? "Strong performance — you're ready." : score >= 55 ? "Good start — review the struggled questions." : "More practice needed — focus on the LP frameworks."}
                        </p>
                      </div>

                      {/* Bar chart */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "32px" }}>
                        {(Object.entries(resultCounts) as [Rating, number][]).map(([key, count]) => {
                          const cfg = ratingConfig[key];
                          const barPct = Math.round((count / Math.max(sessionResults.length, 1)) * 100);
                          return (
                            <div key={key} style={{ textAlign: "center" }}>
                              <div style={{ height: "80px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", position: "relative", overflow: "hidden", marginBottom: "8px" }}>
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${barPct}%` }}
                                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                                  style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: cfg.color + "55", borderRadius: "8px 8px 0 0" }}
                                />
                                <span style={{ position: "absolute", bottom: "6px", left: 0, right: 0, textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "18px", color: cfg.color }}>
                                  {count}
                                </span>
                              </div>
                              <div style={{ fontSize: "11px", color: "rgba(238,238,248,0.4)", fontFamily: "var(--font-heading)" }}>{cfg.label}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Per-question breakdown */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {sessionResults.map((r, i) => {
                          const cfg = ratingConfig[r.rating];
                          return (
                            <div key={r.questionId} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(238,238,248,0.3)", minWidth: "20px", marginTop: "2px" }}>{i + 1}</span>
                              <p style={{ flex: 1, fontSize: "13px", color: "rgba(238,238,248,0.65)", lineHeight: 1.5 }}>{r.question}</p>
                              <span style={{ fontSize: "11px", color: cfg.color, background: cfg.bg, padding: "3px 9px", borderRadius: "100px", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                                {cfg.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                        <button
                          onClick={() => { setScreen("select"); setResults([]); setQIndex(0); }}
                          style={{ flex: 1, padding: "14px", borderRadius: "12px", background: "rgba(255,153,0,0.12)", border: "1px solid rgba(255,153,0,0.25)", color: "#FF9900", fontFamily: "var(--font-heading)", fontWeight: 700, cursor: "pointer", fontSize: "14px" }}
                        >
                          Practice Another Round
                        </button>
                        <button
                          onClick={handleClose}
                          style={{ padding: "14px 24px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(238,238,248,0.6)", fontFamily: "var(--font-heading)", fontWeight: 600, cursor: "pointer", fontSize: "14px" }}
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
