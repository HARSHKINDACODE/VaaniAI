import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GREETINGS = [
  "नमस्ते", // Hindi
  "வணக்கம்", // Tamil
  "નમસ્તે", // Gujarati
  "ನಮಸ್ಕಾರ", // Kannada
  "প্রণাম", // Bengali
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
  "నమస్కారం", // Telugu
  "നമസ്കാരം" // Malayalam
];

export const FloatingGreeting = React.memo(function FloatingGreeting({ initialTop, initialLeft, duration, delay, baseFont }) {
  const [textIndex, setTextIndex] = useState(Math.floor(Math.random() * GREETINGS.length));
  
  const [randomVals] = useState({
    opacityMax: Math.random() * 0.06 + 0.04,
    yDrift: (Math.random() * -40) - 10,
    xDrift: (Math.random() * 40) - 20,
    fontSize: `${Math.random() * 16 + 28}px`
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % GREETINGS.length);
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <motion.p
      animate={{ 
        opacity: [0, randomVals.opacityMax, 0],
        y: [0, randomVals.yDrift, 0],
        x: [0, randomVals.xDrift, 0]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: duration, 
        delay: delay,
        ease: "easeInOut"
      }}
      className="absolute text-[#D6A04C]"
      style={{ 
        top: initialTop, 
        left: initialLeft, 
        fontFamily: baseFont,
        fontSize: randomVals.fontSize,
        whiteSpace: "nowrap"
      }}
    >
      {GREETINGS[textIndex]}
    </motion.p>
  );
});

export const FloatingDust = React.memo(function FloatingDust({ count = 35, maxDriftX = 50, maxDriftY = 150, minOpacity = 0.15, maxOpacity = 0.3 }) {
  const [particles] = useState(() => 
    [...Array(count)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacityMax: Math.random() * (maxOpacity - minOpacity) + minOpacity,
      driftX: (Math.random() - 0.5) * maxDriftX, 
      driftY: -(Math.random() * maxDriftY + 20)
    }))
  );

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, p.driftY],
            x: [0, p.driftX],
            opacity: [0, p.opacityMax, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: "linear"
          }}
          className="absolute rounded-full bg-[#F4C76B]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.y}%`,
            left: `${p.x}%`,
          }}
        />
      ))}
    </>
  );
});
