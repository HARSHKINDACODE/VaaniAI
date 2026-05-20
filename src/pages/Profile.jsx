import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  ShieldCheck, 
  Smartphone, 
  LogOut, 
  Crown,
  Cpu,
  Fingerprint,
  Volume2
} from "lucide-react";
import { FloatingDust } from "../components/Effects";

const TABS = [
  { id: "personalization", label: "AI Personalization", icon: Cpu },
  { id: "security", label: "Security & Privacy", icon: ShieldCheck },
  { id: "devices", label: "Connected Devices", icon: Smartphone },
];

// Reusable Toggle Switch Component
const Toggle = ({ label, description, isActive, onToggle }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
    <div className="flex flex-col pr-4">
      <span className="text-[14px] text-[var(--color-text-main)]" style={{ fontFamily: "General Sans" }}>{label}</span>
      <span className="text-[11px] text-[var(--color-text-muted)] mt-1">{description}</span>
    </div>
    <button 
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${isActive ? 'bg-[var(--color-primary)]' : 'bg-white/10'}`}
    >
      <motion.div 
        layout
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm`}
        animate={{ x: isActive ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  </div>
);

// Reusable Slider Component
const SettingsSlider = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-2 py-3 border-b border-white/5 last:border-0">
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-[var(--color-text-main)]" style={{ fontFamily: "General Sans" }}>{label}</span>
      <span className="text-[11px] text-[var(--color-primary)]">{value}%</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--primary-80)]"
    />
  </div>
);

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personalization");
  
  // Mock Settings State
  const [memoryRetention, setMemoryRetention] = useState(85);
  const [proactivity, setProactivity] = useState(60);
  const [voiceWake, setVoiceWake] = useState(true);

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
          <h1 className="text-[42px] tracking-tight text-[var(--color-text-main)] font-light mb-2" style={{ fontFamily: "Cabinet Grotesk" }}>
            Profile & Settings
          </h1>
          <p className="text-[var(--color-text-muted)] text-[14px]" style={{ fontFamily: "General Sans" }}>
            Manage your identity, security, and AI preferences.
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 md:gap-10 md:pl-[60px] h-full max-w-7xl overflow-y-auto no-scrollbar">
        
        {/* Left Column: User Identity */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[340px] flex-shrink-0 flex flex-col items-center"
        >
          {/* Animated Profile Halo */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[var(--primary-30)]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-white/10"
            />
            
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <FloatingDust count={15} maxDriftX={20} maxDriftY={20} minOpacity={0.2} maxOpacity={0.6} />
            </div>

            <div className="w-36 h-36 rounded-full bg-[var(--bg-card)] border border-[var(--primary-50)] shadow-[0_0_40px_var(--primary-15)] flex items-center justify-center overflow-hidden relative z-10 backdrop-blur-xl">
              <User size={48} className="text-[var(--color-primary)]/80" strokeWidth={1} />
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[var(--primary-20)] to-transparent" />
            </div>
          </div>

          <h2 className="text-[28px] text-[var(--color-text-main)] font-medium tracking-wide mb-1" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            Siddharth Rao
          </h2>
          <p className="text-[13px] text-[var(--color-text-muted)] mb-6" style={{ fontFamily: "General Sans" }}>
            siddharth.rao@vaaniai.com
          </p>

          {/* Subscription Badge */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--primary-30)] bg-[var(--primary-10)] px-6 py-4 w-full flex items-center gap-4 mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            <div className="w-10 h-10 rounded-full bg-[var(--primary-20)] flex items-center justify-center">
              <Crown size={20} className="text-[var(--color-primary-light)]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary)]" style={{ fontFamily: "General Sans" }}>Plan</p>
              <p className="text-[15px] text-[var(--color-text-main)] font-medium tracking-wide">Vaani Infinite</p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-colors group">
            <LogOut size={16} className="text-red-400 group-hover:text-red-300" />
            <span className="text-[13px] uppercase tracking-widest text-red-400 group-hover:text-red-300 font-medium" style={{ fontFamily: "General Sans" }}>
              Secure Logout
            </span>
          </button>
        </motion.div>

        {/* Right Column: Settings Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-[13px] transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 text-[var(--color-text-main)] border border-white/10 shadow-[0_4px_20px_rgba(255,255,255,0.05)]' 
                      : 'bg-transparent text-[var(--color-text-muted)] border border-transparent hover:bg-white/5 hover:text-[var(--color-text-main)]'
                  }`}
                  style={{ fontFamily: "General Sans" }}
                >
                  <Icon size={16} className={isActive ? "text-[var(--color-primary)]" : "opacity-70"} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-[var(--primary-05)] rounded-full blur-[80px]" />

            <AnimatePresence mode="wait">
              
              {/* Personalization Tab */}
              {activeTab === "personalization" && (
                <motion.div
                  key="personalization"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="text-[18px] text-[var(--color-text-main)] font-medium mb-1" style={{ fontFamily: "Cabinet Grotesk" }}>Intelligence Core</h3>
                    <p className="text-[12px] text-[var(--color-text-muted)] mb-6">Tune how VaaniAI learns and interacts with you.</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 p-5 rounded-2xl bg-[var(--bg-card)]/40 border border-white/5">
                    <SettingsSlider label="Memory Retention Depth" value={memoryRetention} onChange={setMemoryRetention} />
                    <SettingsSlider label="Proactive Suggestions" value={proactivity} onChange={setProactivity} />
                  </div>

                  <div className="flex flex-col gap-2 p-5 rounded-2xl bg-[var(--bg-card)]/40 border border-white/5">
                    <Toggle 
                      label="Voice Wake Word" 
                      description="Allow Vaani to listen for 'Hey Vaani' in the background." 
                      isActive={voiceWake} 
                      onToggle={() => setVoiceWake(!voiceWake)} 
                    />
                    <Toggle 
                      label="Emotion Mirroring" 
                      description="AI adapts its tone to match your detected emotional state." 
                      isActive={true} 
                      onToggle={() => {}} 
                    />
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="text-[18px] text-[var(--color-text-main)] font-medium mb-1" style={{ fontFamily: "Cabinet Grotesk" }}>Security & Privacy</h3>
                    <p className="text-[12px] text-[var(--color-text-muted)] mb-6">Manage your data encryption and authentication protocols.</p>
                  </div>

                  <div className="flex flex-col gap-2 p-5 rounded-2xl bg-[var(--bg-card)]/40 border border-white/5">
                    <Toggle 
                      label="Biometric Authentication" 
                      description="Require fingerprint or face scan to access Voice History." 
                      isActive={true} 
                      onToggle={() => {}} 
                    />
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--primary-05)] border border-[var(--primary-20)] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Fingerprint size={24} className="text-[var(--color-primary)]" />
                      <div>
                        <p className="text-[14px] text-[var(--color-text-main)]">Identity Verification</p>
                        <p className="text-[11px] text-[var(--color-text-muted)]">Voice print registered and secured.</p>
                      </div>
                    </div>
                    <button className="text-[11px] uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors">Update</button>
                  </div>
                </motion.div>
              )}

              {/* Devices Tab */}
              {activeTab === "devices" && (
                <motion.div
                  key="devices"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="text-[18px] text-[var(--color-text-main)] font-medium mb-1" style={{ fontFamily: "Cabinet Grotesk" }}>Connected Hardware</h3>
                    <p className="text-[12px] text-[var(--color-text-muted)] mb-6">Endpoints authorized to access your VaaniAI profile.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="p-4 rounded-xl border border-[var(--primary-30)] bg-[var(--primary-05)] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Smartphone size={20} className="text-[var(--color-primary)]" />
                        <div>
                          <p className="text-[14px] text-[var(--color-text-main)]">Current Session (Web)</p>
                          <p className="text-[11px] text-[var(--color-primary)]">Active Now • Mumbai, India</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Volume2 size={20} className="text-[var(--color-text-muted)]" />
                        <div>
                          <p className="text-[14px] text-[var(--color-text-main)]">Vaani Home Core Speaker</p>
                          <p className="text-[11px] text-[var(--color-text-muted)]">Last active 2h ago</p>
                        </div>
                      </div>
                      <button className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">Revoke</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
