"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Zap, Weight, Gauge, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";

const platforms = [
  {
    id: "C100",
    tag: "Research & Sorting",
    color: "#51B8AB",
    image: "/assets/products/c100.png",
    name: "Compact Sorter & Research Platform",
    headline: "Built for labs, sorting lines, and R&D floors.",
    description:
      "A lightweight autonomous platform that moves material between stations without a worker. ROS-ready out of the box — deploy in a lab or a live sorting line with the same hardware.",
    specs: {
      payload: "Low payload class",
      payloadBar: 10,
      drive: "Differential drive",
      speed: "Up to 1.2 m/s",
      nav: "SLAM + obstacle avoidance",
    },
    tags: ["ROS-ready", "Compact footprint", "Sensor integration", "Education"],
    bestFor: ["Sorting lines", "Robotics education", "R&D prototyping"],
    keyStats: [
      { value: "1.2 m/s", label: "Max Speed" },
      { value: "ROS 2", label: "Stack" },
      { value: "SLAM", label: "Navigation" },
    ],
  },
  {
    id: "C100 4WD",
    tag: "Outdoor Inspection",
    color: "#3d9e91",
    image: "/assets/products/c100-4wd.png",
    name: "Outdoor Inspection Robot",
    headline: "Goes where conventional AMRs cannot.",
    description:
      "All-terrain four-wheel drive platform engineered for outdoor surveillance, perimeter patrol, and field inspection. Camera-ready, weather-resistant, deployable on uneven ground.",
    specs: {
      payload: "Low payload class",
      payloadBar: 12,
      drive: "4WD off-road",
      speed: "Up to 1.5 m/s",
      nav: "GPS + SLAM hybrid",
    },
    tags: ["All-terrain", "Camera integration", "Outdoor rated", "4WD"],
    bestFor: ["Perimeter inspection", "Surveillance", "Agriculture", "Defence"],
    keyStats: [
      { value: "1.5 m/s", label: "Max Speed" },
      { value: "4WD", label: "Drive" },
      { value: "GPS+SLAM", label: "Navigation" },
    ],
  },
  {
    id: "C500",
    tag: "Industrial AMR",
    color: "#2d9d8f",
    image: "/assets/products/c500.png",
    name: "Industrial Lifter-Tugger AMR",
    headline: "Moves 500 kg between stations. Every shift.",
    description:
      "Purpose-built for in-plant logistics. Heavy-duty chassis with autonomous navigation delivers consistent throughput across single and multi-shift operations — no driver required.",
    specs: {
      payload: "500 kg",
      payloadBar: 50,
      drive: "Differential, high-torque",
      speed: "Up to 1.0 m/s",
      nav: "LiDAR SLAM",
    },
    tags: ["500 kg payload", "Multi-shift", "High-torque", "Auto components"],
    bestFor: ["In-plant logistics", "Material handling", "Auto components"],
    keyStats: [
      { value: "500 kg", label: "Payload" },
      { value: "20 hrs", label: "Duty Cycle" },
      { value: "LiDAR", label: "Navigation" },
    ],
  },
  {
    id: "C1000",
    tag: "Heavy Industry",
    color: "#1e7a6e",
    image: "/assets/products/c1000.png",
    name: "Heavy Lifter-Tugger AMR",
    headline: "1,000 kg. Continuous duty. No compromise.",
    description:
      "Corelyn's highest-capacity platform. Reinforced industrial frame and long-duty-cycle design for demanding environments — heavy manufacturing, cold chain, mining, and large-scale warehousing.",
    specs: {
      payload: "1,000 kg",
      payloadBar: 100,
      drive: "High-torque reinforced",
      speed: "Up to 0.8 m/s",
      nav: "LiDAR SLAM + safety zones",
    },
    tags: ["1,000 kg payload", "Continuous duty", "Reinforced frame", "Cold chain"],
    bestFor: ["Heavy manufacturing", "Warehousing", "Mining", "Cold chain"],
    keyStats: [
      { value: "1,000 kg", label: "Payload" },
      { value: "Reinforced", label: "Frame" },
      { value: "Safety Zones", label: "Navigation" },
    ],
  },
];

