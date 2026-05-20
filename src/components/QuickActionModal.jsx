import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Mic, Globe2, StickyNote, Search, ShieldAlert, 
  ArrowRight, Play, ChevronDown, CheckCircle2 
} from "lucide-react";

export default function QuickActionModal({ activeAction, onClose }) {
  // Variants for modal entrance
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {activeAction && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#050816]/60 backdrop-blur-md p-4 md:p-8"
        >
          {/* Click outside to close */}
          <div className="absolute inset-0" onClick={onClose} />
          
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl bg-[#0A101B]/95 border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                {activeAction === "emergency" && <><ShieldAlert className="text-red-400" /> <span className="text-[#F6EBDD] font-medium text-lg tracking-wide">Emergency Assist</span></>}
                {activeAction === "search" && <><Search className="text-[#F4C76B]" /> <span className="text-[#F6EBDD] font-medium text-lg tracking-wide">Smart Search</span></>}
                {activeAction === "notes" && <><StickyNote className="text-[#F4C76B]" /> <span className="text-[#F6EBDD] font-medium text-lg tracking-wide">Voice Notes</span></>}
                {activeAction === "translate" && <><Globe2 className="text-[#F4C76B]" /> <span className="text-[#F6EBDD] font-medium text-lg tracking-wide">Live Translation</span></>}
                {(activeAction === "emergency" || activeAction === "search" || activeAction === "notes" || activeAction === "translate" || activeAction === "session" || activeAction === "listen") && <span className="text-[#F6EBDD] font-medium text-lg tracking-wide">
                  {activeAction === "emergency" && "Emergency Assist"}
                  {activeAction === "search" && "Smart Search"}
                  {activeAction === "notes" && "Voice Notes"}
                  {activeAction === "translate" && "Live Translation"}
                  {(activeAction === "session" || activeAction === "listen") && "New Session"}
                </span>}
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors group">
                <X className="text-[#A8957C] group-hover:text-white transition-colors" size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              {activeAction === "emergency" && <EmergencyView />}
              {activeAction === "search" && <SearchView />}
              {activeAction === "notes" && <NotesView />}
              {activeAction === "translate" && <TranslateView />}
              {(activeAction === "session" || activeAction === "listen") && <SessionView onClose={onClose} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Sub-views
function EmergencyView() {
  return (
    <div className="flex flex-col items-center py-4 md:py-8">
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/30 group"
      >
        <motion.div 
           animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute inset-0 rounded-full bg-red-500 pointer-events-none"
        />
        <motion.div 
           animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.1, 0.6] }}
           transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
           className="absolute inset-0 rounded-full bg-red-500 pointer-events-none"
        />
        <span className="text-3xl md:text-4xl font-bold text-red-500 tracking-widest relative z-10 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all">SOS</span>
      </motion.button>
      <p className="mt-8 text-[#A8957C] text-center max-w-sm text-sm md:text-base leading-relaxed">
        Tap to instantly notify your trusted contacts and local authorities with your real-time location.
      </p>
      <div className="mt-8 w-full max-w-sm space-y-3">
         <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.03] flex items-center justify-between hover:bg-white/[0.06] transition-colors group">
           <span className="text-[#F6EBDD] font-medium text-sm">Emergency Contact 1 (Mom)</span>
           <ShieldAlert size={18} className="text-red-400/50 group-hover:text-red-400 transition-colors" />
         </div>
         <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.03] flex items-center justify-between hover:bg-white/[0.06] transition-colors group">
           <span className="text-[#F6EBDD] font-medium text-sm">Local Emergency Services</span>
           <ShieldAlert size={18} className="text-red-400/50 group-hover:text-red-400 transition-colors" />
         </div>
      </div>
    </div>
  );
}

