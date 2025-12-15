'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  HeartPulse, Building2, BadgeDollarSign, ShoppingBag, Truck, Users, Plane, 
  Phone, Calendar, Repeat, Play, Activity, CheckCircle2, ShieldCheck, 
  MessageSquare, Star, Wallet, Sparkles, PhoneCall, TrendingUp, Zap,
  Briefcase, UserCheck, FileText, MapPin, Box, Globe
} from 'lucide-react';
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import ScrollTextReveal from "@/components/animations/ScrollTextReveal"
import StaggerReveal from "@/components/animations/StaggerReveal"
// --- Data ---
const INDUSTRIES = [
   {
    id: 'realestate',
    name: "Real Estate",
    color: "from-blue-600 to-indigo-500",
    bgGradient: "from-blue-100/60 via-slate-50 to-slate-50",
    textAccent: "text-blue-600",
    icon: <Building2 size={18} />,
    particle: <Building2 size={24} className="text-blue-500/40" />,
    cards: [
      {
        title: "Lead Qualification",
        desc: "Instant vetting of buyer intent, budget, and timeline.",
        icon: <CheckCircle2 size={32} />,
        tag: "Sales",
        bg: "bg-blue-50",
        kpi: { value: "2x", label: "Conversion" }
      },
      {
        title: "Tour Booking",
        desc: "Syncs with agent calendars to book property viewings.",
        icon: <Calendar size={32} />,
        tag: "Scheduling",
        bg: "bg-indigo-50",
        kpi: { value: "+30%", label: "Showings" }
      },
      {
        title: "Feedback Loop",
        desc: "Collects buyer feedback automatically after open houses.",
        icon: <MessageSquare size={32} />,
        tag: "Insights",
        bg: "bg-sky-50",
        kpi: { value: "100%", label: "Response" }
      }
    ]
  },
  {
    id: 'healthcare',
    name: "Healthcare",
    color: "from-emerald-500 to-teal-400",
    bgGradient: "from-emerald-100/60 via-slate-50 to-slate-50",
    textAccent: "text-emerald-600",
    icon: <HeartPulse size={18} />,
    particle: <HeartPulse size={24} className="text-emerald-500/40" />,
    cards: [
      {
        title: "Patient Triage",
        desc: "AI screens symptoms and routes critical calls instantly.",
        icon: <Activity size={32} />,
        tag: "Efficiency",
        bg: "bg-emerald-50",
        kpi: { value: "-40%", label: "Wait Time" }
      },
      {
        title: "Auto-Scheduling",
        desc: "24/7 appointment booking directly into EHR systems.",
        icon: <Calendar size={32} />,
        tag: "Integration",
        bg: "bg-teal-50",
        kpi: { value: "24/7", label: "Availability" }
      },
      {
        title: "Post-Op Checkup",
        desc: "Automated wellness calls to reduce readmission rates.",
        icon: <HeartPulse size={32} />,
        tag: "Care",
        bg: "bg-green-50",
        kpi: { value: "-30%", label: "Readmissions" }
      }
    ]
  },
 
  {
    id: 'fintech',
    name: "Fintech",
    color: "from-violet-600 to-purple-500",
    bgGradient: "from-violet-100/60 via-slate-50 to-slate-50",
    textAccent: "text-violet-600",
    icon: <BadgeDollarSign size={18} />,
    particle: <BadgeDollarSign size={24} className="text-purple-500/40" />,
    cards: [
      {
        title: "Fraud Alerts",
        desc: "Immediate voice verification for suspicious transactions.",
        icon: <ShieldCheck size={32} />,
        tag: "Security",
        bg: "bg-violet-50",
        kpi: { value: "99.9%", label: "Detection" }
      },
      {
        title: "Loan Support",
        desc: "Guides users through application requirements in real-time.",
        icon: <Wallet size={32} />,
        tag: "Support",
        bg: "bg-purple-50",
        kpi: { value: "-50%", label: "Ops Cost" }
      },
      {
        title: "Collections",
        desc: "Empathetic, automated payment reminders and arrangements.",
        icon: <Repeat size={32} />,
        tag: "Finance",
        bg: "bg-fuchsia-50",
        kpi: { value: "+25%", label: "Recovery" }
      }
    ]
  },
  {
    id: 'ecommerce',
    name: "Retail",
    color: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-100/60 via-slate-50 to-slate-50",
    textAccent: "text-orange-600",
    icon: <ShoppingBag size={18} />,
    particle: <ShoppingBag size={24} className="text-orange-500/40" />,
    cards: [
      {
        title: "Order Status",
        desc: "Instant tracking updates without human agent involvement.",
        icon: <Truck size={32} />,
        tag: "Logistics",
        bg: "bg-orange-50",
        kpi: { value: "0m", label: "Hold Time" }
      },
      {
        title: "Returns & Refunds",
        desc: "Handles policy checks and initiates refunds automatically.",
        icon: <Repeat size={32} />,
        tag: "Service",
        bg: "bg-amber-50",
        kpi: { value: "Instant", label: "Process" }
      },
      {
        title: "Cart Recovery",
        desc: "Proactive calls to customers to recover lost sales.",
        icon: <ShoppingBag size={32} />,
        tag: "Revenue",
        bg: "bg-yellow-50",
        kpi: { value: "+15%", label: "Revenue" }
      }
    ]
  },
  {
    id: 'logistics',
    name: "Logistics",
    color: "from-cyan-600 to-blue-600",
    bgGradient: "from-cyan-100/60 via-slate-50 to-slate-50",
    textAccent: "text-cyan-600",
    icon: <Truck size={18} />,
    particle: <Truck size={24} className="text-cyan-500/40" />,
    cards: [
      {
        title: "Driver Dispatch",
        desc: "Automated route updates and coordination for drivers.",
        icon: <MapPin size={32} />,
        tag: "Operations",
        bg: "bg-cyan-50",
        kpi: { value: "-20%", label: "Idle Time" }
      },
      {
        title: "Freight Quotes",
        desc: "Instant voice-based quoting for standard shipping lanes.",
        icon: <Box size={32} />,
        tag: "Sales",
        bg: "bg-sky-50",
        kpi: { value: "Instant", label: "Pricing" }
      },
      {
        title: "Delivery Exception",
        desc: "Proactive calls to recipients when delays occur.",
        icon: <PhoneCall size={32} />,
        tag: "Service",
        bg: "bg-blue-50",
        kpi: { value: "+15%", label: "CSAT" }
      }
    ]
  },
  {
    id: 'recruitment',
    name: "Recruitment",
    color: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-100/60 via-slate-50 to-slate-50",
    textAccent: "text-pink-600",
    icon: <Users size={18} />,
    particle: <Users size={24} className="text-pink-500/40" />,
    cards: [
      {
        title: "Pre-Screening",
        desc: "AI interviews candidates to qualify skills and availability.",
        icon: <UserCheck size={32} />,
        tag: "Hiring",
        bg: "bg-pink-50",
        kpi: { value: "-70%", label: "Screen Time" }
      },
      {
        title: "Interview Setup",
        desc: "Coordinates calendars between hiring managers and talent.",
        icon: <Calendar size={32} />,
        tag: "Admin",
        bg: "bg-rose-50",
        kpi: { value: "100%", label: "Automated" }
      },
      {
        title: "Onboarding",
        desc: "Answers common HR questions for new hires 24/7.",
        icon: <Briefcase size={32} />,
        tag: "HR",
        bg: "bg-red-50",
        kpi: { value: "24/7", label: "Support" }
      }
    ]
  },
  {
    id: 'travel',
    name: "Travel",
    color: "from-sky-500 to-indigo-400",
    bgGradient: "from-sky-100/60 via-slate-50 to-slate-50",
    textAccent: "text-sky-600",
    icon: <Plane size={18} />,
    particle: <Plane size={24} className="text-sky-500/40" />,
    cards: [
      {
        title: "Flight Changes",
        desc: "Handle rebooking and cancellations via natural voice.",
        icon: <Plane size={32} />,
        tag: "Support",
        bg: "bg-sky-50",
        kpi: { value: "0m", label: "Wait Time" }
      },
      {
        title: "Disruption Mgmt",
        desc: "Mass outbound calls to rebook passengers during storms.",
        icon: <Zap size={32} />,
        tag: "Crisis",
        bg: "bg-indigo-50",
        kpi: { value: "10k+", label: "Calls/Hr" }
      },
      {
        title: "Hotel Concierge",
        desc: "Book amenities, dining, and spa services instantly.",
        icon: <Star size={32} />,
        tag: "Service",
        bg: "bg-blue-50",
        kpi: { value: "+20%", label: "Upsell" }
      }
    ]
  }
];

