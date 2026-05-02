"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const taglines = [
  "Operate smarter.",
  "Scale without capital.",
  "Infrastructure, not hardware.",
];

const info = {
  heading: "Corelyn Robot Platforms",
  tagline: "Purpose-built for Indian industry. Deployed as a service.",
  description:
    "Corelyn's fleet spans compact sorters to 1,000 kg heavy-class tuggers. Every platform is engineered for real industrial floors — dusty, uneven, high-throughput, multi-shift. We own the robot, run the software, and maintain the uptime. You subscribe to the output.",
  features: [
    "ROS 2 / ROS-based autonomy stack",
    "Real-time obstacle avoidance (LiDAR + depth cameras)",
    "Fleet management via Corelyn Dashboard",
    "Multi-shift continuous operation — up to 20 hrs/day",
    "OTA software & map updates included",
    "Coimbatore HQ + rapid on-site response",
  ],
  specs: [
    { label: "Payload Range", value: "Low class → 1,000 kg" },
    { label: "Drive Types", value: "Differential, 4WD off-road, High-torque" },
    { label: "Nav System", value: "LiDAR SLAM + Vision fusion" },
    { label: "Uptime SLA", value: "≥ 95% productive hours" },
    { label: "Billing Model", value: "Per productive runtime hour" },
    { label: "Deployment", value: "4–8 weeks commissioning" },
  ],
};

const images = [
  {
    src: "/assets/products/img_1.png",
    alt: "Corelyn C100 compact platform in operation",
    label: "C100 Series",
  },
  {
    src: "/assets/products/img_2.png",
    alt: "Corelyn C500 industrial lifter AMR",
    label: "C500 Series",
  },
  {
    src: "/assets/products/img_3.png",
    alt: "Corelyn C1000 heavy-duty AMR fleet",
    label: "C1000 Series",
  },
];

/* ─── Parallax Image Components ─────────────────────────────────────────── */

/** Image 1: enters from right-top, exits to left-bottom */
function Image1({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const x = useTransform(scrollYProgress, [0.05, 0.28], ["60vw", "-60vw"]);
  const y = useTransform(scrollYProgress, [0.05, 0.28], ["-20vh", "20vh"]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.12, 0.24, 0.28], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.18, 0.24, 0.28], [0.3, 1, 1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0.05, 0.28], [6, -6]);

  return (
    <motion.div
      style={{ x, y, opacity, scale, rotate }}
      className="absolute w-[60vw] max-w-[640px] aspect-[4/3] will-change-transform"
    >
      <Image src={images[0].src} alt={images[0].alt} fill className="object-contain" sizes="640px" />
    </motion.div>
  );
}

/** Image 2: enters from left, moves right horizontally */
function Image2({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const x = useTransform(scrollYProgress, [0.32, 0.55], ["-60vw", "60vw"]);
  const opacity = useTransform(scrollYProgress, [0.32, 0.38, 0.50, 0.55], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.32, 0.44, 0.50, 0.55], [0.3, 1, 1, 0.85]);

  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="absolute w-[60vw] max-w-[640px] aspect-[4/3] will-change-transform"
    >
      <Image src={images[1].src} alt={images[1].alt} fill className="object-contain" sizes="640px" />
    </motion.div>
  );
}

/** Image 3: enters from right, moves to left */
function Image3({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const x = useTransform(scrollYProgress, [0.58, 0.82], ["60vw", "-60vw"]);
  const opacity = useTransform(scrollYProgress, [0.58, 0.64, 0.77, 0.82], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.58, 0.70, 0.77, 0.82], [0.3, 1, 1, 0.85]);

  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="absolute w-[60vw] max-w-[640px] aspect-[4/3] will-change-transform"
    >
      <Image src={images[2].src} alt={images[2].alt} fill className="object-contain" sizes="640px" />
    </motion.div>
  );
}

