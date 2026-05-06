"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const TEXT_BLOCKS = [
  { line1: "Autonomous Robots.", line2: "Deployed as a Service." },
];

const TOTAL_FRAMES = 26;

const FRAME_COLORS = [
  "#F9FCF5", // Frame 1
  "#F9FBF5", // Frame 2
  "#F8FAF4", // Frame 3
  "#F9FAF4", // Frame 4
  "#F9FBF5", // Frame 5
  "#FAFBF5", // Frame 6
  "#FAFBF5", // Frame 7
  "#FAFBF5", // Frame 8
  "#FAFBF4", // Frame 9
  "#F9FAF4", // Frame 10
  "#FAFBF5", // Frame 11
  "#FAFBF5", // Frame 12
  "#FAFBF5", // Frame 13
  "#FAFBF5", // Frame 14
  "#FAFBF5", // Frame 15
  "#FBFCF6", // Frame 16
  "#FBFDF7", // Frame 17
  "#FAFCF6", // Frame 18
  "#FAFBF5", // Frame 19
  "#FAFBF5", // Frame 20
  "#FAFBF5", // Frame 21
  "#FAFBF5", // Frame 22
  "#F9FAF4", // Frame 23
  "#FAFBF5", // Frame 24
  "#FBFCF6", // Frame 25
  "#FAFBF5"  // Frame 26
];

interface FrameImageProps {
  frameNum: number;
  currentFrame: MotionValue<number>;
}

function FrameImage({ frameNum, currentFrame }: FrameImageProps) {
  const fileName = `ezgif-frame-${frameNum.toString().padStart(3, "0")}.jpg`;
  const opacity = useTransform(
    currentFrame,
    [frameNum - 0.501, frameNum - 0.5, frameNum + 0.5, frameNum + 0.501],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
    >
      <Image
        src={`/assets/hero/newframe/${fileName}`}
        alt={`Hero frame ${frameNum}`}
        fill
        className="object-contain scale-[1.15] md:scale-100"
        priority={frameNum <= 5}
      />
    </motion.div>
  );
}

interface TextBlockProps {
  block: typeof TEXT_BLOCKS[0];
  scrollYProgress: MotionValue<number>;
}

function TextBlock({ block, scrollYProgress }: TextBlockProps) {
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [1, 1, 1, 0]
  );

  return (
    <motion.div
      className="text-[#1A1A1A] text-center md:text-left"
      style={{ opacity }}
    >
      <h1 className="font-heading font-bold text-[40px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tight">
        <span className="text-[rgb(45,189,110)]">{block.line1}</span>
        <br />
        <span className="text-[#4A4A4A]">{block.line2}</span>
      </h1>
      <p className="mt-6 text-[18px] md:text-[20px] text-[#4A4A4A] max-w-md">
        Industrial-grade autonomous mobile robots for factories, warehouses, and logistics — on a subscription. No capital investment. No maintenance overhead. Just output.
      </p>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start"
      >
        <a href="#platforms" className="bg-[#2DBD6E] text-white px-8 py-4 rounded-full font-bold hover:bg-[#22A05C] transition-colors shadow-lg">
          Explore Platforms
        </a>
        <a href="#contact" className="border-2 border-[#2DBD6E] text-[#1A1A1A] px-8 py-4 rounded-full font-bold hover:bg-[#E8F9F0] transition-colors">
          Get a Deployment Quote
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function HeroScrolly() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic background colors that shift with the scroll/frames
  const bgColor = useTransform(
    scrollYProgress,
    FRAME_COLORS.map((_, i) => i / (FRAME_COLORS.length - 1)),
    FRAME_COLORS
  );
  
  // Calculate current frame (1 to 26)
  const currentFrame = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  return (
    <motion.section 
      ref={containerRef} 
      className="relative h-[200vh] md:h-[240vh] pt-32 md:pt-40"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtle white overlay to lighten the frame colors */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none z-0" />

      {/* Sticky Container */}
      <div className="sticky top-28 md:top-32 h-[90vh] md:h-[85vh] w-full flex flex-col md:flex-row items-center px-6 md:px-12 z-10">
        
        {/* Left Side: Animation Frames */}
        <div className="relative w-full md:w-1/2 h-[65vh] md:h-full overflow-visible flex items-center justify-center">
          {Array.from({ length: TOTAL_FRAMES }).map((_, i) => (
            <FrameImage key={i + 1} frameNum={i + 1} currentFrame={currentFrame} />
          ))}
        </div>

        {/* Right Side: Text Blocks */}
        <div className="relative w-full flex-1 md:w-1/2 flex items-center justify-center md:justify-start md:pl-12 md:pb-24">
          {TEXT_BLOCKS.map((block, index) => (
            <TextBlock key={index} block={block} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}