// --- Shared Components ---

const DynamicBackground = ({ activeIndustry }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-50 transition-colors duration-700">
      <motion.div 
        key={activeIndustry.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-b ${activeIndustry.bgGradient}`}
      />
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
            <motion.div
              key={`${activeIndustry.id}-particle-${i}`}
              className="absolute"
              initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 100, opacity: 0 }}
              animate={{ y: -100, opacity: [0, 0.6, 0], rotate: Math.random() * 360 }}
              transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: i * 3 }}
            >
              {activeIndustry.particle}
            </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 opacity-[0.4] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
};

const TabButton = ({ industry, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border shadow-sm
      ${isActive 
        ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-md' 
        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}
    `}
  >
    {industry.icon}
    {industry.name}
  </button>
);

const CardVisuals = ({ data, industry, isDesktop = false }) => (
  <>
    {/* Visual Header - Adaptive Height */}
    <div className={`${isDesktop ? 'h-[50%]' : 'h-[58%]'} ${data.bg} relative flex items-center justify-center overflow-hidden transition-all duration-500`}>
        <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br ${industry.color} opacity-10 blur-[80px]`} />
        
        <div className="relative z-10 p-6 xl:p-8 bg-white rounded-full shadow-2xl shadow-slate-200/50 text-slate-800 transform hover:scale-105 transition-transform duration-500">
          {data.icon}
        </div>

        <div className="absolute top-4 right-4 xl:top-6 xl:right-6 bg-white/80 backdrop-blur-md px-3 py-1 xl:px-4 xl:py-1.5 rounded-full border border-white shadow-sm">
          <span className={`text-[10px] xl:text-xs font-bold uppercase tracking-wider ${industry.textAccent}`}>{data.tag}</span>
        </div>
    </div>

    {/* Content Body */}
    <div className="flex-1 p-6 xl:p-8 flex flex-col justify-between bg-white relative">
        <div className="absolute top-0 left-0 w-full -mt-8 h-8 bg-white rounded-t-[32px]"></div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <div className={`p-1.5 rounded-lg ${data.bg}`}>
              {industry.icon}
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{industry.name} AI</span>
          </div>
          
          <h2 className="text-2xl xl:text-3xl font-black text-slate-900 leading-[1.1] tracking-tight line-clamp-2">{data.title}</h2>
          <p className="text-slate-500 text-sm xl:text-base font-medium leading-relaxed line-clamp-3">{data.desc}</p>
        </div>

        {/* KPI Section */}
        <div className="pt-4 mt-auto border-t border-slate-50 flex items-center justify-between">
          <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Primary Impact</p>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl xl:text-4xl font-black ${industry.textAccent} tracking-tight`}>{data.kpi.value}</span>
                <span className="text-xs xl:text-sm font-bold text-slate-500">{data.kpi.label}</span>
              </div>
          </div>
          
          <div className={`w-10 h-10 xl:w-12 xl:h-12 rounded-2xl ${data.bg} flex items-center justify-center text-slate-700`}>
              <TrendingUp size={20} className={`xl:w-6 xl:h-6 ${industry.textAccent}`} strokeWidth={2.5} />
          </div>
        </div>
    </div>
  </>
);