function SearchView() {
  return (
    <div className="flex flex-col py-2">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D6A04C]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A8957C] group-focus-within:text-[#D6A04C] transition-colors" size={20} />
        <input 
          autoFocus
          type="text" 
          placeholder="Ask Vaani or search memory..." 
          className="relative w-full bg-[#050816] border border-white/10 rounded-3xl py-5 pl-14 pr-16 text-[#F6EBDD] outline-none focus:border-[#D6A04C]/50 focus:shadow-[0_0_30px_rgba(214,160,76,0.15)] transition-all text-lg font-light placeholder:text-[#A8957C]/40"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-[#A8957C] font-mono shadow-sm">
          ENTER
        </div>
      </div>
      
      <div className="mt-8 px-2">
        <span className="text-[11px] uppercase tracking-widest text-[#A8957C] mb-4 block" style={{ fontFamily: "General Sans" }}>Recent Thoughts</span>
        <div className="flex flex-wrap gap-2.5">
          {["Quantum computing explained easily", "Italian dinner recipes", "Check my flight to Mumbai", "Schedule a meeting with Design Team"].map(q => (
             <span key={q} className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] text-[13px] text-[#E8D9C1] hover:bg-[#D6A04C]/10 hover:border-[#D6A04C]/30 hover:text-[#F4C76B] transition-all duration-300">
               {q}
             </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TranslateView() {
  return (
    <div className="flex flex-col md:flex-row gap-4 py-2">
      {/* Source */}
      <div className="flex-1 rounded-3xl border border-white/5 bg-white/[0.02] p-5 flex flex-col relative group hover:border-white/10 transition-colors">
        <div className="flex items-center justify-between mb-4">
           <button className="flex items-center gap-2 text-[#A8957C] group-hover:text-[#F6EBDD] transition-colors text-sm font-medium">
             English <ChevronDown size={14} />
           </button>
        </div>
        <textarea 
          placeholder="Speak or type to translate..."
          className="w-full bg-transparent resize-none h-32 md:h-40 outline-none text-[#F6EBDD] text-lg md:text-xl font-light placeholder:text-[#A8957C]/40"
        />
        <div className="flex justify-between items-end mt-auto">
          <button className="w-12 h-12 rounded-full bg-[#D6A04C]/10 flex items-center justify-center hover:bg-[#D6A04C]/20 transition-colors">
            <Mic size={20} className="text-[#D6A04C]" />
          </button>
          <span className="text-[10px] text-[#A8957C] font-mono tracking-widest">0/500</span>
        </div>
      </div>

      {/* Center Divider/Icon */}
      <div className="flex items-center justify-center p-2">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#050816] shadow-lg">
          <ArrowRight size={16} className="text-[#A8957C] rotate-90 md:rotate-0" />
        </div>
      </div>

      {/* Target */}
      <div className="flex-1 rounded-3xl border border-[#D6A04C]/30 bg-[#D6A04C]/[0.03] p-5 flex flex-col relative overflow-hidden shadow-[inset_0_0_40px_rgba(214,160,76,0.05)]">
        <div className="flex items-center justify-between mb-4 relative z-10">
           <button className="flex items-center gap-2 text-[#F4C76B] hover:text-white transition-colors text-sm font-medium">
             Hindi <ChevronDown size={14} />
           </button>
        </div>
        <div className="w-full h-32 md:h-40 text-[#F6EBDD] text-lg md:text-xl font-light relative z-10">
          <span className="text-[#A8957C]/40 italic">Translation will appear here...</span>
        </div>
        
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D6A04C]/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
      </div>
    </div>
  );
}

function NotesView() {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 py-2">
      <div className="flex-1 flex flex-col items-center justify-center py-10 bg-white/[0.02] rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#D6A04C]/20 transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,160,76,0.05)_0%,transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity" />
        
        {/* Animated Waveform Placeholder */}
        <div className="w-full flex items-center justify-center gap-1.5 h-16 mb-10 px-8">
           {[...Array(24)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ height: [8, Math.random() * 32 + 8, 8] }}
               transition={{ repeat: Infinity, duration: Math.random() * 0.8 + 0.6, ease: "easeInOut" }}
               className="w-1 bg-[#D6A04C]/40 rounded-full"
             />
           ))}
        </div>
        
        <button className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#D6A04C]/20 flex items-center justify-center hover:bg-[#D6A04C]/30 transition-all border border-[#D6A04C]/40 hover:scale-105 hover:shadow-[0_0_30px_rgba(214,160,76,0.3)]">
           <Mic size={24} className="text-[#F4C76B]" />
           <span className="absolute -bottom-10 text-[10px] md:text-[11px] text-[#A8957C] uppercase tracking-widest whitespace-nowrap font-medium">Tap to Record</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
         <span className="text-[11px] uppercase tracking-widest text-[#A8957C] mb-5 block" style={{ fontFamily: "General Sans" }}>Recent Notes</span>
         <div className="space-y-3 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
           {[
             { title: "Design system ideas", date: "Today, 10:45 AM", dur: "0:45" },
             { title: "Grocery list additions", date: "Yesterday", dur: "1:20" },
             { title: "Project sync summary", date: "Mon, 2:30 PM", dur: "3:15" },
             { title: "Workout routine", date: "Sun, 8:00 AM", dur: "0:55" },
           ].map((note, i) => (
             <div key={i} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#D6A04C]/30 hover:bg-[#D6A04C]/5 transition-all group flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D6A04C]/20 group-hover:shadow-[0_0_15px_rgba(214,160,76,0.2)] transition-all">
                 <Play size={14} className="text-[#A8957C] group-hover:text-[#F4C76B] ml-0.5 transition-colors" />
               </div>
               <div className="flex flex-col flex-1">
                 <span className="text-sm text-[#F6EBDD] font-medium tracking-wide group-hover:text-white transition-colors">{note.title}</span>
                 <div className="flex items-center gap-2 mt-1.5">
                   <span className="text-[10px] text-[#A8957C] uppercase tracking-wide">{note.date}</span>
                   <span className="text-[10px] text-[#A8957C]/50">•</span>
                   <span className="text-[10px] text-[#D6A04C] font-mono">{note.dur}</span>
                 </div>
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}

function SessionView({ onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close after a short delay
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="relative w-24 h-24 rounded-full bg-[#D6A04C]/10 border border-[#D6A04C]/40 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(214,160,76,0.15)]"
      >
        <motion.div
           animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute inset-0 rounded-full bg-[#D6A04C]/20 pointer-events-none"
        />
        <CheckCircle2 size={40} className="text-[#F4C76B]" strokeWidth={1.5} />
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl text-[#F6EBDD] font-medium mb-3 tracking-tight"
      >
        Session Initiated
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[#A8957C] text-sm"
      >
        Preparing your personal intelligence...
      </motion.p>
    </div>
  );
}
