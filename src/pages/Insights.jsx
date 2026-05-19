import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  Clock, 
  Activity, 
  Languages, 
  Smile, 
  CalendarDays
} from "lucide-react";

// Top Metric Card
const MetricCard = ({ title, value, subtext, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="relative p-6 rounded-2xl bg-[#0A101B]/60 border border-white/5 backdrop-blur-xl overflow-hidden group hover:bg-[#0A101B]/80 transition-colors"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6A04C]/5 rounded-full blur-2xl group-hover:bg-[#D6A04C]/10 transition-colors" />
    <div className="flex items-start justify-between relative z-10">
      <div>
        <span className="text-[11px] uppercase tracking-[0.15em] text-[#A8957C] mb-1 block" style={{ fontFamily: "General Sans" }}>
          {title}
        </span>
        <h3 className="text-[32px] text-[#F6EBDD] font-light tracking-tight mb-2" style={{ fontFamily: "Cabinet Grotesk" }}>
          {value}
        </h3>
        <p className="text-[12px] text-[#D6A04C]/80" style={{ fontFamily: "General Sans" }}>
          {subtext}
        </p>
      </div>
      <div className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:border-[#D6A04C]/30 transition-colors">
        <Icon size={20} className="text-[#A8957C] group-hover:text-[#F4C76B]" />
      </div>
    </div>
  </motion.div>
);

// Custom Animated Bar Chart
const WeeklyBarChart = () => {
  const data = [
    { day: "Mon", value: 30 },
    { day: "Tue", value: 45 },
    { day: "Wed", value: 85 },
    { day: "Thu", value: 60 },
    { day: "Fri", value: 90 },
    { day: "Sat", value: 40 },
    { day: "Sun", value: 25 },
  ];

  return (
    <div className="w-full h-[200px] flex items-end justify-between px-2 gap-2 mt-6">
      {data.map((item, i) => (
        <div key={i} className="relative flex flex-col items-center flex-1 group">
          {/* Tooltip */}
          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#050816] border border-[#D6A04C]/30 text-[#F4C76B] text-[10px] py-1 px-2 rounded backdrop-blur-md whitespace-nowrap z-20">
            {item.value} Interactions
          </div>
          
          {/* Bar */}
          <div className="w-full max-w-[40px] bg-white/5 rounded-t-lg relative overflow-hidden h-[160px]">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${item.value}%` }}
              transition={{ duration: 1, delay: i * 0.1 + 0.5, type: "spring", stiffness: 50 }}
              className={`absolute bottom-0 left-0 w-full rounded-t-lg transition-colors ${
                item.value > 80 ? 'bg-gradient-to-t from-[#D6A04C]/20 to-[#D6A04C] shadow-[0_0_15px_rgba(214,160,76,0.5)]' : 'bg-gradient-to-t from-white/10 to-[#A8957C]/60 group-hover:to-[#D6A04C]/80'
              }`}
            />
          </div>
          
          {/* Label */}
          <span className="mt-4 text-[11px] text-[#A8957C] uppercase tracking-wider" style={{ fontFamily: "General Sans" }}>
            {item.day}
          </span>
        </div>
      ))}
    </div>
  );
};

// Custom Radial Progress Chart
const LanguageRadial = () => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <div className="relative w-[180px] h-[180px] mx-auto mt-4">
      {/* Background Track */}
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
        <circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="12"
        />
        {/* Hindi Segment (45%) */}
        <motion.circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="#D6A04C"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * 0.45) }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 8px rgba(214,160,76,0.4))" }}
        />
        {/* English Segment (35%) */}
        <motion.circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="#8B4A22"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * 0.35) }}
          transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
          style={{ strokeDashoffset: circumference - (circumference * 0.45) }} // Offset starting point manually for demo
          className="origin-center rotate-[162deg]" // 45% of 360 = 162deg
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] text-[#F6EBDD] font-light" style={{ fontFamily: "Cabinet Grotesk" }}>80%</span>
        <span className="text-[9px] text-[#A8957C] uppercase tracking-widest text-center px-4" style={{ fontFamily: "General Sans" }}>Primary<br/>Bilingual</span>
      </div>
    </div>
  );
};

// Emotion Bars
const EmotionBars = () => {
  const emotions = [
    { name: "Calm", value: 65, color: "bg-[#D6A04C]" },
    { name: "Inquisitive", value: 85, color: "bg-[#F4C76B]" },
    { name: "Focused", value: 40, color: "bg-[#8B4A22]" },
    { name: "Expressive", value: 25, color: "bg-white/40" },
  ];

  return (
    <div className="flex flex-col gap-4 mt-6">
      {emotions.map((em, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#E8D9C1]" style={{ fontFamily: "General Sans" }}>{em.name}</span>
            <span className="text-[11px] text-[#A8957C]">{em.value}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${em.value}%` }}
              transition={{ duration: 1, delay: 1 + i * 0.1, ease: "easeOut" }}
              className={`h-full rounded-full ${em.color}`}
              style={{ boxShadow: em.value > 60 ? `0 0 10px ${em.color.replace('bg-[', '').replace(']', '')}` : 'none' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Engagement Heatmap Matrix
const EngagementHeatmap = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const hours = Array.from({length: 12}, (_, i) => i * 2); // 0, 2, 4... 22

  return (
    <div className="w-full mt-4 overflow-x-auto no-scrollbar">
      <div className="min-w-[400px]">
        {/* X Axis Labels (Hours) */}
        <div className="flex justify-between pl-6 mb-2">
          {hours.map(h => (
            <span key={h} className="text-[9px] text-[#A8957C] w-6 text-center">{h}h</span>
          ))}
        </div>
        
        {/* Grid */}
        <div className="flex flex-col gap-1.5">
          {days.map((day, dIdx) => (
            <div key={dIdx} className="flex items-center gap-2">
              <span className="text-[10px] text-[#A8957C] w-4">{day}</span>
              <div className="flex gap-1.5 flex-1">
                {hours.map((_, hIdx) => {
                  // Generate random intensity (0 to 4)
                  const intensity = Math.floor(Math.random() * 5);
                  
                  // Color scale based on intensity
                  const getColors = (intensity) => {
                    switch(intensity) {
                      case 4: return "bg-[#D6A04C] shadow-[0_0_8px_rgba(214,160,76,0.6)]";
                      case 3: return "bg-[#D6A04C]/70";
                      case 2: return "bg-[#8B4A22]/60";
                      case 1: return "bg-white/10";
                      default: return "bg-white/5";
                    }
                  };

                  return (
                    <motion.div
                      key={hIdx}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 + (dIdx * 0.05) + (hIdx * 0.02) }}
                      className={`h-4 flex-1 rounded-sm ${getColors(intensity)} hover:border hover:border-white/40 transition-all cursor-crosshair`}
                      title={`Intensity: ${intensity}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Insights() {
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
          <h1 className="text-[42px] tracking-tight text-[#F6EBDD] font-light mb-2" style={{ fontFamily: "Cabinet Grotesk" }}>
            AI Insights
          </h1>
          <p className="text-[#A8957C] text-[14px]" style={{ fontFamily: "General Sans" }}>
            Deep analytics of your ambient voice interactions.
          </p>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="flex-1 md:pl-[60px] h-full max-w-7xl pb-20 overflow-y-auto no-scrollbar">
        
        {/* Top HUD Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
          <MetricCard 
            title="Avg Response Speed" 
            value="240ms" 
            subtext="Ultra-low latency achieved" 
            icon={Zap} 
            delay={0.1} 
          />
          <MetricCard 
            title="Accent Accuracy" 
            value="99.2%" 
            subtext="+1.4% vs last week" 
            icon={Target} 
            delay={0.2} 
          />
          <MetricCard 
            title="Total Listening" 
            value="14h 20m" 
            subtext="Active ambient sessions" 
            icon={Clock} 
            delay={0.3} 
          />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Interaction Graph (Spans 2 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl relative"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[16px] text-[#F6EBDD] font-medium flex items-center gap-2" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                <Activity size={16} className="text-[#D6A04C]" />
                Weekly Interactions
              </h3>
              <button className="text-[10px] uppercase tracking-widest text-[#A8957C] hover:text-[#D6A04C] transition-colors border border-white/10 px-3 py-1 rounded-full">
                Export Data
              </button>
            </div>
            <WeeklyBarChart />
          </motion.div>

          {/* Languages Doughnut */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-6 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl flex flex-col"
          >
            <h3 className="text-[16px] text-[#F6EBDD] font-medium flex items-center gap-2 mb-2" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              <Languages size={16} className="text-[#D6A04C]" />
              Language Distribution
            </h3>
            <LanguageRadial />
            <div className="mt-auto flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D6A04C] shadow-[0_0_5px_#D6A04C]" />
                <span className="text-[12px] text-[#A8957C]">Hindi (45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8B4A22]" />
                <span className="text-[12px] text-[#A8957C]">English (35%)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Emotion Analysis */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl"
          >
            <h3 className="text-[16px] text-[#F6EBDD] font-medium flex items-center gap-2 mb-2" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              <Smile size={16} className="text-[#D6A04C]" />
              Vocal Emotion Profile
            </h3>
            <EmotionBars />
          </motion.div>

          {/* Engagement Heatmap (Spans 2 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-[#0A101B]/40 border border-white/5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] text-[#F6EBDD] font-medium flex items-center gap-2" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                <CalendarDays size={16} className="text-[#D6A04C]" />
                Engagement Heatmap
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-[#A8957C] uppercase tracking-wider">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-white/5 rounded-sm" />
                  <div className="w-3 h-3 bg-white/10 rounded-sm" />
                  <div className="w-3 h-3 bg-[#8B4A22]/60 rounded-sm" />
                  <div className="w-3 h-3 bg-[#D6A04C]/70 rounded-sm" />
                  <div className="w-3 h-3 bg-[#D6A04C] shadow-[0_0_5px_#D6A04C] rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </div>
            <EngagementHeatmap />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
