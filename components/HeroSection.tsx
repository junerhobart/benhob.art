"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 1,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center" }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(80px, 20vw, 240px)",
            lineHeight: 0.82,
            color: "var(--text)",
            letterSpacing: "0.01em",
          }}
        >
          BEN
        </Typography>

          <Typography
            component="h1"
            data-cursor-light
            sx={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(80px, 20vw, 240px)",
              lineHeight: 0.82,
              color: "var(--red)",
              letterSpacing: "0.01em",
            }}
          >
            HOBART.
          </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Typography
            sx={{
              mt: 4,
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              color: "var(--text-dim)",
              fontFamily: "var(--font-body)",
              textTransform: "uppercase",
            }}
          >
            Roblox Animator
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
}
