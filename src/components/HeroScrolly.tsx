"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

const TEXT_BLOCKS = [
  { line1: "Autonomous Robots.", line2: "Deployed as a Service." },
];

const TOTAL_FRAMES = 26;

export default function HeroScrolly() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic background colors that shift with the scroll/frames
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "#FFFFFF", // Start
      "#FAF9F7", // Very Light Warm Grey
      "#F9F9F7", // Exact Match Mid-Frame
      "#F9F9F7", // Exact Match Mid-Frame
      "#FAF9F7", // Very Light Warm Grey
      "#FFFFFF"  // End
    ]
  );
  // Calculate current frame (1 to 26)
  const currentFrame = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  return (
    <motion.section 
      ref={containerRef} 
      className="relative h-[208vh] md:h-[371vh] pt-24 transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
    >
      {/* Sticky Container */}
      <div className="sticky top-24 h-[calc(100vh-6rem)] w-full flex flex-col md:flex-row items-center px-6 md:px-12">
        
        {/* Left Side: Animation Frames */}
        <div className="relative w-full h-[40vh] md:h-full md:w-1/2 overflow-hidden">
          {Array.from({ length: TOTAL_FRAMES }).map((_, i) => {
            const frameNum = i + 1;
            const fileName = `ezgif-frame-${frameNum.toString().padStart(3, "0")}.jpg`;
            const opacity = useTransform(
              currentFrame,
              [frameNum - 0.501, frameNum - 0.5, frameNum + 0.5, frameNum + 0.501],
              [0, 1, 1, 0]
            );

            return (
              <motion.div
                key={frameNum}
                className="absolute inset-0 w-full h-full"
                style={{ opacity }}
              >
                <Image
                  src={`/assets/hero/newframe/${fileName}`}
                  alt={`Hero frame ${frameNum}`}
                  fill
                  className="object-contain"
                  priority={frameNum <= 5}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Text Blocks */}
        <div className="relative w-full flex-1 md:w-1/2 flex items-center justify-center md:justify-start md:pl-12 pb-20">
          {TEXT_BLOCKS.map((block, index) => {
            // Text stays visible longer or stays fixed
            const opacity = useTransform(
              scrollYProgress,
              [0, 0.1, 0.9, 1],
              [1, 1, 1, 0]
            );
            
            return (
              <motion.div
                key={index}
                className="text-[#1A1A1A] text-center md:text-left"
                style={{ opacity }}
              >
                <h1 className="font-heading font-bold text-[40px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tight">
                  {block.line1}
                  <br />
                  <span className="text-[#4A4A4A]">{block.line2}</span>
                </h1>
                <p className="mt-6 text-[18px] md:text-[20px] text-[#4A4A4A] max-w-md">
                  We provide the robots, the software, and the support. 
                  You provide the floor space. Pay only for productive runtime.
                </p>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
                >
                  <button className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors shadow-lg">
                    Get Started
                  </button>
                  <button className="border-2 border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 rounded-full font-bold hover:bg-[#F5F5F5] transition-colors">
                    How it Works
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
