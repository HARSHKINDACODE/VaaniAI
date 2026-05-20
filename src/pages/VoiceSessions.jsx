import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { 
  Mic, 
  Square, 
  Pause, 
  Play, 
  Activity, 
  Globe2, 
  Smile, 
  Radio
} from "lucide-react";

// HUD Data Card Component
const HudCard = ({ title, value, icon: Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="relative group p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden hover:bg-white/[0.04] transition-colors duration-500"
  >
    <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[var(--color-primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-[var(--primary-30)] group-hover:bg-[var(--primary-10)] transition-all duration-500">
        <Icon size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary-light)] transition-colors" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]/70 mb-1" style={{ fontFamily: "General Sans" }}>
          {title}
        </span>
        <span className="text-[14px] text-[var(--color-text-main)] font-medium tracking-wide" style={{ fontFamily: "General Sans" }}>
          {value}
        </span>
      </div>
    </div>
  </motion.div>
);

// Realtime Waveform Component
const LiveWaveform = ({ isRecording, isPaused }) => {
  const active = isRecording && !isPaused;
  return (
    <div className="flex items-end justify-center gap-1 h-16 opacity-80 mix-blend-screen">
      {[...Array(40)].map((_, i) => {
        // Pre-calculate pseudo-random animation delays and durations to avoid computation
        const duration = 0.3 + (i % 7) * 0.1;
        const delay = (i % 11) * 0.05;
        const maxHeight = 16 + (i % 5) * 10; // heights between 16px and 56px

        return (
          <div
            key={i}
            className="w-1 md:w-1.5 rounded-t-sm bg-gradient-to-t from-[var(--accent-50)] via-[var(--color-primary)] to-[var(--color-primary-light)] transition-all duration-300"
            style={{ 
              height: active ? undefined : "4px",
              boxShadow: active ? "0 0 10px var(--primary-30)" : "none",
              animation: active ? `live-bar-pulse ${duration}s infinite ease-in-out alternate` : "none",
              animationDelay: active ? `${delay}s` : "0s",
              "--max-height": `${maxHeight}px`
            }}
          />
        );
      })}
    </div>
  );
};

export default function VoiceSessions() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0); // in hundredths of a second
  const [sensitivity, setSensitivity] = useState(50);

  // Simulated active data
  const [accent, setAccent] = useState("Analyzing...");
  const [emotion, setEmotion] = useState("Neutral");
  const [quality, setQuality] = useState(98);

  const controls = useAnimation();

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Simulation logic
  useEffect(() => {
    let interval = null;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        // Randomly update emotion
        if (Math.random() > 0.95) {
          const emotions = ["Calm", "Inquisitive", "Thoughtful", "Focused", "Expressive"];
          setEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
        }
        
        // Set accent after a few seconds
        if (time > 300 && accent === "Analyzing...") {
          setAccent("Indian English / Hindi");
        }
        
        // Fluctuate quality
        if (Math.random() > 0.8) {
          setQuality(Math.floor(85 + Math.random() * 15));
        }

      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused, time, accent]);

  const formatTime = (time) => {
    const minutes = Math.floor((time / 100) / 60).toString().padStart(2, '0');
    const seconds = Math.floor((time / 100) % 60).toString().padStart(2, '0');
    const hundredths = (time % 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${hundredths}`;
  };

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity }
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    setTime(0);
    setAccent("Analyzing...");
    setEmotion("Neutral");
    setQuality(98);
    controls.stop();
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col pt-6 md:pt-10 px-4 md:px-24 pb-28 md:pb-12 relative z-20">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-8 md:mb-12 md:pl-[60px] gap-4"
      >
        <div>
          <h1 className="text-[42px] tracking-tight text-[var(--color-text-main)] font-light mb-2" style={{ fontFamily: "Cabinet Grotesk" }}>
            Voice Session
          </h1>
          <p className="text-[var(--color-text-muted)] text-[14px] flex items-center gap-2" style={{ fontFamily: "General Sans" }}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRecording && !isPaused ? 'bg-red-400' : 'bg-[var(--color-text-muted)]'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isRecording && !isPaused ? 'bg-red-500' : 'bg-[var(--color-text-muted)]'}`}></span>
            </span>
            {isRecording ? (isPaused ? "Session Paused" : "Live Analysis Active") : "Ready to start session"}
          </p>
        </div>
        
        {/* Session Timer */}
        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-primary)]/70 mb-1" style={{ fontFamily: "General Sans" }}>
            Elapsed Time
          </span>
          <span className="text-[32px] md:text-[40px] font-light text-[var(--color-text-main)] tabular-nums tracking-wider" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {formatTime(time)}
          </span>
        </div>
      </motion.div>

      {/* Main Interface */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 md:pl-[60px] max-w-6xl w-full pb-10">
        
        {/* Left Side: Orb Visualizer */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          
          {/* Audio Quality Radial Meter */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-0 right-0 flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full backdrop-blur-md"
          >
            <Radio size={14} className={quality > 90 ? "text-green-400" : quality > 80 ? "text-yellow-400" : "text-red-400"} />
            <span className="text-[12px] text-[var(--color-text-muted)] font-medium" style={{ fontFamily: "General Sans" }}>
              Sig {quality}%
            </span>
          </motion.div>

          {/* Central Orb */}
          <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] flex items-center justify-center mt-[-40px]">
            {/* Ambient Background Glow */}
            <div
              className={`absolute w-[120%] h-[120%] rounded-full bg-[var(--color-primary)]/10 blur-[60px] gpu-accelerated transition-opacity duration-500 ${isRecording && !isPaused ? 'opacity-100 animate-orb-pulse' : 'opacity-20'}`}
            />
            
            {/* Spinning Ring */}
            <div
              className="absolute rounded-full border-[0.5px] border-dashed border-[var(--primary-10)] gpu-accelerated animate-ring-slowest"
              style={{ width: "75%", height: "75%" }}
            />

            {/* Core Mic Element */}
            <motion.div
              animate={controls}
              className={`relative z-10 w-[120px] h-[120px] rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 shadow-[0_0_80px_var(--orb-glow)] ${isRecording && !isPaused ? 'bg-[radial-gradient(circle_at_top,var(--orb-gradient-top),var(--orb-gradient-bottom)_80%)] border border-[var(--primary-40)]' : 'bg-white/[0.02] border border-white/10'}`}
            >
              <Mic size={40} className={isRecording && !isPaused ? "text-[var(--color-text-main)] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-[var(--color-text-muted)]"} strokeWidth={1.5} />
              
              {/* Inner Pulse */}
              <div
                className={`absolute inset-0 rounded-full border-[0.5px] border-[var(--primary-20)] pointer-events-none gpu-accelerated ${isRecording && !isPaused ? 'animate-voice-pulse' : 'opacity-0'}`}
              />
            </motion.div>
          </div>

          {/* Realtime Waveform HUD */}
          <div className="w-full mt-12 px-8">
            <LiveWaveform isRecording={isRecording} isPaused={isPaused} />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2" />
            <div className="flex justify-between mt-2 text-[10px] text-[var(--color-text-muted)]/50 uppercase tracking-widest" style={{ fontFamily: "General Sans" }}>
              <span>20Hz</span>
              <span>Freq Map</span>
              <span>20kHz</span>
            </div>
          </div>
        </div>

        {/* Right Side: Data HUD & Controls */}
        <div className="w-full md:w-[320px] flex flex-col gap-6 justify-center">
          
          <div className="flex flex-col gap-3">
            <HudCard title="Detected Accent" value={accent} icon={Globe2} delay={0.2} />
            <HudCard title="Vocal Emotion" value={emotion} icon={Smile} delay={0.3} />
            <HudCard title="Cognitive Load" value={isRecording && !isPaused ? "Optimal" : "Standby"} icon={Activity} delay={0.4} />
          </div>

          {/* Voice Sensitivity Control */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md mt-2"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]" style={{ fontFamily: "General Sans" }}>
                Mic Sensitivity
              </span>
              <span className="text-[11px] text-[var(--color-primary)]">{sensitivity}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--primary-80)]"
            />
          </motion.div>

          {/* Control Deck */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-between gap-3 mt-4"
          >
            {!isRecording ? (
              <button 
                onClick={handleStart}
                className="flex-1 group relative overflow-hidden rounded-xl border border-[var(--primary-30)] bg-[var(--primary-10)] py-4 backdrop-blur-xl transition-all duration-300 hover:bg-[var(--primary-20)] hover:border-[var(--primary-50)] flex items-center justify-center gap-2"
              >
                <Play size={16} className="text-[var(--color-text-main)]" fill="currentColor" />
                <span className="text-[12px] uppercase tracking-widest text-[var(--color-text-main)] font-medium" style={{ fontFamily: "General Sans" }}>Start Session</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
            ) : (
              <>
                <button 
                  onClick={handlePause}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  {isPaused ? <Play size={16} className="text-[var(--color-text-main)]" /> : <Pause size={16} className="text-[var(--color-text-main)]" />}
                  <span className="text-[12px] uppercase tracking-widest text-[var(--color-text-main)] font-medium" style={{ fontFamily: "General Sans" }}>{isPaused ? "Resume" : "Pause"}</span>
                </button>
                <button 
                  onClick={handleStop}
                  className="w-16 h-[50px] rounded-xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/50 flex items-center justify-center"
                >
                  <Square size={16} className="text-red-400" fill="currentColor" />
                </button>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
