import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  MessageSquare, 
  Mic, 
  Brain, 
  Languages, 
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
      className={`group relative flex items-center justify-center md:justify-start gap-4 w-full md:p-3 p-2 rounded-xl transition-all duration-500 overflow-hidden ${
        isActive ? 'bg-[#D6A04C]/10 border border-[#D6A04C]/20' : 'border border-transparent hover:bg-white/[0.04] hover:border-[#D6A04C]/30'
      }`}
    >
      {/* Dynamic Hover Glow Background */}
      <div className={`hidden md:block absolute inset-0 bg-gradient-to-r from-[#D6A04C]/10 via-[#D6A04C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isActive ? 'hidden' : 'block'}`} />

      <div className={`relative z-10 flex items-center justify-center min-w-[24px] ${isActive ? 'text-[#F4C76B] drop-shadow-[0_0_8px_rgba(244,199,107,0.5)]' : 'text-[#A8957C] group-hover:text-[#D6A04C] group-hover:drop-shadow-[0_0_8px_rgba(214,160,76,0.5)]'} transition-all duration-500`}>
        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="md:w-[18px] md:h-[18px]" />
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className={`hidden md:inline-flex relative z-10 whitespace-nowrap text-[13px] tracking-wide ${isActive ? 'text-[#F6EBDD] font-medium' : 'text-[#A8957C] group-hover:text-[#F6EBDD] font-medium'} transition-colors duration-500`}
            style={{ fontFamily: "General Sans" }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {isActive && (
        <motion.div 
          layoutId="activeGlow"
          className="hidden md:block absolute inset-0 rounded-xl shadow-[0_0_20px_-5px_rgba(214,160,76,0.3)] pointer-events-none"
        />
      )}
      {isActive && (
         <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-[#D6A04C] rounded-r-full shadow-[0_0_10px_rgba(214,160,76,0.8)] pointer-events-none" />
      )}
      {isActive && (
         <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#D6A04C] rounded-t-full shadow-[0_0_10px_rgba(214,160,76,0.8)] pointer-events-none" />
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

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed bottom-0 left-0 right-0 md:bottom-4 md:left-4 md:top-4 md:right-auto z-[90] flex flex-row md:flex-col items-center md:items-stretch justify-around md:justify-start bg-[#0A101B]/95 md:bg-[#050816]/60 backdrop-blur-3xl border-t border-white/10 md:border md:border-white/5 md:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-2xl transition-all duration-300 ease-out ${isExpanded ? 'md:w-[280px]' : 'md:w-[80px]'}`}
    >
      {/* Container */}
      <div 
        className="flex-1 w-full md:overflow-y-auto md:overflow-x-hidden no-scrollbar py-2 md:py-6 flex flex-row md:flex-col px-4 md:px-3 gap-2 md:gap-0"
      >
        
        {/* TOP SECTION - HIDDEN ON MOBILE */}
        <div className="hidden md:flex items-center px-2 mb-10 overflow-hidden whitespace-nowrap">
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
                  <span className="text-[18px] tracking-tight font-light text-[#D6A04C] ml-[1px]" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>AI</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-row md:flex-col gap-1 md:gap-2 w-full justify-between md:justify-start items-center md:items-stretch h-16 md:h-auto">
          <SidebarItem icon={Home} label="Home Core" isActive={activeTab === "Home"} isExpanded={isExpanded} onClick={() => onTabChange("Home")} />
          <SidebarItem icon={MessageSquare} label="Conversations" isActive={activeTab === "Conversations"} isExpanded={isExpanded} onClick={() => onTabChange("Conversations")} />
          <SidebarItem icon={Mic} label="Voice Sessions" isActive={activeTab === "Voice Sessions"} isExpanded={isExpanded} onClick={() => onTabChange("Voice Sessions")} />
          <SidebarItem icon={Brain} label="Memory Core" isActive={activeTab === "Memory"} isExpanded={isExpanded} onClick={() => onTabChange("Memory")} />
          <div className="hidden md:block w-full h-[1px] bg-white/5 my-2 rounded-full" />
          <SidebarItem icon={Activity} label="Insights & Health" isActive={activeTab === "Insights"} isExpanded={isExpanded} onClick={() => onTabChange("Insights")} />
          <SidebarItem icon={Languages} label="Voice Config" isActive={activeTab === "Languages"} isExpanded={isExpanded} onClick={() => onTabChange("Languages")} />
          <div className="hidden md:block w-full h-[1px] bg-white/5 my-2 rounded-full" />
          <SidebarItem icon={Settings} label="Settings" isActive={activeTab === "Settings"} isExpanded={isExpanded} onClick={() => onTabChange("Settings")} />
        </div>

        {/* RECENT CONVERSATIONS - HIDDEN ON MOBILE */}
        <div className="hidden md:flex flex-col mt-8 overflow-hidden whitespace-nowrap">
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] uppercase tracking-widest text-[#A8957C] px-5 mb-3"
                style={{ fontFamily: "General Sans" }}
              >
                Recent Flow
              </motion.span>
            )}
          </AnimatePresence>
          <div className="flex flex-col gap-1">
            <RecentConversation title="Quantum Computing" time="2h ago" isExpanded={isExpanded} />
            <RecentConversation title="UI Animation Logic" time="5h ago" isExpanded={isExpanded} />
            <RecentConversation title="Dinner Recipes" time="Yesterday" isExpanded={isExpanded} />
          </div>
        </div>

      </div>

      {/* BOTTOM ACTION - PROFILE - HIDDEN ON MOBILE (CAN BE ACCESSED VIA SETTINGS) */}
      <div className="hidden md:block p-3 border-t border-white/5">
        <motion.button
          onClick={() => onTabChange("Profile")}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all overflow-hidden ${activeTab === "Profile" ? 'bg-white/5' : ''}`}
        >
          <div className="flex items-center justify-center min-w-[24px]">
            <div className="w-8 h-8 rounded-full border border-[#D6A04C]/30 bg-[#D6A04C]/10 flex items-center justify-center">
              <UserCircle size={16} className="text-[#D6A04C]" />
            </div>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col items-start whitespace-nowrap"
              >
                <span className="text-[13px] text-[#F6EBDD] font-medium tracking-wide">Siddharth Rao</span>
                <span className="text-[11px] text-[#A8957C] mt-0.5">Premium Tier</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
