'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Heart,
  Briefcase,
  Activity,
  ShoppingCart,
  Car,
  GraduationCap,
  Truck,
  Shield,
  Scale,
  Users,
  Plane,
  Film,
  Workflow,
  Mic,
  Zap,
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import Header from "@/components/header"
import Footer from "@/components/footer"

/**
 * --- DATA GENERATION ---
 */
const INDUSTRIES = [
  { id: 'healthcare', label: 'Healthcare', icon: Heart, color: 'from-pink-500 to-rose-600', text: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 'realestate', label: 'Real Estate', icon: Briefcase, color: 'from-emerald-500 to-teal-600', text: 'text-teal-600', bg: 'bg-emerald-50' },
  { id: 'fintech', label: 'Fintech', icon: Activity, color: 'from-blue-600 to-indigo-600', text: 'text-indigo-600', bg: 'bg-blue-50' },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart, color: 'from-orange-500 to-red-600', text: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'automotive', label: 'Automotive', icon: Car, color: 'from-red-600 to-red-800', text: 'text-red-700', bg: 'bg-red-50' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'from-yellow-500 to-amber-600', text: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'logistics', label: 'Logistics', icon: Truck, color: 'from-amber-500 to-yellow-600', text: 'text-yellow-600', bg: 'bg-yellow-50' },
  { id: 'insurance', label: 'Insurance', icon: Shield, color: 'from-indigo-500 to-purple-600', text: 'text-purple-600', bg: 'bg-indigo-50' },
  { id: 'legal', label: 'Legal', icon: Scale, color: 'from-slate-500 to-slate-700', text: 'text-slate-600', bg: 'bg-slate-50' },
  { id: 'hr', label: 'Recruitment', icon: Users, color: 'from-purple-500 to-violet-600', text: 'text-violet-600', bg: 'bg-purple-50' },
  { id: 'travel', label: 'Travel', icon: Plane, color: 'from-cyan-500 to-sky-600', text: 'text-sky-600', bg: 'bg-sky-50' },
  { id: 'entertainment', label: 'Media', icon: Film, color: 'from-fuchsia-500 to-pink-600', text: 'text-pink-600', bg: 'bg-pink-50' },
];

