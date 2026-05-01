"use client";

import { motion } from "framer-motion";

const partners = [
  "Apollo Tyres",
  "Siemens",
  "Infosys",
  "IIT Madras (XTIC)",
  "NIT Trichy",
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
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1.1] text-[#1A1A1A]">
            Backed by Strong Institutions
          </h2>
        </motion.div>

        {/* Two Sub-blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="bg-white p-8 md:p-12 border border-[#EEEEEE] rounded-lg"
          >
            <span className="text-[#4A4A4A] text-sm font-bold tracking-wider uppercase mb-2 block">
              Parent Company
            </span>
            <h3 className="font-heading font-bold text-[28px] text-[#1A1A1A] mb-4">
              Transista Technologies
            </h3>
            <p className="text-[18px] text-[#4A4A4A] leading-[1.7]">
              Engineering foundation, product development pipeline, and commercial infrastructure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="bg-white p-8 md:p-12 border border-[#EEEEEE] rounded-lg"
          >
            <span className="text-[#4A4A4A] text-sm font-bold tracking-wider uppercase mb-2 block">
              Incubated at
            </span>
            <h3 className="font-heading font-bold text-[28px] text-[#1A1A1A] mb-4">
              R Shivakumar Foundation – TBIF
            </h3>
            <p className="font-medium text-[#1A1A1A] text-[18px] mb-2">
              SRM TRP Engineering College, Trichy
            </p>
            <p className="text-[18px] text-[#4A4A4A] leading-[1.7]">
              R&D access, prototyping support, and industry interface.
            </p>
          </motion.div>
        </div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-[#D0D0D0] pb-4">
            <h4 className="font-heading font-bold text-[22px] text-[#1A1A1A]">
              Industry & Academic Partners
            </h4>
            <span className="text-[16px] text-[#4A4A4A] mt-2 md:mt-0">
              Access through SRM TRP MoUs
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white border border-[#EEEEEE] h-24 flex items-center justify-center rounded-sm hover:shadow-sm transition-shadow"
              >
                <span className="font-heading font-bold text-[#1A1A1A] text-center px-4">
                  {partner}
                </span>
              </div>
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
              <span className="font-heading font-bold text-[40px] text-[#1A1A1A]">
                {stat.value}
              </span>
              <span className="text-[18px] text-[#4A4A4A]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
