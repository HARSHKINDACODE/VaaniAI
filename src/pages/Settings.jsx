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
  ChevronRight,
  Moon,
  Sparkles
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
      <span className="text-[15px] text-[var(--color-text-main)] font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{label}</span>
      <span className="text-[12px] text-[var(--color-text-muted)] mt-1" style={{ fontFamily: "General Sans" }}>{description}</span>
    </div>
    <button 
      onClick={onToggle}
      className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-all duration-300 border ${isActive ? 'bg-[var(--primary-20)] border-[var(--primary-50)] shadow-[0_0_15px_var(--primary-20)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
    >
      <motion.div 
        layout
        className={`absolute top-[3px] left-[3px] w-[16px] h-[16px] rounded-full shadow-sm ${isActive ? 'bg-[var(--color-primary-light)]' : 'bg-[var(--color-text-muted)]'}`}
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
        <span className="text-[15px] text-[var(--color-text-main)] font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{label}</span>
        {description && <span className="text-[12px] text-[var(--color-text-muted)] ml-2" style={{ fontFamily: "General Sans" }}>{description}</span>}
      </div>
      <span className="text-[13px] text-[var(--color-primary)] bg-[var(--primary-10)] px-2 py-0.5 rounded border border-[var(--primary-20)]">{value}%</span>
    </div>
    <div className="relative group">
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_var(--primary-50)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--color-text-main)] hover:[&::-webkit-slider-thumb]:scale-125 hover:[&::-webkit-slider-thumb]:transition-transform"
      />
    </div>
  </div>
);