const SwipeCard = React.forwardRef(({ data, industry, index, isFront, onSwipe }, ref) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-8, 8]);

  const rightOpacity = useTransform(x, [20, 100], [0, 1]);
  const leftOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (event, info) => {
    const threshold = 120;
    if (info.offset.x > threshold) onSwipe('right');
    else if (info.offset.x < -threshold) onSwipe('left');
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, rotate: isFront ? rotate : 0, zIndex: isFront ? 50 : 10 - index, scale: isFront ? 1 : 0.96, top: isFront ? 0 : 20 }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      initial={isFront ? { scale: 0.96, y: 20, opacity: 0 } : {}}
      animate={{ scale: isFront ? 1 : 0.96, y: isFront ? 0 : 20, opacity: 1 }}
      exit={{ x: x.get() < 0 ? -800 : 800, opacity: 0, rotate: x.get() < 0 ? -15 : 15, transition: { duration: 0.4 } }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="absolute w-full h-[75vh] max-h-[700px] bg-white rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden origin-bottom cursor-grab active:cursor-grabbing border border-slate-100"
    >
      {isFront && (
        <>
          <motion.div style={{ opacity: rightOpacity }} className="absolute top-8 left-8 z-50 bg-emerald-500 text-white shadow-xl rounded-xl px-4 py-2 transform -rotate-12 border-4 border-white flex items-center gap-2">
            <PhoneCall size={24} strokeWidth={3} />
            <span className="font-black text-xl uppercase tracking-widest">New Call</span>
          </motion.div>
          <motion.div style={{ opacity: leftOpacity }} className="absolute top-8 right-8 z-50 bg-rose-500 text-white shadow-xl rounded-xl px-4 py-2 transform rotate-12 border-4 border-white flex items-center gap-2">
            <PhoneCall size={24} strokeWidth={3} />
            <span className="font-black text-xl uppercase tracking-widest">New Call</span>
          </motion.div>
        </>
      )}
      <CardVisuals data={data} industry={industry} />
    </motion.div>
  );
});

