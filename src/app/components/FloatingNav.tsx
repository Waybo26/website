import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > prevScroll && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setPrevScroll(latest);
  });

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={hidden ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 32,
        left: 32,
        zIndex: 50,
        display: "flex",
        gap: "24px",
        fontFamily: "ui-monospace, monospace",
        textTransform: "uppercase",
        fontSize: "17px",
        letterSpacing: "0.15em",
        background: "rgba(2, 8, 23, 0.4)",
        backdropFilter: "blur(8px)",
        padding: "16px 24px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {["Intro", "Experience", "Projects", "Contact"].map((item) => (
        <motion.a
          key={item}
          href={`#${item.toLowerCase()}`}
          whileHover={{ color: "#fb923c" }}
          style={{
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 600,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            transition: "color 0.2s ease",
          }}
        >
          {item}
        </motion.a>
      ))}
    </motion.nav>
  );
}
