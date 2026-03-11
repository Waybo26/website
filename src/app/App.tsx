import { useState } from "react";
import { motion } from "motion/react";
import { SpaceLoader } from "./components/SpaceLoader";
import { Portfolio } from "./components/Portfolio";
import { FloatingNav } from "./components/FloatingNav";
import { ImageWithFallback } from "./components/ImageWithFallback";
import { Code, Terminal, Database, Cloud, Radio, Braces, Atom, Container, GitBranch, Binary, Usb } from "lucide-react";
import bgImage from "../assets/space.png";
import profileImg from "../assets/blankk_headshot.jpg";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="size-full min-h-screen"
      style={{ background: "#020817", overflowX: "hidden" }}
    >
      {/* Skip to main content link for screen readers */}
      <a href="#intro" className="skip-link">
        Skip to main content
      </a>

      {/* Background Image */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "200%",
          height: "200%",
          backgroundColor: "#020817",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "150%",
          animation: "moveStars 200s linear infinite",
          opacity: loaded ? 0.5 : 0,
          transition: "opacity 3s ease",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Nebula Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, rgba(2, 8, 23, 0.9) 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Loading screen */}
      {!loaded && (
        <SpaceLoader
          duration={5000}
          onComplete={() => setLoaded(true)}
        />
      )}

      {/* Main site content */}
      {loaded && <FloatingNav />}
      <main
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded
            ? "translateY(0)"
            : "translateY(40px)",
          transition:
            "opacity 2s ease 0.5s, transform 2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
          minHeight: "100vh",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 64,
          fontFamily: "ui-monospace, monospace",
          padding: "100px 24px 24px",
          position: "relative",
          zIndex: 1,
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {/* Mission Status */}
        <p
          style={{
            color: "#fb923c",
            letterSpacing: "0.5em",
            fontSize: 19,
            fontWeight: 600,
            textAlign: "center",
          }}
          aria-label="Current status: Finishing up school"
        >
          MISSION STATUS: FINISHING UP SCHOOL
        </p>

        {/* Intro Hero */}
        <section id="intro" aria-label="Introduction" style={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          gap: 16, 
          maxWidth: 1100, 
          width: "100%",
          scrollMarginTop: 120,
        }}>
          {/* Name - Centered */}
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(34px, 18vw, 105px)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textShadow: "0 0 40px rgba(251, 146, 60, 0.3)",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            WESLEY NABO
          </h1>

          {/* Float layout: image floats left, text wraps around */}
          <div style={{ maxWidth: 1100, width: "100%", marginTop: 16 }}>
            {/* Floating left column: image only */}
            <div style={{ float: "left", marginRight: 40, marginBottom: 16 }}>
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.05,
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{
                  width: 340,
                  height: 340,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(251, 146, 60, 0.4)",
                  boxShadow: "0 0 30px rgba(251, 146, 60, 0.15)",
                  flexShrink: 0,
                  cursor: "crosshair"
                }}
              >
                <ImageWithFallback 
                  src={profileImg} 
                  alt="Wesley Nabo - Portrait photo" 
                  style={{ width: "120%", height: "120%", objectFit: "cover", filter: "brightness(0.65)" }} 
                />
              </motion.div>
            </div>

            {/* Text that wraps around the floated image */}
            <div style={{
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.05em",
              lineHeight: 2,
              fontSize: 19,
            }}>
              <p>
                Welcome! My name is Wesley Nabo and I'm currently a 5/5 CS + CPE student at Stevens Institute of Technology.
                I've been coding for around 4 years now and while I've still got a lot to learn, I've built up experience in numerous areas.
                With prior experience in hardware and software engineering, I'm interested in Backend/Fullstack development, AI engineering, Data Engineering, Embedded Programming, Cloud Computing roles.
                As i continue to expand, I'm actively seeking new opportunities to grow and collaborate with like-minded individuals.
              </p>

              {/* Skills Section */}
              <div style={{ margin: "28px 0", textAlign: "center" }} role="region" aria-label="Technical skills">

                {/* All subsections side by side in one row */}
                <div style={{ display: "flex", gap: 40, flexWrap: "nowrap", justifyContent: "center", alignItems: "flex-start" }}>
                  {/* Programming */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", marginBottom: 12, textTransform: "uppercase", fontFamily: "ui-monospace, monospace" }}>Programming</p>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                      {[
                        { icon: Code, label: "Python", color: "#3b82f6" },
                        { icon: Terminal, label: "JS", color: "#eab308" },
                        { icon: Braces, label: "C++", color: "#9b59b6" },
                        { icon: Atom, label: "React", color: "#61dafb" },
                        { icon: Database, label: "SQL", color: "#22c55e" },
                      ].map((tech, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.15 }}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
                          title={tech.label}
                        >
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "center",
                            width: 42, height: 42, borderRadius: "50%",
                            border: `1px solid ${tech.color}60`, color: tech.color,
                            transition: "border-color 0.2s ease",
                          }} aria-hidden="true">
                            <tech.icon size={18} strokeWidth={1.5} />
                          </div>
                          <span style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", fontFamily: "ui-monospace, monospace" }}>
                            {tech.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tools */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", marginBottom: 12, textTransform: "uppercase", fontFamily: "ui-monospace, monospace" }}>Tools</p>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                      {[
                        { icon: Cloud, label: "AWS", color: "#f59e0b" },
                        { icon: Database, label: "MongoDB", color: "#47a248" },
                        { icon: Container, label: "Docker", color: "#2496ed" },
                        { icon: GitBranch, label: "Git", color: "#f97316" },
                      ].map((tech, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.15 }}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
                          title={tech.label}
                        >
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "center",
                            width: 42, height: 42, borderRadius: "50%",
                            border: `1px solid ${tech.color}60`, color: tech.color,
                            transition: "border-color 0.2s ease",
                          }} aria-hidden="true">
                            <tech.icon size={18} strokeWidth={1.5} />
                          </div>
                          <span style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", fontFamily: "ui-monospace, monospace" }}>
                            {tech.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hardware */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", marginBottom: 12, textTransform: "uppercase", fontFamily: "ui-monospace, monospace" }}>Hardware</p>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                      {[
                        { icon: Binary, label: "Assembly", color: "#ef4444" },
                        { icon: Usb, label: "Arduino", color: "#00979d" },
                        { icon: Radio, label: "Embedded", color: "#ec4899" },
                      ].map((tech, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.15 }}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
                          title={tech.label}
                        >
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "center",
                            width: 42, height: 42, borderRadius: "50%",
                            border: `1px solid ${tech.color}60`, color: tech.color,
                            transition: "border-color 0.2s ease",
                          }} aria-hidden="true">
                            <tech.icon size={18} strokeWidth={1.5} />
                          </div>
                          <span style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", fontFamily: "ui-monospace, monospace" }}>
                            {tech.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Clear float */}
            <div style={{ clear: "both" }} />
          </div>
        </section>

        {/* Portfolio Content */}
        {loaded && <Portfolio />}

        <button
          onClick={() => {
            setLoaded(false);
          }}
          style={{
            marginTop: 48,
            padding: "14px 40px",
            background: "rgba(251, 146, 60, 0.05)",
            border: "1px solid rgba(251, 146, 60, 0.4)",
            color: "#fb923c",
            letterSpacing: "0.3em",
            fontSize: 16,
            cursor: "pointer",
            fontFamily: "ui-monospace, monospace",
            textTransform: "uppercase",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "2px",
            marginBottom: 100,
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.background = "rgba(251, 146, 60, 0.15)";
            btn.style.borderColor = "#fb923c";
            btn.style.boxShadow =
              "0 0 20px rgba(251, 146, 60, 0.2)";
            btn.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.background = "rgba(251, 146, 60, 0.05)";
            btn.style.borderColor = "rgba(251, 146, 60, 0.4)";
            btn.style.boxShadow = "none";
            btn.style.transform = "scale(1)";
          }}
          aria-label="Replay loading animation"
        >
          Re-Initialize Uplink
        </button>
      </main>
    </div>
  );
}
