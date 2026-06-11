"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Weight, Zap, Gauge, MapPin, ChevronRight, Cpu, Ruler, Timer, Layers } from "lucide-react";

const platforms = [
  {
    id: "C100",
    tag: "Research & Sorting",
    image: "/assets/products/c100-main.jpg",
    imageAlt: "/assets/products/c100-angle.jpg",
    name: "Compact Sorter & Research Platform",
    headline: "Built for labs, sorting lines, and R&D floors.",
    description:
      "A lightweight autonomous platform that moves material between stations without a worker. ROS-ready out of the box — deploy in a lab or a live sorting line with the same hardware.",
    specs: {
      payload: "Low payload class",
      payloadValue: "10 kg",
      drive: "Differential drive",
      speed: "Up to 1.2 m/s",
      nav: "SLAM + obstacle avoidance",
      battery: "8 hrs",
    },
    highlights: [
      { icon: Cpu, label: "ROS 2 Native" },
      { icon: Ruler, label: "Compact Footprint" },
      { icon: Layers, label: "Sensor Integration" },
    ],
    tags: ["ROS-ready", "Compact footprint", "Sensor integration", "Education"],
    bestFor: ["Sorting lines", "Robotics education", "R&D prototyping"],
    keyStats: [
      { value: "1.2 m/s", label: "Max Speed" },
      { value: "10 kg", label: "Payload" },
      { value: "8 hrs", label: "Battery" },
    ],
  },
  {
    id: "C100 4WD",
    tag: "Outdoor Inspection",
    image: "/assets/products/c100-4wd.png",
    name: "Outdoor Inspection Robot",
    headline: "Goes where conventional AMRs cannot.",
    description:
      "All-terrain four-wheel drive platform engineered for outdoor surveillance, perimeter patrol, and field inspection. Camera-ready, weather-resistant, deployable on uneven ground.",
    specs: {
      payload: "Low payload class",
      payloadValue: "12 kg",
      drive: "4WD off-road",
      speed: "Up to 1.5 m/s",
      nav: "GPS + SLAM hybrid",
      battery: "6 hrs",
    },
    highlights: [
      { icon: Cpu, label: "All-Terrain" },
      { icon: Ruler, label: "Weather Resistant" },
      { icon: Layers, label: "Camera Ready" },
    ],
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
    image: "/assets/products/c500-main.jpg",
    imageAlt: "/assets/products/c500-side.jpg",
    name: "Industrial Lifter-Tugger AMR",
    headline: "Moves 500 kg between stations. Every shift.",
    description:
      "Purpose-built for in-plant logistics. Heavy-duty chassis with autonomous navigation delivers consistent throughput across single and multi-shift operations — no driver required.",
    specs: {
      payload: "500 kg",
      payloadValue: "500 kg",
      drive: "Differential, high-torque",
      speed: "Up to 1.0 m/s",
      nav: "LiDAR SLAM",
      battery: "20 hrs",
    },
    highlights: [
      { icon: Cpu, label: "500 kg Payload" },
      { icon: Ruler, label: "Multi-Shift" },
      { icon: Layers, label: "High-Torque" },
    ],
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
    image: "/assets/products/c1000.png",
    name: "Heavy Lifter-Tugger AMR",
    headline: "1,000 kg. Continuous duty. No compromise.",
    description:
      "Corelyn's highest-capacity platform. Reinforced industrial frame and long-duty-cycle design for demanding environments — heavy manufacturing, cold chain, mining, and large-scale warehousing.",
    specs: {
      payload: "1,000 kg",
      payloadValue: "1,000 kg",
      drive: "High-torque reinforced",
      speed: "Up to 0.8 m/s",
      nav: "LiDAR SLAM + safety zones",
      battery: "16 hrs",
    },
    highlights: [
      { icon: Cpu, label: "1,000 kg Payload" },
      { icon: Ruler, label: "Continuous Duty" },
      { icon: Layers, label: "Reinforced Frame" },
    ],
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
    <section id="platforms" className="bg-white py-16 md:py-28 overflow-hidden relative">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgb(148 163 184 / 0.1) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#51B8AB]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-12 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
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

        {/* ── Platform Selector Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {platforms.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                active === i
                  ? "bg-[#51B8AB] text-slate-950 shadow-[0_4px_20px_rgba(81,184,171,0.35)] scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              <span className="relative z-10">{p.id}</span>
              {active === i && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 bg-[#51B8AB] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                <span className="hidden sm:inline"> — </span>
                <span className="hidden sm:inline text-[11px] opacity-80">{p.tag}</span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Main Platform Card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_24px_80px_rgba(15,23,42,0.1)] bg-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">

              {/* ── Left: Image Panel ── */}
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[600px] overflow-hidden">
                {/* Glow behind product */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#51B8AB]/15 rounded-full blur-[100px]" />

                <div className="relative w-full h-full flex items-center justify-center p-8 sm:p-12 lg:p-16">
                  <div className="relative w-full h-full">
                    <Image
                      src={platform.image}
                      alt={platform.name}
                      fill
                      className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                      priority
                    />
                  </div>
                </div>

                {/* Subtle bottom fade for stats overlay */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-900/80 to-transparent" />

                {/* Platform badge top-left */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2">
                    <span className="font-heading font-bold text-[20px] text-white tracking-wider">{platform.id}</span>
                  </div>
                  <div className="bg-[#51B8AB]/90 backdrop-blur-sm text-slate-950 px-3 py-1.5 rounded-xl">
                    <span className="text-[11px] font-bold tracking-wider uppercase">{platform.tag}</span>
                  </div>
                </div>

                {/* Key stats overlay at bottom */}
                <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                  {platform.keyStats.map((s, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 text-center"
                    >
                      <p className="font-heading font-bold text-white text-[15px] leading-none mb-0.5">{s.value}</p>
                      <p className="text-white/55 text-[10px] uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: Content Panel ── */}
              <div className="flex flex-col p-6 sm:p-8 lg:p-12 bg-white">

                {/* Headline + description */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#51B8AB] mb-2">
                    {platform.tag}
                  </p>
                  <h3 className="font-heading font-bold text-[22px] sm:text-[28px] text-slate-900 leading-[1.15] mb-3">
                    {platform.name}
                  </h3>
                  <p className="text-[15px] text-slate-500 leading-[1.7]">
                    {platform.description}
                  </p>
                </div>

                {/* Highlights row */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {platform.highlights.map((h, i) => {
                    const Icon = h.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-[#e8f7f5] border border-[#51B8AB]/25 rounded-xl px-3.5 py-2"
                      >
                        <Icon className="w-4 h-4 text-[#2d9d8f]" />
                        <span className="text-[12px] font-bold text-[#2d9d8f] tracking-wide">{h.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Spec Grid — 2x2 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <SpecTile icon={<Weight className="w-4 h-4" />} label="Payload" value={platform.specs.payloadValue} />
                  <SpecTile icon={<Zap className="w-4 h-4" />} label="Drive" value={platform.specs.drive} />
                  <SpecTile icon={<Gauge className="w-4 h-4" />} label="Max Speed" value={platform.specs.speed} />
                  <SpecTile icon={<MapPin className="w-4 h-4" />} label="Navigation" value={platform.specs.nav} />
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
                <div className="flex flex-wrap gap-2 mb-6">
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
                <div className="mt-auto flex flex-col xs:flex-row gap-3 pt-2">
                  <a
                    href="#contact"
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

        {/* ── Bottom: Quick-Compare Strip ── */}
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
                    {active === i && <div className="w-1.5 h-1.5 rounded-full bg-[#51B8AB]" />}
                  </div>
                  <p className={`text-[10px] font-medium ${active === i ? "text-[#2d9d8f]" : "text-slate-400"}`}>
                    {p.specs.payload}
                  </p>
                  <div className="mt-1.5 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#51B8AB] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(parseInt(p.specs.payloadValue.replace(/,/g, "")) || 50, 100)}%` }}
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
