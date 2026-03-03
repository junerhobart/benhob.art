"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const radarSkills = [
  { label: "Gun",      value: 0.75 },
  { label: "Movement", value: 0.50 },
  { label: "Combat",   value: 0.60 },
  { label: "Cinematic",value: 0.40 },
  { label: "Rigging",  value: 0.15 },
  { label: "NPC",      value: 0.45 },
];

const bars = [
  {
    name: "Gun Animation", level: 75,
    subs: ["Reload  80", "ADS  75", "Shoot  70"],
  },
  {
    name: "Movement", level: 50,
    subs: ["Locomotion  55", "Parkour  45"],
  },
  {
    name: "Combat", level: 60,
    subs: ["Hit Reactions  65", "Combos  55"],
  },
  { name: "Cinematic", level: 40, subs: [] },
  { name: "Rigging",   level: 15, subs: [] },
];

const stats = [
  { value: "3+",   label: "Years" },
  { value: "200+", label: "Animations" },
];

function RadarChart({ inView }: { inView: boolean }) {
  const cx = 170, cy = 170, maxR = 130;
  const N = radarSkills.length;

  const pt = (i: number, r: number) => {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const rings = [0.25, 0.5, 0.75, 1];
  const ringPath = (r: number) => {
    const pts = Array.from({ length: N }, (_, i) => pt(i, r * maxR));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  };

  const skillPts = radarSkills.map((s, i) => pt(i, s.value * maxR));
  const skillPath = skillPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  const labelPts = radarSkills.map((s, i) => ({ ...pt(i, maxR + 24), label: s.label }));

  return (
    <svg viewBox="0 0 340 340" width="400" height="400" style={{ overflow: "visible" }}>
      {rings.map((r, i) => (
        <path key={i} d={ringPath(r)} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {radarSkills.map((_, i) => {
        const end = pt(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />;
      })}
      <motion.path
        d={skillPath}
        fill="rgba(212,22,12,0.13)"
        stroke="#d4160c"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />
      {skillPts.map((p, i) => (
        <motion.circle
          key={i} cx={p.x} cy={p.y} r={3.5} fill="#d4160c"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          transition={{ duration: 0.3, delay: 0.7 + i * 0.06 }}
        />
      ))}
      {labelPts.map((p, i) => (
        <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
          fill="rgba(255,255,255,0.28)" fontSize="11" fontFamily="var(--font-body)" letterSpacing="0.1em">
          {p.label.toUpperCase()}
        </text>
      ))}
    </svg>
  );
}

function SkillBar({ bar, i, inView }: { bar: (typeof bars)[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
    >
      <Box sx={{ mb: 1.75 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
          <Typography sx={{
            fontSize: "0.78rem", fontWeight: 500,
            color: "rgba(237,232,227,0.75)",
            fontFamily: "var(--font-body)", letterSpacing: "0.04em",
          }}>
            {bar.name}
          </Typography>
          <Typography sx={{ fontSize: "0.65rem", color: "rgba(237,232,227,0.25)", fontFamily: "var(--font-body)" }}>
            {bar.level}%
          </Typography>
        </Box>
        <Box sx={{ height: "6px", background: "rgba(255,255,255,0.07)", borderRadius: "99px", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", background: "#d4160c", borderRadius: "99px" }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${bar.level}%` } : { width: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        </Box>
      </Box>
    </motion.div>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Box
      id="about"
      component="section"
      ref={ref}
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 2,
        background: "#0a0a0a",
        borderRadius: "20px 20px 0 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 5vw",
        overflow: "hidden",
      }}
    >
      {/* Heading + stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 3.5 }}>
          <Typography component="h2" sx={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 0.9,
            color: "var(--text)",
            letterSpacing: "0.01em",
          }}>
            SKILLS
            <Box component="span" data-cursor-light sx={{ color: "var(--red)" }}>.</Box>
          </Typography>

          <Box sx={{ display: "flex", gap: "2.5vw" }}>
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <Typography sx={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.2vw, 32px)", lineHeight: 1, color: "var(--text)" }}>
                  {value}
                </Typography>
                <Typography sx={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "rgba(237,232,227,0.22)", fontFamily: "var(--font-body)", textTransform: "uppercase", mt: 0.25 }}>
                  {label}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </Box>
      </motion.div>

      {/* Radar + bars */}
      <Box sx={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: "4vw", alignItems: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <RadarChart inView={inView} />
        </Box>

        <Box>
          {bars.map((bar, i) => (
            <SkillBar key={bar.name} bar={bar} i={i} inView={inView} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
