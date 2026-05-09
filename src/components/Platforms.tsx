"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Zap, Weight, Gauge, MapPin } from "lucide-react";

const platforms = [
  {
    id: "C100",
    tag: "Research & Sorting",
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
    accentColor: "#3FA89A",
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
      payloadBar: 12,
      drive: "4WD off-road",
      speed: "Up to 1.5 m/s",
      nav: "GPS + SLAM hybrid",
    },
    tags: ["All-terrain", "Camera integration", "Outdoor rated", "4WD"],
    bestFor: ["Perimeter inspection", "Surveillance", "Agriculture", "Defence"],
    accentColor: "#3FA89A",
  },
  {
    id: "C500",
    tag: "Industrial AMR",
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
    accentColor: "#3FA89A",
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
      payloadBar: 100,
      drive: "High-torque reinforced",
      speed: "Up to 0.8 m/s",
      nav: "LiDAR SLAM + safety zones",
    },
    tags: ["1,000 kg payload", "Continuous duty", "Reinforced frame", "Cold chain"],
    bestFor: ["Heavy manufacturing", "Warehousing", "Mining", "Cold chain"],
    accentColor: "#3FA89A",
  },
];

export default function Platforms() {
  const [active, setActive] = useState(0);
  const platform = platforms[active];

  return (
    <section id="platforms" className="bg-[#0A0A0A] py-24 md:py-32 overflow-hidden relative">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#51B8AB]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 text-center relative"
        >
          {/* Section badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#51B8AB]/10 border border-[#51B8AB]/30 rounded-full px-5 py-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#51B8AB] animate-pulse" />
            <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#51B8AB]">
              Robot Platforms
            </span>
          </motion.div>

          {/* Main heading */}
          <h2 className="font-heading font-bold text-[42px] md:text-[64px] lg:text-[76px] leading-[1.05] text-white mb-6">
            <span className="text-[#51B8AB]">Four</span> Platforms.
            <br />
            <span className="text-white/70">Every</span> Industrial <span className="text-[#51B8AB]">Need</span>.
          </h2>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#51B8AB]/50" />
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]" />
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]/60" />
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]/30" />
            </div>
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#51B8AB]/50" />
          </div>

          <p className="text-[18px] md:text-[22px] text-white/70 leading-[1.75] max-w-3xl mx-auto">
            From <span className="text-[#51B8AB] font-semibold">compact lab sorters</span> to <span className="text-[#51B8AB] font-semibold">1,000 kg heavy tuggers</span> — one subscription model across all platforms.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {[
              { icon: "🤖", text: "4 Platforms" },
              { icon: "⚖️", text: "Up to 1,000 kg" },
              { icon: "💰", text: "One subscription" },
              { icon: "⚡", text: "RaaS model" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2 hover:border-[#51B8AB]/40 hover:bg-[#51B8AB]/5 transition-all duration-300"
              >
                <span className="text-[16px]">{item.icon}</span>
                <span className="text-[13px] font-medium text-white/80">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {platforms.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-bold transition-all duration-200 border ${
                active === i
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-transparent text-white/70 border-white/10 hover:bg-[#51B8AB] hover:text-white hover:border-[#51B8AB]"
              }`}
            >
              <span className="font-heading tracking-wider">{p.id}</span>
              <span className={`text-[11px] font-medium ${active === i ? "text-white/60" : "text-white/50"}`}>
                {p.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Main Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(81,184,171,0.1)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Image Panel — clickable, navigates to /platforms */}
              <a
                href="/platforms"
                className="group/img relative bg-[#111] aspect-[4/3] lg:aspect-auto lg:min-h-[540px] overflow-hidden block cursor-pointer"
              >
                <Image
                  src={platform.image}
                  alt={platform.name}
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                {/* Dark overlay for contrast + hover lift */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 group-hover/img:from-black/80 transition-all duration-500" />

                {/* ID badge */}
                <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg">
                  <span className="font-heading font-bold text-[18px] tracking-wider">{platform.id}</span>
                </div>
                {/* Tag badge */}
                <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-lg">
                  <span className="text-[12px] font-bold tracking-wider uppercase">{platform.tag}</span>
                </div>

                {/* Bottom info strip */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="text-white/60 text-[12px] font-bold tracking-widest uppercase mb-1">Platform</p>
                  <p className="text-white font-heading font-bold text-[22px] leading-tight mb-3">{platform.name}</p>
                  <span className="inline-flex items-center gap-2 text-white/80 text-[13px] font-bold group-hover/img:text-white group-hover/img:gap-3 transition-all duration-300">
                    View full platform <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>

              {/* Content Panel */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col bg-[#1A1A1A]">

                <h3 className="font-heading font-bold text-[26px] md:text-[32px] text-white leading-[1.15] mb-2">
                  {platform.name}
                </h3>
                <p className="text-[16px] font-semibold text-[#51B8AB] mb-5 italic">
                  "{platform.headline}"
                </p>
                <p className="text-[16px] text-white/70 leading-[1.7] mb-8">
                  {platform.description}
                </p>

                {/* Spec Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <SpecTile icon={<Weight className="w-4 h-4" />} label="Payload" value={platform.specs.payload} />
                  <SpecTile icon={<Zap className="w-4 h-4" />} label="Drive" value={platform.specs.drive} />
                  <SpecTile icon={<Gauge className="w-4 h-4" />} label="Max Speed" value={platform.specs.speed} />
                  <SpecTile icon={<MapPin className="w-4 h-4" />} label="Navigation" value={platform.specs.nav} />
                </div>

                {/* Payload bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-[13px] font-medium text-white/60 mb-2">
                    <span>Payload capacity</span>
                    <span className="text-white font-bold">{platform.specs.payload}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#51B8AB] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${platform.specs.payloadBar}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-white/50 mt-1">
                    <span>Light</span><span>Heavy</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {platform.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] font-bold tracking-wide bg-[#0A0A0A] text-white/80 border border-white/10 px-3 py-1.5 rounded-full hover:border-[#51B8AB]/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Best For */}
                <div className="mb-8 p-5 bg-[#0A0A0A] rounded-xl border border-white/10">
                  <p className="text-[12px] font-bold tracking-widest uppercase text-[#51B8AB] mb-3">Best deployed in</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.bestFor.map((use) => (
                      <span key={use} className="text-[14px] font-medium text-white/80">
                        {use}
                      </span>
                    )).reduce((acc: React.ReactNode[], el, i, arr) => {
                      acc.push(el);
                      if (i < arr.length - 1) acc.push(<span key={`dot-${i}`} className="text-white/30">·</span>);
                      return acc;
                    }, [])}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <a
                    href="/platforms"
                    className="flex-1 bg-[#1A1A1A] text-white text-center py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#51B8AB] transition-colors flex items-center justify-center gap-2 border border-white/10"
                  >
                    View Platform <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 bg-[#0A0A0A] text-white text-center py-3.5 rounded-xl font-bold text-[15px] hover:bg-black transition-colors border border-white/10 hover:border-white/20"
                  >
                    Get a Quote
                  </a>
                  <a
                    href="#roi-calculator"
                    className="flex-1 bg-[#0A0A0A] text-white text-center py-3.5 rounded-xl font-bold text-[15px] hover:bg-black transition-colors border border-white/10 hover:border-white/20"
                  >
                    Calculate ROI
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {platforms.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`group p-5 rounded-xl border text-left transition-all duration-200 ${
                active === i
                  ? "bg-white/10 border-white/20"
                  : "bg-[#1A1A1A] border-white/10 hover:bg-[#51B8AB] hover:border-[#51B8AB]"
              }`}
            >
              <div className={`text-[11px] font-bold tracking-widest uppercase mb-2 ${active === i ? "text-white/50" : "text-white/50"}`}>
                {p.tag}
              </div>
              <div className={`font-heading font-bold text-[20px] mb-1 ${active === i ? "text-white" : "text-white"}`}>
                {p.id}
              </div>
              <div className={`text-[13px] ${active === i ? "text-white/60" : "text-white/60"}`}>
                {p.specs.payload}
              </div>
              {/* Mini payload bar */}
              <div className={`mt-3 h-1 rounded-full overflow-hidden ${active === i ? "bg-white/20" : "bg-white/10"}`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${active === i ? "bg-white" : "bg-[#51B8AB]"}`}
                  style={{ width: `${p.specs.payloadBar}%` }}
                />
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SpecTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 text-white/60 mb-2">
        {icon}
        <span className="text-[11px] font-bold tracking-widest uppercase">{label}</span>
      </div>
      <p className="text-[14px] font-bold text-white leading-tight">{value}</p>
    </div>
  );
}




