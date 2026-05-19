import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mic, Settings2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

import { FloatingGreeting, FloatingDust } from "./components/Effects";
import Sidebar from "./components/Sidebar";
import QuickActionsOverlay from "./components/QuickActionsOverlay";
import Conversations from "./pages/Conversations";
import VoiceSessions from "./pages/VoiceSessions";
import Languages from "./pages/Languages";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Memory from "./pages/Memory";

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);
  const canvasRef = useRef(null);

  // MOUSE TRACKING
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  
  // PARALLAX VALUES
  const orbRotateX = useTransform(smoothMouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [8, -8]);
  const orbRotateY = useTransform(smoothMouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1500], [-8, 8]);
  const orbX = useTransform(smoothMouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1500], [-12, 12]);
  const orbY = useTransform(smoothMouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-12, 12]);

  const bgX = useTransform(smoothMouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1500], [15, -15]);
  const bgY = useTransform(smoothMouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [15, -15]);

  const orbGlowX = useTransform(smoothMouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1500], [-40, 40]);
  const orbGlowY = useTransform(smoothMouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-40, 40]);
  
  const innerOrbX = useTransform(smoothMouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1500], [-25, 25]);
  const innerOrbY = useTransform(smoothMouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-25, 25]);

  const dustX = useTransform(smoothMouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1500], [20, -20]);
  const dustY = useTransform(smoothMouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [20, -20]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      analyserRef.current.fftSize = 512;
      microphoneRef.current.connect(analyserRef.current);
      
      setIsListening(true);
      
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      const timeDataArray = new Uint8Array(analyserRef.current.fftSize);
      
      const updateVolume = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        analyserRef.current.getByteTimeDomainData(timeDataArray);
        
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        setVolume(average); // 0 to 255
        
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          const width = canvas.width;
          const height = canvas.height;
          
          ctx.clearRect(0, 0, width, height);
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(214, 160, 76, 0.8)";
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          
          const sliceWidth = width * 1.0 / timeDataArray.length;
          let x = 0;
          
          for (let i = 0; i < timeDataArray.length; i++) {
            const v = timeDataArray[i] / 128.0;
            const y = v * (height / 2);
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          
          ctx.stroke();
        }

        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      
      updateVolume();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (microphoneRef.current) microphoneRef.current.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setIsListening(false);
    setVolume(0);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (microphoneRef.current) microphoneRef.current.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col overflow-clip bg-[#050816] text-[#F6EBDD] cursor-none"
      onMouseMove={handleMouseMove}
    >
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <QuickActionsOverlay />
      
      {/* CUSTOM CURSOR */}
      <motion.div
        className="hidden md:flex pointer-events-none fixed top-0 left-0 z-[100] items-center justify-center mix-blend-screen"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
      >
        <div className="w-1.5 h-1.5 bg-[#F4C76B] rounded-full shadow-[0_0_10px_2px_rgba(244,199,107,0.6)]" />
      </motion.div>

      <motion.div
        className="hidden md:flex pointer-events-none fixed top-0 left-0 z-[90] items-center justify-center mix-blend-screen"
        style={{ x: smoothMouseX, y: smoothMouseY, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
      >
        <div className="w-10 h-10 border border-[#D6A04C]/40 rounded-full" />
        <div className="absolute w-40 h-40 bg-[radial-gradient(circle_at_center,rgba(214,160,76,0.15)_0%,transparent_70%)] rounded-full" />
      </motion.div>


      {/* BACKGROUND ATMOSPHERE */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2B1B0F_0%,#050816_58%)] scale-[1.05]"
        style={{ x: bgX, y: bgY }}
      ></motion.div>

      {/* Cinematic Ambient Glow & Light Motion */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-250px] left-[-180px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,160,76,0.15)_0%,transparent_60%)]"
        style={{ x: bgX, y: bgY }}
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.7, 0.5],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-300px] right-[-150px] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,74,34,0.15)_0%,transparent_60%)]"
        style={{ x: bgX, y: bgY }}
      />

      {/* Drifting Fog Layers */}
      <motion.div 
        animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "5%", "0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[-10%] w-[120%] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(214,160,76,0.06)_0%,transparent_70%)] pointer-events-none"
      />
      <motion.div 
        animate={{ x: ["10%", "-10%", "10%"], y: ["5%", "0%", "5%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[20%] right-[-10%] w-[120%] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(139,74,34,0.06)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Cinematic Grain Overlay - Disabled on mobile for performance */}
      <div 
        className="hidden md:block pointer-events-none fixed inset-0 z-[110] opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Dust */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ x: dustX, y: dustY }}
      >
        <FloatingDust count={40} maxDriftX={80} maxDriftY={250} minOpacity={0.15} maxOpacity={0.3} />
      </motion.div>

      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        className="relative z-30 flex items-center justify-between pr-6 md:pr-14 pl-6 md:pl-[120px] pt-8"
      >
        <div>
          <div className="flex items-center">
            <h1
              className="text-[28px] md:text-[32px] tracking-tight font-medium text-white drop-shadow-sm"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Vaani
            </h1>
            <h1
              className="text-[28px] md:text-[32px] tracking-tight font-light text-[#D6A04C] ml-[2px] drop-shadow-sm"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              AI
            </h1>
          </div>
          <p
            className="mt-1 text-[10px] uppercase tracking-[0.45em] text-[#927F68]"
            style={{
              fontFamily: "General Sans",
            }}
          >
            Ambient Intelligence
          </p>
        </div>

        <button className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl hover:bg-white/[0.05] transition-all duration-500 z-30 pointer-events-auto cursor-none">
          <Settings2
            size={18}
            className="text-[#E8D9C1]"
          />
        </button>
      </motion.nav>

      {activeTab === "Conversations" ? (
  <Conversations />
) : activeTab === "Voice Sessions" ? (
  <VoiceSessions />
) : activeTab === "Languages" ? (
  <Languages />
) : activeTab === "AI Insights" ? (
  <Insights />
) : activeTab === "Profile" ? (
  <Profile />
) : activeTab === "Memory" ? (
  <Memory />
) : activeTab === "Settings" ? (
  <Settings />
) : (
        <>
          {/* MAIN CONTENT */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 text-center pb-[100px] md:pb-8 pt-2 pointer-events-auto">

        {/* BACKGROUND MULTILINGUAL TEXT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <FloatingGreeting initialTop="18%" initialLeft="18%" duration={12} delay={0} baseFont="Tiro Devanagari Hindi" />
          <FloatingGreeting initialTop="35%" initialLeft="75%" duration={15} delay={3} baseFont="Noto Serif Bengali" />
          <FloatingGreeting initialTop="68%" initialLeft="12%" duration={14} delay={1} baseFont="Noto Serif Tamil" />
          <FloatingGreeting initialTop="78%" initialLeft="82%" duration={16} delay={5} baseFont="Tiro Devanagari Hindi" />
          <FloatingGreeting initialTop="45%" initialLeft="8%" duration={13} delay={4} baseFont="General Sans" />
          <FloatingGreeting initialTop="25%" initialLeft="85%" duration={17} delay={2.5} baseFont="Tiro Devanagari Hindi" />
        </motion.div>

        {/* ORB SECTION */}
        <motion.div 
          className="relative flex items-center justify-center mb-12"
          style={{ x: orbX, y: orbY, rotateX: orbRotateX, rotateY: orbRotateY, transformPerspective: 1000 }}
        >
          {/* Deep Ambient Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.5 }}
            className="absolute flex items-center justify-center"
            style={{ x: orbGlowX, y: orbGlowY }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.16, 0.28, 0.16] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,160,76,0.25)_0%,transparent_60%)]"
            />
          </motion.div>
          {/* Sacred Metallic Rings */}
          {[
            { size: 300, duration: 14, reverse: false }, // Inner
            { size: 360, duration: 20, reverse: true },  // Middle
            { size: 420, duration: 30, reverse: false }  // Outer
          ].map((ring, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.15, duration: 1.2, ease: "easeOut" }}
              className="absolute flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  rotate: ring.reverse ? -360 : 360,
                  scale: [1, 1.03, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: ring.duration, ease: "linear" },
                  scale: { repeat: Infinity, duration: 4 + index * 1.5, ease: "easeInOut" },
                  opacity: { repeat: Infinity, duration: 5 + index * 1.2, ease: "easeInOut" }
                }}
                className="rounded-full border border-[#D6A04C]/30"
                style={{ width: `${ring.size}px`, height: `${ring.size}px` }}
              />
            </motion.div>
          ))}
          {/* Outer Pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: isListening ? 1 + (volume / 100) : [1, 1.15],
                opacity: isListening ? Math.min(0.5, volume / 100) : [0.25, 0]
              }}
              transition={isListening ? { type: "tween", ease: "easeOut", duration: 0.1 } : { repeat: Infinity, duration: 3 }}
              className="w-[180px] h-[180px] rounded-full border border-[#F4C76B]/20"
            />
          </motion.div>
          {/* MAIN ENERGY CORE WRAPPER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* MAIN ENERGY CORE */}
            <motion.div
              animate={{
                scale: isListening ? 1 + (volume / 200) : [1, 1.02, 1],
                rotate: [0, 1, -1, 0]
              }}
              transition={isListening ? { scale: { type: "spring", stiffness: 300, damping: 15 }, rotate: { repeat: Infinity, duration: 7 } } : { repeat: Infinity, duration: 7 }}
              className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden border border-[#D6A04C]/15 bg-[radial-gradient(circle_at_top,#3E2613,#0A101B_72%)] backdrop-blur-3xl shadow-[0_0_120px_rgba(214,160,76,0.15)] flex items-center justify-center"
            >
              {/* Liquid Gradient Layer */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
                className="absolute flex items-center justify-center"
                style={{ x: innerOrbX, y: innerOrbY }}
              >
                <motion.div
                  animate={{
                    scale: isListening ? 1 + (volume / 150) : [1, 1.08, 1],
                    opacity: isListening ? Math.min(1, 0.7 + (volume / 200)) : [0.7, 1, 0.7]
                  }}
                  transition={isListening ? { type: "spring", stiffness: 400, damping: 25 } : { repeat: Infinity, duration: 4 }}
                  className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full bg-gradient-to-br from-[#F4C76B] via-[#D6A04C] to-[#8B4A22] blur-[12px]"
                />
              </motion.div>
              {/* Inner Atmospheric Layer */}
              <div className="absolute w-[160px] h-[160px] rounded-full border border-[#F4C76B]/10" />
              <div className="hidden md:block">
                <FloatingDust count={15} maxDriftX={20} maxDriftY={60} minOpacity={0.15} maxOpacity={0.3} />
              </div>
              
              {/* Center Intro Greeting */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
                animate={{ opacity: [0, 1, 1, 0], filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"], scale: [0.8, 1, 1, 1.1] }}
                transition={{ duration: 4, times: [0, 0.2, 0.8, 1], delay: 1.5, ease: "easeInOut" }}
                className="absolute z-30 pointer-events-none flex items-center justify-center"
              >
                <span className="text-[36px] md:text-[48px] text-[#2B1B0F] mix-blend-color-burn drop-shadow-sm opacity-90" style={{ fontFamily: "Rozha One", fontWeight: 400 }}>
                  नमस्ते
                </span>
              </motion.div>

              {/* Center Glow */}
              <motion.div 
                className="absolute w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,243,216,0.9)_0%,transparent_70%)]"
                style={{ x: innerOrbX, y: innerOrbY }}
              />
              {/* Reflection */}
              <motion.div 
                className="absolute top-10 left-12 md:top-14 md:left-16 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]"
                style={{ x: innerOrbX, y: innerOrbY }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* WAVEFORM */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isListening ? 1 : 0, height: isListening ? 60 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center justify-center overflow-hidden z-20 mb-4"
        >
          <canvas ref={canvasRef} width={400} height={60} className="w-[300px] md:w-[400px]" style={{ filter: "drop-shadow(0 0 8px rgba(214,160,76,0.4))" }} />
        </motion.div>

        {/* HERO TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
          className="mt-2 flex flex-col items-center justify-center text-center z-10"
        >
          <h1
            className="text-[40px] md:text-[76px] leading-[1.0] tracking-[-0.03em] text-[#F6EBDD]"
            style={{ fontFamily: "Cabinet Grotesk", fontWeight: 400 }}
          >
            Designed to listen.
          </h1>
          <h1
            className="text-[40px] md:text-[76px] leading-[1.0] tracking-[-0.03em] text-[#D6A04C]"
            style={{ fontFamily: "Cabinet Grotesk", fontWeight: 400 }}
          >
            Built to understand.
          </h1>
        </motion.div>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-[#A8957C] z-10"
          style={{ fontFamily: "General Sans", fontWeight: 400 }}
        >
          Crafted for India’s languages, accents, and emotions. A voice experience that <br className="hidden md:block" /> feels calm, natural, and deeply human.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
          onClick={toggleListening}
          whileHover={{ 
            scale: 1.03, 
            y: -2,
            boxShadow: "0 10px 40px -10px rgba(214,160,76,0.4)"
          }}
          whileTap={{ scale: 0.98, y: 0 }}
          className="group relative mt-10 overflow-hidden rounded-full border border-[#D6A04C]/20 bg-[#0D1420]/70 px-8 py-4 backdrop-blur-2xl transition-all duration-500 hover:border-[#F4C76B]/50 hover:bg-[#0D1420]/90 z-10"
        >
          {/* Hover Glow */}
          <div className={`absolute inset-0 transition-all duration-700 bg-gradient-to-r from-[#D6A04C]/10 via-[#F4C76B]/10 to-[#8B4A22]/10 ${isListening ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          <div className="relative flex items-center gap-4">
            <div className={`w-11 h-11 rounded-full border border-[#F4C76B]/20 flex items-center justify-center transition-colors duration-500 ${isListening ? 'bg-[#D6A04C]/30' : 'bg-[#D6A04C]/10'}`}>
              <Mic size={18} className={`transition-colors duration-500 ${isListening ? 'text-white' : 'text-[#F4C76B]'}`} />
            </div>
            <span
              className="text-[14px] uppercase tracking-[0.28em] text-[#F5E9D8]"
              style={{ fontFamily: "General Sans" }}
            >
              {isListening ? "Stop Conversation" : "Begin Conversation"}
            </span>
          </div>
        </motion.button>

        {/* LANGUAGE CAROUSEL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-14 w-full max-w-[300px] md:max-w-[450px] overflow-hidden flex z-10"
          style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex whitespace-nowrap items-center text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#A8957C]/60"
            style={{ fontFamily: "General Sans" }}
          >
            <span className="mx-5">HINDI</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">TAMIL</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">BENGALI</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">MARATHI</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">GUJARATI</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">KANNADA</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            
            <span className="mx-5">HINDI</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">TAMIL</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">BENGALI</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">MARATHI</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">GUJARATI</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
            <span className="mx-5">KANNADA</span>
            <span className="text-[#D6A04C]/30 text-[8px]">•</span>
          </motion.div>
        </motion.div>
      </div>

      {/* LOWER ATMOSPHERE & FADE */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[45vh] z-10 overflow-hidden flex items-end justify-center">
        {/* Glow Reflection from Orb */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-[-150px] w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(214,160,76,0.15)_0%,transparent_70%)] rounded-[100%]"
        />
        
        {/* Slow moving gradient base */}
        <motion.div
          animate={{ x: ["-20%", "20%", "-20%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute bottom-[-100px] w-[140vw] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(139,74,34,0.15)_0%,transparent_70%)]"
        />

        {/* Blurred Waveform Illusion */}
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1], scaleY: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-[20px] w-[600px] h-[60px] bg-[radial-gradient(ellipse_at_center,rgba(214,160,76,0.15)_0%,transparent_70%)] rounded-full"
        />

        {/* Atmospheric Haze (Fade to Black at very bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/70 to-transparent" />
      </div>
        </>
      )}
    </div>
  );
}