export default function Settings({ isDawn, onThemeChange }) {
  const [activeCategory, setActiveCategory] = useState("appearance");

  // Mock Settings State
  const [settings, setSettings] = useState({
    appearance: { 
      cinematicMode: true, 
      animations: true, 
      density: 50, 
      dawnMode: isDawn !== undefined ? isDawn : (localStorage.getItem('theme') === 'dawn')
    },
    behavior: { proactiveMode: true, contextMemory: 85, creativity: 40 },
    voice: { wakeWord: true, sensitivity: 75, pitch: 50, speed: 60 },
    language: { autoDetect: true, profanityFilter: false },
    privacy: { telemetry: false },
    accessibility: { screenReader: false, largeText: false, highContrast: false },
    notifications: { ambientAlerts: true, emailSummary: false },
    devices: {}
  });

  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    if (theme === 'dawn') {
      root.setAttribute('data-theme', 'dawn');
      localStorage.setItem('theme', 'dawn');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'default');
    }
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 800);
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value
        }
      };
      if (category === 'appearance' && key === 'dawnMode') {
        applyTheme(value ? 'dawn' : 'default');
        if (onThemeChange) {
          onThemeChange(value);
        }
      }
      return updated;
    });
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "appearance":
        return (
          <>
            <h2 className="text-[24px] text-[var(--color-text-main)] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Appearance Options</h2>
            <div className="flex flex-col gap-6">
              <div className="p-1 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl">
                <div className="px-6">
                  <PremiumToggle label="Cinematic Mode" description="Enable deep background glows, floating particles, and fluid parallax." isActive={settings.appearance.cinematicMode} onToggle={() => updateSetting('appearance', 'cinematicMode', !settings.appearance.cinematicMode)} />
                  <PremiumToggle label="Interface Animations" description="Smooth UI transitions and layout shifts." isActive={settings.appearance.animations} onToggle={() => updateSetting('appearance', 'animations', !settings.appearance.animations)} />
                  <PremiumSlider label="UI Density" description="Spacing between elements" value={settings.appearance.density} onChange={(v) => updateSetting('appearance', 'density', v)} />
                </div>
              </div>

              {/* Theme Vibe Selection Grid */}
              <div className="p-6 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl flex flex-col gap-4">
                <span className="text-[15px] text-[var(--color-text-main)] font-medium" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Vibe & Theme Mode</span>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => updateSetting('appearance', 'dawnMode', false)}
                    className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${!settings.appearance.dawnMode ? 'border-[var(--color-primary)]/50 bg-[var(--primary-10)] shadow-[0_0_20px_var(--primary-10)]' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'}`}
                  >
                    <Moon size={24} className={!settings.appearance.dawnMode ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"} />
                    <span className={`text-[12px] ${!settings.appearance.dawnMode ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-muted)]'}`}>Deep Space Dark</span>
                  </div>
                  <div 
                    onClick={() => updateSetting('appearance', 'dawnMode', true)}
                    className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${settings.appearance.dawnMode ? 'border-[var(--color-primary)]/50 bg-[var(--primary-10)] shadow-[0_0_20px_var(--primary-10)]' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'}`}
                  >
                    <Sparkles size={24} className={settings.appearance.dawnMode ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"} />
                    <span className={`text-[12px] ${settings.appearance.dawnMode ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-muted)]'}`}>Dawn Mode</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "behavior":
        return (
          <>
            <h2 className="text-[24px] text-[var(--color-text-main)] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>AI Behavior Engine</h2>
            <div className="p-1 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl">
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
            <h2 className="text-[24px] text-[var(--color-text-main)] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Voice & Audio Settings</h2>
            <div className="p-1 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl">
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
            <h2 className="text-[24px] text-[var(--color-text-main)] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Language Settings</h2>
            <div className="p-1 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl">
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
            <h2 className="text-[24px] text-[var(--color-text-main)] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Privacy Controls</h2>
            <div className="p-1 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl">
              <div className="px-6">
                <PremiumToggle label="Share Telemetry" description="Send anonymous crash reports and usage statistics to VaaniAI." isActive={settings.privacy.telemetry} onToggle={() => updateSetting('privacy', 'telemetry', !settings.privacy.telemetry)} />
              </div>
            </div>
          </>
        );
      case "accessibility":
        return (
          <>
            <h2 className="text-[24px] text-[var(--color-text-main)] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Accessibility Options</h2>
            <div className="p-1 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl">
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
            <h2 className="text-[24px] text-[var(--color-text-main)] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Notification Settings</h2>
            <div className="p-1 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl">
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
            <h2 className="text-[24px] text-[var(--color-text-main)] font-light mb-6" style={{ fontFamily: "Cabinet Grotesk" }}>Device Management</h2>
            <div className="p-6 rounded-2xl bg-[var(--orb-gradient-bottom)]/40 border border-white/5 backdrop-blur-xl flex flex-col gap-4">
               <div className="p-4 rounded-xl border border-[var(--primary-30)] bg-[var(--primary-05)] flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[var(--primary-20)] flex items-center justify-center">
                     <Smartphone size={20} className="text-[var(--color-primary)]" />
                   </div>
                   <div>
                     <p className="text-[15px] text-[var(--color-text-main)] font-medium">This Browser Session</p>
                     <p className="text-[12px] text-[var(--color-primary)]">Active Now • Web Interface</p>
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
    <div className="w-full h-full min-h-screen flex flex-col pt-6 md:pt-10 px-4 md:px-24 pb-20 md:pb-12 relative z-20 overflow-hidden">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-8 md:mb-10 md:pl-[60px] gap-4"
      >
        <div>
          <h1 className="text-[42px] tracking-tight text-[var(--color-text-main)] font-light mb-2" style={{ fontFamily: "Cabinet Grotesk" }}>
            Settings Dashboard
          </h1>
          <p className="text-[var(--color-text-muted)] text-[14px]" style={{ fontFamily: "General Sans" }}>
            Advanced configuration for your next-generation AI system.
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-10 md:pl-[60px] h-full max-w-[1400px] overflow-y-auto no-scrollbar">
        
        {/* Left Sidebar Menu */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex flex-row md:flex-col gap-2 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-6 overflow-x-auto no-scrollbar"
        >
          {CATEGORIES.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 w-full md:w-auto px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap group ${
                  isActive 
                    ? 'bg-[var(--primary-10)] border border-[var(--primary-30)] shadow-[inset_4px_0_0_var(--color-primary)] md:shadow-[inset_4px_0_0_var(--color-primary)]' 
                    : 'bg-transparent border border-transparent hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={18} className={isActive ? "text-[var(--color-primary-light)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors"} />
                  <span className={`text-[14px] font-medium tracking-wide ${isActive ? "text-[var(--color-text-main)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors"}`} style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                    {category.label}
                  </span>
                </div>
                <ChevronRight size={14} className={isActive ? "text-[var(--color-primary)] opacity-100" : "text-[var(--color-text-muted)] opacity-0 group-hover:opacity-50 transition-all"} />
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
