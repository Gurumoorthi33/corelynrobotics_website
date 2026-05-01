"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Factory, 
  PackageSearch, 
  GraduationCap, 
  ShieldCheck, 
  ShieldAlert, 
  HardHat, 
  Tractor 
} from "lucide-react";

const industries = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    application: "Assembly line feeding, part transfer, finished goods transport.",
    badge: "C500 / C1000",
    image: "/assets/industries/manufacturing.png",
    icon: <Factory className="w-6 h-6" />,
  },
  {
    id: "warehousing",
    name: "Warehousing & Logistics",
    application: "Pallet movement, cross-docking, sortation.",
    badge: "C100 / C500 / C1000",
    image: "/assets/industries/warehousing.png",
    icon: <PackageSearch className="w-6 h-6" />,
  },
  {
    id: "education",
    name: "Education & Research",
    application: "Robotics labs, autonomous algorithms testing.",
    badge: "C100",
    image: "/assets/industries/education.png",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "inspection",
    name: "Inspection & Surveillance",
    application: "Perimeter monitoring, structural checks.",
    badge: "C100 4WD",
    image: "/assets/industries/inspection.png",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "defence",
    name: "Defence & Tactical",
    application: "Reconnaissance, explosive ordnance disposal support.",
    badge: "C100 4WD",
    image: "/assets/industries/defence.png",
    icon: <ShieldAlert className="w-6 h-6" />,
  },
  {
    id: "mining",
    name: "Mining & Heavy Industry",
    application: "Material hauling in harsh environments.",
    badge: "C1000",
    image: "/assets/industries/mining.png",
    icon: <HardHat className="w-6 h-6" />,
  },
  {
    id: "agriculture",
    name: "Agriculture & Outdoor",
    application: "Crop monitoring, payload transport in fields.",
    badge: "C100 4WD",
    image: "/assets/industries/agriculture.png",
    icon: <Tractor className="w-6 h-6" />,
  },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-[#F5F5F5] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1.1] text-[#1A1A1A]">
            Robots for Every Sector
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="group bg-white rounded-lg border border-[#EEEEEE] overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-48 w-full bg-[#EEEEEE] overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center text-white">
                  <div className="mr-3 p-2 bg-white/20 rounded-md backdrop-blur-sm">
                    {industry.icon}
                  </div>
                  <h3 className="font-heading font-bold text-[20px] leading-tight">
                    {industry.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-[#F5F5F5] text-[#4A4A4A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm border border-[#EEEEEE]">
                    {industry.badge}
                  </span>
                </div>
                <p className="text-[16px] text-[#4A4A4A] leading-[1.6]">
                  {industry.application}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
