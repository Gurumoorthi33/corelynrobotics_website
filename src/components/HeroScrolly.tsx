"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

const stats = [
  { value: "₹50/hr", label: "Starting rate" },
  { value: "4", label: "Robot platforms" },
  { value: "2,000 kg", label: "Max payload" },
];

export default function HeroScrolly() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Video background */}
      <div className="absolute inset-0">
        <video
          src="/assets/hero/hero bg new.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Background video showing autonomous robots in action"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(81,184,171,1) 1px, transparent 1px), linear-gradient(90deg, rgba(81,184,171,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Teal glow orb */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#51B8AB]/8 blur-[120px] pointer-events-none" />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/60 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 xs:px-5 md:px-12 lg:px-20 max-w-7xl mx-auto pt-[110px] md:pt-[140px] pb-16">

        <div className="max-w-2xl lg:max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#51B8AB] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#51B8AB]" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#7dd3cf] border border-[#51B8AB]/30 bg-[#51B8AB]/10 px-3 py-1 rounded-full backdrop-blur-sm">
              Robotics as a Service
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="font-heading font-bold text-[36px] xs:text-[40px] md:text-[62px] lg:text-[74px] leading-[1.04] tracking-tight text-white mb-6"
          >
            Autonomous Robots.
            <br />
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #51B8AB 0%, #7dd3cf 50%, #a5f3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Deployed as a Service.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[16px] md:text-[18px] text-white/75 max-w-xl leading-[1.8] mb-10"
          >
            Industrial-grade autonomous mobile robots for factories, warehouses, and logistics — on a subscription. No capital investment. No maintenance overhead. Just output.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col xs:flex-row gap-3.5 mb-14"
          >
            <a
              href="#platforms"
              className="group inline-flex items-center justify-center gap-2 bg-[#51B8AB] text-slate-950 px-7 py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#3FA89A] active:scale-95 transition-all shadow-[0_0_28px_rgba(81,184,171,0.45)] hover:shadow-[0_0_40px_rgba(81,184,171,0.6)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Explore Platforms
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-xl font-bold text-[15px] hover:bg-white/10 hover:border-white/45 active:scale-95 transition-all backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/40 group-hover:border-white/70 transition-colors">
                <Play size={8} fill="currentColor" />
              </span>
              Get a Deployment Quote
            </a>
          </motion.div>

          {/* Stats row — glassmorphism cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.72 + i * 0.07 }}
                className="flex flex-col items-start px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-[#51B8AB]/40 transition-all"
              >
                <span className="font-heading font-bold text-[20px] text-white leading-none">{s.value}</span>
                <span className="text-[11px] text-white/45 mt-1 uppercase tracking-wider">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-white/30" />
        </motion.div>
      </motion.div>

    </section>
  );
}