const USE_CASES = {
  healthcare: [
    { title: "Patient Triage", kpi: "30% ↓ Wait Time", cases: ["Symptom checker", "Urgent care routing", "Pre-visit form fill"] },
    { title: "Appt. Scheduling", kpi: "24/7 Booking", cases: ["Calendar sync", "Rescheduling", "No-show reduction"] },
    { title: "Prescription Refill", kpi: "100% Automated", cases: ["Pharmacy coordination", "Payment collection", "Status updates"] },
    { title: "Post-Op Follow-up", kpi: "40% Better Adherence", cases: ["Symptom monitoring", "Medication reminders", "Nurse escalation"] },
    { title: "Billing Support", kpi: "2x Faster Payment", cases: ["Invoice explanation", "Payment plans", "Insurance verification"] }
  ],
  realestate: [
    { title: "Lead Qualification", kpi: "3x More Leads", cases: ["Budget verification", "Location preference", "Timeline check"] },
    { title: "Tour Booking", kpi: "Zero Friction", cases: ["Agent calendar sync", "Lockbox codes", "Reminders"] },
    { title: "Open House RSVP", kpi: "50% ↑ Attendance", cases: ["Event details", "Directions sent", "Post-event feedback"] },
    { title: "Tenant Support", kpi: "90% Auto-resolved", cases: ["Maintenance requests", "Rent reminders", "Emergency routing"] },
    { title: "Mortgage Pre-screen", kpi: "High Intent", cases: ["Rate checking", "Credit score dip", "Lender connection"] }
  ],
  fintech: [
    { title: "Fraud Detection", kpi: "<1s Response", cases: ["Transaction verify", "Card freeze", "Identity check"] },
    { title: "Loan Application", kpi: "2x Conversion", cases: ["Eligibility check", "Document collection", "Status update"] },
    { title: "Payment Recovery", kpi: "35% Recovery Rate", cases: ["Gentle reminders", "Payment plan setup", "Promise to pay"] },
    { title: "Account Support", kpi: "0 Hold Time", cases: ["Balance inquiry", "Transfer funds", "Reset PIN"] },
    { title: "Investment Advisor", kpi: "Personalized", cases: ["Market updates", "Portfolio rebalance", "Risk assessment"] }
  ],
  ecommerce: [
    { title: "Order Tracking", kpi: "60% Fewer Tickets", cases: ["Real-time status", "Delivery window", "Courier details"] },
    { title: "Cart Abandonment", kpi: "15% Revenue Lift", cases: ["Discount offer", "Limited stock alert", "One-tap checkout"] },
    { title: "Product Returns", kpi: "Instant RMA", cases: ["Reason for return", "Label generation", "Refund status"] },
    { title: "Product Reorder", kpi: "High LTV", cases: ["Subscription management", "Smart reminders", "Upsell offers"] },
    { title: "Flash Sale Alert", kpi: "4x Engagement", cases: ["VIP notification", "Early access", "Instant buy"] }
  ],
  automotive: [
    { title: "Service Booking", kpi: "Full Bays", cases: ["Mileage check", "Recall alert", "Calendar sync"] },
    { title: "Test Drive", kpi: "2x Show Rate", cases: ["License verify", "Model preference", "Slot booking"] },
    { title: "Parts Inquiry", kpi: "Auto-Inventory", cases: ["Stock check", "Price quote", "Order placement"] },
    { title: "Roadside Assist", kpi: "GPS Located", cases: ["Location share", "Tow dispatch", "Status tracking"] },
    { title: "Lease Renewal", kpi: "Retention ↑", cases: ["Equity check", "New model offers", "Appt setting"] }
  ],
  education: [
    { title: "Admissions QA", kpi: "24/7 Support", cases: ["Deadline info", "Requirement check", "Campus tour"] },
    { title: "Student Support", kpi: "Instant Help", cases: ["Course lookup", "Library hours", "IT reset"] },
    { title: "Alumni Donation", kpi: "Higher Giving", cases: ["Campaign updates", "Pledge processing", "Event RSVP"] },
    { title: "Course Enrollment", kpi: "Error Free", cases: ["Prereq check", "Waitlist mgmt", "Schedule build"] },
    { title: "Tuition Help", kpi: "Payment Plans", cases: ["Aid status", "Deadline reminders", "Plan setup"] }
  ],
  insurance: [
    { title: "FNOL Claims", kpi: "5m Completion", cases: ["Incident details", "Photo upload", "Tow dispatch"] },
    { title: "Policy Renewal", kpi: "90% Retention", cases: ["Coverage review", "Discount check", "Payment"] },
    { title: "Quote Gen", kpi: "Instant Rate", cases: ["Risk assessment", "Bundle offers", "Bind policy"] },
    { title: "Provider Search", kpi: "In-Network", cases: ["Geo-location", "Specialty filter", "Appt booking"] },
    { title: "Doc Request", kpi: "Automated", cases: ["ID card send", "Cert of insurance", "Policy PDF"] }
  ],
  logistics: [
    { title: "Driver Dispatch", kpi: "Route Optimized", cases: ["Load assignment", "Route updates", "Delay reporting"] },
    { title: "Consignee Confirm", kpi: "99% Delivery Rate", cases: ["Address verify", "Gate code entry", "Time window fix"] },
    { title: "Freight Quoting", kpi: "Instant Quotes", cases: ["Lane pricing", "Capacity check", "Booking confirm"] },
    { title: "Warehouse Ops", kpi: "Hands-free", cases: ["Inventory check", "Dock scheduling", "Team coordination"] },
    { title: "Claims Processing", kpi: "50% Faster", cases: ["Damage report", "Photo upload link", "Status check"] }
  ],
  hr: [
    { title: "Candidate Screen", kpi: "Save 20hr/week", cases: ["Skill verification", "Salary expectation", "Role fit check"] },
    { title: "Interview Sched.", kpi: "Auto-coordinated", cases: ["Panel availability", "Timezone sync", "Calendar invite"] },
    { title: "Onboarding", kpi: "Day 1 Ready", cases: ["Document checklist", "IT setup requests", "Welcome info"] },
    { title: "Employee FAQ", kpi: "24/7 HR Desk", cases: ["Benefits questions", "Policy check", "Payroll info"] },
    { title: "Exit Interviews", kpi: "Honest Feedback", cases: ["Survey collection", "Offboarding steps", "Asset return"] }
  ],
  travel: [
    { title: "Flight Booking", kpi: "3m Avg Handling", cases: ["Route search", "Seat selection", "Payment process"] },
    { title: "Disruption Mgmt", kpi: "Instant Rebook", cases: ["Cancel notification", "Rebooking options", "Voucher issue"] },
    { title: "Hotel Concierge", kpi: "VIP Service", cases: ["Room service", "Spa booking", "Late checkout"] },
    { title: "Tour Guide", kpi: "Local Context", cases: ["Attraction info", "Ticket booking", "Directions"] },
    { title: "Visa Assistance", kpi: "Error Reduction", cases: ["Requirement check", "Status update", "Embassy info"] }
  ],
  legal: [
    { title: "Client Intake", kpi: "Zero Data Entry", cases: ["Case details", "Conflict check", "Consult booking"] },
    { title: "Court Dates", kpi: "No Misses", cases: ["Reminders", "Location maps", "Doc checklist"] },
    { title: "Doc Generation", kpi: "Instant Draft", cases: ["NDA creation", "Contract template", "E-sign send"] },
    { title: "Case Status", kpi: "Client Peace", cases: ["Update push", "Next steps", "Billing status"] },
    { title: "Retainer Pay", kpi: "98% Collection", cases: ["Secure link", "Payment plan", "Receipt gen"] }
  ],
  entertainment: [
    { title: "Ticket Sales", kpi: "Sold Out", cases: ["Seat selection", "Group discount", "Upsell VIP"] },
    { title: "Event FAQ", kpi: "Bot Handled", cases: ["Parking info", "Bag policy", "Gate times"] },
    { title: "Casting Calls", kpi: "Global Reach", cases: ["Role info", "Video submit", "Callback sched"] },
    { title: "Content Sub", kpi: "Churn Reduce", cases: ["Renewal offer", "Show recommend", "Account fix"] },
    { title: "Merch Store", kpi: "Add-on Rev", cases: ["Size check", "Pre-order", "Shipping track"] }
  ]
};

