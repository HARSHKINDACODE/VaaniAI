import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mic } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

import { FloatingGreeting, FloatingDust } from "./components/Effects";
import Sidebar from "./components/Sidebar";
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
  const [isDawn, setIsDawn] = useState(() => {
    return localStorage.getItem('theme') === 'dawn';
  });
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);
  const canvasRef = useRef(null);

  const outerPulseRef = useRef(null);
  const orbCoreRef = useRef(null);
  const orbLiquidRef = useRef(null);

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
  
  // PARALLAX VALUES - Kept only subtle orbX/Y
  const orbX = useTransform(smoothMouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1500], [-12, 12]);
  const orbY = useTransform(smoothMouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-12, 12]);

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
        const average = sum / dataArray.length; // range roughly 0 to 120
        
        // Directly update DOM elements without calling setVolume to avoid re-renders!
        if (outerPulseRef.current) {
          const pulseScale = 1 + (average / 100);
          const pulseOpacity = Math.min(0.5, average / 100);
          outerPulseRef.current.style.transform = `scale(${pulseScale})`;
          outerPulseRef.current.style.opacity = pulseOpacity;
        }

        if (orbCoreRef.current) {
          const coreScale = 1 + (average / 200);
          orbCoreRef.current.style.transform = `scale(${coreScale})`;
        }

        if (orbLiquidRef.current) {
          const liquidScale = 1 + (average / 150);
          const liquidOpacity = Math.min(1.0, 0.7 + (average / 200));
          orbLiquidRef.current.style.transform = `scale(${liquidScale})`;
          orbLiquidRef.current.style.opacity = liquidOpacity;
        }
        
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          const width = canvas.width;
          const height = canvas.height;
          
          ctx.clearRect(0, 0, width, height);
          ctx.lineWidth = 2;
          ctx.strokeStyle = isDawn ? "rgba(139, 159, 255, 0.8)" : "rgba(214, 160, 76, 0.8)";
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
    
    // Reset DOM styles to default
    if (outerPulseRef.current) {
      outerPulseRef.current.style.transform = '';
      outerPulseRef.current.style.opacity = '';
    }
    if (orbCoreRef.current) {
      orbCoreRef.current.style.transform = '';
    }
    if (orbLiquidRef.current) {
      orbLiquidRef.current.style.transform = '';
      orbLiquidRef.current.style.opacity = '';
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dawn') {
      document.documentElement.setAttribute('data-theme', 'dawn');
      setIsDawn(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
      setIsDawn(false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (microphoneRef.current) microphoneRef.current.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col overflow-clip bg-[var(--bg-body)] text-[var(--color-text-main)]"
      onMouseMove={handleMouseMove}
    >
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* BACKGROUND ATMOSPHERE */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--bg-gradient-top)_0%,var(--bg-gradient-bottom)_58%)]"
      ></div>

      {/* Cinematic Ambient Glow & Light Motion - Uses GPU-accelerated CSS animations */}
      <div 
        className="absolute top-[-250px] left-[-180px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-glow)_0%,transparent_60%)] animate-ambient-glow-1 gpu-accelerated"
      />

      <div 
        className="absolute bottom-[-300px] right-[-150px] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent-15)_0%,transparent_60%)] animate-ambient-glow-2 gpu-accelerated"
      />

      {/* Floating Dust - Simplified and reduced to 8 particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingDust count={8} maxDriftX={80} maxDriftY={250} minOpacity={0.15} maxOpacity={0.3} />
      </div>

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
              className="text-[28px] md:text-[32px] tracking-tight font-light text-[var(--color-primary)] ml-[2px] drop-shadow-sm"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              AI
            </h1>
          </div>
          <p
            className="mt-1 text-[10px] uppercase tracking-[0.45em] text-[var(--color-text-muted)]"
            style={{
              fontFamily: "General Sans",
            }}
          >
            Ambient Intelligence
          </p>
        </div>
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
  <Settings isDawn={isDawn} onThemeChange={setIsDawn} />
) : (
        <>
          {/* MAIN CONTENT - Spaced down for better top breathing room, offset by sidebar width on desktop */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-start pt-16 md:pt-24 px-6 md:pl-[80px] text-center pb-[100px] md:pb-8 pointer-events-auto">

        {/* BACKGROUND MULTILINGUAL TEXT - Reduced to 2 subtle, static positioned greetings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <FloatingGreeting initialTop="35%" initialLeft="12%" duration={16} delay={0} baseFont="Tiro Devanagari Hindi" />
          <FloatingGreeting initialTop="45%" initialLeft="78%" duration={18} delay={4} baseFont="Noto Serif Bengali" />
        </motion.div>

        {/* ORB SECTION - Spaced lower with mb-16 */}
        <motion.div 
          className="relative flex items-center justify-center mb-16"
          style={isMobile ? {} : { x: orbX, y: orbY }}
        >
          {/* Deep Ambient Glow - Uses GPU-accelerated CSS breathing pulse */}
          <div className="absolute flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,var(--orb-pulse-glow)_0%,transparent_60%)] animate-orb-pulse gpu-accelerated" />
          </div>

          {/* Sacred Metallic Ring - CSS spin animation (thinner stroke, lower opacity, slower movement) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            className="absolute flex items-center justify-center pointer-events-none"
          >
            <div
              className="rounded-full border-[0.5px] border-[var(--primary-10)] gpu-accelerated animate-ring-slowest"
              style={{ width: "360px", height: "360px" }}
            />
          </motion.div>

          {/* Outer Pulse - Controlled via direct ref when listening, CSS when idle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute flex items-center justify-center pointer-events-none"
          >
            <div
              ref={outerPulseRef}
              className={`w-[180px] h-[180px] rounded-full border-[0.5px] border-[var(--color-primary-light)]/10 gpu-accelerated ${!isListening ? 'animate-orb-pulse' : ''}`}
            />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            className="relative z-10 cursor-pointer pointer-events-auto"
            onClick={() => setIsListening(!isListening)}
          >
            {/* MAIN ENERGY CORE */}
            <div
              ref={orbCoreRef}
              className={`relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden border border-[var(--primary-15)] bg-[radial-gradient(circle_at_top,var(--orb-gradient-top),var(--orb-gradient-bottom)_72%)] md:shadow-[0_0_80px_var(--orb-glow)] shadow-[0_0_40px_var(--orb-inner-glow)] flex items-center justify-center transition-all duration-100 ${!isListening ? 'animate-orb-idle' : ''}`}
            >
              {/* Flattened Inner Layers: Glow + Reflection */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `
                    radial-gradient(circle at center, ${isDawn ? 'rgba(235,239,250,0.9)' : 'rgba(255,243,216,0.9)'} 0%, transparent 35%),
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 25%)
                  `
                }}
              />

              {/* Liquid Gradient Layer */}
              <div
                ref={orbLiquidRef}
                className="absolute flex items-center justify-center transition-all duration-100"
              >
                <div
                  className={`w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full ${isDawn ? 'bg-[radial-gradient(circle_at_center,rgba(186,197,232,0.8)_0%,rgba(140,163,214,0.6)_40%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(244,199,107,0.8)_0%,rgba(214,160,76,0.6)_40%,transparent_70%)]'} ${!isListening ? 'animate-orb-liquid' : ''}`}
                />
              </div>

              {/* Inner Atmospheric Layer */}
              <div className="absolute w-[160px] h-[160px] rounded-full border border-[var(--color-primary-light)]/10" />

              <div className="hidden md:block">
                <FloatingDust count={8} maxDriftX={20} maxDriftY={60} minOpacity={0.15} maxOpacity={0.3} />
              </div>

            </div>
          </motion.div>
        </motion.div>

        {/* WAVEFORM */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isListening ? 1 : 0, height: isListening ? 60 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center justify-center overflow-hidden z-20 mb-4"
        >
          <canvas ref={canvasRef} width={400} height={60} className="w-[300px] md:w-[400px]" style={{ filter: "drop-shadow(0 0 8px var(--primary-40))" }} />
        </motion.div>

        {/* HERO TEXT - Perfectly balanced visual hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
          className="mt-0 flex flex-col items-center justify-center text-center z-10"
        >
          <h1
            className="text-[40px] md:text-[76px] leading-[1.0] tracking-[-0.03em] text-[var(--color-text-main)]"
            style={{ fontFamily: "Cabinet Grotesk", fontWeight: 400 }}
          >
            Designed to listen.
          </h1>
          <h1
            className="text-[40px] md:text-[76px] leading-[1.0] tracking-[-0.03em] text-[var(--color-primary)]"
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
          className="mt-5 max-w-2xl text-[16px] md:text-[18px] leading-[1.7] text-[var(--color-text-muted)] z-10"
          style={{ fontFamily: "General Sans", fontWeight: 400 }}
        >
          Crafted for India’s languages, accents, and emotions. A voice experience that <br className="hidden md:block" /> feels calm, natural, and deeply human.
        </motion.p>

        {/* CTA - Spaced properly at mt-8 */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
          onClick={toggleListening}
          whileHover={{ 
            scale: 1.03, 
            y: -2,
            boxShadow: isDawn ? "0 10px 40px -10px rgba(140,163,214,0.4)" : "0 10px 40px -10px rgba(214,160,76,0.4)"
          }}
          whileTap={{ scale: 0.98, y: 0 }}
          className="group relative mt-8 overflow-hidden rounded-full border border-[var(--primary-20)] bg-[#0D1420]/70 px-8 py-4 backdrop-blur-2xl transition-all duration-500 hover:border-[var(--color-primary-light)]/50 hover:bg-[#0D1420]/90 z-10"
        >
          {/* Hover Glow */}
          <div className={`absolute inset-0 transition-all duration-700 bg-gradient-to-r from-[var(--primary-10)] via-[var(--color-primary-light)]/10 to-[var(--accent-10)] ${isListening ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          <div className="relative flex items-center gap-4">
            <div className={`w-11 h-11 rounded-full border border-[var(--color-primary-light)]/20 flex items-center justify-center transition-colors duration-500 ${isListening ? 'bg-[var(--primary-30)]' : 'bg-[var(--primary-10)]'}`}>
              <Mic size={18} className={`transition-colors duration-500 ${isListening ? 'text-white' : 'text-[var(--color-primary-light)]'}`} />
            </div>
            <span
              className="text-[14px] uppercase tracking-[0.28em] text-[#F5E9D8]"
              style={{ fontFamily: "General Sans" }}
            >
              {isListening ? "Stop Conversation" : "Begin Conversation"}
            </span>
          </div>
        </motion.button>

        {/* SUPPORTED LANGUAGES - Cleanly positioned at mt-12 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-12 w-full max-w-[600px] flex justify-center items-center gap-x-4 gap-y-2 flex-wrap z-10 px-4"
        >
          <div
            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]/60"
            style={{ fontFamily: "General Sans" }}
          >
            <span>HINDI</span>
            <span className="text-[var(--primary-30)] text-[8px]">•</span>
            <span>TAMIL</span>
            <span className="text-[var(--primary-30)] text-[8px]">•</span>
            <span>BENGALI</span>
            <span className="text-[var(--primary-30)] text-[8px]">•</span>
            <span>MARATHI</span>
            <span className="text-[var(--primary-30)] text-[8px]">•</span>
            <span>GUJARATI</span>
            <span className="text-[var(--primary-30)] text-[8px]">•</span>
            <span>KANNADA</span>
          </div>
        </motion.div>
      </div>

      {/* LOWER ATMOSPHERE & FADE */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[45vh] z-10 overflow-hidden flex items-end justify-center">
        {/* Glow Reflection from Orb */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-[-150px] w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_center,var(--orb-glow)_0%,transparent_70%)] rounded-[100%]"
        />
        
        {/* Slow moving gradient base */}
        <motion.div
          animate={{ x: ["-20%", "20%", "-20%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute bottom-[-100px] w-[140vw] h-[200px] bg-[radial-gradient(ellipse_at_center,var(--accent-15)_0%,transparent_70%)]"
        />

        {/* Blurred Waveform Illusion */}
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1], scaleY: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-[20px] w-[600px] h-[60px] bg-[radial-gradient(ellipse_at_center,var(--orb-glow)_0%,transparent_70%)] rounded-full"
        />

        {/* Atmospheric Haze (Fade to Black at very bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-body)] via-[var(--bg-body)]/70 to-transparent" />
      </div>
        </>
      )}
    </div>
  );
}