// Desktop Static Card Wrapper - Non-interactive (No Swipe)
const DesktopCard = ({ data, industry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    className="relative w-full h-full bg-white rounded-[32px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-default"
  >
    <CardVisuals data={data} industry={industry} isDesktop={true} />
  </motion.div>
);

export default function App() {
  const [activeIndustryId, setActiveIndustryId] = useState(INDUSTRIES[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const activeIndustry = INDUSTRIES.find(i => i.id === activeIndustryId) || INDUSTRIES[0];
  const cards = activeIndustry.cards;

  const topCardIndex = currentIndex % cards.length;
  const nextCardIndex = (currentIndex + 1) % cards.length;

  const handleTabClick = (id) => {
    setActiveIndustryId(id);
    setCurrentIndex(0);
  };

  const handleSwipe = (direction) => {
    setTimeout(() => { setCurrentIndex(prev => prev + 1); }, 200);
  };

  return (
    <div className="relative w-full py-2 px-2 min-h-screen overflow-hidden flex flex-col font-sans select-none bg-slate-50 z-10">
      
      {/* 1. Light Dynamic Background */}
      <DynamicBackground activeIndustry={activeIndustry} />

      {/* Heading */}
      <div className="flex-none pt-8 pb-4 z-40 relative text-center">
          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-5xl  text-bold
             text-slate-900 mb-6">
              <ScrollTextReveal text="Industrial Use Cases" splitBy="word" />
            </h1>
          </ScrollReveal>
      </div>

      {/* 2. Top Navigation (Tabs) */}
      <div className="flex-none pb-4 z-40 relative">
          <div className="flex gap-3 overflow-x-auto px-6 pb-2 no-scrollbar snap-x scroll-pl-6 justify-start md:justify-center" style={{ scrollBehavior: 'smooth' }}>
            {INDUSTRIES.map((ind) => (
                <TabButton 
                    key={ind.id} 
                    industry={ind} 
                    isActive={activeIndustryId === ind.id} 
                    onClick={() => handleTabClick(ind.id)}
                />
            ))}
            <div className="w-4 shrink-0 md:hidden" />
          </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-30 pb-6 px-4 py-2 min-h-0  w-full">
          
          {/* MOBILE: Swipe Stack (Hidden on MD+ screens) */}
          <div className="md:hidden w-full max-w-md h-[78vh] relative">
            <AnimatePresence mode='popLayout'>
                <SwipeCard 
                    key={`${activeIndustryId}-${nextCardIndex}-back`}
                    data={cards[nextCardIndex]}
                    industry={activeIndustry}
                    index={1}
                    isFront={false}
                    onSwipe={() => {}}
                />
                <SwipeCard 
                    key={`${activeIndustryId}-${topCardIndex}-front`}
                    data={cards[topCardIndex]}
                    industry={activeIndustry}
                    index={0}
                    isFront={true}
                    onSwipe={handleSwipe}
                />
            </AnimatePresence>
          </div>

          {/* DESKTOP: Grid View (Hidden on Mobile) - Fully Responsive Single Screen */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 xl:gap-8 w-full max-w-7xl flex-1 px-8 pb-8 pt-4 h-full">
            <AnimatePresence mode='wait'>
                {activeIndustry.cards.map((card, idx) => (
                    <DesktopCard 
                      key={`${activeIndustryId}-desktop-${idx}`} 
                      data={card} 
                      industry={activeIndustry} 
                    />
                ))}
            </AnimatePresence>
          </div>

      </div>
      
      {/* Mobile Hint */}
      <div className="md:hidden absolute bottom-6 w-full text-center z-20 pointer-events-none opacity-40">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Swipe for New Call</span>
      </div>

    </div>
  );
}