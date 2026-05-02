"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { IndianRupee, Cpu, Weight } from "lucide-react";

const stats = [
  {
    icon: <IndianRupee className="w-6 h-6" />,
    prefix: "₹",
    value: 500,
    suffix: " / hr",
    label: "Starting Runtime Rate",
    sub: "Per robot · productive hours only · no idle billing",
    detail: "Pay only when the robot is actively working on your floor.",
    accent: "No upfront capital",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    prefix: "",
    value: 4,
    suffix: " Platforms",
    label: "Robot Platforms",
    sub: "AMR · Sorter · Inspection · Heavy Lifter",
    detail: "From compact lab sorters to 1,000 kg industrial tuggers.",
    accent: "One subscription model",
  },
  {
    icon: <Weight className="w-6 h-6" />,
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
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent =
            prefix +
            (value >= 1000
              ? Math.round(v).toLocaleString("en-IN")
              : Math.round(v).toString()) +
            suffix;
        }
      },
    });
    return controls.stop;
  }, [inView, value, prefix, suffix, motionVal]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <section className="w-full bg-[#1A1A1A] relative overflow-hidden mt-20 md:mt-32">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4A4A4A] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2B2B2B]">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
              className="group flex flex-col px-0 md:px-10 first:pl-0 last:pr-0 py-10 md:py-0"
            >
              {/* Icon + accent badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-lg bg-[#2B2B2B] border border-[#3A3A3A] flex items-center justify-center text-[#D0D0D0] group-hover:border-[#555] transition-colors">
                  {stat.icon}
                </div>
                <span className="text-[12px] font-bold tracking-widest uppercase text-white bg-[#3A3A3A] border border-[#555] px-4 py-1.5 rounded-full shadow-lg">
                  {stat.accent}
                </span>
              </div>

              {/* Big number */}
              <div className="font-heading font-bold text-[52px] md:text-[60px] leading-none text-white mb-3 tabular-nums">
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <h3 className="font-heading font-semibold text-[18px] text-[#D0D0D0] mb-2">
                {stat.label}
              </h3>

              {/* Sub tags */}
              <p className="text-[13px] text-[#888] tracking-wide mb-4 font-medium">
                {stat.sub}
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-[#2B2B2B] mb-4" />

              {/* Detail line */}
              <p className="text-[15px] text-[#999] leading-[1.6]">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-16 pt-10 border-t border-[#2B2B2B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-[16px] text-[#888] max-w-lg leading-[1.6]">
            All platforms available on a single subscription model.{" "}
            <span className="text-[#D0D0D0]">Scale up or down as your operation evolves — no lock-in.</span>
          </p>
          <div className="flex gap-4 shrink-0">
            <a
              href="#roi-calculator"
              className="text-[15px] font-bold text-white border border-[#3A3A3A] px-6 py-3 rounded-lg hover:border-[#4A4A4A] hover:bg-[#2B2B2B] transition-all"
            >
              Calculate ROI
            </a>
            <a
              href="#platforms"
              className="text-[15px] font-bold bg-white text-[#1A1A1A] px-6 py-3 rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              Explore Platforms →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4A4A4A] to-transparent" />
    </section>
  );
}
