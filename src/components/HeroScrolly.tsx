"use client";

import { motion } from "framer-motion";

export default function HeroScrolly() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* Background video */}
      <video
        src="/assets/hero/hero bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark grey overlay with gradient - darker on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-[#0A0A0A]/85 to-[#000000]/95" />

      {/* Green glow bottom */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#51B8AB]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#51B8AB] to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32">
        <div className="max-w-3xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px w-8 bg-[#51B8AB]" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#51B8AB]">
              Robotics as a Service
            </span>
            <div className="h-px w-8 bg-[#51B8AB]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading font-bold text-[42px] md:text-[64px] lg:text-[76px] leading-[1.05] tracking-tight text-white mb-6"
          >
            Autonomous Robots.
            <br />
            <span className="text-[#51B8AB]">Deployed as a Service.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[17px] md:text-[19px] text-white/95 max-w-xl leading-[1.75] mb-10 mx-auto"
          >
            Industrial-grade autonomous mobile robots for factories, warehouses, and logistics — on a subscription. No capital investment. No maintenance overhead. Just output.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center">
            <a
              href="#platforms"
              className="bg-[#51B8AB] text-white px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-[#3FA89A] transition-colors shadow-[0_0_24px_rgba(81,184,171,0.4)] hover:shadow-[0_0_32px_rgba(81,184,171,0.55)]"
            >
              Explore Platforms
            </a>
            <a
              href="#contact"
              className="border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
            >
              Get a Deployment Quote
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20 justify-center">
            {[
              { value: "₹500/hr", label: "Starting rate" },
              { value: "4", label: "Robot platforms" },
              { value: "1,000 kg", label: "Max payload" },
              { value: "₹0", label: "Upfront capital" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-heading font-bold text-[22px] text-white leading-none">{s.value}</span>
                <span className="text-[12px] text-white/50 mt-1 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
