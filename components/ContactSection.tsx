"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, useInView } from "framer-motion";
import { siDiscord, siRoblox } from "simple-icons";

const socials = [
  { icon: siDiscord, label: "Discord",  href: "https://discord.com/users/1389454456873025618" },
  { icon: siRoblox,  label: "Roblox",   href: "https://www.roblox.com/user.aspx?username=benjaminhobart" },
];

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Box
      id="contact"
      component="section"
      ref={ref}
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 4,
        background: "#080808",
        borderRadius: "20px 20px 0 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 10vw",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Heading */}
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 8vw, 110px)",
            lineHeight: 0.9,
            color: "var(--text)",
            letterSpacing: "0.01em",
            mb: 2,
          }}
        >
          LET&apos;S WORK
          <br />
          <Box component="span" data-cursor-light sx={{ color: "var(--red)" }}>TOGETHER.</Box>
        </Typography>

        <Typography
          sx={{
            fontSize: "0.95rem",
            color: "rgba(237,232,227,0.4)",
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            mb: 6,
            letterSpacing: "0.02em",
          }}
        >
          Open for freelance projects, commissions, and collabs.
        </Typography>

        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mt: 8,
            pt: 4,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {socials.map(({ icon, label, href }) => (
            <Box
              key={label}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              sx={{
                color: "rgba(237,232,227,0.3)",
                "&:hover": { color: "var(--text)" },
                transition: "color 0.2s",
                display: "flex",
              }}
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                <path d={icon.path} />
              </svg>
            </Box>
          ))}

          <Box sx={{ flex: 1 }} />
        </Box>
      </motion.div>
    </Box>
  );
}

