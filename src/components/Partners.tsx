"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Apollo Tyres", type: "Industry" },
  { name: "Siemens", type: "Industry" },
  { name: "Infosys", type: "Industry" },
  { name: "IIT Madras (XTIC)", type: "Academic" },
  { name: "NIT Trichy", type: "Academic" },
];

const stats = [
  { value: "5+", label: "Strategic Partners" },
  { value: "2", label: "Incubation Hubs" },
  { value: "100%", label: "Indian Ecosystem" },
];

export default function Partners() {
  return (
    <section id="partners" className="bg-[#F5F5F5] py-24 md:py-32 border-t border-[#D0D0D0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-16"
        >
          <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1.1] text-[#1A1A1A] mb-6">
            Backed by Strong Institutions
          </h2>
          <p className="text-[18px] text-[#4A4A4A] leading-[1.7]">
            Corelyn operates within a strong institutional ecosystem — providing technology infrastructure, R&amp;D access, and industry deployment pathways from day one.
          </p>
        </motion.div>

        {/* Institutional Backing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="bg-white p-8 md:p-10 border border-[#EEEEEE] rounded-xl"
          >
            <span className="text-[#4A4A4A] text-xs font-bold tracking-wider uppercase mb-3 block">
              Parent Company
            </span>
            <h3 className="font-heading font-bold text-[26px] text-[#1A1A1A] mb-3">
              Transista Technologies
            </h3>
            <p className="text-[17px] text-[#4A4A4A] leading-[1.7]">
              Engineering foundation, product development pipeline, and commercial infrastructure behind every Corelyn platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="bg-white p-8 md:p-10 border border-[#EEEEEE] rounded-xl"
          >
            <span className="text-[#4A4A4A] text-xs font-bold tracking-wider uppercase mb-3 block">
              Incubated at
            </span>
            <h3 className="font-heading font-bold text-[26px] text-[#1A1A1A] mb-1">
              R Shivakumar Foundation – TBIF
            </h3>
            <p className="font-semibold text-[#1A1A1A] text-[16px] mb-3">
              SRM TRP Engineering College, Trichy
            </p>
            <p className="text-[17px] text-[#4A4A4A] leading-[1.7]">
              R&amp;D access, prototyping infrastructure, and direct industry interface through active MoU partnerships.
            </p>
          </motion.div>
        </div>

        {/* Partners Grid — static, no carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#D0D0D0] pb-4 gap-2">
            <h4 className="font-heading font-bold text-[22px] text-[#1A1A1A]">
              Industry &amp; Academic Partners
            </h4>
            <span className="text-[15px] text-[#4A4A4A]">
              Access through SRM TRP MoUs
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-[#EEEEEE] rounded-lg h-24 flex flex-col items-center justify-center px-4 hover:shadow-sm hover:border-[#D0D0D0] transition-all"
              >
                <span className="font-heading font-bold text-[#1A1A1A] text-center text-[14px] leading-tight">
                  {partner.name}
                </span>
                <span className="text-[11px] text-[#4A4A4A] mt-1 uppercase tracking-wider">
                  {partner.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-[#D0D0D0]">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="text-center md:text-left flex flex-col md:border-l md:border-[#D0D0D0] md:pl-8 first:border-0 first:pl-0"
            >
              <span className="font-heading font-bold text-[48px] text-[#1A1A1A] leading-none">
                {stat.value}
              </span>
              <span className="text-[18px] text-[#4A4A4A] mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
