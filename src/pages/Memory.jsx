import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BrainCircuit, 
  Network, 
  History, 
  Heart, 
  Sparkles, 
  Clock, 
  Bookmark, 
  UserCircle, 
  Globe2, 
  Mic, 
  Volume2,
  Calendar,
  Activity,
  Lightbulb,
  Search
} from "lucide-react";

// Mock Data for Memory Timeline
const TIMELINE_EVENTS = [
  { id: 1, type: "preference", title: "Preferred Language Updated", desc: "You switched primary ambient language to Hindi.", time: "2 hours ago", icon: Globe2, color: "text-[var(--color-primary)]" },
  { id: 2, type: "insight", title: "Routine Detected", desc: "You usually ask for a news briefing at 8:00 AM.", time: "Yesterday", icon: Clock, color: "text-[var(--color-primary-light)]" },
  { id: 3, type: "conversation", title: "Cinematic UI Brainstorm", desc: "Saved key concepts about glassmorphism and glow effects.", time: "May 18", icon: Lightbulb, color: "text-[var(--color-accent)]" },
  { id: 4, type: "voice", title: "Voice Profile Calibrated", desc: "Adjusted to detect a softer tone in evening hours.", time: "May 15", icon: Mic, color: "text-[var(--color-primary)]" },
];

// Mock Data for AI Knowledge
const AI_KNOWLEDGE = [
  { category: "Routines", items: ["Morning Briefing @ 8 AM", "Focus Mode @ 2 PM", "Evening Wind-down @ 10 PM"] },
  { category: "Preferences", items: ["Speaks: Hindi, English", "Tone: Calm & Analytical", "News: Tech & Design"] },
  { category: "Context", items: ["Building 'VaaniAI' app", "Interested in Neural UI", "Prefers Dark Mode"] },
];

// Floating Neural Node Component
const NeuralNode = ({ x, y, size, delay, title, icon: Icon, active }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [y, y - 10, y],
      x: [x, x + 5, x]
    }}
    transition={{ 
      opacity: { duration: 1, delay },
      scale: { duration: 1, delay, type: "spring" },
      y: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" },
      x: { repeat: Infinity, duration: 5 + Math.random() * 2, ease: "easeInOut" }
    }}
    className="absolute flex flex-col items-center justify-center group z-10"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <div className={`relative flex items-center justify-center rounded-full border transition-all duration-500 backdrop-blur-md ${
      active 
        ? 'w-14 h-14 bg-[var(--primary-20)] border-[var(--primary-50)] shadow-[0_0_30px_var(--primary-30)]' 
        : 'w-10 h-10 bg-[var(--orb-gradient-bottom)]/80 border-white/10 group-hover:border-[var(--color-primary)]/30 group-hover:bg-white/5'
    }`}>
      <Icon size={active ? 24 : 16} className={`${active ? 'text-[var(--color-primary-light)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)]'} transition-colors`} />
      
      {active && (
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-full border border-[var(--color-primary)] pointer-events-none"
        />
      )}
    </div>
    <span className={`mt-2 text-[10px] uppercase tracking-widest whitespace-nowrap transition-colors ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)]'}`} style={{ fontFamily: "General Sans" }}>
      {title}
    </span>
  </motion.div>
);

