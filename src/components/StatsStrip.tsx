"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { IndianRupee, Cpu, Weight, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: IndianRupee,
    prefix: "₹",
    value: 50,
    suffix: "/hr",
    label: "Starting Runtime Rate",
    sub: "Per robot · productive hours only · no idle billing",
    detail: "Pay only when the robot is actively working on your floor.",
    accent: "No upfront capital",
  },
  {
    icon: Cpu,
    prefix: "",
    value: 4,
    suffix: " Platforms",
    label: "Robot Platforms",
    sub: "AMR · Sorter · Inspection · Heavy Lifter",
    detail: "From compact lab sorters to 1,000 kg industrial tuggers.",
    accent: "One subscription model",
  },
  {
    icon: Weight,
    prefix: "",
    value: 2000,
    suffix: " kg",
    label: "Max Payload Capacity",
    sub: "100 kg entry · 1,000 kg heavy class",
    detail: "SME sorting lines to heavy manufacturing and cold chain.",
    accent: "Enterprise ready",
  },
];

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent =
            prefix +
            (value >= 1000 ? Math.round(v).toLocaleString("en-IN") : Math.round(v).toString()) +
            suffix;
        }
      },
    });
    return controls.stop;
  }, [inView, value, prefix, suffix, motionVal]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function StatsStrip() {
  return (
    <section className="w-full bg-[#0A0A0A] relative overflow-hidden">

      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Top green border */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#51B8AB] to-transparent" />
      {/* Top green ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#51B8AB]/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="h-px w-8 bg-[#51B8AB]" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#51B8AB]">
            Subscription Model
          </span>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group relative bg-[#1A1A1A] rounded-3xl p-7 border border-white/8 hover:border-[#51B8AB]/40 transition-all duration-300 overflow-hidden"
              >
                {/* Hover green tint */}
                <div className="absolute inset-0 bg-[#51B8AB]/0 group-hover:bg-[#51B8AB]/5 rounded-3xl transition-all duration-300 pointer-events-none" />
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/40 to-transparent" />

                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#51B8AB]/15 border border-[#51B8AB]/30 flex items-center justify-center text-[#51B8AB] group-hover:bg-[#51B8AB]/25 group-hover:border-[#51B8AB]/50 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#51B8AB] bg-[#51B8AB]/10 border border-[#51B8AB]/25 px-3 py-1.5 rounded-full">
                    {stat.accent}
                  </span>
                </div>

                {/* Number */}
                <div className="font-heading font-bold text-[52px] md:text-[58px] leading-none text-white mb-1 tabular-nums tracking-tight">
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="font-heading font-semibold text-[15px] text-white/70 mb-4 tracking-wide">
                  {stat.label}
                </h3>

                {/* Green divider */}
                <div className="w-10 h-[2px] bg-gradient-to-r from-[#51B8AB] to-[#51B8AB]/20 rounded-full mb-4" />

                {/* Sub */}
                <p className="text-[12px] text-white/50 tracking-wide mb-3 font-medium leading-relaxed">
                  {stat.sub}
                </p>

                {/* Detail */}
                <p className="text-[14px] text-white/75 leading-[1.65]">
                  {stat.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="mt-6 bg-[#1A1A1A] rounded-3xl border border-white/8 px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-gradient-to-b from-transparent via-[#51B8AB] to-transparent rounded-full" />
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/30 to-transparent" />

          <div className="pl-4">
            <p className="text-[16px] font-semibold text-white leading-[1.6] mb-1">
              All platforms on a single subscription.
            </p>
            <p className="text-[14px] text-white/50 leading-[1.6]">
              Scale up or down as your operation evolves — no lock-in, no capital expenditure.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <a
              href="#roi-calculator"
              className="text-[14px] font-bold text-white/80 border border-white/20 px-5 py-3 rounded-2xl hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-200"
            >
              Calculate ROI
            </a>
            <a
              href="#platforms"
              className="inline-flex items-center gap-2 text-[14px] font-bold bg-[#51B8AB] text-white px-5 py-3 rounded-2xl hover:bg-[#3FA89A] transition-colors shadow-[0_0_20px_rgba(81,184,171,0.3)] hover:shadow-[0_0_28px_rgba(81,184,171,0.45)]"
            >
              Explore Platforms <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom green border */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#51B8AB] to-transparent" />
    </section>
  );
}
