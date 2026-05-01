"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "₹500 / hr", label: "Starting runtime rate" },
  { value: "4 Platforms", label: "AMR, Sorter & Inspection" },
  { value: "100–2,000 kg", label: "SME to enterprise payload range" },
];

export default function StatsStrip() {
  return (
    <section className="w-full bg-[#F5F5F5] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col border-l border-[#D0D0D0] pl-6 md:pl-8"
            >
              <h3 className="font-heading font-bold text-[40px] text-[#1A1A1A] leading-tight mb-2">
                {stat.value}
              </h3>
              <p className="text-[18px] text-[#4A4A4A] tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