// Animated connection lines between nodes
const NeuralConnections = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: "blur(0.5px)" }}>
    <motion.path
      d="M 50% 50% Q 65% 35% 80% 30%"
      fill="none"
      stroke="url(#glowGradient)"
      strokeWidth="1.5"
      strokeDasharray="5 5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.3 }}
      transition={{ duration: 2, delay: 1 }}
    />
    <motion.path
      d="M 50% 50% Q 30% 60% 20% 70%"
      fill="none"
      stroke="url(#glowGradient)"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.2 }}
      transition={{ duration: 2, delay: 1.2 }}
    />
    <motion.path
      d="M 50% 50% Q 40% 30% 25% 20%"
      fill="none"
      stroke="url(#glowGradient)"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.4 }}
      transition={{ duration: 2, delay: 1.4 }}
    />
    <motion.path
      d="M 50% 50% Q 70% 70% 85% 65%"
      fill="none"
      stroke="url(#glowGradient)"
      strokeWidth="1.5"
      strokeDasharray="3 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.25 }}
      transition={{ duration: 2, delay: 1.6 }}
    />
    <defs>
      <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="1" />
        <stop offset="50%" stopColor="var(--color-primary-light)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Memory() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="w-full h-full min-h-screen flex flex-col pt-6 md:pt-10 px-4 md:px-24 pb-28 md:pb-12 relative z-20 overflow-hidden">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-8 md:mb-10 md:pl-[60px] gap-4"
      >
        <div>
          <h1 className="text-[42px] tracking-tight text-[var(--color-text-main)] font-light mb-2 flex items-center gap-4" style={{ fontFamily: "Cabinet Grotesk" }}>
            Memory Core
            <div className="px-3 py-1 rounded-full bg-[var(--primary-10)] border border-[var(--primary-30)] flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary-light)]"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-primary)]" style={{ fontFamily: "General Sans" }}>Syncing</span>
            </div>
          </h1>
          <p className="text-[var(--color-text-muted)] text-[14px]" style={{ fontFamily: "General Sans" }}>
            The neural map of everything VaaniAI knows about you.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="h-12 px-5 bg-white/[0.03] border border-white/10 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all duration-300 flex items-center gap-2 backdrop-blur-md">
            <Search size={16} />
            <span className="text-[13px] font-medium" style={{ fontFamily: "General Sans" }}>Search Memory</span>
          </button>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 md:gap-8 md:pl-[60px] h-full max-w-[1400px] pb-10 overflow-y-auto no-scrollbar">
        
        {/* Left Side: Neural Network Visualizer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 rounded-3xl bg-[radial-gradient(circle_at_center,var(--orb-gradient-bottom)_0%,var(--bg-gradient-bottom)_100%)] border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col min-h-[400px] lg:min-h-full"
        >
          <div className="absolute top-6 left-6 z-20">
            <h3 className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-primary)]/70 flex items-center gap-2" style={{ fontFamily: "General Sans" }}>
              <Network size={14} />
              Contextual Map
            </h3>
          </div>

          {/* Neural Map Area */}
          <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
            
            {/* Deep glow in center */}
            <div className="absolute w-[300px] h-[300px] bg-[var(--primary-10)] rounded-full blur-[100px] pointer-events-none" />
            
            <NeuralConnections />

            {/* Nodes */}
            <NeuralNode x={50} y={50} delay={0.3} title="Identity Core" icon={UserCircle} active={true} />
            <NeuralNode x={20} y={70} delay={0.5} title="Routines" icon={Clock} active={false} />
            <NeuralNode x={80} y={30} delay={0.7} title="Language Profile" icon={Globe2} active={false} />
            <NeuralNode x={25} y={20} delay={0.9} title="Preferences" icon={Heart} active={false} />
            <NeuralNode x={85} y={65} delay={1.1} title="Voice Context" icon={Mic} active={false} />
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end pointer-events-none">
            <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest leading-relaxed">
              <span className="text-[var(--color-primary)]">Status:</span> Active Learning<br/>
              <span className="text-[var(--color-primary)]">Nodes:</span> 1,204 Synced<br/>
              <span className="text-[var(--color-primary)]">Last Update:</span> 2 mins ago
            </div>
          </div>
        </motion.div>

        {/* Right Side: Data Lists */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden"
        >
          {/* Custom Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {["timeline", "knowledge"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-[13px] uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-[var(--primary-10)] border border-[var(--primary-30)] text-[var(--color-primary-light)]' 
                    : 'bg-white/[0.02] border border-white/5 text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-main)]'
                }`}
                style={{ fontFamily: "General Sans" }}
              >
                {tab === "timeline" ? "Memory Timeline" : "AI Knowledge"}
              </button>
            ))}
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-20 pr-2">
            <AnimatePresence mode="wait">
              
              {activeTab === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col relative"
                >
                  {/* Timeline Vertical Line */}
                  <div className="absolute left-[23px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-[var(--primary-30)] via-white/5 to-transparent" />

                  {TIMELINE_EVENTS.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={event.id} 
                        className="relative pl-16 py-5 group"
                      >
                        {/* Timeline Node */}
                        <div className={`absolute left-[11px] top-[26px] w-6 h-6 rounded-full border-2 bg-[var(--bg-gradient-bottom)] z-10 flex items-center justify-center transition-colors duration-300 ${
                          index === 0 ? 'border-[var(--color-primary)] shadow-[0_0_10px_var(--primary-50)]' : 'border-white/20 group-hover:border-[var(--color-primary)]/50'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[var(--color-primary)]' : 'bg-white/20 group-hover:bg-[var(--color-primary)]/50'}`} />
                        </div>

                        {/* Content Card */}
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.04] transition-all duration-300 group-hover:border-[var(--color-primary)]/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon size={14} className={event.color} />
                              <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]" style={{ fontFamily: "General Sans" }}>{event.type}</span>
                            </div>
                            <span className="text-[10px] text-[var(--color-text-muted)]/60 flex items-center gap-1"><Calendar size={10}/> {event.time}</span>
                          </div>
                          <h4 className="text-[16px] text-[var(--color-text-main)] font-medium mb-1" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{event.title}</h4>
                          <p className="text-[13px] text-[var(--color-text-muted)] font-light leading-relaxed" style={{ fontFamily: "General Sans" }}>{event.desc}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {activeTab === "knowledge" && (
                <motion.div
                  key="knowledge"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--primary-10)] to-transparent border border-[var(--primary-20)] backdrop-blur-md mb-2">
                    <h3 className="text-[18px] text-[var(--color-text-main)] font-light mb-2 flex items-center gap-2" style={{ fontFamily: "Cabinet Grotesk" }}>
                      <BrainCircuit size={18} className="text-[var(--color-primary)]" />
                      Core Understanding
                    </h3>
                    <p className="text-[13px] text-[var(--color-text-muted)] font-light leading-relaxed" style={{ fontFamily: "General Sans" }}>
                      I have analyzed your interactions and calibrated my responses to match your preference for calm, analytical, and highly contextual communication in both English and Hindi.
                    </p>
                  </div>

                  {AI_KNOWLEDGE.map((block, idx) => (
                    <motion.div 
                       key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md"
                    >
                      <h4 className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4" style={{ fontFamily: "General Sans" }}>
                        {block.category}
                      </h4>
                      <div className="flex flex-col gap-3">
                        {block.items.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Bookmark size={14} className="text-[var(--color-text-muted)] mt-0.5" />
                            <span className="text-[14px] text-[var(--color-text-main)] font-light" style={{ fontFamily: "General Sans" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  
                  <button className="mt-4 w-full py-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-[12px] uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-primary)]" style={{ fontFamily: "General Sans" }}>
                    Manage Knowledge Base
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
