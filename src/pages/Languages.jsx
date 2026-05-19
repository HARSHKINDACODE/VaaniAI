import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Star, 
  Globe2, 
  Mic, 
  Volume2,
  X,
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from "lucide-react";

const MOCK_LANGUAGES = [
  { id: "hi", name: "Hindi", script: "हिन्दी", region: "North India", proficiency: 98, isFavorite: true, isRecent: true, accents: ["Neutral", "Delhi", "Mumbai", "Bihari", "Lucknowi"] },
  { id: "en", name: "English", script: "English", region: "Global / India", proficiency: 100, isFavorite: true, isRecent: true, accents: ["Indian English", "UK", "US", "Neutral"] },
  { id: "mr", name: "Marathi", script: "मराठी", region: "Maharashtra", proficiency: 92, isFavorite: false, isRecent: true, accents: ["Puneri", "Mumbai", "Nagpuri", "Kolhapuri"] },
  { id: "gu", name: "Gujarati", script: "ગુજરાતી", region: "Gujarat", proficiency: 85, isFavorite: false, isRecent: false, accents: ["Ahmedabadi", "Surati", "Kathiyawadi"] },
  { id: "pa", name: "Punjabi", script: "ਪੰਜਾਬੀ", region: "Punjab", proficiency: 88, isFavorite: true, isRecent: false, accents: ["Majhi", "Doabi", "Malwai"] },
  { id: "ta", name: "Tamil", script: "தமிழ்", region: "Tamil Nadu", proficiency: 95, isFavorite: false, isRecent: false, accents: ["Chennai", "Madurai", "Kongu"] },
  { id: "kn", name: "Kannada", script: "ಕನ್ನಡ", region: "Karnataka", proficiency: 90, isFavorite: false, isRecent: false, accents: ["Bengaluru", "Mysuru", "Mangaluru"] },
  { id: "bn", name: "Bengali", script: "বাংলা", region: "West Bengal", proficiency: 94, isFavorite: false, isRecent: false, accents: ["Kolkata", "Dhaka", "Sylheti"] },
];

