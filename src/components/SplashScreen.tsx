"use client";

import React, { useEffect, useState } from "react";
import RobotLoader from "./RobotLoader";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the splash screen after exactly 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex items-center justify-center"
        >
          <RobotLoader size="lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}




