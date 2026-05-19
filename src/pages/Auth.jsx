import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FloatingGreeting, FloatingDust } from "../components/Effects";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // MOUSE TRACKING FOR AMBIENT GLOW
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const orbRotateX = useTransform(smoothMouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [4, -4]);
  const orbRotateY = useTransform(smoothMouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1500], [-4, 4]);

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col md:flex-row overflow-clip bg-[#050816] text-[#F6EBDD] cursor-default font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* CUSTOM CURSOR (reusing the elegant one) */}
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

      {/* Cinematic Grain Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-[110] opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* LEFT SIDE - VISUALS */}
      <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#D6A04C]/10 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2B1B0F_0%,#050816_70%)]" />
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,160,76,0.15)_0%,transparent_60%)]" />
        
        {/* Multilingual Greetings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <FloatingGreeting initialTop="20%" initialLeft="20%" duration={14} delay={0} baseFont="Tiro Devanagari Hindi" />
          <FloatingGreeting initialTop="40%" initialLeft="70%" duration={16} delay={2} baseFont="Noto Serif Bengali" />
          <FloatingGreeting initialTop="75%" initialLeft="15%" duration={12} delay={1} baseFont="Noto Serif Tamil" />
          <FloatingGreeting initialTop="60%" initialLeft="80%" duration={18} delay={4} baseFont="General Sans" />
        </motion.div>

        {/* Floating Dust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <FloatingDust count={25} maxDriftX={60} maxDriftY={200} minOpacity={0.1} maxOpacity={0.25} />
        </motion.div>

        {/* AI Orb */}
        <motion.div 
          className="relative flex items-center justify-center z-20 mb-8 md:mb-12"
          style={{ rotateX: orbRotateX, rotateY: orbRotateY, transformPerspective: 1000 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,160,76,0.25)_0%,transparent_60%)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border border-[#D6A04C]/20 bg-[radial-gradient(circle_at_top,#3E2613,#0A101B_72%)] backdrop-blur-3xl shadow-[0_0_80px_rgba(214,160,76,0.1)] flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-gradient-to-br from-[#F4C76B] via-[#D6A04C] to-[#8B4A22] blur-[10px]"
            />
            <div className="absolute w-[140px] h-[140px] rounded-full border border-[#F4C76B]/10" />
            <div className="absolute w-[50px] h-[50px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,243,216,0.9)_0%,transparent_70%)]" />
            <div className="absolute top-8 left-10 w-12 h-12 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center z-20"
        >
          <h2 
            className="text-[28px] md:text-[36px] text-[#F6EBDD] tracking-[-0.02em]"
            style={{ fontFamily: "Cabinet Grotesk", fontWeight: 400 }}
          >
            Designed to listen.
          </h2>
          <h2 
            className="text-[28px] md:text-[36px] text-[#D6A04C] tracking-[-0.02em] -mt-1 md:-mt-2"
            style={{ fontFamily: "Cabinet Grotesk", fontWeight: 400 }}
          >
            Built to understand.
          </h2>
        </motion.div>
      </div>

      {/* RIGHT SIDE - AUTH FORM */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 z-20">
        
        {/* Subtle background glow for the right side */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(139,74,34,0.08)_0%,transparent_60%)] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full max-w-[420px] relative"
        >
          {/* Header */}
          <div className="mb-10 text-center md:text-left flex flex-col items-center md:items-start">
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
            <p className="mt-2 text-[#A8957C] text-[15px]" style={{ fontFamily: "General Sans" }}>
              Your ambient intelligence companion.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin?.(); }}>
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D6A04C]/0 via-[#D6A04C]/20 to-[#D6A04C]/0 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="relative w-full bg-[#0A0D18]/80 border border-white/10 rounded-lg px-4 py-3.5 text-[#F6EBDD] placeholder-[#A8957C]/60 focus:outline-none focus:border-[#D6A04C]/40 focus:bg-[#0D1222] transition-all duration-300"
                  style={{ fontFamily: "General Sans" }}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D6A04C]/0 via-[#D6A04C]/20 to-[#D6A04C]/0 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="relative w-full bg-[#0A0D18]/80 border border-white/10 rounded-lg px-4 py-3.5 text-[#F6EBDD] placeholder-[#A8957C]/60 focus:outline-none focus:border-[#D6A04C]/40 focus:bg-[#0D1222] transition-all duration-300"
                  style={{ fontFamily: "General Sans" }}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[15px]" style={{ fontFamily: "General Sans" }}>
              <button type="button" className="text-[#A8957C] hover:text-[#D6A04C] transition-colors">
                Create account
              </button>
              <button type="button" className="text-[#A8957C] hover:text-[#D6A04C] transition-colors">
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -1, boxShadow: "0 10px 30px -10px rgba(214,160,76,0.3)" }}
              whileTap={{ scale: 0.98, y: 0 }}
              type="submit"
              className="w-full bg-[#D6A04C]/10 border border-[#D6A04C]/30 text-[#D6A04C] rounded-lg py-3.5 transition-colors hover:bg-[#D6A04C]/20 tracking-wide uppercase text-[13px]"
              style={{ fontFamily: "General Sans" }}
            >
              Continue
            </motion.button>
          </form>

          <div className="mt-8 flex items-center justify-center">
            <div className="w-full h-px bg-white/5"></div>
            <span className="px-4 text-[11px] text-[#A8957C] uppercase tracking-widest" style={{ fontFamily: "General Sans" }}>OR</span>
            <div className="w-full h-px bg-white/5"></div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full flex items-center justify-center gap-3 border border-white/10 rounded-lg py-3.5 text-[#F6EBDD] transition-colors text-[14px]"
            style={{ fontFamily: "General Sans" }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </motion.button>
          
          <div className="mt-8 text-center">
             <button 
              onClick={() => onLogin?.()}
              className="text-[#A8957C] hover:text-[#F6EBDD] text-[12px] uppercase tracking-wider transition-colors border-b border-transparent hover:border-white/20 pb-0.5" 
              style={{ fontFamily: "General Sans" }}>
               Continue as Guest
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
