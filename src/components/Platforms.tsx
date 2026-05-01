"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const platforms = [
  {
    id: "C100",
    image: "/assets/products/c100.png",
    name: "Compact Sorter & Research Platform",
    description: "A lightweight autonomous platform for sorting operations and R&D. ROS-ready, compact footprint, easy sensor integration.",
    specs: {
      payload: "Low payload class",
      drive: "Differential",
      bestFor: "Sorting lines, education, prototyping",
    },
  },
  {
    id: "C100 4WD",
    image: "/assets/products/c100-4wd.png",
    name: "Outdoor Inspection Robot",
    description: "All-terrain platform for outdoor surveillance and perimeter inspection. Operates where conventional AMRs cannot.",
    specs: {
      payload: "Low payload class",
      drive: "4WD off-road",
      bestFor: "Inspection, surveillance, agriculture, defence",
    },
  },
  {
    id: "C500",
    image: "/assets/products/c500.png",
    name: "Industrial Lifter-Tugger AMR",
    description: "Purpose-built industrial AMR for lifting and tugging. Heavy-duty chassis with autonomous navigation for multi-shift operations.",
    specs: {
      payload: "500 kg",
      drive: "Differential, high-torque",
      bestFor: "In-plant logistics, auto components",
    },
  },
  {
    id: "C1000",
    image: "/assets/products/c1000.png",
    name: "Heavy Lifter-Tugger AMR",
    description: "Corelyn's highest-capacity platform. Reinforced industrial frame for continuous operation in demanding environments.",
    specs: {
      payload: "1,000 kg",
      drive: "High-torque reinforced",
      bestFor: "Heavy manufacturing, warehousing, mining, cold chain",
    },
  },
];

export default function Platforms() {
  return (
    <section id="platforms" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-16 text-center md:text-left mx-auto md:mx-0"
        >
          <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1.1] text-[#1A1A1A] mb-6">
            Four Platforms. Every Industrial Need.
          </h2>
          <p className="text-[18px] md:text-[20px] text-[#4A4A4A] leading-[1.7]">
            From compact lab sorters to heavy-duty 1,000 kg tuggers — Corelyn&apos;s
            platform range covers every deployment environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group bg-white border border-[#EEEEEE] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
                <Image
                  src={platform.image}
                  alt={platform.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white px-3 py-1 text-sm font-bold tracking-wider rounded-sm">
                  {platform.id}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-[24px] text-[#1A1A1A] mb-3">
                  {platform.name}
                </h3>
                <p className="text-[16px] text-[#4A4A4A] leading-[1.6] mb-6 flex-grow">
                  {platform.description}
                </p>
                
                <div className="space-y-3 pt-6 border-t border-[#EEEEEE] mb-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between text-[15px]">
                    <span className="text-[#4A4A4A]">Payload:</span>
                    <span className="font-medium text-[#1A1A1A]">{platform.specs.payload}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between text-[15px]">
                    <span className="text-[#4A4A4A]">Drive:</span>
                    <span className="font-medium text-[#1A1A1A]">{platform.specs.drive}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between text-[15px]">
                    <span className="text-[#4A4A4A]">Best For:</span>
                    <span className="font-medium text-[#1A1A1A] text-right sm:max-w-[200px] leading-tight mt-1 sm:mt-0">{platform.specs.bestFor}</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center text-[#1A1A1A] font-medium hover:text-[#4A4A4A] transition-colors"
                >
                  View Platform <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