// --- COMPONENTS ---

const IndustryTab = ({ industry, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap
      ${isActive
        ? `bg-gradient-to-r ${industry.color} text-white shadow-lg shadow-gray-200 scale-105 ring-2 ring-white`
        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 shadow-sm'}
    `}
  >
    <industry.icon size={16} />
    {industry.label}
  </button>
);

const CardContent = ({ data, industry, isDesktop }) => {
  const Icon = industry.icon;

  return (
    <div className={`
      relative w-full flex flex-col p-6 select-none h-full
      bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]
      ${isDesktop ? 'hover:scale-[1.02] transition-transform duration-300 p-4' : ''}
    `}>
      {/* Dynamic Background Glow */}
      <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${industry.color} opacity-[0.08] blur-[60px] rounded-full pointer-events-none`} />
      <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr ${industry.color} opacity-[0.05] blur-[50px] rounded-full pointer-events-none`} />

      {/* 1. Header */}
      <div className="flex flex-col gap-2 z-10">
        <div className="flex items-center justify-between mb-1">
            <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${industry.color} text-white shadow-md`}>
                <Icon size={isDesktop ? 18 : 24} />
            </div>
            <div className={`px-2 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold tracking-wider ${industry.text} flex items-center gap-1.5`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                AI ACTIVE
            </div>
        </div>
        <h2 className={`${isDesktop ? 'text-lg' : 'text-3xl'} font-bold text-gray-900 leading-tight tracking-tight mt-1 truncate`}>{data.title}</h2>
        <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-wide uppercase">{industry.label} Automation</p>
      </div>

      {/* KPI Section */}
      <div className={`p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between ${isDesktop ? 'my-2' : 'my-4'}`}>
        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <Activity size={14} className={industry.text} />
            <span>Efficiency</span>
        </div>
        <span className={`${isDesktop ? 'text-sm' : 'text-lg'} font-bold text-transparent bg-clip-text bg-gradient-to-r ${industry.color}`}>
            {data.kpi}
        </span>
      </div>

      {/* 2. Core Content - Use Cases */}
      <div className="flex flex-col gap-2 z-10 flex-1">
        {data.cases.map((useCase, idx) => (
          <div key={idx} className={`flex items-center gap-2 rounded-xl bg-gray-50 border border-transparent transition-all ${isDesktop ? 'p-2' : 'p-3'}`}>
            <div className={`min-w-[20px] h-5 rounded-full bg-gradient-to-br ${industry.color} flex items-center justify-center text-white shadow-sm font-bold text-[8px]`}>
                {idx + 1}
            </div>
            <span className="text-gray-600 text-[10px] md:text-xs font-bold leading-tight line-clamp-2">{useCase}</span>
          </div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <div className="mt-auto pt-4 flex justify-center opacity-20">
        <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${industry.color}`} />
      </div>

    </div>
  );
};

const SwipeableCard = ({ data, industry, onSwipe, index }) => {
  // Mobile Stack Logic
  if (index > 2) return null;

  const isTop = index === 0;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);

  // Like/Nope indicators
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        y: index * 10, // Stack vertical offset
        rotate: isTop ? rotate : 0,
        zIndex: 50 - index,
        scale: 1 - index * 0.04, // Stack scale effect
        opacity: isTop ? opacity : 1,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1 - index * 0.04, opacity: 1, y: index * 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute top-0 left-0 right-0 bottom-0 origin-bottom cursor-grab active:cursor-grabbing shadow-xl rounded-[2rem] h-full w-full`}
    >
        {/* Swipe Indicators */}
        {isTop && (
            <>
                <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-8 z-50 px-6 py-2 border-4 border-emerald-500 rounded-xl transform -rotate-12 bg-white/90 backdrop-blur-md shadow-xl">
                    <span className="text-emerald-500 font-black text-3xl uppercase tracking-widest">INTERESTED</span>
                </motion.div>
                <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-8 z-50 px-6 py-2 border-4 border-rose-500 rounded-xl transform rotate-12 bg-white/90 backdrop-blur-md shadow-xl">
                    <span className="text-rose-500 font-black text-3xl uppercase tracking-widest">SKIP</span>
                </motion.div>
            </>
        )}

      <CardContent data={data} industry={industry} isDesktop={false} />
    </motion.div>
  );
};

export default function VoiceBotExplorer() {
  const [activeIndustryId, setActiveIndustryId] = useState(INDUSTRIES[0].id);
  const [cards, setCards] = useState([]);

  // Initialize cards
  useEffect(() => {
    const industryData = USE_CASES[activeIndustryId];
    if (industryData) {
      setCards(industryData.map((c, i) => ({ ...c, uniqueId: `${activeIndustryId}-${i}-${Date.now()}` })));
    }
  }, [activeIndustryId]);

  const activeIndustry = INDUSTRIES.find(i => i.id === activeIndustryId);

  // Infinity Swipe Logic
  const handleSwipe = (direction) => {
    setCards(prev => {
      const swipedCard = prev[0];
      const remainingCards = prev.slice(1);
      const recycledCard = { ...swipedCard, uniqueId: `${swipedCard.title}-${Date.now()}` };
      return [...remainingCards, recycledCard];
    });
  };

  return (
    <>
      <Header onDemoClick={() => {}} />
      <div className={`min-h-screen w-full bg-gray-50 text-gray-900 font-sans flex flex-col overflow-hidden relative selection:bg-gray-200`}>

        {/* Background Ambience */}
        <div className={`absolute inset-0 bg-gradient-to-b from-white via-white to-${activeIndustry?.color.split(' ')[1].replace('to-', '')}/10 transition-colors duration-1000 z-0`}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0 mix-blend-multiply"></div>

        {/* --- TOP: TABS --- */}
        <div className={`relative  w-full bg-white/80 backdrop-blur-md pt-36`}>
        <div className={`w-full px-4 py-3 border-b border-gray-100`}>
            {/* Scrollable Tabs */}
            <div className={`flex gap-3 overflow-x-auto no-scrollbar mask-linear-fade py-1`}>
                {INDUSTRIES.map((ind) => (
                <IndustryTab
                    key={ind.id}
                    industry={ind}
                    isActive={activeIndustryId === ind.id}
                    onClick={() => setActiveIndustryId(ind.id)}
                />
                ))}
            </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className={`relative z-10 flex-1 w-full flex flex-col pt-20 p-4 md:p-8 overflow-hidden`}>

        {/* MOBILE VIEW (< 768px): Swipe Stack fills screen */}
        <div className={`md:hidden relative w-full h-full flex flex-col`}>
            <div className={`relative w-full h-full`}>
                <AnimatePresence>
                    {cards.map((card, index) => (
                    <SwipeableCard
                        key={card.uniqueId}
                        data={card}
                        industry={activeIndustry}
                        index={index}
                        onSwipe={handleSwipe}
                    />
                    ))}
                </AnimatePresence>
            </div>
        </div>

        {/* DESKTOP VIEW (>= 768px): 3 in first row, 2 in second, Scrollable */}
        <div className={`hidden md:block w-full h-full overflow-y-auto`}>
            <div className={`w-full max-w-[1200px] mx-auto flex flex-wrap justify-center gap-6 p-8 pb-20`}>
                {USE_CASES[activeIndustryId].map((data, idx) => (
                     <motion.div
                     key={`${activeIndustryId}-grid-${idx}`}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     // w-[30%] allows 3 items per row (30*3 + gaps < 100).
                     // min-w ensures they don't get too small. h-[500px] ensures proper card size.
                     className={`w-full md:w-[30%] min-w-[300px] h-[550px]`}
                 >
                     <CardContent data={data} industry={activeIndustry} isDesktop={true} />
                 </motion.div>
                ))}
            </div>
        </div>
      </div>

      <style>{`
        .pt-safe-top {
            padding-top: env(safe-area-inset-top, 10px);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-linear-fade {
            mask-image: linear-gradient(to right, black 90%, transparent 100%);
        }
      `}</style>
    </div>
    <Footer />
  </>);
}
