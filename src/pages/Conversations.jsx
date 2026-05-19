import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Star, 
  Clock, 
  Filter, 
  MessageSquare, 
  Activity,
  Smile,
  Globe2,
  ChevronDown
} from "lucide-react";

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    title: "Cinematic UI Brainstorming",
    date: "Today, 10:45 AM",
    duration: "14:20",
    languages: ["English", "Hindi"],
    emotion: "Creative",
    isStarred: true,
    transcript: [
      { speaker: "AI", text: "How can I help you brainstorm today?", time: "10:45" },
      { speaker: "User", text: "I need ideas for a cinematic user interface.", time: "10:46" },
      { speaker: "AI", text: "Let's explore glassmorphism and subtle glowing ambient effects. Using deep dark backgrounds with golden highlights often gives a premium feel.", time: "10:46" }
    ]
  },
  {
    id: 2,
    title: "Translation Assistance",
    date: "Yesterday, 2:15 PM",
    duration: "05:12",
    languages: ["Tamil", "English"],
    emotion: "Focused",
    isStarred: false,
    transcript: [
      { speaker: "User", text: "How do I say 'Welcome to our platform' in Tamil?", time: "14:15" },
      { speaker: "AI", text: "You can say 'எங்கள் தளத்திற்கு வரவேற்கிறோம்' (Engal thalathirku varaverkirom).", time: "14:15" }
    ]
  },
  {
    id: 3,
    title: "Morning Briefing & News",
    date: "Yesterday, 8:30 AM",
    duration: "08:45",
    languages: ["Hindi"],
    emotion: "Calm",
    isStarred: true,
    transcript: [
      { speaker: "AI", text: "Good morning! Here is your daily briefing. The weather is pleasant.", time: "08:30" },
      { speaker: "User", text: "What's in the news today?", time: "08:31" },
      { speaker: "AI", text: "Tech stocks are rallying, and there's a major AI announcement coming later today.", time: "08:32" }
    ]
  },
  {
    id: 4,
    title: "React Native Debugging",
    date: "May 17, 11:20 PM",
    duration: "45:10",
    languages: ["English"],
    emotion: "Analytical",
    isStarred: false,
    transcript: [
      { speaker: "User", text: "I keep getting an invariant violation error.", time: "23:20" },
      { speaker: "AI", text: "Let's look at your component tree. Are you rendering a text string outside of a <Text> component?", time: "23:21" }
    ]
  }
];

const FILTERS = ["All", "Starred", "Recent", "Creative", "Analytical"];

// A simulated animated waveform component
const AnimatedWaveform = ({ isActive }) => {
  return (
    <div className="flex items-center justify-center gap-[2px] h-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: isActive ? ["4px", "14px", "4px"] : "4px",
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
          className="w-1 bg-[#D6A04C]/80 rounded-full"
        />
      ))}
    </div>
  );
};

