import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./ImageWithFallback";
import { LucideIcon, Rocket, Globe, Database, Terminal, FileText, Linkedin, Github, Mail, X, Snowflake, Code, Cloud } from "lucide-react";
import networkDoctorLogo from "../../assets/ndr_logo.png";
import mongodbLogo from "../../assets/m2.png";
import armLogo from "../../assets/army.png";

interface TechIcon {
  name: string;
  Icon: LucideIcon;
  color: string;
}

interface ProjectProps {
  title: string;
  category: string;
  image: string;
  icon: LucideIcon;
  description?: string;
  technologies?: TechIcon[];
  githubUrl?: string;
  onClick?: () => void;
}

function TechSphere({ tech, delay = 0 }: { tech: TechIcon; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      title={tech.name}
      role="img"
      aria-label={tech.name}
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), ${tech.color}40, #000 90%)`,
        border: `1px solid ${tech.color}80`,
        boxShadow: `0 0 20px ${tech.color}40, inset 0 0 15px rgba(255,255,255,0.3)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: "help",
      }}
      whileHover={{ 
        scale: 1.15, 
        rotate: 360,
        boxShadow: `0 0 30px ${tech.color}80, inset 0 0 20px rgba(255,255,255,0.5)`,
      }}
    >
      <tech.Icon size={24} color={tech.color} aria-hidden="true" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }} />
    </motion.div>
  );
}

function ProjectCard({ title, category, image, icon: Icon, description, onClick }: ProjectProps) {
  return (
    <motion.article
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); } }}
      tabIndex={0}
      role="button"
      aria-label={`View project: ${title}`}
      whileHover={{ scale: 1.02, y: -5 }}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(251, 146, 60, 0.15)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.15)";
      }}
    >
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <ImageWithFallback
          src={image}
          alt={`${title} project screenshot`}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #020817, transparent)" }} />
        <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <div aria-hidden="true" style={{ background: "rgba(251, 146, 60, 0.2)", borderRadius: "50%", padding: 6, display: "flex" }}>
            <Icon size={14} color="#fb923c" />
          </div>
          <span style={{ fontSize: 15, color: "#fb923c", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {category}
          </span>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ fontSize: 23, fontWeight: 300, letterSpacing: "0.05em", color: "white", marginBottom: 8 }}>
          {title}
        </h3>
        <p style={{ fontSize: 18, color: "rgba(255, 255, 255, 0.4)", lineHeight: 1.6 }}>
          {description || "Advanced systems architecture and orbital logistics for deep space operations."}
        </p>
      </div>
    </motion.article>
  );
}

function ExperienceCard({ role, companyLogo, companyName, date, description, color }: {
  role: string, companyLogo: string, companyName: string, date: string, description: string, color: string
}) {
  const descriptionLines = description.split(" - ").filter(line => line.trim() !== "");

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -5 }}
      aria-label={`${role} at ${companyName}`}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(251, 146, 60, 0.15)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.15)";
      }}
    >
      <div style={{ position: "relative", height: 100, background: `linear-gradient(135deg, ${color}, ${color}cc, ${color}60)`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <ImageWithFallback
          src={companyLogo}
          alt={`${companyName} logo`}
          style={{ width: 210, height: 80, objectFit: "contain", zIndex: 1, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #02081780, transparent 50%)" }} />
      </div>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", height: "100%", minHeight: 140 }}>
        <div style={{ fontSize: 19, color: "#ffffffba", lineHeight: 1.6, flexGrow: 1, marginBottom: 16 }}>
          {descriptionLines.map((line, i) => (
            <p key={i} style={{ marginBottom: i < descriptionLines.length - 1 ? 8 : 0 }}>
              {line.trim()}
            </p>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 8 }}>
          <h4 style={{ fontSize: 19, fontWeight: 500, color: "#fb923c", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {role}
          </h4>
          <time style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>
            {date}
          </time>
        </div>
      </div>
    </motion.article>
  );
}

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const projects: ProjectProps[] = [
    { 
      title: "Nebula Core", 
      category: "Engine", 
      icon: Rocket, 
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1080&auto=format&fit=crop",
      description: "Advanced Python-based propulsion modeling engine integrated directly into a resilient Snowflake data lake. Built to process over 1 million telemetry records per second with microsecond latency.",
      githubUrl: "https://github.com/Waybo26/nebula-core",
      technologies: [
        { name: "Python", Icon: Code, color: "#3b82f6" },
        { name: "Snowflake", Icon: Snowflake, color: "#38bdf8" },
        { name: "MongoDB", Icon: Database, color: "#22c55e" }
      ]
    },
    { 
      title: "Atlas Hub", 
      category: "Logistics", 
      icon: Globe, 
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1080&auto=format&fit=crop",
      description: "A centralized supply chain visibility platform serving deep space outposts. Leverages real-time streaming to predict resource bottlenecks using distributed AWS services.",
      githubUrl: "https://github.com/Waybo26/atlas-hub",
      technologies: [
        { name: "TypeScript", Icon: Terminal, color: "#3178c6" },
        { name: "AWS Cloud", Icon: Cloud, color: "#f59e0b" },
        { name: "MongoDB", Icon: Database, color: "#22c55e" }
      ]
    },
  ];

  const experiences = [
    {
      role: "Jr Systems Engineer",
      companyName: "Network Doctor",
      date: "2025 - PRESENT",
      color: "#df120b",
      companyLogo: networkDoctorLogo,
      description: "- Working on Project Team - - As Jr Systems Engineer, I engineered resilient telemetry pipelines and autonomous control stacks to keep mission-critical navigation systems online across hostile environments - - Automate incident response workflows by developing Python scripts to analyze network logs and system metrics"
    },
    {
      role: "Software Engineer Intern",
      companyName: "MongoDB",
      date: "2024 - 2025",
      color: "#47a248",
      companyLogo: mongodbLogo,
      description: "- Working on Query Optimization Team (2024) and Atlas Stream Processing Team (2025) - - As Software Engineer Intern, I shipped hardened data orchestration tools and observability dashboards for telemetry analysts working on distributed spacecraft fleets - - Developed numerous integration and unit test suites in JavaScript to stress-test database querying operations, focusing on workload scalability and future command integration"
    },
    {
      role: "Hardware Engineering Intern",
      companyName: "ARM",
      date: "Summer 2023",
      color: "#15d9f3",
      companyLogo: armLogo,
      description: "- Working on Power Team (2023) - As Hardware Engineering Intern, I validated embedded control nodes and telemetry signal paths that keep mission launch systems synchronized under extreme vibration - Developed efficient Python scripts to reformat mesh interconnect power readings into numerical data reports, significantly reducing manual calculation time for numerous team members"
    }
  ];

  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", paddingBottom: 100 }}>
      {/* Experience Section */}
      <section aria-label="Work experience">
        <motion.div 
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginBottom: 64, marginTop: 120, scrollMarginTop: 120 }}
        >
          <p style={{ color: "#fb923c", letterSpacing: "0.4em", fontSize: 17, marginBottom: 16, fontWeight: 600 }}>
            MISSION HISTORY
          </p>
          <h2 style={{ fontSize: 47, fontWeight: 300, letterSpacing: "0.1em", marginBottom: 16 }}>
            EXPERIENCE
          </h2>
          <div aria-hidden="true" style={{ width: 40, height: 2, background: "#fb923c", margin: "0 auto 24px" }} />
        </motion.div>

        {/* Experience Grid - wider than main content */}
        <div style={{
          width: "100vw",
          maxWidth: 1600,
          marginLeft: "50%",
          transform: "translateX(-50%)",
        }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: 32,
            padding: "0 20px"
          }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              >
                <ExperienceCard {...exp} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section aria-label="Projects">
        <motion.div 
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{ textAlign: "center", marginBottom: 64, marginTop: 120, scrollMarginTop: 120 }}
        >
          <p style={{ color: "#fb923c", letterSpacing: "0.4em", fontSize: 17, marginBottom: 16, fontWeight: 600 }}>
            ORBITAL ARCHIVE // 2026
          </p>
          <h2 style={{ fontSize: 47, fontWeight: 300, letterSpacing: "0.1em", marginBottom: 16 }}>
            PROJECTS
          </h2>
          <div aria-hidden="true" style={{ width: 40, height: 2, background: "#fb923c", margin: "0 auto 24px" }} />
        </motion.div>

        {/* Projects Grid - wider like experience */}
        <div style={{
          width: "100vw",
          maxWidth: 1400,
          marginLeft: "50%",
          transform: "translateX(-50%)",
        }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: 40,
            padding: "0 20px"
          }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              >
                <ProjectCard {...p} onClick={() => setSelectedProject(p)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section aria-label="Contact information">
        <motion.div 
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginBottom: 64, marginTop: 160, scrollMarginTop: 120 }}
        >
          <p style={{ color: "#fb923c", letterSpacing: "0.4em", fontSize: 17, marginBottom: 16, fontWeight: 600 }}>
            COMMUNICATIONS
          </p>
          <h2 style={{ fontSize: 47, fontWeight: 300, letterSpacing: "0.1em", marginBottom: 16 }}>
            GET IN TOUCH
          </h2>
          <div aria-hidden="true" style={{ width: 40, height: 2, background: "#fb923c", margin: "0 auto 24px" }} />
          <p style={{ color: "#ffffffba", fontSize: 19, maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
            Thank you for visiting my site! If you would like to work together or simply want to chat, feel free to contact me!
          </p>
          
          <nav aria-label="Social links" style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 48 }}>
            {[
              { icon: FileText, href: "https://drive.google.com/file/d/1W2btklx21zpJXtx0n9IjxTGe7QfrLrHk/view?usp=sharing", label: "Resume" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/wesley-nabo/", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/Waybo26", label: "GitHub" },
              { icon: Mail, href: "mailto:wnabo@stevens.edu", label: "Email" },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.175)", color: "#fff", borderColor: "#fff" }}
                whileTap={{ scale: 0.95, backgroundColor: "rgba(255, 255, 255, 0.35)", color: "#fff" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "#ffffffba",
                  transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease",
                  textDecoration: "none",
                  position: "relative"
                }}
              >
                <link.icon size={24} strokeWidth={1.5} aria-hidden="true" />
              </motion.a>
            ))}
          </nav>
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ marginTop: 80, textAlign: "center", opacity: 0.3 }}
        >
          <p style={{ fontSize: 15, letterSpacing: "0.2em", color: "#ffffffba" }}>
            ESTABLISHED IN THE FRONTIER // MISSION SECTOR 07
          </p>
        </motion.div>
      </footer>

      {/* Project Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} project details`}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(2, 8, 23, 0.9)",
              backdropFilter: "blur(12px)",
              padding: 24,
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#0f172a",
                border: "1px solid rgba(251, 146, 60, 0.3)",
                borderRadius: 16,
                width: "100%",
                maxWidth: 900,
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(251, 146, 60, 0.1)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ef4444";
                  e.currentTarget.style.borderColor = "#ef4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.5)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <X size={20} aria-hidden="true" />
              </button>

              {/* Full Screen Picture Area */}
              <div style={{ position: "relative", width: "100%", height: "45vh", minHeight: 300 }}>
                <ImageWithFallback
                  src={selectedProject.image}
                  alt={`${selectedProject.title} project`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0f172a, transparent 80%)" }} />
              </div>

              {/* Content Area */}
              <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: 32 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <selectedProject.icon size={28} color="#fb923c" aria-hidden="true" />
                    <h2 style={{ fontSize: 41, fontWeight: 700, letterSpacing: "0.05em", color: "white" }}>
                      {selectedProject.title}
                    </h2>
                  </div>
                  <p style={{ color: "#fb923c", letterSpacing: "0.2em", fontSize: 17, fontWeight: 600, textTransform: "uppercase" }}>
                    {selectedProject.category} // MISSION LOG
                  </p>
                </div>

                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 21, lineHeight: 1.8, maxWidth: 700 }}>
                  {selectedProject.description}
                </p>

                {/* Technologies Sphere Area */}
                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: 19, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                      Tech Stack Deployed
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
                      {selectedProject.technologies.map((tech, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                          <TechSphere tech={tech} delay={0.2 + i * 0.1} />
                          <span style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", fontFamily: "ui-monospace, monospace", letterSpacing: "0.05em" }}>
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Github Link */}
                {selectedProject.githubUrl && (
                  <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "flex-end" }}>
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${selectedProject.title} source code on GitHub`}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 146, 60, 0.15)", borderColor: "#fb923c" }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 24px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 8,
                        color: "white",
                        textDecoration: "none",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <Github size={20} aria-hidden="true" />
                      View Source
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
