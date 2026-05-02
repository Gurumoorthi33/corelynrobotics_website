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
    accentColor: "#2B2B2B",
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
    accentColor: "#2B2B2B",
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
    accentColor: "#2B2B2B",
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
    accentColor: "#2B2B2B",
  },
];

export default function Platforms() {
  const [active, setActive] = useState(0);
  const platform = platforms[active];

  return (
    <section id="platforms" className="bg-[#F5F5F5] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A] mb-3 block">
              Robot Platforms
            </span>
            <h2 className="font-heading font-bold text-[36px] md:text-[52px] leading-[1.05] text-[#1A1A1A]">
              Four Platforms.<br className="hidden sm:block" /> Every Industrial Need.
            </h2>
          </div>
          <p className="text-[17px] text-[#4A4A4A] leading-[1.7] max-w-sm md:text-right">
            From compact lab sorters to 1,000 kg heavy tuggers — one subscription model across all platforms.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {platforms.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-bold transition-all duration-200 border ${
                active === i
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-white text-[#4A4A4A] border-[#EEEEEE] hover:border-[#D0D0D0] hover:text-[#1A1A1A]"
              }`}
            >
              <span className="font-heading tracking-wider">{p.id}</span>
              <span className={`text-[11px] font-medium ${active === i ? "text-white/60" : "text-[#4A4A4A]"}`}>
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
            className="bg-white rounded-2xl overflow-hidden border border-[#EEEEEE] shadow-sm"
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
              <div className="p-8 md:p-10 lg:p-12 flex flex-col">

                <h3 className="font-heading font-bold text-[26px] md:text-[32px] text-[#1A1A1A] leading-[1.15] mb-2">
                  {platform.name}
                </h3>
                <p className="text-[16px] font-semibold text-[#4A4A4A] mb-5 italic">
                  "{platform.headline}"
                </p>
                <p className="text-[16px] text-[#4A4A4A] leading-[1.7] mb-8">
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
                  <div className="flex justify-between text-[13px] font-medium text-[#4A4A4A] mb-2">
                    <span>Payload capacity</span>
                    <span className="text-[#1A1A1A] font-bold">{platform.specs.payload}</span>
                  </div>
                  <div className="h-2 bg-[#EEEEEE] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#1A1A1A] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${platform.specs.payloadBar}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#4A4A4A] mt-1">
                    <span>Light</span><span>Heavy</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {platform.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] font-bold tracking-wide bg-[#F5F5F5] text-[#1A1A1A] border border-[#EEEEEE] px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Best For */}
                <div className="mb-8 p-5 bg-[#F5F5F5] rounded-xl border border-[#EEEEEE]">
                  <p className="text-[12px] font-bold tracking-widest uppercase text-[#4A4A4A] mb-3">Best deployed in</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.bestFor.map((use) => (
                      <span key={use} className="text-[14px] font-medium text-[#1A1A1A]">
                        {use}
                      </span>
                    )).reduce((acc: React.ReactNode[], el, i, arr) => {
                      acc.push(el);
                      if (i < arr.length - 1) acc.push(<span key={`dot-${i}`} className="text-[#D0D0D0]">·</span>);
                      return acc;
                    }, [])}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <a
                    href="/platforms"
                    className="flex-1 bg-[#1A1A1A] text-white text-center py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#2B2B2B] transition-colors flex items-center justify-center gap-2"
                  >
                    View Platform <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 bg-[#F5F5F5] text-[#1A1A1A] text-center py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#EEEEEE] transition-colors border border-[#EEEEEE]"
                  >
                    Get a Quote
                  </a>
                  <a
                    href="#roi-calculator"
                    className="flex-1 bg-[#F5F5F5] text-[#1A1A1A] text-center py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#EEEEEE] transition-colors border border-[#EEEEEE]"
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
                  ? "bg-[#1A1A1A] border-[#1A1A1A]"
                  : "bg-white border-[#EEEEEE] hover:border-[#D0D0D0]"
              }`}
            >
              <div className={`text-[11px] font-bold tracking-widest uppercase mb-2 ${active === i ? "text-white/50" : "text-[#4A4A4A]"}`}>
                {p.tag}
              </div>
              <div className={`font-heading font-bold text-[20px] mb-1 ${active === i ? "text-white" : "text-[#1A1A1A]"}`}>
                {p.id}
              </div>
              <div className={`text-[13px] ${active === i ? "text-white/60" : "text-[#4A4A4A]"}`}>
                {p.specs.payload}
              </div>
              {/* Mini payload bar */}
              <div className={`mt-3 h-1 rounded-full overflow-hidden ${active === i ? "bg-white/20" : "bg-[#EEEEEE]"}`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${active === i ? "bg-white" : "bg-[#1A1A1A]"}`}
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
    <div className="bg-[#F5F5F5] rounded-xl p-4 border border-[#EEEEEE]">
      <div className="flex items-center gap-2 text-[#4A4A4A] mb-2">
        {icon}
        <span className="text-[11px] font-bold tracking-widest uppercase">{label}</span>
      </div>
      <p className="text-[14px] font-bold text-[#1A1A1A] leading-tight">{value}</p>
    </div>
  );
}