export default function Platforms() {
  const [active, setActive] = useState(0);
  const platform = platforms[active];

  return (
    <section id="platforms" className="bg-white py-24 md:py-32 overflow-hidden relative border-y border-slate-200/80">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#51B8AB]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#e8f7f5] border border-[#51B8AB]/30 rounded-full px-5 py-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#51B8AB] animate-pulse" />
            <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#2d9d8f]">
              Robot Platforms
            </span>
          </motion.div>

          <h2 className="font-heading font-bold text-[28px] md:text-[56px] lg:text-[76px] leading-[1.05] text-slate-900 mb-5">
            <span className="text-[#2d9d8f]">Four</span> Platforms.
            <br />
            <span className="text-slate-400">Every</span> Industrial <span className="text-[#2d9d8f]">Need</span>.
          </h2>

          <p className="text-[15px] md:text-[20px] text-slate-500 leading-[1.75] max-w-2xl mx-auto">
            From <span className="text-slate-800 font-semibold">compact lab sorters</span> to{" "}
            <span className="text-slate-800 font-semibold">1,000 kg heavy tuggers</span> — one subscription model across all platforms.
          </p>
        </motion.div>

        {/* ── Platform Selector Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-8"
        >
          {platforms.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`group relative text-left p-3 md:p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                active === i
                  ? "border-[#51B8AB] bg-[#e8f7f5] shadow-[0_4px_20px_rgba(81,184,171,0.18)]"
                  : "border-slate-200 bg-white hover:border-[#51B8AB]/40 hover:bg-slate-50"
              }`}
            >
              {/* Active indicator bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 ${
                  active === i ? "bg-[#51B8AB]" : "bg-transparent"
                }`}
              />

              <div className={`text-[9px] md:text-[10px] font-bold tracking-[0.12em] uppercase mb-1.5 transition-colors ${
                active === i ? "text-[#2d9d8f]" : "text-slate-400"
              }`}>
                {p.tag}
              </div>
              <div className={`font-heading font-bold text-[15px] md:text-[22px] leading-none mb-1 transition-colors ${
                active === i ? "text-slate-900" : "text-slate-700"
              }`}>
                {p.id}
              </div>
              <div className={`text-[12px] font-medium transition-colors ${
                active === i ? "text-[#2d9d8f]" : "text-slate-500"
              }`}>
                {p.specs.payload}
              </div>

              {/* Payload bar */}
              <div className={`mt-3 h-1 rounded-full overflow-hidden ${active === i ? "bg-[#51B8AB]/20" : "bg-slate-200"}`}>
                <motion.div
                  className="h-full bg-[#51B8AB] rounded-full"
                  initial={false}
                  animate={{ width: active === i ? `${p.specs.payloadBar}%` : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </button>
          ))}
        </motion.div>

        {/* ── Main Platform Card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_20px_60px_rgba(15,23,42,0.09)] bg-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

              {/* ── Left: Image Panel ── */}
              <a
                href="/platforms"
                className="group/img relative bg-slate-950 aspect-[4/3] lg:aspect-auto lg:min-h-[580px] overflow-hidden block"
              >
                <Image
                  src={platform.image}
                  alt={platform.name}
                  fill
                  className="object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-[1.04] transition-all duration-700 ease-out"
                  priority
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl">
                    <span className="font-heading font-bold text-[20px] tracking-wider">{platform.id}</span>
                  </div>
                  <div className="bg-[#51B8AB]/90 backdrop-blur-md text-slate-950 px-3 py-1.5 rounded-xl">
                    <span className="text-[11px] font-bold tracking-wider uppercase">{platform.tag}</span>
                  </div>
                </div>

                {/* Key stats row — mid panel */}
                <div className="absolute left-5 right-5 bottom-[88px] flex gap-3">
                  {platform.keyStats.map((s, i) => (
                    <div key={i} className="flex-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 text-center">
                      <p className="font-heading font-bold text-white text-[15px] leading-none mb-0.5">{s.value}</p>
                      <p className="text-white/55 text-[10px] uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA strip */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-center justify-between border-t border-white/10">
                  <p className="text-white/70 text-[13px] font-medium">View full specifications</p>
                  <span className="inline-flex items-center gap-1.5 text-[#51B8AB] text-[13px] font-bold group-hover/img:gap-2.5 transition-all duration-300">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>

              {/* ── Right: Content Panel ── */}
              <div className="flex flex-col p-5 md:p-8 lg:p-12 bg-white">

                {/* Platform name + headline */}
                <div className="mb-5 pb-5 border-b border-slate-100">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#51B8AB] mb-2">
                    {platform.tag}
                  </p>
                  <h3 className="font-heading font-bold text-[20px] md:text-[28px] text-slate-900 leading-[1.15] mb-3">
                    {platform.name}
                  </h3>
                  <p className="text-[15px] text-slate-500 leading-[1.7]">
                    {platform.description}
                  </p>
                </div>

                {/* Spec Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-5">
                  <SpecTile icon={<Weight className="w-4 h-4" />} label="Payload" value={platform.specs.payload} />
                  <SpecTile icon={<Zap className="w-4 h-4" />} label="Drive" value={platform.specs.drive} />
                  <SpecTile icon={<Gauge className="w-4 h-4" />} label="Max Speed" value={platform.specs.speed} />
                  <SpecTile icon={<MapPin className="w-4 h-4" />} label="Navigation" value={platform.specs.nav} />
                </div>

                {/* Payload capacity bar */}
                <div className="mb-5 p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400">Payload Capacity</span>
                    <span className="text-[13px] font-bold text-slate-900">{platform.specs.payload}</span>
                  </div>
                  <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #51B8AB, #2d9d8f)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${platform.specs.payloadBar}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                    <span>Light</span>
                    <span>1,000 kg max</span>
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-4">
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-3">Best Deployed In</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.bestFor.map((use) => (
                      <span
                        key={use}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#51B8AB]" />
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {platform.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold tracking-wide bg-[#e8f7f5] text-[#2d9d8f] border border-[#51B8AB]/20 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <a
                    href="/platforms"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-slate-800 active:scale-[0.98] transition-all"
                  >
                    View Platform <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 inline-flex items-center justify-center bg-[#51B8AB] text-slate-950 py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#3FA89A] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(81,184,171,0.25)]"
                  >
                    Get a Quote
                  </a>
                  <a
                    href="#roi-calculator"
                    className="sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl font-bold text-[14px] text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all"
                  >
                    ROI
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom: Platform Quick-Compare ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 bg-slate-50 rounded-2xl border border-slate-200/80 p-5 md:p-6"
        >
          <div className="flex flex-col gap-4">
              <div className="shrink-0">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-1">Quick Compare</p>
                <p className="text-[13px] font-semibold text-slate-700">All platforms on one subscription</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {platforms.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActive(i)}
                    className={`text-left p-2.5 rounded-xl border transition-all duration-200 ${
                      active === i
                        ? "bg-white border-[#51B8AB]/50 shadow-sm"
                        : "bg-white/60 border-slate-200 hover:border-[#51B8AB]/30 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-heading font-bold text-[13px] ${active === i ? "text-slate-900" : "text-slate-600"}`}>
                        {p.id}
                      </span>
                      {active === i && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#51B8AB]" />
                      )}
                    </div>
                    <p className={`text-[10px] font-medium ${active === i ? "text-[#2d9d8f]" : "text-slate-400"}`}>
                      {p.specs.payload}
                    </p>
                    <div className="mt-1.5 h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#51B8AB] rounded-full transition-all duration-500"
                        style={{ width: `${p.specs.payloadBar}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
              <a
                href="/platforms"
                className="self-start inline-flex items-center gap-2 text-[13px] font-bold text-[#2d9d8f] hover:text-[#51B8AB] transition-colors"
              >
                Compare all <ChevronRight className="w-4 h-4" />
              </a>
            </div>
        </motion.div>

      </div>
    </section>
  );
}

function SpecTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-[#51B8AB]/25 transition-colors group">
      <div className="flex items-center gap-2 text-slate-400 mb-2 group-hover:text-[#51B8AB] transition-colors">
        {icon}
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase">{label}</span>
      </div>
      <p className="text-[13px] font-bold text-slate-900 leading-snug">{value}</p>
    </div>
  );
}
