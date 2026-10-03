import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [label, setLabel] = useState("");

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px,${mouseY}px)`;
      }
    };

    function lerp(a: number, b: number, n: number) { return a + (b - a) * n; }

    function animate() {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px,${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    }
    animate();

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    // Interactive element effects
    const handleElEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const tag = el.tagName.toLowerCase();
      const isBtn = tag === "button" || tag === "a" || el.closest("button") || el.closest("a") || el.getAttribute("role") === "button";
      if (isBtn) {
        setHovered(true);
        const txt = el.getAttribute("data-cursor-label") || "";
        setLabel(txt);
      }
    };
    const handleElLeave = () => { setHovered(false); setLabel(""); };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", handleElEnter);
    document.addEventListener("mouseout", handleElLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", handleElEnter);
      document.removeEventListener("mouseout", handleElLeave);
    };
  }, []);

  const opacity = hidden ? 0 : 1;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "8px", height: "8px",
          marginLeft: "-4px", marginTop: "-4px",
          borderRadius: "50%",
          background: "#FF9900",
          pointerEvents: "none",
          zIndex: 99999,
          opacity,
          transform: "translate(-100px,-100px)",
          willChange: "transform",
          transition: "opacity 0.2s, transform 0.05s",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: hovered ? "54px" : "36px",
          height: hovered ? "54px" : "36px",
          marginLeft: hovered ? "-27px" : "-18px",
          marginTop: hovered ? "-27px" : "-18px",
          borderRadius: "50%",
          border: `1px solid rgba(255,153,0,${hovered ? 0.8 : 0.45})`,
          background: hovered ? "rgba(255,153,0,0.07)" : "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          opacity,
          transform: "translate(-100px,-100px)",
          willChange: "transform",
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), margin 0.3s cubic-bezier(0.22,1,0.36,1), border 0.3s, background 0.3s, opacity 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label && (
          <span style={{ fontSize: "9px", color: "#FF9900", fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            {label}
          </span>
        )}
      </div>
    </>
  );
}