export default function Conversations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredConversations = MOCK_CONVERSATIONS.filter(conv => {
    const matchesSearch = conv.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || 
                          (activeFilter === "Starred" && conv.isStarred) ||
                          (activeFilter === "Recent" && conv.date.includes("Today")) ||
                          (conv.emotion === activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full h-full min-h-screen flex flex-col pt-10 px-8 md:px-24 pb-20 relative z-20">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pl-[80px] md:pl-[60px]"
      >
        <div>
          <h1 className="text-[42px] tracking-tight text-[#F6EBDD] font-light mb-2" style={{ fontFamily: "Cabinet Grotesk" }}>
            Conversations
          </h1>
          <p className="text-[#A8957C] text-[14px]" style={{ fontFamily: "General Sans" }}>
            Your ambient memory and voice history.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={16} className="text-[#A8957C]" />
            </div>
            <input 
              type="text" 
              placeholder="Search history..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[280px] h-12 bg-white/[0.03] border border-white/10 rounded-full pl-11 pr-4 text-[14px] text-[#F6EBDD] placeholder:text-[#A8957C]/50 focus:outline-none focus:border-[#D6A04C]/40 focus:bg-white/[0.05] transition-all duration-300 backdrop-blur-md"
              style={{ fontFamily: "General Sans" }}
            />
          </div>
          <button className="h-12 px-5 bg-white/[0.03] border border-white/10 rounded-full text-[#A8957C] hover:text-[#D6A04C] hover:border-[#D6A04C]/30 transition-all duration-300 flex items-center gap-2 backdrop-blur-md">
            <Filter size={16} />
            <span className="text-[13px] font-medium" style={{ fontFamily: "General Sans" }}>Filters</span>
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pl-[80px] md:pl-[60px]"
      >
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-[13px] transition-all duration-500 whitespace-nowrap ${
              activeFilter === filter 
                ? 'bg-[#D6A04C]/10 border border-[#D6A04C]/30 text-[#D6A04C] shadow-[0_0_15px_rgba(214,160,76,0.1)]' 
                : 'bg-transparent border border-white/5 text-[#A8957C] hover:bg-white/5 hover:text-[#E8D9C1]'
            }`}
            style={{ fontFamily: "General Sans" }}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Conversations Grid */}
      <div className="flex-1 flex flex-col gap-4 pl-[80px] md:pl-[60px] max-w-5xl">
        <AnimatePresence>
          {filteredConversations.map((conv, index) => {
            const isExpanded = expandedId === conv.id;
            const isHovered = hoveredCard === conv.id;

            return (
              <motion.div
                key={conv.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredCard(conv.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setExpandedId(isExpanded ? null : conv.id)}
                className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 bg-[#0A101B]/40 backdrop-blur-xl ${
                  isExpanded 
                    ? 'border-[#D6A04C]/40 shadow-[0_10px_40px_-10px_rgba(214,160,76,0.15)]' 
                    : 'border-white/5 hover:border-[#D6A04C]/20 hover:bg-[#0A101B]/60'
                }`}
              >
                {/* Background Glow Effect */}
                <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D6A04C]/0 to-transparent transition-opacity duration-700 ${isHovered || isExpanded ? 'opacity-100 via-[#D6A04C]/40' : 'opacity-0'}`} />

                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5">
                  {/* Left: Icon / Play */}
                  <div className="flex-shrink-0 relative w-12 h-12 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${isExpanded || isHovered ? 'border-[#D6A04C]/30 bg-[#D6A04C]/10 scale-110' : 'border-white/10 bg-white/5'}`} />
                    {isHovered || isExpanded ? (
                      <AnimatedWaveform isActive={true} />
                    ) : (
                      <MessageSquare size={18} className="text-[#A8957C]" />
                    )}
                  </div>

                  {/* Center: Details */}
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[17px] text-[#F6EBDD] font-medium tracking-wide" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                        {conv.title}
                      </h3>
                      {conv.isStarred && (
                        <Star size={14} className="text-[#D6A04C] fill-[#D6A04C]" />
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#A8957C]" style={{ fontFamily: "General Sans" }}>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="opacity-70" />
                        <span>{conv.date}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1.5">
                        <Activity size={12} className="opacity-70" />
                        <span>{conv.duration}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1.5 text-[#D6A04C]/80">
                        <Globe2 size={12} />
                        <span>{conv.languages.join(" + ")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Emotion & Action */}
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-[#E8D9C1]">
                      <Smile size={12} className="text-[#D6A04C]" />
                      <span>{conv.emotion}</span>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(isExpanded ? null : conv.id);
                      }}
                    >
                      <ChevronDown size={18} className="text-[#A8957C]" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Chat Preview */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 mx-6">
                        <div className="flex flex-col gap-4 mt-4 relative">
                          {/* Timeline vertical line */}
                          <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#D6A04C]/20 via-white/5 to-transparent" />
                          
                          {conv.transcript.map((msg, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + (i * 0.1) }}
                              className="relative flex gap-4 pl-10"
                            >
                              <div className="absolute left-[-2px] top-[14px] w-8 h-[1px] bg-white/10" />
                              <div className={`absolute left-[11px] top-[10px] w-[9px] h-[9px] rounded-full border-2 ${msg.speaker === "AI" ? 'border-[#D6A04C] bg-[#D6A04C]/20' : 'border-[#8B4A22] bg-[#8B4A22]/20'} z-10`} />
                              
                              <div className={`p-4 rounded-2xl w-full text-[14px] leading-relaxed border ${msg.speaker === "AI" ? 'bg-[#D6A04C]/[0.03] border-[#D6A04C]/10 text-[#F6EBDD]' : 'bg-white/[0.02] border-white/5 text-[#E8D9C1]'}`} style={{ fontFamily: "General Sans" }}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-[11px] uppercase tracking-wider font-medium ${msg.speaker === "AI" ? 'text-[#D6A04C]' : 'text-[#A8957C]'}`}>
                                    {msg.speaker}
                                  </span>
                                  <span className="text-[10px] text-white/30">{msg.time}</span>
                                </div>
                                <p className="font-light">{msg.text}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                          <button className="text-[12px] uppercase tracking-widest text-[#D6A04C] hover:text-[#F4C76B] transition-colors" style={{ fontFamily: "General Sans" }}>
                            View Full Transcript
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredConversations.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-full border border-white/5 bg-white/5 flex items-center justify-center mb-4">
              <Search size={24} className="text-[#A8957C]" />
            </div>
            <h3 className="text-[18px] text-[#F6EBDD] mb-1">No conversations found</h3>
            <p className="text-[14px] text-[#A8957C]">Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
