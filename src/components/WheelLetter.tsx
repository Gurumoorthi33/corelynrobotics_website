"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function WheelLetter() {
  const [anchors, setAnchors] = useState<{
    start: { x: number, y: number, size: number, width: number } | null,
    end: { x: number, y: number, size: number, width: number } | null
  }>({ start: null, end: null });

  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      const startEl = document.getElementById("wheel-start");
      const endEl = document.getElementById("wheel-end");
      
      if (startEl && endEl) {
        const rect1 = startEl.getBoundingClientRect();
        const rect2 = endEl.getBoundingClientRect();
        
        setAnchors({
          start: { 
            x: rect1.left + window.scrollX, 
            y: rect1.top + window.scrollY, 
            size: rect1.height,
            width: rect1.width
          },
          end: { 
            x: rect2.left + window.scrollX, 
            y: rect2.top + window.scrollY, 
            size: rect2.height,
            width: rect2.width
          }
        });
      }
    };

    // Use ResizeObserver for more reliable measurement on layout shifts
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    
    // Also measure on resize, scroll, and with multiple delays
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    
    const timer1 = setTimeout(measure, 100);
    const timer2 = setTimeout(measure, 500);
    const timer3 = setTimeout(measure, 1000);
    const timer4 = setTimeout(measure, 3000);
    
    // Polling interval for the first 5 seconds to catch any slow layout shifts
    const interval = setInterval(measure, 500);
    const intervalStop = setTimeout(() => clearInterval(interval), 5000);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
      clearTimeout(intervalStop);
    };
  }, []);

  // Define default ranges to avoid Hook errors and handle null anchors safely
  const startRange = (anchors.start?.y ?? 0) - 100;
  const endRange = (anchors.end?.y ?? 0) - 100;

  // Interpolate between the two anchor points
  const midRange = (startRange + endRange) / 2;

  const rawX = useTransform(scrollY, [startRange, midRange, endRange], [
    anchors.start?.x ?? 0, 
    (typeof window !== "undefined" ? window.innerWidth * 0.8 : 500), // Swerve to the right
    anchors.end?.x ?? 0
  ]);

  const currentWidth = useTransform(scrollY, [startRange, midRange, endRange], [
    anchors.start?.width ?? 0, 
    (anchors.start?.width ?? 0) * 1.5, // Slight width expansion during swerve
    anchors.end?.width ?? 0
  ]);

  const currentPageY = useTransform(scrollY, [startRange, endRange], [anchors.start?.y ?? 0, anchors.end?.y ?? 0]);

  // Size increases in the middle
  const baseSize = useTransform(scrollY, [startRange, midRange, endRange], [
    anchors.start?.size ?? 0,
    (anchors.start?.size ?? 0) * 2.5, // Scale up to 2.5x in the middle
    anchors.end?.size ?? 0
  ]);

  // Centering logic: start position + (available width - wheel size) / 2
  // We use the baseSize with the multiplier for the final look
  const sizeMultiplier = 1.3;
  const currentX = useTransform([rawX, currentWidth, baseSize], (latest) => {
    const [rx, cw, bs] = latest as [number, number, number];
    return rx + (cw - bs * sizeMultiplier) / 2;
  });

  const displaySize = useTransform(baseSize, (s: number) => s * sizeMultiplier);

  // Convert page Y to viewport Y for position: fixed
  // Add a softened "bounce" effect to the Y position in the middle
  const yBounce = useTransform(scrollY, [startRange, midRange, endRange], [0, -40, 0]);
  const viewportY = useTransform([currentPageY, scrollY, baseSize, yBounce], (latest) => {
    const [py, sy, bs, bounce] = latest as [number, number, number, number];
    return py - sy - (bs * (sizeMultiplier - 1)) / 2 + bounce;
  });

  if (!anchors.start || !anchors.end) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        left: currentX,
        top: viewportY,
        width: displaySize,
        height: displaySize,
        zIndex: 40,
      }}
      animate={{ rotate: 360 }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }
      }}
      className="pointer-events-none flex items-center justify-center"
    >
      <img
        src="/assets/wheel/wheel.png"
        alt="Rotating Wheel"
        className="w-full h-full object-contain"
        style={{ borderRadius: "50%" }}
      />
    </motion.div>
  );
}




