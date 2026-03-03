"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero" },
  { id: "about" },
  { id: "work" },
  { id: "contact" },
];

export function Nav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: "5vw",
        py: 3,
        pointerEvents: "none",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ pointerEvents: "auto" }}
      >
        <Typography
          onClick={() => scrollTo("hero")}
          sx={{
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "var(--text)",
            "&:hover": { color: "var(--red)" },
            transition: "color 0.2s",
            textTransform: "uppercase",
          }}
        >
          Ben Hobart
        </Typography>
      </motion.div>

      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", pointerEvents: "auto" }}>
        {SECTIONS.map(({ id }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <Box
              onClick={() => scrollTo(id)}
              sx={{
                width: active === id ? 20 : 6,
                height: 2,
                borderRadius: 1,
                background: active === id ? "var(--red)" : "rgba(255,255,255,0.2)",
                transition: "width 0.3s, background 0.3s",
                "&:hover": { background: "rgba(255,255,255,0.5)" },
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
