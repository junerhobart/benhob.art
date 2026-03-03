"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, useInView } from "framer-motion";

const clips = [
  { id: "walk",   title: "Walk"   },
  { id: "run",    title: "Run"    },
  { id: "jump",   title: "Jump"   },
  { id: "crouch", title: "Crouch" },
  { id: "idle",   title: "Idle"   },
];

function AnimCard({ clip, i, inView }: { clip: (typeof clips)[0]; i: number; inView: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
      style={{ flex: 1, minWidth: 0 }}
    >
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          aspectRatio: "9/14",
          background: "#0f0f0f",
          border: "1px solid rgba(255,255,255,0.06)",
          transition: "border-color 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          "&:hover": {
            borderColor: "rgba(255,255,255,0.18)",
            transform: "translateY(-6px)",
            "& .card-label": { opacity: 1, transform: "translateY(0)" },
            "& .card-hint": { opacity: 0 },
          },
        }}
      >
        {/* Video — poster is the screenshot, src is the mp4 */}
        <Box
          component="video"
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={`/anims/${clip.id}.png`}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src={`/anims/${clip.id}.mp4`} type="video/mp4" />
        </Box>

        {/* Bottom gradient */}
        <Box sx={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />

        {/* Default dim title */}
        <Box
          className="card-hint"
          sx={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
        >
          <Typography sx={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 2.8vw, 38px)",
            color: "rgba(255,255,255,0.14)",
            letterSpacing: "0.08em",
            userSelect: "none",
          }}>
            {clip.title.toUpperCase()}
          </Typography>
        </Box>

        {/* Hover title */}
        <Box
          className="card-label"
          sx={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            p: 2, zIndex: 1,
            opacity: 0,
            transform: "translateY(8px)",
            transition: "opacity 0.28s, transform 0.28s",
            pointerEvents: "none",
          }}
        >
          <Typography sx={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            color: "#fff",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}>
            {clip.title.toUpperCase()}
          </Typography>
          <Typography sx={{
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.38)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.15em",
            mt: 0.5,
            textTransform: "uppercase",
          }}>
            Movement
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

export function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Box
      id="work"
      component="section"
      ref={ref}
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 3,
        background: "#080808",
        borderRadius: "20px 20px 0 0",
        display: "flex",
        flexDirection: "column",
        px: "4vw",
        pt: "13vh",
        pb: "5vh",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 3 }}>
          <Typography component="h2" sx={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            lineHeight: 1,
            color: "var(--text)",
            letterSpacing: "0.02em",
          }}>
            MOVEMENT
          </Typography>
          <Typography sx={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            Hover to preview
          </Typography>
        </Box>
      </motion.div>

      {/* Cards */}
      <Box sx={{ display: "flex", gap: 1.5, flex: 1, minHeight: 0 }}>
        {clips.map((clip, i) => (
          <AnimCard key={clip.id} clip={clip} i={i} inView={inView} />
        ))}
      </Box>
    </Box>
  );
}
