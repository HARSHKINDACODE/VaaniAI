import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  MessageSquare, 
  Mic, 
  Brain, 
  Languages, 
  Lightbulb, 
  Activity, 
  UserCircle, 
  Settings, 
  Play
} from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const SidebarItem = ({ icon: Icon, label, isActive, isExpanded, onClick }) => {
  return (
    <motion.button
      layout
      variants={itemVariants}
      onClick={onClick}
      whileHover={{ scale: 1.03, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-500 overflow-hidden ${
        isActive ? 'bg-[#D6A04C]/10 border border-[#D6A04C]/20' : 'border border-transparent hover:bg-white/[0.04] hover:border-[#D6A04C]/30'
      }`}
    >
      {/* Dynamic Hover Glow Background */}
      <div className={`absolute inset-0 bg-gradient-to-r from-[#D6A04C]/10 via-[#D6A04C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isActive ? 'hidden' : 'block'}`} />

      <div className={`relative z-10 flex items-center justify-center min-w-[24px] ${isActive ? 'text-[#F4C76B] drop-shadow-[0_0_8px_rgba(244,199,107,0.5)]' : 'text-[#A8957C] group-hover:text-[#D6A04C] group-hover:drop-shadow-[0_0_8px_rgba(214,160,76,0.5)]'} transition-all duration-500`}>
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className={`relative z-10 whitespace-nowrap text-[13px] tracking-wide ${isActive ? 'text-[#F6EBDD] font-medium' : 'text-[#A8957C] group-hover:text-[#F6EBDD] font-medium'} transition-colors duration-500`}
            style={{ fontFamily: "General Sans" }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {isActive && (
        <motion.div 
          layoutId="activeGlow"
          className="absolute inset-0 rounded-xl shadow-[0_0_20px_-5px_rgba(214,160,76,0.3)] pointer-events-none"
        />
      )}
      {isActive && (
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-[#D6A04C] rounded-r-full shadow-[0_0_10px_rgba(214,160,76,0.8)] pointer-events-none" />
      )}
    </motion.button>
  );
};

const RecentConversation = ({ title, time, isExpanded }) => {
  return (
    <motion.button
      layout
      variants={itemVariants}
      whileHover={{ scale: 1.02, x: 2, backgroundColor: "rgba(255,255,255,0.03)" }}
      className="w-full flex items-center gap-4 p-3 rounded-xl transition-colors duration-300"
    >
      <div className="flex items-center justify-center min-w-[24px]">
        <div className="w-6 h-6 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#D6A04C]/30 transition-colors">
          <Play size={10} className="text-[#A8957C] ml-0.5 group-hover:text-[#D6A04C]" />
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-start overflow-hidden whitespace-nowrap"
          >
            <span className="text-[12px] text-[#E8D9C1]" style={{ fontFamily: "General Sans" }}>{title}</span>
            <span className="text-[10px] text-[#A8957C]">{time}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default function Sidebar({ activeTab, onTabChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4
      }
    }
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={{ width: 80, x: -60, opacity: 0 }}
      animate={{ width: isExpanded ? 280 : 80, x: 0, opacity: 1 }}
      transition={{ 
        width: { type: "spring", stiffness: 300, damping: 30 },
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.8 }
      }}
      className="fixed left-4 top-4 bottom-4 z-[90] flex flex-col bg-[#050816]/60 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Scrollable Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-6 flex flex-col px-3"
      >
        
        {/* TOP SECTION */}
        <motion.div layout variants={itemVariants} className="flex items-center px-2 mb-10 overflow-hidden whitespace-nowrap">
          <div className="min-w-[40px] flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D6A04C] shadow-[0_0_10px_rgba(214,160,76,0.8)] animate-pulse" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <div className="flex items-center">
                  <span className="text-[18px] tracking-tight font-medium text-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Vaani</span>
                  <span className="text-[18px] tracking-tight font-light text-[#D6A04C] ml-[1px]">AI</span>
                </div>
                <span className="text-[8px] uppercase tracking-widest text-[#A8957C]" style={{ fontFamily: "General Sans" }}>Ambient Intelligence</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CORE NAVIGATION */}
        <motion.div layout className="flex flex-col gap-1 mb-8">
          <SidebarItem icon={Home} label="Home" isActive={activeTab === "Home"} isExpanded={isExpanded} onClick={() => onTabChange("Home")} />
          <SidebarItem icon={MessageSquare} label="Conversations" isActive={activeTab === "Conversations"} isExpanded={isExpanded} onClick={() => onTabChange("Conversations")} />
          <SidebarItem icon={Mic} label="Voice Sessions" isActive={activeTab === "Voice Sessions"} isExpanded={isExpanded} onClick={() => onTabChange("Voice Sessions")} />
          <SidebarItem icon={Brain} label="Memory" isActive={activeTab === "Memory"} isExpanded={isExpanded} onClick={() => onTabChange("Memory")} />
          <SidebarItem icon={Languages} label="Languages" isActive={activeTab === "Languages"} isExpanded={isExpanded} onClick={() => onTabChange("Languages")} />
        </motion.div>

        {/* RECENT CONVERSATIONS */}
        <motion.div layout className="mb-8">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 mb-2"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#A8957C]/60 font-semibold" style={{ fontFamily: "General Sans" }}>Recent</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-col gap-1">
            <RecentConversation title="Morning Briefing" time="2m ago" isExpanded={isExpanded} />
            <RecentConversation title="Translation: Tamil" time="1h ago" isExpanded={isExpanded} />
            <RecentConversation title="Idea Brainstorm" time="Yesterday" isExpanded={isExpanded} />
          </div>
        </motion.div>

        {/* INTELLIGENCE & USER */}
        <motion.div layout className="flex flex-col gap-1 mt-auto pt-6 border-t border-white/5">
          <SidebarItem icon={Lightbulb} label="AI Insights" isActive={activeTab === "AI Insights"} isExpanded={isExpanded} onClick={() => onTabChange("AI Insights")} />
          <SidebarItem icon={Activity} label="Ambient Mode" isActive={activeTab === "Ambient Mode"} isExpanded={isExpanded} onClick={() => onTabChange("Ambient Mode")} />
          <SidebarItem icon={UserCircle} label="Profile" isActive={activeTab === "Profile"} isExpanded={isExpanded} onClick={() => onTabChange("Profile")} />
          <SidebarItem icon={Settings} label="Settings" isActive={activeTab === "Settings"} isExpanded={isExpanded} onClick={() => onTabChange("Settings")} />
        </motion.div>
      </motion.div>

      {/* BOTTOM AMBIENT WIDGET */}
      <motion.div 
        layout
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 1 }}
        className={`mt-auto border-t border-white/5 p-4 flex items-center overflow-hidden transition-colors duration-500 ${isExpanded ? 'bg-[#D6A04C]/5' : 'bg-transparent'}`}
      >
        <div className="min-w-[40px] flex justify-center relative">
          {/* Mini Orb */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-4 h-4 rounded-full bg-gradient-to-br from-[#F4C76B] to-[#8B4A22] blur-[2px]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-white/80 mix-blend-overlay" />
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col whitespace-nowrap ml-1"
            >
              <span className="text-[11px] text-[#D6A04C] tracking-wide uppercase" style={{ fontFamily: "General Sans" }}>Ambient Active</span>
              <span className="text-[9px] text-[#A8957C]">Hindi + English</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
}
