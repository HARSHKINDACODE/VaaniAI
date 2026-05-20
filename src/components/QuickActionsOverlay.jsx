import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  Globe2, 
  StickyNote, 
  Plus, 
  Search, 
  ShieldAlert,
  X,
  Sparkles
} from "lucide-react";
import QuickActionModal from "./QuickActionModal";

const ACTIONS = [
  { id: "emergency", label: "Emergency Assist", icon: ShieldAlert, color: "text-red-400", hoverBg: "hover:bg-red-500/20", glow: "shadow-[0_0_15px_rgba(248,113,113,0.5)]", border: "border-red-500/30" },
  { id: "search", label: "Smart Search", icon: Search, color: "text-[var(--color-primary-light)]", hoverBg: "hover:bg-[var(--primary-20)]", glow: "shadow-[0_0_15px_var(--primary-50)]", border: "border-[var(--primary-30)]" },
  { id: "session", label: "New Session", icon: Plus, color: "text-[var(--color-primary-light)]", hoverBg: "hover:bg-[var(--primary-20)]", glow: "shadow-[0_0_15px_var(--primary-50)]", border: "border-[var(--primary-30)]" },
  { id: "notes", label: "Voice Notes", icon: StickyNote, color: "text-[var(--color-primary-light)]", hoverBg: "hover:bg-[var(--primary-20)]", glow: "shadow-[0_0_15px_var(--primary-50)]", border: "border-[var(--primary-30)]" },
  { id: "translate", label: "Translate", icon: Globe2, color: "text-[var(--color-primary-light)]", hoverBg: "hover:bg-[var(--primary-20)]", glow: "shadow-[0_0_15px_var(--primary-50)]", border: "border-[var(--primary-30)]" },
  { id: "listen", label: "Start Listening", icon: Mic, color: "text-[var(--color-primary-light)]", hoverBg: "hover:bg-[var(--primary-20)]", glow: "shadow-[0_0_15px_var(--primary-50)]", border: "border-[var(--primary-30)]" },
];

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [activeAction, setActiveAction] = useState(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Constants for the radial spread
  const RADIUS = 120; // Distance from the center button
  const START_ANGLE = 180; // Left
  const END_ANGLE = 270; // Top
  const ANGLE_STEP = (END_ANGLE - START_ANGLE) / (ACTIONS.length - 1);

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-[100]">
      
      {/* Background Overlay (Optional, for emphasis) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--bg-gradient-bottom)]/40 backdrop-blur-[2px] z-[-1]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-center">
        
        {/* Radial Action Buttons */}
        <AnimatePresence>
          {isOpen && ACTIONS.map((action, index) => {
            const angleInDegrees = START_ANGLE + (index * ANGLE_STEP);
            const angleInRadians = (angleInDegrees * Math.PI) / 180;
            
            // Calculate final x and y coordinates
            const x = RADIUS * Math.cos(angleInRadians);
            const y = RADIUS * Math.sin(angleInRadians);
            
            const Icon = action.icon;
            const isHovered = hoveredAction === action.id;

            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05, 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                className="absolute top-0 left-0"
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <div className="relative group flex items-center justify-center">
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-full mr-4 whitespace-nowrap bg-[var(--orb-gradient-bottom)]/90 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md pointer-events-none"
                      >
                        <span className={`text-[12px] font-medium tracking-wide ${action.color}`} style={{ fontFamily: "General Sans" }}>
                          {action.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Button */}
                  <button 
                    onClick={() => {
                      setActiveAction(action.id);
                      setIsOpen(false);
                    }}
                    className={`w-12 h-12 rounded-full bg-[var(--bg-gradient-bottom)]/80 backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${action.border} ${action.hoverBg} ${isHovered ? action.glow + ' scale-110' : ''}`}
                  >
                    <Icon size={18} className={`${action.color} ${isHovered ? 'drop-shadow-[0_0_8px_currentColor]' : ''}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Central Orb Toggle Button */}
        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 border ${
            isOpen 
              ? 'bg-[var(--primary-20)] border-[var(--primary-50)] shadow-[0_0_30px_var(--primary-30)]' 
              : 'bg-[var(--orb-gradient-bottom)]/80 border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--orb-gradient-bottom)]'
          }`}
        >
          {/* Rotating ambient ring */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isOpen ? (
              <X size={24} className="text-[var(--color-text-main)]" />
            ) : (
              <Sparkles size={24} className="text-[var(--color-primary)]" />
            )}
          </motion.div>

          {/* Background subtle pulse when closed */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-[var(--primary-30)] pointer-events-none"
            />
          )}
        </motion.button>
      </div>

      <QuickActionModal activeAction={activeAction} onClose={() => setActiveAction(null)} />
    </div>
  );
}