export default function Languages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState(null); // Language Object
  const [activeAccent, setActiveAccent] = useState("");
  
  // Customization Sliders
  const [pitch, setPitch] = useState(50);
  const [warmth, setWarmth] = useState(70);
  const [speed, setSpeed] = useState(50);

  const filteredLanguages = MOCK_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lang.script.includes(searchQuery)
  );

  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang);
    setActiveAccent(lang.accents[0]);
    // Reset sliders for demo
    setPitch(50);
    setWarmth(70);
    setSpeed(50);
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
            Languages & Voices
          </h1>
          <p className="text-[#A8957C] text-[14px]" style={{ fontFamily: "General Sans" }}>
            Configure your ambient intelligence across India's languages.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={16} className="text-[#A8957C]" />
            </div>
            <input 
              type="text" 
              placeholder="Search languages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[260px] h-12 bg-white/[0.03] border border-white/10 rounded-full pl-11 pr-4 text-[14px] text-[#F6EBDD] placeholder:text-[#A8957C]/50 focus:outline-none focus:border-[#D6A04C]/40 focus:bg-white/[0.05] transition-all duration-300 backdrop-blur-md"
              style={{ fontFamily: "General Sans" }}
            />
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 pl-[80px] md:pl-[60px] h-full max-w-7xl">
        
        {/* Left Side: Languages Grid */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredLanguages.map((lang, index) => (
                <motion.div
                  key={lang.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 backdrop-blur-xl min-h-[160px] ${
                    selectedLang?.id === lang.id 
                      ? 'border-[#D6A04C]/50 bg-[#D6A04C]/10 shadow-[0_10px_40px_-10px_rgba(214,160,76,0.2)]' 
                      : 'border-white/5 bg-[#0A101B]/40 hover:border-[#D6A04C]/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Watermark Background Script */}
                  <div className="absolute -bottom-8 -right-4 text-[120px] font-bold text-white/[0.02] group-hover:text-[#D6A04C]/5 transition-colors duration-700 pointer-events-none select-none z-0">
                    {lang.script}
                  </div>

                  {/* Highlight Glow on Selection */}
                  {selectedLang?.id === lang.id && (
                    <motion.div 
                      layoutId="langHighlight"
                      className="absolute inset-0 bg-gradient-to-br from-[#D6A04C]/10 to-transparent pointer-events-none z-0" 
                    />
                  )}

                  <div className="p-5 relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${selectedLang?.id === lang.id ? 'bg-[#D6A04C]/20 border-[#D6A04C]/40' : 'bg-white/5 border-white/10 group-hover:border-[#D6A04C]/30'}`}>
                          <Globe2 size={18} className={selectedLang?.id === lang.id ? 'text-[#F4C76B]' : 'text-[#A8957C] group-hover:text-[#F4C76B]'} />
                        </div>
                        <div>
                          <h3 className="text-[18px] text-[#F6EBDD] font-medium tracking-wide" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                            {lang.name}
                          </h3>
                          <p className="text-[11px] text-[#D6A04C]/80" style={{ fontFamily: "General Sans" }}>{lang.script}</p>
                        </div>
                      </div>
                      
                      {/* Star Toggle */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // In a real app, toggle favorite state here
                        }}
                        className={`p-2 rounded-full transition-colors ${lang.isFavorite ? 'hover:bg-white/10' : 'hover:bg-white/10'}`}
                      >
                        <Star size={16} className={lang.isFavorite ? 'text-[#D6A04C] fill-[#D6A04C]' : 'text-[#A8957C]'} />
                      </button>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#A8957C]" style={{ fontFamily: "General Sans" }}>Proficiency</span>
                        <span className="text-[11px] text-[#E8D9C1]">{lang.proficiency}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${selectedLang?.id === lang.id ? 'bg-gradient-to-r from-[#D6A04C] to-[#F4C76B]' : 'bg-[#D6A04C]/50 group-hover:bg-[#D6A04C]'}`}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {lang.isRecent && (
                          <span className="px-2 py-1 rounded text-[9px] uppercase tracking-wider bg-white/5 text-[#A8957C] border border-white/5">Recent</span>
                        )}
                        <span className="px-2 py-1 rounded text-[9px] uppercase tracking-wider bg-[#D6A04C]/10 text-[#D6A04C] border border-[#D6A04C]/20">{lang.region}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Configuration Panel */}
        <AnimatePresence mode="wait">
          {selectedLang ? (
            <motion.div 
              key="panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full md:w-[380px] lg:w-[420px] flex-shrink-0 flex flex-col gap-6"
            >
              {/* Config Header */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles size={40} className="text-[#D6A04C]/10" />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[24px] text-[#F6EBDD] font-light tracking-tight flex items-center gap-2" style={{ fontFamily: "Cabinet Grotesk" }}>
                    <SlidersHorizontal size={20} className="text-[#D6A04C]" />
                    Voice Config
                  </h2>
                  <button 
                    onClick={() => setSelectedLang(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={16} className="text-[#A8957C]" />
                  </button>
                </div>

                {/* Accent Selection */}
                <div className="mb-6">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#A8957C] mb-3 block" style={{ fontFamily: "General Sans" }}>
                    Regional Accent
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedLang.accents.map(accent => (
                      <button
                        key={accent}
                        onClick={() => setActiveAccent(accent)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] transition-all duration-300 ${
                          activeAccent === accent 
                            ? 'bg-[#D6A04C]/20 border border-[#D6A04C]/40 text-[#F6EBDD]' 
                            : 'bg-white/5 border border-white/5 text-[#A8957C] hover:bg-white/10 hover:text-[#E8D9C1]'
                        }`}
                        style={{ fontFamily: "General Sans" }}
                      >
                        {accent}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="flex flex-col gap-5">
                  {[
                    { label: "Vocal Pitch", value: pitch, setter: setPitch },
                    { label: "Warmth & Empathy", value: warmth, setter: setWarmth },
                    { label: "Speech Speed", value: speed, setter: setSpeed }
                  ].map((slider, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-[0.15em] text-[#A8957C]" style={{ fontFamily: "General Sans" }}>
                          {slider.label}
                        </span>
                        <span className="text-[11px] text-[#D6A04C]">{slider.value}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={slider.value}
                        onChange={(e) => slider.setter(e.target.value)}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none cursor-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#D6A04C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(214,160,76,0.8)]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Translation Preview HUD */}
              <div className="p-6 rounded-2xl bg-[radial-gradient(ellipse_at_top,#14192B,#0A101B_80%)] border border-[#D6A04C]/20 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjE0LCAxNjAsIDc2LCAwLjE1KSIvPjwvc3ZnPg==')] opacity-30" />
                
                <h3 className="text-[11px] uppercase tracking-[0.15em] text-[#D6A04C] mb-4 relative z-10" style={{ fontFamily: "General Sans" }}>
                  Live Preview Translation
                </h3>

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-[#A8957C]">English (Source)</span>
                      <Mic size={12} className="text-[#A8957C]/50" />
                    </div>
                    <p className="text-[14px] text-[#F6EBDD] font-light" style={{ fontFamily: "General Sans" }}>
                      "Hello, how can I assist you with your tasks today?"
                    </p>
                  </div>

                  <div className="flex justify-center -my-2 relative z-20">
                    <div className="w-8 h-8 rounded-full bg-[#D6A04C]/20 border border-[#D6A04C]/30 flex items-center justify-center backdrop-blur-md">
                      <ChevronRight size={14} className="text-[#F4C76B] rotate-90 md:rotate-0" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#D6A04C]/[0.05] border border-[#D6A04C]/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-[#D6A04C]/50" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-[#D6A04C]">
                        {selectedLang.name} ({activeAccent})
                      </span>
                      <button className="text-[#D6A04C] hover:text-[#F4C76B] transition-colors cursor-none">
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <p className="text-[16px] text-[#E8D9C1] mt-1" style={{ fontFamily: "General Sans" }}>
                      {selectedLang.id === "hi" ? "नमस्ते, मैं आज आपके कार्यों में कैसे सहायता कर सकता हूँ?" :
                       selectedLang.id === "mr" ? "नमस्कार, मी आज तुमच्या कामात कशी मदत करू शकेन?" :
                       selectedLang.id === "ta" ? "வணக்கம், இன்று உங்கள் பணிகளில் நான் எவ்வாறு உதவ முடியும்?" :
                       `[Translating to ${selectedLang.name}...]`}
                    </p>
                  </div>
                </div>

                {/* Simulated Audio Waveform for Preview */}
                <div className="mt-6 flex items-end justify-center gap-1 h-6 opacity-50 relative z-10 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["4px", `${Math.max(4, Math.random() * 24)}px`, "4px"] }}
                      transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
                      className="w-1 rounded-full bg-[#D6A04C]"
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden md:flex w-[380px] lg:w-[420px] flex-shrink-0 items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
            >
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <Globe2 size={24} className="text-[#A8957C]" />
                </div>
                <h3 className="text-[16px] text-[#F6EBDD] mb-2" style={{ fontFamily: "General Sans" }}>Select a Language</h3>
                <p className="text-[13px] text-[#A8957C]">Choose a language card to configure accents, tone, and regional styles.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
