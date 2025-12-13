'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Phone, 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  ChevronDown,
  User,
  ShoppingBag,
  Home,
  HeartPulse,
  Truck,
  Coins,
  Search,
  Bot,
  TrendingUp,
  Receipt,
  Smile,
  Settings,
  Megaphone,
  Key,
  Calendar,
  Database,
  Zap,
  FileText,
  CreditCard,
  UserPlus,
  Users,
  Layout,
  Mic,
  PlayCircle,
  Rocket,
  FileSpreadsheet,
  Mail
} from 'lucide-react';
import * as THREE from 'three';

// --- Types ---
type TabId = 'real_estate' | 'growth' | 'hr' | 'finance' | 'cx' | 'ops' | 'marketing';
type ServiceId = 'edu' | 'ecommerce' | 'realestate' | 'healthcare' | 'logistics' | 'finance_serv';

// --- Components ---

/**
 * Three.js Background Component
 * Handles the 3D Orb and Background Color
 */
const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Orb
    const geometry = new THREE.IcosahedronGeometry(2.2, 2);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x4f46e5, // Indigo-600
      wireframe: true, 
      transparent: true, 
      opacity: 0.08 
    });
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; 
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x8b5cf6, 
        transparent: true,
        opacity: 0.5,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 6;

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.0005;
      const scrollY = window.scrollY; 

      // Orb Rotation
      orb.rotation.y = time * 0.15; 
      orb.rotation.x = scrollY * 0.0005; 
      
      // Particles Rotation
      particlesMesh.rotation.y = -time * 0.05;
      particlesMesh.rotation.x = scrollY * 0.0002;

      // Gentle floating
      orb.position.y = Math.sin(time) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -1, 
        background: 'radial-gradient(circle at 50% 30%, rgba(238, 242, 255, 0.8) 0%, rgba(248, 250, 252, 1) 70%)' 
      }}
    />
  );
};

/**
 * Typewriter Effect for Hero Section
 */
const HeroTypewriter = () => {
  const phrases = useMemo(() => ["Last Mile Delivery", "Lead Qualification", "Appointment Booking", "Customer Support", "Debt Collection"], []);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-500 animate-pulse">{text}</span>
  );
};

/**
 * Scroll Reveal Section (UrbanPiper Case Study)
 */
const UrbanPiperSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const isSectionVisible = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isSectionVisible);

      if (isSectionVisible) {
        const progress = Math.min(Math.max(1 - (rect.top / (windowHeight * 0.6)), 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quote = "Integrating Callers AI was a paradigm shift. We automated 12,000+ support calls in the first 48 hours. The context retention is flawless.";
  const words = quote.split(' ');

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden py-20 z-10">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
                <div 
                  className={`flex items-center gap-3 mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-900 text-xl font-bold">U</div>
                    <span className="text-white font-bold tracking-wide text-xl">urbanpiper</span>
                    <span className="h-px w-12 bg-white/20 ml-4"></span>
                    <span className="text-slate-400 text-xs uppercase tracking-widest">Enterprise Case Study</span>
                </div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 relative z-20 text-white">
                    <span className="text-indigo-500 text-4xl md:text-6xl absolute -ml-8 md:-ml-12 -mt-4 opacity-50">"</span>
                    {words.map((word, i) => (
                      <span 
                        key={i} 
                        className="inline-block transition-opacity duration-300 mr-3"
                        style={{ 
                          opacity: (i / words.length) < scrollProgress ? 1 : 0.2,
                          transitionDelay: `${i * 20}ms`
                        }}
                      >
                        {word}
                      </span>
                    ))}
                </h2>

                <div 
                  className={`flex items-center gap-6 transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" className="w-16 h-16 rounded-full border-2 border-white/20 object-cover shadow-2xl" alt="Saurabh" />
                    <div>
                        <div className="text-white font-bold text-lg">Saurabh Gupta</div>
                        <div className="text-slate-400 text-sm">CEO & Co-founder</div>
                    </div>
                    <div className="hidden md:block h-12 w-px bg-white/10 mx-2"></div>
                    <div className="hidden md:flex flex-col">
                        <span className="text-green-400 font-bold text-2xl">85%</span>
                        <span className="text-slate-500 text-xs uppercase">Support Automated</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

/**
 * Calculator Component
 */
const SavingsCalculator = () => {
  const [currency, setCurrency] = useState<'USD' | 'INR' | 'AED'>('USD');
  const [volume, setVolume] = useState(5000);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [aht, setAht] = useState(4); 

  const config = useMemo(() => {
    switch(currency) {
        case 'INR': return { symbol: '₹', aiRate: 10, minRate: 500, maxRate: 5000, stepRate: 100, defaultRate: 1200 };
        case 'AED': return { symbol: 'AED', aiRate: 0.6, minRate: 20, maxRate: 200, stepRate: 5, defaultRate: 50 };
        case 'USD': 
        default: return { symbol: '$', aiRate: 0.20, minRate: 10, maxRate: 100, stepRate: 1, defaultRate: 25 };
    }
  }, [currency]);

  useEffect(() => {
    setHourlyRate(config.defaultRate);
  }, [currency, config.defaultRate]);

  const manualCost = Math.round(volume * aht * (hourlyRate / 60));
  const aiCost = Math.round(volume * aht * config.aiRate);
  const savings = manualCost - aiCost;
  const savingsPercent = manualCost > 0 ? Math.round((savings / manualCost) * 100) : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Calculate Your Savings</h3>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    {['USD', 'AED', 'INR'].map((c) => (
                        <button 
                            key={c}
                            onClick={() => setCurrency(c as any)}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                                currency === c 
                                ? 'bg-white text-indigo-600 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400"/> Monthly Calls
                        </label>
                        <span className="text-sm font-bold text-indigo-600">{volume.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="500" max="100000" step="500" value={volume} 
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400"/> Agent Hourly Cost
                        </label>
                        <span className="text-sm font-bold text-indigo-600">{config.symbol}{hourlyRate}/hr</span>
                    </div>
                    <input 
                      type="range" 
                      min={config.minRate} 
                      max={config.maxRate} 
                      step={config.stepRate} 
                      value={hourlyRate} 
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400"/> Avg. Handling Time (mins)
                        </label>
                        <span className="text-sm font-bold text-indigo-600">{aht} min</span>
                    </div>
                    <input 
                      type="range" min="1" max="15" step="0.5" value={aht} 
                      onChange={(e) => setAht(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>
            </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl text-white flex flex-col justify-center h-full">
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Manual Cost</p>
                            <p className="text-lg font-bold text-white">{config.symbol}{manualCost.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-600/20 border border-indigo-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-600/10 animate-pulse"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-indigo-200 uppercase tracking-wider font-bold">AI Bot Cost</p>
                            <p className="text-2xl font-bold text-white">{config.symbol}{aiCost.toLocaleString()}</p>
                        </div>
                    </div>
                    {savingsPercent > 0 && (
                        <div className="text-right relative z-10">
                            <span className="text-xs font-bold bg-green-500 text-white px-2 py-1 rounded">
                                -{savingsPercent}%
                            </span>
                        </div>
                    )}
                </div>

                <div className="pt-6 border-t border-white/10 text-center">
                    <p className="text-slate-400 text-sm mb-1">Total Monthly Savings</p>
                    <div className="text-5xl font-bold text-green-400 tracking-tight">
                        {config.symbol}{savings > 0 ? savings.toLocaleString() : 0}
                    </div>
                    <button className="mt-6 bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors w-full">
                        Start Saving Now
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

// --- Main Page Component ---

export default function CallersPage() {
  const [activeIndustry, setActiveIndustry] = useState<ServiceId>('edu');
  const [activeUseCase, setActiveUseCase] = useState<TabId>('real_estate');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); }
  }, []);

  const integrations = [
    { name: "Google Sheets", icon: <FileSpreadsheet className="w-8 h-8 text-green-600" />, type: "component" },
    { name: "Calendar", icon: <Calendar className="w-8 h-8 text-blue-500" />, type: "component" },
    { name: "HubSpot", icon: "fab fa-hubspot text-3xl text-orange-500", type: "class" },
    { name: "Zoho CRM", label: "Z", color: "bg-yellow-500", type: "text" },
    { name: "Bitrix24", label: "B24", color: "bg-blue-400", type: "text" },
    { name: "HighLevel", label: "GHL", color: "bg-indigo-600", type: "text" },
    { name: "Salesforce", icon: "fab fa-salesforce text-4xl text-blue-600", type: "class" },
    { name: "Gmail", icon: <Mail className="w-8 h-8 text-red-500" />, type: "component" },
    { name: "Outlook", icon: "fab fa-microsoft text-3xl text-blue-700", type: "class" },
  ];

  return (
    <main className="font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 relative">
      <ThreeBackground />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-sm rounded-full px-6 py-3 flex justify-between items-center">
                <a href="#" className="flex items-center gap-0.5 group">
                    <span className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">callers<sup className="text-xs font-bold text-indigo-600 ml-0.5">AI</sup></span>
                </a>
                
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <a href="#stats" className="hover:text-indigo-600 transition-colors">Impact</a>
                    <a href="#industries" className="hover:text-indigo-600 transition-colors">Solutions</a>
                    <a href="#dashboard" className="hover:text-indigo-600 transition-colors">Platform</a>
                    <a href="#calculator" className="hover:text-indigo-600 transition-colors">Savings</a>
                </div>

                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/30">
                    Book Demo
                </button>
            </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden z-10">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm mb-8 animate-bounce-slow">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Built for High Volume</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-slate-900">
                Your 24/7 AI Voice Employee <br />
                <HeroTypewriter />
                <span className="animate-pulse text-indigo-600">|</span>
            </h1>

            <p className="text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
                Stop losing leads to voicemail. Our AI agents call leads instantly, book meetings, and solve support tickets while your team sleeps. No sick days. No training gaps.
            </p>

            {/* Simulated Input */}
            <div className="w-full max-w-md bg-white p-3 rounded-[24px] shadow-2xl border border-slate-200 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                        <div className="flex items-center gap-2 border-r border-slate-300 pr-3 mr-3 cursor-pointer">
                            <span className="font-bold text-xl">🇮🇳</span> 
                            <span className="text-slate-800 font-bold text-sm">+91</span>
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                        </div>
                        <input type="tel" placeholder="98765 43210" className="bg-transparent w-full outline-none text-slate-900 font-bold placeholder-slate-400 text-lg h-full" />
                    </div>
                    
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3 text-lg">
                        <Phone className="w-5 h-5 animate-pulse" />
                        Call Me Now
                    </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Free demo • No credit card required
                </p>
            </div>
        </div>
      </section>

      <UrbanPiperSection />

      {/* CLIENTS MARQUEE */}
      <div className="bg-white border-y border-slate-100 py-10 overflow-hidden relative z-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex w-max gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500 animate-[scroll_40s_linear_infinite]">
             {[1, 2].map((i) => (
                <div key={i} className="flex gap-16">
                  <i className="fab fa-amazon text-4xl hover:text-[#FF9900] transition-colors"></i>
                  <i className="fab fa-google text-3xl hover:text-[#4285F4] transition-colors"></i>
                  <i className="fab fa-spotify text-4xl hover:text-[#1DB954] transition-colors"></i>
                  <i className="fab fa-airbnb text-4xl hover:text-[#FF5A5F] transition-colors"></i>
                  <i className="fab fa-uber text-4xl hover:text-black transition-colors"></i>
                  <i className="fab fa-stripe text-5xl hover:text-[#635BFF] transition-colors"></i>
                  <i className="fab fa-microsoft text-3xl hover:text-[#F25022] transition-colors"></i>
                </div>
             ))}
        </div>
      </div>

      {/* STATS SECTION */}
      <section id="stats" className="py-24 bg-white z-10 relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Proven Results</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Real Numbers, Real Growth</h2>
                <p className="text-slate-500">Here is the impact we deliver to businesses like yours.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                <div className="group"><div className="text-4xl font-bold text-indigo-600 mb-2">90%</div><p className="text-xs font-bold uppercase text-slate-400">Call Automation</p></div>
                <div className="group"><div className="text-4xl font-bold text-green-500 mb-2">90%</div><p className="text-xs font-bold uppercase text-slate-400">Less Staffing</p></div>
                <div className="group"><div className="text-4xl font-bold text-blue-500 mb-2">50%</div><p className="text-xs font-bold uppercase text-slate-400">Fewer Errors</p></div>
                <div className="group"><div className="text-4xl font-bold text-orange-500 mb-2">60%</div><p className="text-xs font-bold uppercase text-slate-400">Cost Savings</p></div>
                <div className="group"><div className="text-4xl font-bold text-purple-500 mb-2">60%</div><p className="text-xs font-bold uppercase text-slate-400">Qualified Leads</p></div>
                <div className="group"><div className="text-4xl font-bold text-pink-500 mb-2">10X</div><p className="text-xs font-bold uppercase text-slate-400">Sales Velocity</p></div>
            </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section id="industries" className="py-24 bg-slate-50 border-y border-slate-100 z-10 relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Industries</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">Expertise in Every Sector</h2>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {[
                      { id: 'edu', label: 'Education', icon: <User className="w-4 h-4" /> },
                      { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingBag className="w-4 h-4" /> },
                      { id: 'realestate', label: 'Real Estate', icon: <Home className="w-4 h-4" /> },
                      { id: 'healthcare', label: 'Health', icon: <HeartPulse className="w-4 h-4" /> },
                      { id: 'logistics', label: 'Transportation', icon: <Truck className="w-4 h-4" /> },
                      { id: 'finance_serv', label: 'Finance', icon: <Coins className="w-4 h-4" /> }
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveIndustry(tab.id as ServiceId)}
                        className={`px-6 py-3 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${
                          activeIndustry === tab.id 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Content for Industries */}
            <div className="max-w-4xl mx-auto min-h-[300px]">
              {activeIndustry === 'edu' && (
                <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start gap-6">
                        <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="University" />
                        <div><h3 className="text-3xl font-bold text-slate-900 mb-1">1M+</h3><p className="text-slate-500 leading-snug">leads qualified across universities</p></div>
                    </div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-yellow-100 text-yellow-600"><Phone /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">7x</h3><p className="text-slate-500 leading-snug">faster outreach to applicants</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-100 text-orange-600"><MessageSquare /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">78%</h3><p className="text-slate-500 leading-snug">FAQs answered without humans</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-200 text-slate-600"><Clock /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">99.8%</h3><p className="text-slate-500 leading-snug">uptime during admission season</p></div></div>
                </div>
              )}
              {activeIndustry === 'ecommerce' && (
                 <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start gap-6">
                        <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Shop" />
                        <div><h3 className="text-3xl font-bold text-slate-900 mb-1">$4.2M</h3><p className="text-slate-500 leading-snug">revenue recovered from abandoned carts</p></div>
                    </div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-purple-100 text-purple-600"><ShoppingBag /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">35%</h3><p className="text-slate-500 leading-snug">cart recovery rate via voice</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-pink-100 text-pink-600"><Clock /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">24/7</h3><p className="text-slate-500 leading-snug">WISMO support</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-100 text-blue-600"><CheckCircle /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">4.8/5</h3><p className="text-slate-500 leading-snug">CSAT on automated returns</p></div></div>
                 </div>
              )}
              {activeIndustry === 'realestate' && (
                 <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start gap-6">
                        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Real Estate" />
                        <div><h3 className="text-3xl font-bold text-slate-900 mb-1">100%</h3><p className="text-slate-500 leading-snug">instant lead response rate</p></div>
                    </div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-100 text-green-600"><Key /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">2x</h3><p className="text-slate-500 leading-snug">more viewings booked per agent</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-yellow-100 text-yellow-600"><Home /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">15k+</h3><p className="text-slate-500 leading-snug">properties showcased via voice AI</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-100 text-slate-600"><Clock /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">Zero</h3><p className="text-slate-500 leading-snug">missed weekend inquiries</p></div></div>
                 </div>
              )}
              {activeIndustry === 'healthcare' && (
                 <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start gap-6">
                        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Doctor" />
                        <div><h3 className="text-3xl font-bold text-slate-900 mb-1">300k+</h3><p className="text-slate-500 leading-snug">appointments scheduled</p></div>
                    </div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-red-100 text-red-600"><HeartPulse /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">24/7</h3><p className="text-slate-500 leading-snug">patient triage and booking</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-100 text-green-600"><Calendar /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">40%</h3><p className="text-slate-500 leading-snug">reduction in no-show rates</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-100 text-blue-600"><ShieldCheck /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">100%</h3><p className="text-slate-500 leading-snug">HIPAA compliant logging</p></div></div>
                 </div>
              )}
              {activeIndustry === 'logistics' && (
                 <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start gap-6">
                        <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Logistics" />
                        <div><h3 className="text-3xl font-bold text-slate-900 mb-1">8M+</h3><p className="text-slate-500 leading-snug">deliveries coordinated automatically</p></div>
                    </div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-yellow-100 text-yellow-600"><Truck /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">46%</h3><p className="text-slate-500 leading-snug">drop in failed deliveries</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-100 text-orange-600"><Phone /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">92%</h3><p className="text-slate-500 leading-snug">calls handled by AI drivers</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-100 text-slate-600"><Clock /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">99.9%</h3><p className="text-slate-500 leading-snug">reliability during peak season</p></div></div>
                 </div>
              )}
              {activeIndustry === 'finance_serv' && (
                 <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start gap-6">
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Finance" />
                        <div><h3 className="text-3xl font-bold text-slate-900 mb-1">5.2M+</h3><p className="text-slate-500 leading-snug">payment reminders sent</p></div>
                    </div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-100 text-green-600"><Coins /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">8x</h3><p className="text-slate-500 leading-snug">more collections than manual</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-100 text-blue-600"><Phone /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">83%</h3><p className="text-slate-500 leading-snug">loan queries resolved instantly</p></div></div>
                    <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-100 text-slate-600"><Clock /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">99.9%</h3><p className="text-slate-500 leading-snug">uptime during tax month</p></div></div>
                 </div>
              )}
            </div>
        </div>
      </section>

      {/* USE CASES TABS */}
      <section id="use-cases" className="py-24 bg-white z-10 relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Applications</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">Workflows That Save You Time</h2>
                
                <div className="flex overflow-x-auto pb-4 gap-2 mt-8 justify-start md:justify-center no-scrollbar">
                    {['real_estate', 'growth', 'hr', 'finance', 'cx', 'ops', 'marketing'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveUseCase(tab as TabId)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border transition-all ${
                          activeUseCase === tab 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        {tab.replace('_', ' ').charAt(0).toUpperCase() + tab.replace('_', ' ').slice(1)}
                      </button>
                    ))}
                </div>
            </div>

            {/* Use Cases Content */}
            <div className="max-w-5xl mx-auto min-h-[400px]">
               {activeUseCase === 'real_estate' && (
                  <div className="grid md:grid-cols-2 gap-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Real Estate" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Home className="text-green-400" /> Sales & Leasing</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lead & Property Management</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Lead Qualification</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Property visit scheduling</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">New inventory announcements</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Tenant" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><User className="text-yellow-400" /> Tenancy</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Tenant Management</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Tenant rent reminders</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Lease renewal workflow</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                  </div>
               )}
               {activeUseCase === 'growth' && (
                  <div className="grid md:grid-cols-2 gap-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Growth" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><TrendingUp className="text-red-400" /> Acquisition</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lead Conversion</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Lead qualification & routing</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">AI follow-ups on old leads</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Appointment/Demo scheduling</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Revenue" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><BarChart3 className="text-blue-400" /> Revenue</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Revenue Growth</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Abandoned cart callbacks</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Upsell & cross-sell calling</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Event registration calls</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                  </div>
               )}
               {activeUseCase === 'hr' && (
                  <div className="grid md:grid-cols-2 gap-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="HR" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><UserPlus className="text-purple-400" /> Hiring</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Recruitment</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">AI-driven interview screening</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Document collection follow-ups</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Offer acceptance confirmation</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Management" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Users className="text-cyan-400" /> Management</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Workforce Coordination</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Shift roster confirmation</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Training reminder calls</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Staff scheduling automation</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                  </div>
               )}
               {activeUseCase === 'finance' && (
                  <div className="grid md:grid-cols-2 gap-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1554224155-9727b5398242?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Finance" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Receipt className="text-green-400" /> Collections</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Accounts Receivable</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Payment reminder calls</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Outstanding balance follow-ups</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Vendor payout confirmation</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Services" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><CreditCard className="text-blue-400" /> Services</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Account Services</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Subscription renewals</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Refund status updates</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Warranty & AMC renewals</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                  </div>
               )}
               {activeUseCase === 'cx' && (
                  <div className="grid md:grid-cols-2 gap-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Feedback" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Smile className="text-yellow-400" /> Feedback</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Satisfaction</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">CSAT/NPS Automated Calling</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Post-service feedback</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">In-depth surveys</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Support" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Settings className="text-indigo-400" /> Support</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Engagement</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Service outage notifications</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Appointment rescheduling</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">New user onboarding</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                  </div>
               )}
               {activeUseCase === 'ops' && (
                  <div className="grid md:grid-cols-2 gap-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Ops" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><ShieldCheck className="text-blue-500" /> Verification</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Identity & Risk</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">KYC verification workflows</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Address & identity checks</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Fraud-risk confirmation</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Compliance" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><FileText className="text-slate-300" /> Governance</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Compliance</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Contract renewal confirmation</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Policy update acknowledgements</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Audit data collection</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                  </div>
               )}
               {activeUseCase === 'marketing' && (
                  <div className="grid md:grid-cols-2 gap-8 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Marketing" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Megaphone className="text-pink-400" /> Outreach</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Campaigns</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Campaign follow-up calling</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Cold outreach for launches</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Offer/discount broadcasts</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
                          <div className="h-48 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Activation" />
                              <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Zap className="text-yellow-400" /> Activation</div>
                          </div>
                          <div className="p-8">
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Events & Awareness</h3>
                              <div className="space-y-3 mb-8">
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Event attendance confirmation</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Dormant user activation</span></div>
                                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Product awareness calls</span></div>
                              </div>
                              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
                          </div>
                      </div>
                  </div>
               )}
            </div>
        </div>
      </section>

      {/* NEW: LAUNCH PROCESS SECTION */}
      <section className="py-24 bg-white border-y border-slate-100 z-10 relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">How It Works</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Launch Your AI Voicebot in Minutes</h2>
                <p className="text-slate-500">From setup to first call, the process is seamless.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-50 via-indigo-200 to-indigo-50 -z-10"></div>
                
                {[
                    { 
                        icon: <Layout className="w-6 h-6 text-indigo-600" />, 
                        title: "1. Design Flow", 
                        desc: "Use our drag-and-drop builder to create conversation paths and logic." 
                    },
                    { 
                        icon: <Mic className="w-6 h-6 text-pink-600" />,
                        title: "2. Select Voice", 
                        desc: "Choose from 50+ lifelike voices or clone your own agent's voice." 
                    },
                    { 
                        icon: <PlayCircle className="w-6 h-6 text-orange-600" />, 
                        title: "3. Test & Train", 
                        desc: "Simulate calls instantly and fine-tune responses with custom knowledge." 
                    },
                    { 
                        icon: <Rocket className="w-6 h-6 text-green-600" />, 
                        title: "4. Go Live", 
                        desc: "Purchase a number or port yours, and start handling calls 24/7." 
                    }
                ].map((step, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all relative group">
                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-slate-100 shadow-sm">
                            {step.icon}
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* NEW: WHAT HAPPENS AFTER THE CALL */}
      <section id="workflow" className="py-24 bg-white border-y border-slate-100 z-10 relative">
        <div className="container mx-auto px-6 text-center">
            <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Process</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-16">What Happens After the Call Ends?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {[
                  { icon: <Database className="w-6 h-6 text-blue-600" />, title: "Automated CRM Updates", desc: "Every detail—budget, timeline, objections—is extracted and logged instantly. No manual data entry.", color: "bg-blue-50" },
                  { icon: <Calendar className="w-6 h-6 text-green-600" />, title: "Instant Follow-ups", desc: "AI sets reminders, books callbacks, and sends WhatsApp/SMS messages based on next steps.", color: "bg-green-50" },
                  { icon: <Zap className="w-6 h-6 text-orange-600" />, title: "Lead Scoring", desc: "Leads are scored automatically based on intent signals. Your team focuses only on hot leads.", color: "bg-orange-50" },
                  { icon: <HeartPulse className="w-6 h-6 text-purple-600" />, title: "Sentiment Analysis", desc: "Identify frustration or delight. Understand how your customers feel without sending surveys.", color: "bg-purple-50" },
                  { icon: <FileText className="w-6 h-6 text-pink-600" />, title: "AI Call Summary", desc: "A concise, accurate summary of the full call including key decisions and action items.", color: "bg-pink-50" },
                  { icon: <Layout className="w-6 h-6 text-cyan-600" />, title: "Trigger Workflows", desc: "Fire webhooks to trigger downstream actions in Zapier, Slack, or your internal tools.", color: "bg-cyan-50" },
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group bg-white">
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section id="dashboard" className="py-24 bg-slate-50 relative overflow-hidden z-10">
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16 hidden md:block">
                <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">The Control Room</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Your AI Command Center</h2>
                <p className="text-slate-500">Watch your agents work, listen to calls, and track ROI in real-time.</p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex h-[400px] md:h-[500px]">
                   {/* Sidebar */}
                   <div className="w-64 bg-slate-50 border-r border-slate-200 p-6 hidden md:block">
                       <div className="flex items-center gap-3 mb-10"><div className="w-8 h-8 bg-indigo-600 rounded-lg"></div><span className="font-bold text-slate-800">Callers</span></div>
                       <div className="space-y-2">
                          <div className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-indigo-600 font-bold shadow-sm"><BarChart3 className="w-4 h-4"/> Overview</div>
                          <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"><User className="w-4 h-4"/> Agents</div>
                       </div>
                   </div>
                   {/* Main Content */}
                   <div className="flex-1 p-8 overflow-hidden bg-white">
                       <div className="flex justify-between items-center mb-8">
                         <div><h3 className="text-2xl font-bold text-slate-900">Dashboard</h3><p className="text-slate-400 text-sm">Welcome back</p></div>
                       </div>
                       <div className="grid grid-cols-3 gap-6 mb-8">
                           <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100"><p className="text-xs font-bold text-blue-400 uppercase mb-2">Total Calls</p><p className="text-3xl font-bold text-slate-900">12,450</p></div>
                           <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100"><p className="text-xs font-bold text-purple-400 uppercase mb-2">Avg Duration</p><p className="text-3xl font-bold text-slate-900">4m 12s</p></div>
                           <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100"><p className="text-xs font-bold text-orange-400 uppercase mb-2">Success Rate</p><p className="text-3xl font-bold text-slate-900">94.2%</p></div>
                       </div>
                       {/* Chart Placeholder */}
                       <div className="h-40 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300">Live Call Volume Chart</div>
                   </div>
                </div>
            </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-5 bg-noise"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">ROI Engine</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">See How Much You'll Save</h2>
                <p className="text-slate-500">Stop overpaying for manual calls.</p>
            </div>
            <SavingsCalculator />
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-24 bg-white border-y border-slate-100 z-10 relative">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Proven Results from <br /> 90M+ completed calls</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Phone /></div>
                        <h3 className="text-xl font-bold text-slate-900">73% of Customers Prefer Voice!</h3>
                    </div>
                    <p className="text-slate-600 mb-8 leading-relaxed">Most customers love voice, so you connect better and win more trust. <strong>Get the edge.</strong></p>
                    <div className="relative h-48 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 p-6 flex items-center justify-center overflow-hidden">
                         <div className="absolute right-0 top-0 opacity-20"><div className="text-9xl text-white font-bold opacity-20">73%</div></div>
                        <div className="relative z-10 flex gap-8 items-center text-white"><div className="w-24 h-24 rounded-full border-8 border-white/30 border-t-white flex items-center justify-center text-xl font-bold">73%</div><div><p className="text-2xl font-bold">Voice</p><p className="text-sm opacity-80">Preferred Channel</p></div></div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-all flex gap-4 items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0"><Clock /></div>
                        <div><h4 className="font-bold text-slate-900">Speed to Lead</h4><p className="text-sm text-slate-500">Contacting a lead within 1 minute increases conversion by 391%.</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-all flex gap-4 items-start">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0"><CheckCircle /></div>
                        <div><h4 className="font-bold text-slate-900">Consistency</h4><p className="text-sm text-slate-500">AI never has a "bad day". Every customer gets your best pitch, every time.</p></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* NEW: INTEGRATIONS SECTION (Updated with Lines) */}
         {/* NEW: INTEGRATIONS SECTION (Updated with Lines) */}
      <section className="py-24 bg-white border-y border-slate-100 z-10 relative">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-12">Connects With Your Favorite Tools</h2>
            <div className="relative max-w-3xl mx-auto h-[400px] flex items-center justify-center">
                {/* Central Hub */}
                <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center z-20 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        <Zap className="w-8 h-8" />
                    </div>
                </div>
                
                {/* Rotating Container */}
                 <div 
                    className="absolute inset-0"
                    style={{ animation: 'spin-slow 40s linear infinite' }}
                 >
                    {/* SVG Layer for Lines */}
                    {integrations.map((_, index) => {
                        const total = integrations.length;
                        const angle = (360 / total) * index;
                        const radius = 160; 
                        
                        return (
                            <React.Fragment key={index}>
                                {/* Static Line */}
                                <div 
                                    className="absolute top-1/2 left-1/2 h-[1px] bg-slate-200 origin-left -z-10"
                                    style={{
                                        width: `${radius}px`,
                                        transform: `rotate(${angle}deg)`,
                                    }}
                                />
                                
                                {/* Data Particle moving inward */}
                                <div 
                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] -z-10"
                                    style={{
                                        animation: `flowIn 3s linear infinite`,
                                        animationDelay: `${index * 0.2}s`,
                                        // @ts-ignore
                                        '--angle': `${angle}deg`,
                                        // @ts-ignore
                                        '--radius': `${radius}px`,
                                    }}
                                />
                            </React.Fragment>
                        );
                    })}

                    {/* Icons */}
                    {integrations.map((item, index) => {
                        const total = integrations.length;
                        const angle = (360 / total) * index;
                        const radius = 160; 
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                        return (
                            <div 
                                key={index}
                                className="absolute w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center border border-slate-100 z-10"
                                style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    transform: `translate(-50%, -50%) rotate(${-angle}deg)`, 
                                    animation: 'spin-reverse 40s linear infinite'
                                }}
                                title={item.name}
                            >
                                {item.type === 'component' ? item.icon : 
                                 item.type === 'class' ? <i className={item.icon as string}></i> :
                                 <span className={`text-xs font-bold text-white px-1.5 py-0.5 rounded ${item.color}`}>{item.label}</span>
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(-360deg); }
          }
          @keyframes flowIn {
            0% { transform: rotate(var(--angle)) translateX(var(--radius)); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: rotate(var(--angle)) translateX(0px); opacity: 0; } 
          }
        `}} />
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-slate-50 z-10 relative">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {[
                  { q: "How does the AI handle interruptions?", a: "Our AI stops speaking immediately when the user talks, listens, and adjusts its response naturally, just like a human." },
                  { q: "Does it integrate with my CRM?", a: "Yes, we support native integrations with Salesforce, HubSpot, Zoho, and Pipedrive. We also offer a flexible API and Zapier integration." },
                  { q: "Is my data secure?", a: "Absolutely. We are SOC2 Type II compliant and offer enterprise-grade data encryption." }
                ].map((faq, i) => (
                  <div key={i} className={`bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all ${activeFaq === i ? 'ring-2 ring-indigo-500/20' : ''}`}>
                      <div 
                        className="px-6 py-4 flex justify-between items-center font-bold text-slate-900 cursor-pointer hover:bg-slate-50"
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      >
                        {faq.q}
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                      </div>
                      <div className={`px-6 text-slate-500 text-sm transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-[200px] pb-5' : 'max-h-0'}`}>
                        {faq.a}
                      </div>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* SECURITY STRIP */}
      <div className="bg-slate-900 py-12 border-t border-slate-800 z-10 relative">
        <div className="container mx-auto px-6 text-center">
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-6">Enterprise-Grade Protection</p>
            <div className="flex justify-center gap-12 items-center flex-wrap opacity-70">
                <div className="flex items-center gap-2 text-white font-bold"><ShieldCheck className="text-green-500" /> SOC2 Type II</div>
                <div className="flex items-center gap-2 text-white font-bold"><div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center text-[10px]">ISO</div> ISO 27001</div>
                <div className="flex items-center gap-2 text-white font-bold"><Globe className="text-purple-500" /> GDPR Compliant</div>
                <div className="flex items-center gap-2 text-white font-bold"><HeartPulse className="text-orange-500" /> HIPAA Ready</div>
            </div>
        </div>
      </div>

      {/* ASK AI */}
      <section className="py-24 bg-white border-t border-slate-100 z-10 relative">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Still not sure? Ask the AI.</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
                <a href="#" className="flex-1 bg-[#4129F9] hover:bg-[#3520D0] text-white py-5 px-8 rounded-full font-bold shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"><Bot className="w-5 h-5"/> Ask ChatGPT</a>
                <a href="#" className="flex-1 bg-[#D97757] hover:bg-[#C56545] text-white py-5 px-8 rounded-full font-bold shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"><Bot className="w-5 h-5"/> Ask Claude</a>
                <a href="#" className="flex-1 bg-[#1A7F85] hover:bg-[#14686D] text-white py-5 px-8 rounded-full font-bold shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"><Search className="w-5 h-5"/> Ask Perplexity</a>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100 z-10 relative">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                 <div className="col-span-2 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-xl font-bold text-slate-900 tracking-tight">callers<sup className="text-xs font-bold text-indigo-600 ml-0.5">AI</sup></span>
                    </div>
                    <p className="text-slate-500 text-sm mb-6 max-w-sm">The enterprise-grade AI voice platform.</p>
                </div>
                 <div><h4 className="font-bold text-slate-900 mb-6">Product</h4><ul className="space-y-4 text-sm text-slate-500"><li>Features</li><li>Pricing</li></ul></div>
                 <div><h4 className="font-bold text-slate-900 mb-6">Company</h4><ul className="space-y-4 text-sm text-slate-500"><li>About</li><li>Contact</li></ul></div>
            </div>
            <div className="border-t border-slate-100 pt-8 text-center text-xs text-slate-400"><p>&copy; 2024 Callers Inc.</p></div>
        </div>
      </footer>
    </main>
  );
}


