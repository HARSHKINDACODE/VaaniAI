import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Brain, 
  Mic, 
  Globe2, 
  ShieldCheck, 
  Eye, 
  Bell, 
  Smartphone,
  ChevronRight
} from "lucide-react";

const CATEGORIES = [
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "behavior", label: "AI Behavior", icon: Brain },
  { id: "voice", label: "Voice Settings", icon: Mic },
  { id: "language", label: "Language Settings", icon: Globe2 },
  { id: "privacy", label: "Privacy Controls", icon: ShieldCheck },
  { id: "accessibility", label: "Accessibility", icon: Eye },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "devices", label: "Device Management", icon: Smartphone },
];

// Reusable Premium Toggle
const PremiumToggle = ({ label, description, isActive, onToggle }) => (
  <div className="flex items-start justify-between py-4 border-b border-white/5 last:border-0 group">
    <div className="flex flex-col pr-8">
      <span className="text-[15px] text-[#F6EBDD] font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{label}</span>
      <span className="text-[12px] text-[#A8957C] mt-1" style={{ fontFamily: "General Sans" }}>{description}</span>
    </div>
    <button 
      onClick={onToggle}
      className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-all duration-300 border ${isActive ? 'bg-[#D6A04C]/20 border-[#D6A04C]/50 shadow-[0_0_15px_rgba(214,160,76,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
    >
      <motion.div 
        layout
        className={`absolute top-[3px] left-[3px] w-[16px] h-[16px] rounded-full shadow-sm ${isActive ? 'bg-[#F4C76B]' : 'bg-[#A8957C]'}`}
        animate={{ x: isActive ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  </div>
);

// Reusable Premium Slider
const PremiumSlider = ({ label, description, value, onChange }) => (
  <div className="flex flex-col py-4 border-b border-white/5 last:border-0">
    <div className="flex items-center justify-between mb-3">
      <div>
        <span className="text-[15px] text-[#F6EBDD] font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{label}</span>
        {description && <span className="text-[12px] text-[#A8957C] ml-2" style={{ fontFamily: "General Sans" }}>{description}</span>}
      </div>
      <span className="text-[13px] text-[#D6A04C] bg-[#D6A04C]/10 px-2 py-0.5 rounded border border-[#D6A04C]/20">{value}%</span>
    </div>
    <div className="relative group">
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none outline-none cursor-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#D6A04C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(214,160,76,0.8)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FFF3D8] hover:[&::-webkit-slider-thumb]:scale-125 hover:[&::-webkit-slider-thumb]:transition-transform"
      />
    </div>
  </div>
);

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState("appearance");

  // Mock Settings State
  const [settings, setSettings] = useState({
    appearance: { cinematicMode: true, animations: true, density: 50 },
    behavior: { proactiveMode: true, contextMemory: 85, creativity: 40 },
    voice: { wakeWord: true, sensitivity: 75, pitch: 50, speed: 60 },
    language: { autoDetect: true, profanityFilter: false },
    privacy: { e2eEncryption: true, telemetry: false },
    accessibility: { screenReader: false, largeText: false, highContrast: false },
    notifications: { ambientAlerts: true, emailSummary: false },
    devices: {}
  });

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "appearance":
        return (
          <>
            <h2 className="text-[24px] text-[#F6EBDD] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Appearance Options</h2>
            <div className="p-1 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl">
              <div className="px-6">
                <PremiumToggle label="Cinematic Mode" description="Enable deep background glows, floating particles, and fluid parallax." isActive={settings.appearance.cinematicMode} onToggle={() => updateSetting('appearance', 'cinematicMode', !settings.appearance.cinematicMode)} />
                <PremiumToggle label="Interface Animations" description="Smooth UI transitions and layout shifts." isActive={settings.appearance.animations} onToggle={() => updateSetting('appearance', 'animations', !settings.appearance.animations)} />
                <PremiumSlider label="UI Density" description="Spacing between elements" value={settings.appearance.density} onChange={(v) => updateSetting('appearance', 'density', v)} />
              </div>
            </div>
          </>
        );
      case "behavior":
        return (
          <>
            <h2 className="text-[24px] text-[#F6EBDD] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>AI Behavior Engine</h2>
            <div className="p-1 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl">
              <div className="px-6">
                <PremiumToggle label="Proactive Mode" description="AI initiates conversations based on daily routines." isActive={settings.behavior.proactiveMode} onToggle={() => updateSetting('behavior', 'proactiveMode', !settings.behavior.proactiveMode)} />
                <PremiumSlider label="Contextual Memory Depth" description="How far back AI remembers history" value={settings.behavior.contextMemory} onChange={(v) => updateSetting('behavior', 'contextMemory', v)} />
                <PremiumSlider label="Conversational Creativity" description="Strict facts vs flowing conversation" value={settings.behavior.creativity} onChange={(v) => updateSetting('behavior', 'creativity', v)} />
              </div>
            </div>
          </>
        );
      case "voice":
        return (
          <>
            <h2 className="text-[24px] text-[#F6EBDD] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Voice & Audio Settings</h2>
            <div className="p-1 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl">
              <div className="px-6">
                <PremiumToggle label="Wake Word Detection" description="Listen for 'Hey Vaani' in the background." isActive={settings.voice.wakeWord} onToggle={() => updateSetting('voice', 'wakeWord', !settings.voice.wakeWord)} />
                <PremiumSlider label="Microphone Sensitivity" description="Threshold for voice detection" value={settings.voice.sensitivity} onChange={(v) => updateSetting('voice', 'sensitivity', v)} />
                <PremiumSlider label="Voice Pitch" description="Adjust AI's vocal cord synthesis" value={settings.voice.pitch} onChange={(v) => updateSetting('voice', 'pitch', v)} />
                <PremiumSlider label="Speech Speed" description="Playback rate" value={settings.voice.speed} onChange={(v) => updateSetting('voice', 'speed', v)} />
              </div>
            </div>
          </>
        );
      case "language":
        return (
          <>
            <h2 className="text-[24px] text-[#F6EBDD] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Language Settings</h2>
            <div className="p-1 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl">
              <div className="px-6">
                <PremiumToggle label="Auto-detect Spoken Language" description="Switch translation context dynamically without prompting." isActive={settings.language.autoDetect} onToggle={() => updateSetting('language', 'autoDetect', !settings.language.autoDetect)} />
                <PremiumToggle label="Profanity Filter" description="Censor explicit words during voice output." isActive={settings.language.profanityFilter} onToggle={() => updateSetting('language', 'profanityFilter', !settings.language.profanityFilter)} />
              </div>
            </div>
          </>
        );
      case "privacy":
        return (
          <>
            <h2 className="text-[24px] text-[#F6EBDD] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Privacy Controls</h2>
            <div className="p-1 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl">
              <div className="px-6">
                <PremiumToggle label="End-to-End Encryption" description="Encrypt conversation logs locally. Cannot be recovered if key is lost." isActive={settings.privacy.e2eEncryption} onToggle={() => updateSetting('privacy', 'e2eEncryption', !settings.privacy.e2eEncryption)} />
                <PremiumToggle label="Share Telemetry" description="Send anonymous crash reports and usage statistics to VaaniAI." isActive={settings.privacy.telemetry} onToggle={() => updateSetting('privacy', 'telemetry', !settings.privacy.telemetry)} />
              </div>
            </div>
          </>
        );
      case "accessibility":
        return (
          <>
            <h2 className="text-[24px] text-[#F6EBDD] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Accessibility Options</h2>
            <div className="p-1 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl">
              <div className="px-6">
                <PremiumToggle label="Screen Reader Support" description="Optimize UI markup for screen readers." isActive={settings.accessibility.screenReader} onToggle={() => updateSetting('accessibility', 'screenReader', !settings.accessibility.screenReader)} />
                <PremiumToggle label="Large Typography" description="Scale up interface text." isActive={settings.accessibility.largeText} onToggle={() => updateSetting('accessibility', 'largeText', !settings.accessibility.largeText)} />
                <PremiumToggle label="High Contrast Mode" description="Increase legibility of backgrounds and borders." isActive={settings.accessibility.highContrast} onToggle={() => updateSetting('accessibility', 'highContrast', !settings.accessibility.highContrast)} />
              </div>
            </div>
          </>
        );
      case "notifications":
        return (
          <>
            <h2 className="text-[24px] text-[#F6EBDD] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Notification Settings</h2>
            <div className="p-1 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl">
              <div className="px-6">
                <PremiumToggle label="Ambient Alerts" description="Subtle UI glowing pulses when there is a new insight." isActive={settings.notifications.ambientAlerts} onToggle={() => updateSetting('notifications', 'ambientAlerts', !settings.notifications.ambientAlerts)} />
                <PremiumToggle label="Weekly Email Summary" description="Send a digest of your interaction analytics to your inbox." isActive={settings.notifications.emailSummary} onToggle={() => updateSetting('notifications', 'emailSummary', !settings.notifications.emailSummary)} />
              </div>
            </div>
          </>
        );
      case "devices":
        return (
          <>
            <h2 className="text-[24px] text-[#F6EBDD] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Device Management</h2>
            <div className="p-6 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl flex flex-col gap-4">
               <div className="p-4 rounded-xl border border-[#D6A04C]/30 bg-[#D6A04C]/5 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#D6A04C]/20 flex items-center justify-center">
                     <Smartphone size={20} className="text-[#D6A04C]" />
                   </div>
                   <div>
                     <p className="text-[15px] text-[#F6EBDD] font-medium">This Browser Session</p>
                     <p className="text-[12px] text-[#D6A04C]">Active Now • Web Interface</p>
                   </div>
                 </div>
               </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col pt-10 px-8 md:px-24 pb-12 relative z-20 overflow-hidden">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-between items-end mb-10 pl-[80px] md:pl-[60px]"
      >
        <div>
          <h1 className="text-[42px] tracking-tight text-[#F6EBDD] font-light mb-2" style={{ fontFamily: "Cabinet Grotesk" }}>
            Settings Dashboard
          </h1>
          <p className="text-[#A8957C] text-[14px]" style={{ fontFamily: "General Sans" }}>
            Advanced configuration for your next-generation AI system.
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-10 pl-[80px] md:pl-[60px] h-full max-w-[1400px]">
        
        {/* Left Sidebar Menu */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex flex-col gap-2 border-r border-white/5 pr-6"
        >
          {CATEGORIES.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-[#D6A04C]/10 border border-[#D6A04C]/30 shadow-[inset_4px_0_0_#D6A04C]' 
                    : 'bg-transparent border border-transparent hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={18} className={isActive ? "text-[#F4C76B]" : "text-[#A8957C] group-hover:text-[#F6EBDD] transition-colors"} />
                  <span className={`text-[14px] font-medium tracking-wide ${isActive ? "text-[#F6EBDD]" : "text-[#A8957C] group-hover:text-[#F6EBDD] transition-colors"}`} style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                    {category.label}
                  </span>
                </div>
                <ChevronRight size={14} className={isActive ? "text-[#D6A04C] opacity-100" : "text-[#A8957C] opacity-0 group-hover:opacity-50 transition-all"} />
              </button>
            )
          })}
        </motion.div>

        {/* Right Content Area */}
        <div className="flex-1 max-w-[800px] pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
