"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Weight, Zap, Gauge, MapPin, ChevronLeft, ChevronRight, Cpu, Ruler, Layers, Wrench, Briefcase } from "lucide-react";
import { useSwipe } from "@/lib/useScrollLock";

const platforms = [
  {
    id: "C100",
    tag: "Research & Sorting",
    images: [
      "/assets/products/c100-img1.jpg",
      "/assets/products/c100-img2.jpg",
      "/assets/products/c100-img3.jpg",
      "/assets/products/c100-img4.jpg",
      "/assets/products/c100-img5.jpg",
      "/assets/products/c100-img6.jpg",
      "/assets/products/c100-img7.jpg",
      "/assets/products/c100-img8.jpg",
    ],
    name: "Compact Sorter & Research Platform",
    headline: "Built for labs, sorting lines, and R&D floors.",
    description:
      "A lightweight autonomous platform that moves material between stations without a worker. ROS-ready out of the box — deploy in a lab or a live sorting line with the same hardware.",
    specs: {
      payload: "100 kg",
      drive: "Differential drive",
      speed: "Up to 1.2 m/s",
      nav: "SLAM + obstacle avoidance",
    },
    tags: ["ROS-ready", "Compact footprint", "Sensor integration", "Education"],
    bestFor: ["Sorting lines", "Robotics education", "R&D prototyping"],
    keyStats: [
      { value: "1.2 m/s", label: "Max Speed" },
      { value: "100 kg", label: "Payload" },
      { value: "8 hrs", label: "Battery" },
    ],
  },
  {
    id: "C500",
    tag: "Industrial AMR",
    images: [
      "/assets/products/c500-img1.jpg",
      "/assets/products/c500-img2.jpg",
      "/assets/products/c500-img3.jpg",
    ],
    name: "Industrial Lifter-Tugger AMR",
    headline: "Moves 500 kg between stations. Every shift.",
    description:
      "Purpose-built for in-plant logistics. Heavy-duty chassis with autonomous navigation delivers consistent throughput across single and multi-shift operations — no driver required.",
    specs: {
      payload: "500 kg",
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
    id: "C100 4WD",
    tag: "Outdoor Inspection",
    images: ["/assets/products/c100-4wd.png"],
    name: "Outdoor Inspection Robot",
    headline: "Goes where conventional AMRs cannot.",
    description:
      "All-terrain four-wheel drive platform engineered for outdoor surveillance, perimeter patrol, and field inspection. Camera-ready, weather-resistant, deployable on uneven ground.",
    specs: {
      payload: "12 kg",
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
    development: true,
  },
  {
    id: "C1000",
    tag: "Heavy Industry",
    images: ["/assets/products/c1000.png"],
    name: "Heavy Lifter-Tugger AMR",
    headline: "1,000 kg. Continuous duty. No compromise.",
    description:
      "Corelyn's highest-capacity platform. Reinforced industrial frame and long-duty-cycle design for demanding environments — heavy manufacturing, cold chain, mining, and large-scale warehousing.",
    specs: {
      payload: "1,000 kg",
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
    development: true,
  },
];

const IMAGE_INTERVAL = 5000;

const pdfPath = (id: string): string | null => {
  const map: Record<string, string> = {
    C100: "/assets/pdf/CORELYN C100.pdf",
    C500: "/assets/pdf/CORELYN C500.pdf",
  };
  return map[id] ?? null;
};

export default function Platforms() {
  const [activePlatform, setActivePlatform] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const platform = platforms[activePlatform];
  const imageCount = platform.images.length;

  useEffect(() => {
    if (paused || imageCount <= 1) return;
    startRef.current = performance.now();
    const tick = (now: number) => {
      const pct = Math.min((now - startRef.current) / IMAGE_INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setActiveImage(a => (a + 1) % imageCount);
        setProgress(0);
        startRef.current = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, activePlatform, imageCount]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePlatformSelect = (i: number) => {
    if (i === activePlatform) return;
    setDirection(i > activePlatform ? 1 : -1);
    setActivePlatform(i);
    setActiveImage(0);
    setProgress(0);
    startRef.current = performance.now();
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPaused(false), 4000);
  };

  const goNext = useCallback(() => {
    const i = Math.min(activePlatform + 1, platforms.length - 1);
    if (i === activePlatform) return;
    setDirection(1);
    setActivePlatform(i);
    setActiveImage(0);
    setProgress(0);
    startRef.current = performance.now();
  }, [activePlatform]);

  const goPrev = useCallback(() => {
    const i = Math.max(activePlatform - 1, 0);
    if (i === activePlatform) return;
    setDirection(-1);
    setActivePlatform(i);
    setActiveImage(0);
    setProgress(0);
    startRef.current = performance.now();
  }, [activePlatform]);

  const swipeProps = useSwipe(goNext, goPrev);

  const handleDotClick = (i: number) => {
    setDirection(i > activePlatform ? 1 : -1);
    setActivePlatform(i);
    setActiveImage(0);
    setProgress(0);
    startRef.current = performance.now();
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPaused(false), 4000);
  };

  return (
    <section id="platforms" ref={sectionRef} className="bg-slate-50 py-16 md:py-28 relative overflow-hidden border-y border-slate-200/80">
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{
        backgroundImage:
          "linear-gradient(rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.12) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#51B8AB]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 xs:px-6 md:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center relative"
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

          <h2 className="font-heading font-bold text-[24px] xs:text-[28px] md:text-[56px] lg:text-[76px] leading-[1.05] text-slate-900 mb-6">
            <span className="text-[#2d9d8f]">Four</span> Platforms.
            <br />
            <span className="text-slate-500">Every</span> Industrial <span className="text-[#2d9d8f]">Need</span>.
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#51B8AB]/50" />
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]" />
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]/60" />
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]/30" />
            </div>
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#51B8AB]/50" />
          </div>

          <p className="text-[15px] md:text-[22px] text-slate-600 leading-[1.75] max-w-3xl mx-auto">
            <span className="text-[#2d9d8f] font-semibold">Four platforms</span>. One subscription model. From{" "}
            <span className="text-slate-900 font-semibold">compact sorters</span> to{" "}
            <span className="text-slate-900 font-semibold">1,000 kg tuggers</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {[
              { icon: Cpu, text: "4 Platforms" },
              { icon: Wrench, text: "ROS-ready" },
              { icon: Briefcase, text: "Subscription" },
              { icon: Zap, text: "Quick deploy" },
            ].map((item, i) => {
              const PillIcon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-full px-4 py-2 hover:border-[#51B8AB]/35 shadow-sm transition-all duration-300"
                >
                  <PillIcon className="w-4 h-4 text-[#2d9d8f] shrink-0" aria-hidden />
                  <span className="text-[13px] font-medium text-slate-700">{item.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Platform Selector Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {platforms.map((p, i) => (
            <button
              key={p.id}
              onClick={() => handlePlatformSelect(i)}
              className={`group relative px-3 xs:px-5 py-2.5 xs:py-3 rounded-xl xs:rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden ${
                activePlatform === i
                  ? "border-[#51B8AB] bg-[#e8f7f5] shadow-[0_4px_20px_rgba(81,184,171,0.18)]"
                  : "border-slate-200 bg-white hover:border-[#51B8AB]/40 hover:bg-slate-50"
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 ${
                activePlatform === i ? "bg-[#51B8AB]" : "bg-transparent"
              }`} />
              <span className={`font-heading font-bold text-[13px] xs:text-[15px] md:text-[18px] leading-none transition-colors ${
                activePlatform === i ? "text-slate-900" : "text-slate-700"
              }`}>
                {p.id}
              </span>
              <span className="hidden xs:inline text-[10px] xs:text-[11px] text-slate-400 font-medium ml-1 xs:ml-2">{p.tag}</span>
              {p.images.length > 1 && (
                <span className="text-[10px] text-slate-400 ml-2">({p.images.length})</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Featured Panel ── */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activePlatform}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden bg-[#0d1a18] border border-[#51B8AB]/20 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
            {...swipeProps}
          >
            {/* ── Image area ── */}
            <div className="relative h-[400px] xs:h-[420px] sm:h-[460px] md:h-[520px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_38%,rgba(81,184,171,0.10),transparent)] pointer-events-none" />
              {!(platform as any).development && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={platform.images[activeImage]}
                      alt={`${platform.name} view ${activeImage + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 980px"
                      className="object-cover object-center"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {!(platform as any).development && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1a18]/30" />
              )}

              {/* Under Development */}
              {(platform as any).development && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="flex flex-col items-center gap-5">
                    <div className="flex gap-1.5">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-white/90 font-bold text-[20px] md:text-[26px] tracking-[0.25em] uppercase">Under Development</p>
                      <p className="text-white/40 text-[13px] mt-2 tracking-wide">Coming soon</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.div
                        animate={{ scaleY: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                        className="w-1 h-6 bg-white/30 rounded-full"
                      />
                      <motion.div
                        animate={{ scaleY: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                        className="w-1 h-6 bg-white/30 rounded-full"
                      />
                      <motion.div
                        animate={{ scaleY: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        className="w-1 h-6 bg-white/30 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Platform badge top-left */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2">
                  <span className="font-heading font-bold text-[20px] text-white tracking-wider">{platform.id}</span>
                </div>
                <div className="bg-[#51B8AB]/90 backdrop-blur-sm text-slate-950 px-3 py-1.5 rounded-xl">
                  <span className="text-[11px] font-bold tracking-wider uppercase">{platform.tag}</span>
                </div>
              </div>

              {/* Image count indicator */}
              {imageCount > 1 && (
                <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-sm border border-white/15 rounded-lg px-3 py-1.5">
                  <span className="text-white/80 text-[12px] font-medium">
                    {activeImage + 1} / {imageCount}
                  </span>
                </div>
              )}

              {/* Image progress bar */}
              {imageCount > 1 && (
                <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
                  <motion.div
                    className="h-full bg-[#51B8AB]"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* ── Content below image ── */}
            <div className="p-5 sm:p-6 md:p-8 bg-white">
              {/* Headline + description */}
              <div className="mb-5 pb-5 border-b border-slate-100">
                <h3 className="font-heading font-bold text-[20px] sm:text-[26px] text-slate-900 leading-[1.15] mb-3">
                  {platform.name}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-500 leading-[1.7]">
                  {platform.description}
                </p>
              </div>

              {/* Key stats row */}
              <div className="flex gap-3 mb-5">
                {platform.keyStats.map((s, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#e8f7f5] border border-[#51B8AB]/25 rounded-xl p-3 text-center"
                  >
                    <p className="font-heading font-bold text-slate-900 text-[16px] leading-none mb-0.5">{s.value}</p>
                    <p className="text-[#2d9d8f] text-[10px] uppercase tracking-wider font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Spec grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <SpecTile icon={<Weight className="w-4 h-4" />} label="Payload" value={platform.specs.payload} />
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
              <div className="flex flex-wrap gap-2 mb-5">
                {platform.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-bold tracking-wide bg-[#e8f7f5] text-[#2d9d8f] border border-[#51B8AB]/20 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Download Specification */}
              <div className="flex flex-col xs:flex-row gap-3">
                {pdfPath(platform.id) ? (
                  <a
                    href={pdfPath(platform.id)!}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-slate-800 active:scale-[0.98] transition-all"
                  >
                    Download Specification <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-300 text-slate-500 py-3.5 rounded-xl font-bold text-[14px] cursor-not-allowed">
                    Spec Sheet Coming Soon
                  </div>
                )}
                <a
                  href="#roi-calculator"
                  className="sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl font-bold text-[14px] text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all"
                >
                  ROI
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators + prev/next */}
        <div className="flex items-center justify-between mt-6 px-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goPrev}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              activePlatform > 0
                ? "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 shadow-sm"
                : "border-slate-200 text-slate-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-2">
            {platforms.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => handleDotClick(i)}
                className="p-2"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <motion.div
                  animate={{
                    width: i === activePlatform ? 20 : 8,
                    height: 8,
                    backgroundColor: i === activePlatform ? "#51B8AB" : "rgba(148,163,184,0.4)",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="rounded-full"
                />
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              activePlatform < platforms.length - 1
                ? "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 shadow-sm"
                : "border-slate-200 text-slate-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* ── Bottom stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-40px", amount: 0.12 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { value: "4", label: "Platforms" },
            { value: "₹50/hr", label: "Starting rate" },
            { value: "2,000 kg", label: "Max payload" },
            { value: "24/7", label: "Support included" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group relative overflow-hidden rounded-xl bg-white border border-slate-200/90 p-4 hover:border-[#51B8AB]/35 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#51B8AB]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <p className="font-heading font-bold text-[22px] sm:text-[24px] text-slate-900 leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium uppercase tracking-wider group-hover:text-[#2d9d8f] transition-colors duration-300">
                  {s.label}
                </p>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#51B8AB]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
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
