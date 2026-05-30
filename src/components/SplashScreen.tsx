"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const DURATION = 2800; // ms before hiding

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();

    // Progress ticker
    const tick = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const pct = Math.min(Math.round((elapsed / DURATION) * 100), 100);
      setProgress(pct);
    }, 30);

    // Hide after duration
    const hide = setTimeout(() => setVisible(false), DURATION + 400);

    return () => {
      clearInterval(tick);
      clearTimeout(hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#020c0a" }}
        >
          {/* ── Ambient background glows ── */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
          >
            {/* centre teal glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(81,184,171,0.18) 0%, transparent 70%)",
              }}
            />
            {/* subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(81,184,171,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(81,184,171,0.5) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            {/* corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#51B8AB]/30" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#51B8AB]/30" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#51B8AB]/30" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#51B8AB]/30" />
          </div>

          {/* ── Main content ── */}
          <div className="relative flex flex-col items-center gap-8 px-8">

            {/* Logo image — scales + fades in */}
            <motion.div
              initial={{ opacity: 0, scale: 0.72, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* outer ring pulse */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(81,184,171,0.35) 0%, transparent 68%)",
                }}
              />

              {/* logo */}
              <div className="relative w-[180px] h-[72px] md:w-[240px] md:h-[96px]">
                <Image
                  src="/assets/logo/corelyn robotics new.png"
                  alt="Corelyn Robotics"
                  fill
                  className="object-contain drop-shadow-[0_0_32px_rgba(81,184,171,0.45)]"
                  priority
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              className="text-[11px] md:text-[12px] font-bold tracking-[0.28em] uppercase text-[#51B8AB]/70 text-center"
            >
              Robotics-as-a-Service
            </motion.p>

            {/* Progress bar + counter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              className="w-[260px] md:w-[340px] flex flex-col items-end gap-2"
            >
              {/* percentage */}
              <span
                className="font-mono text-[13px] font-bold tabular-nums"
                style={{ color: "#51B8AB" }}
              >
                {progress.toString().padStart(3, "0")}%
              </span>

              {/* track */}
              <div className="relative w-full h-[3px] rounded-full overflow-hidden bg-white/10">
                {/* glow fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #2d9d8f, #51B8AB)",
                    boxShadow: "0 0 12px rgba(81,184,171,0.7)",
                    transition: "width 60ms linear",
                  }}
                />
              </div>

              {/* status text */}
              <motion.span
                key={progress < 40 ? "init" : progress < 80 ? "nav" : "ready"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-mono tracking-widest text-white/30 uppercase self-start"
              >
                {progress < 40
                  ? "Initialising systems…"
                  : progress < 80
                  ? "Calibrating navigation…"
                  : "Ready to deploy"}
              </motion.span>
            </motion.div>
          </div>

          {/* ── Bottom build label ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-8 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#51B8AB] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25">
              C100 · C100 4WD · C500 · C1000
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