/* ─── Tagline Background ────────────────────────────────────────────────── */

function TaglineBackground() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
      {taglines.map((line, i) => (
        <p
          key={i}
          className="font-heading font-black text-[8vw] md:text-[7vw] text-[#1A1A1A]/[0.14] tracking-tight whitespace-nowrap leading-tight"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

/* ─── Scroll Progress Dot ───────────────────────────────────────────────── */

function ScrollIndicator({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleY = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-1">
      <div className="w-[2px] h-24 bg-black/10 relative rounded-full overflow-hidden">
        <motion.div className="absolute top-0 left-0 w-full bg-black origin-top" style={{ scaleY }} />
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */

export default function PlatformPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Taglines fade out as images finish
  const taglineOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EEEEEE]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#1A1A1A] font-medium text-[15px] hover:text-[#4A4A4A] transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <div className="flex flex-col items-end">
            <span className="font-heading font-bold text-xl tracking-tight text-[#1A1A1A] leading-none">CORELYN</span>
            <span className="text-xs text-[#4A4A4A] mt-0.5">by Transista</span>
          </div>
        </div>
      </header>

      {/* ── Scroll Progress Indicator ── */}
      <ScrollIndicator scrollYProgress={scrollYProgress} />

      {/* ── Tall Scroll Container (images only) ── */}
      <div ref={containerRef} className="relative h-[400vh] overflow-x-clip">
        <div className="sticky top-0 h-screen flex items-center justify-center">

          {/* Background taglines — fade out after last image */}
          <motion.div style={{ opacity: taglineOpacity }} className="absolute inset-0">
            <TaglineBackground />
          </motion.div>

          {/* Images */}
          <Image1 scrollYProgress={scrollYProgress} />
          <Image2 scrollYProgress={scrollYProgress} />
          <Image3 scrollYProgress={scrollYProgress} />

          {/* Scroll hint — visible at very top */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.06], [1, 0]) }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#999]">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-[#CCCCCC] rounded-full flex items-start justify-center pt-1"
            >
              <div className="w-1 h-2 bg-[#CCCCCC] rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Info Section — normal page flow after scroll animation ── */}
      <section className="bg-white border-t border-[#EEEEEE] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#999999] mb-5">Platform Overview</p>
            <h1 className="font-heading font-black text-[40px] md:text-[64px] text-[#1A1A1A] leading-[1.0] mb-5">
              {info.heading}
            </h1>
            <p className="text-[20px] md:text-[24px] text-[#4A4A4A] mb-8 font-medium leading-[1.5]">{info.tagline}</p>
            <p className="text-[17px] md:text-[19px] text-[#666] leading-[1.8] max-w-2xl mb-16">{info.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <h3 className="font-heading font-bold text-[15px] uppercase tracking-widest text-[#1A1A1A] mb-6">
                What&apos;s Included
              </h3>
              <ul className="space-y-4">
                {info.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#1A1A1A] shrink-0 mt-0.5" />
                    <span className="text-[16px] text-[#4A4A4A] leading-[1.6]">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Specs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="font-heading font-bold text-[15px] uppercase tracking-widest text-[#1A1A1A] mb-6">
                Platform Specs
              </h3>
              <div className="space-y-4">
                {info.specs.map((s, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-[#EEEEEE] pb-4">
                    <span className="text-[15px] text-[#999]">{s.label}</span>
                    <span className="text-[15px] font-semibold text-[#1A1A1A] text-right max-w-[55%] leading-tight">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-4 pt-8 border-t border-[#EEEEEE]"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-bold text-[16px] hover:bg-black transition-colors"
            >
              Get a Deployment Quote <ChevronRight size={18} />
            </Link>
            <Link
              href="/#roi-calculator"
              className="inline-flex items-center gap-2 border-2 border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 rounded-full font-bold text-[16px] hover:bg-[#F5F5F5] transition-colors"
            >
              Calculate ROI
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
