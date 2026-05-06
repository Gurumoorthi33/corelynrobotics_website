"use client";

import { motion } from "framer-motion";

export default function Positioning() {
  return (
    <section className="bg-white py-24 md:py-32 relative overflow-visible mt-20 md:mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side: Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-black"
          >
            <video 
              src="/assets/section/vdo_1.mp4" 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop
              playsInline
            />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-heading font-bold text-[36px] md:text-[64px] leading-[1.1] text-[#1A1A1A] mb-8">
              A R<span id="wheel-start" style={{ opacity: 0, display: 'inline-block', width: '1.2ch', height: '1em' }}>o</span>botics Infrastructure Company. 
              <br className="hidden sm:block" />
              Not a Robot Seller.
            </h2>
          
          <div className="space-y-6 text-[#4A4A4A] text-[18px] md:text-[20px] leading-[1.7]">
            <p>
              Corelyn Robotics is a robotics infrastructure company. We don&apos;t sell
              machines — we operate them, maintain them, and scale them alongside
              your business. Think of it as cloud computing, applied to your
              factory floor.
            </p>
            <p>
              Our clients subscribe to robotic operations. You define the workflow;
              we handle everything else — deployment, uptime, upgrades, and
              support.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-20 pt-16 border-t border-[#D0D0D0]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <h4 className="font-heading font-bold text-[18px] text-[#1A1A1A] tracking-wider uppercase mb-4">
              VISION
            </h4>
            <p className="text-[18px] text-[#4A4A4A] leading-[1.7]">
              To make industrial-grade robotics accessible to every manufacturer
              in India — without the barrier of capital investment.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <h4 className="font-heading font-bold text-[18px] text-[#1A1A1A] tracking-wider uppercase mb-4">
              MISSION
            </h4>
            <p className="text-[18px] text-[#4A4A4A] leading-[1.7]">
              To build a Robotics-as-a-Service platform that enables businesses —
              from Coimbatore textile mills to enterprise warehouses — to scale
              operations without ownership complexity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




