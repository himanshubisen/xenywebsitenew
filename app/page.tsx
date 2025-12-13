'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { faGraduationCap, faTruckLoading, faCoins, faMagnet, faPhoneAlt, faUserPlus, faFileInvoiceDollar, faMicrophoneAlt, faClock, faCalendarCheck, faGlobe, faFilter, faPaperPlane, faCalendarAlt, faSearch, faCheckCircle, faHistory, faCreditCard, faChartBar, faRoute, faBoxOpen, faClipboardCheck, faChartPie, faRocket, faPhoneVolume, faHeadset, faChartLine, faBolt, faRobot, faBrain, faSearch as faSearchIcon, faPlay, faChevronDown, faLock, faCheck, faBars, faTimes, faSpinner, faCircle } from "@fortawesome/free-solid-svg-icons"
import { faAmazon, faGoogle, faSpotify, faAirbnb, faUber, faStripe, faMicrosoft, faSalesforce, faHubspot, faWhatsapp, faSlack } from "@fortawesome/free-brands-svg-icons"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Phone,
  BarChart3,
  ShieldCheck,
  Globe,
  MessageSquare,
  Clock,
  CheckCircle,
  User,
  ShoppingBag,
  Home,
  HeartPulse,
  Truck,
  Coins,
  Search,
  Bot,
  ChevronDown,
  TrendingUp,
  Users,
  CreditCard,
  Headphones,
  Settings,
  Megaphone,
  DollarSign,
  Download
} from 'lucide-react';
import Header from "@/components/header"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown, faSpinner, faLock } from '@fortawesome/free-solid-svg-icons';
import * as THREE from 'three';
import HeroCanvas from "@/components/hero-canvas"
import Footer from "@/components/footer"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import ScrollTextReveal from "@/components/animations/ScrollTextReveal"
import StaggerReveal from "@/components/animations/StaggerReveal"

import { Points, PointMaterial } from '@react-three/drei';
import { useFrame, Canvas } from '@react-three/fiber';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// AI Image Morph: A futuristic visual showing a human face transitioning into a complex digital data mesh through pixel-morphing effects.

// --- Types ---
type TabId = 'real_estate' | 'growth' | 'hr' | 'finance' | 'cx' | 'ops' | 'marketing';
type ServiceId = 'edu' | 'ecommerce' | 'realestate' | 'healthcare' | 'logistics' | 'finance_serv';

// --- Components ---

/**
 * Three.js Background Component
 * Renders the Orb and the 3D "Xeny" text
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
    const geometry = new THREE.IcosahedronGeometry(2, 2);
    const material = new THREE.MeshNormalMaterial({ wireframe: true, transparent: true, opacity: 0.15 });
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // 3D Text "Xeny"
    const textCanvas = document.createElement('canvas');
    const ctx = textCanvas.getContext('2d');
    const textTextureWidth = 1024;
    const textTextureHeight = 512;

    if (ctx) {
      textCanvas.width = textTextureWidth;
      textCanvas.height = textTextureHeight;
      ctx.clearRect(0, 0, textTextureWidth, textTextureHeight);
      ctx.font = 'bold 200px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(79, 70, 229, 1)';
      ctx.shadowBlur = 40;
      ctx.fillText('Xeny', textTextureWidth / 2, textTextureHeight / 2);
    }

    const texture = new THREE.CanvasTexture(textCanvas);
    texture.minFilter = THREE.LinearFilter;

    const textGeometry = new THREE.PlaneGeometry(4, 2);
    const textMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);

    camera.position.z = 6;

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Orb Rotation
      orb.rotation.y += 0.002;
      orb.rotation.x = Math.sin(time * 0.5) * 0.1;

      // Text Sway
      textMesh.position.y = Math.sin(time) * 0.1;
      textMesh.rotation.y = Math.sin(time * 0.5) * 0.15;
      textMesh.lookAt(camera.position);

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
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
      textGeometry.dispose();
      textMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-80 pointer-events-none" />;
};



gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: 3D PARTICLE WAVE (Three.js + ScrollTrigger) ---
const ParticleWave = () => {
  const pointsRef = useRef<any>();
  
  // Create a grid of particles
  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        positions[(i * count + j) * 3] = i - count / 2;
        positions[(i * count + j) * 3 + 1] = 0;
        positions[(i * count + j) * 3 + 2] = j - count / 2;
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Wave movement logic
    for (let i = 0; i < 10000; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      positions[i * 3 + 1] = Math.sin(x * 0.2 + time) * Math.cos(z * 0.2 + time) * 1.5;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    // GSAP ScrollTrigger to tilt the wave as user scrolls
    gsap.to(pointsRef.current.rotation, {
      x: 0.5,
      z: 0.2,
      scrollTrigger: {
        trigger: "#stats",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// --- COMPONENT: PIXEL MORPH (GSAP + Canvas) ---
const PixelMorphCanvas = ({ activeTab }: { activeTab: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Logic for "Melting" / Pixelating effect
    // In a real app, you would drawImage() here.
    // This mockup creates a "digital circuit" noise transition.
    const tl = gsap.timeline();
    tl.to(canvas, { opacity: 0.3, duration: 0.2 })
      .to(canvas, { opacity: 1, duration: 0.4, ease: "power2.inOut" });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6366f1';
      for (let i = 0; i < 50; i++) {
        const size = Math.random() * 5;
        ctx.globalAlpha = Math.random();
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, size, size * 10);
      }
    };

    gsap.ticker.add(draw);
    return () => gsap.ticker.remove(draw);
  }, [activeTab]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-20" />;
};

// --- COMPONENT: AI IMAGE MORPH ---
const AIImageMorph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    // Load face image
    const img = document.createElement('img') as HTMLImageElement;
    img.crossOrigin = 'anonymous';
    img.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80';

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 400, 400);

      // Animate pixelation
      let pixelSize = 1;
      const animate = () => {
        if (pixelSize < 20) {
          pixelSize += 0.5;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(canvas, 0, 0, 400 / pixelSize, 400 / pixelSize);
          ctx.drawImage(canvas, 0, 0, 400, 400);
          requestAnimationFrame(animate);
        } else {
          // Draw digital mesh
          ctx.clearRect(0, 0, 400, 400);
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 1;
          for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 20);
            ctx.lineTo(400, i * 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(i * 20, 0);
            ctx.lineTo(i * 20, 400);
            ctx.stroke();
          }
          // Add some data points
          ctx.fillStyle = '#6366f1';
          for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * 400, Math.random() * 400, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      };
      setTimeout(animate, 2000);
    };
  }, []);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-auto max-w-md rounded-3xl shadow-xl border border-slate-200" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-3xl pointer-events-none"></div>
    </div>
  );
};

// --- Component for the Animated Diagram (Based on Image 1) ---
const AnimatedFlowDiagram = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: svgRef.current,
                start: "top 75%", // Start animation when diagram enters viewport
                end: "bottom center",
                toggleActions: "play none none reverse", // Play once and reverse when scrolling back up
            }
        });

        // 1. Initial State: Hide all paths and set glow filters
        const paths = svgRef.current.querySelectorAll('.flow-path');
        gsap.set(paths, { strokeDasharray: 0, strokeDashoffset: 0, opacity: 0.5 });

        // Use a filter for the glow effect (similar to LLM Glow Lines)
        const glowFilter = "drop-shadow(0 0 4px #c084fc) drop-shadow(0 0 8px #e879f9)";

        // 2. Animate the flow lines sequentially
        tl.to(paths, {
            strokeDashoffset: (i, target) => target.getTotalLength(), // Draw line segments
            duration: 1.5,
            ease: "none",
            stagger: 0.2,
            opacity: 1,
        })
        // 3. Continuous pulse effect on the main path (Optional: Represents 'live' flow)
        .to('.main-flow', {
            filter: glowFilter,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        }, 1.5); // Start the pulse slightly after the drawing finishes

    }, []);


    // This SVG structure mimics the visual flow diagram provided in the image
    return (
        <div className="w-full max-w-lg mx-auto p-8 rounded-3xl bg-slate-800 shadow-xl border border-indigo-700 relative h-[450px]">
            <svg
                ref={svgRef}
                viewBox="0 0 400 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Define glow filters for the paths */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* --- Diagram Nodes (Non-animated background elements) --- */}

                {/* Multilingual AI Agent (Central Node) */}
                <circle cx="200" cy="200" r="45" fill="#312e81" stroke="#4f46e5" strokeWidth="4" filter="url(#glow)" />
                <text x="200" y="200" textAnchor="middle" fill="#e0e7ff" fontSize="12" fontWeight="bold">AI Agent</text>

                {/* LLM Powered Understanding */}
                <rect x="150" y="50" width="200" height="30" rx="10" fill="#374151" stroke="#6366f1" strokeWidth="2" />
                <text x="250" y="70" textAnchor="middle" fill="#e0e7ff" fontSize="10">LLM Understanding</text>

                {/* Lead Intent Detected (Decision Point) */}
                <polygon points="200,300 170,330 200,360 230,330" fill="#374151" stroke="#f472b6" strokeWidth="2" />
                <text x="200" y="340" textAnchor="middle" fill="#e0e7ff" fontSize="10">Intent Detected</text>

                {/* Instant Post-Call Actions */}
                <rect x="250" y="360" width="100" height="30" rx="5" fill="#374151" stroke="#f59e0b" strokeWidth="2" />
                <text x="300" y="380" textAnchor="middle" fill="#e0e7ff" fontSize="8">Post-Call Action</text>

                {/* --- Animated Paths (Using GSAP) --- */}

                {/* Path 1: Initial Call to LLM Understanding (Blue) */}
                <path d="M 200 150 L 200 100 L 250 100 L 250 80"
                      className="flow-path stroke-indigo-400" fill="none" strokeWidth="3" />

                {/* Path 2: LLM back to AI Agent (Main Flow - Pink) */}
                <path d="M 350 70 L 350 160 C 350 180, 250 180, 200 180"
                      className="flow-path main-flow stroke-pink-400" fill="none" strokeWidth="3" />

                {/* Path 3: AI Agent to Intent Detected (Pink) */}
                <path d="M 200 245 L 200 300"
                      className="flow-path stroke-pink-400" fill="none" strokeWidth="3" />

                {/* Path 4: Intent to Post-Call Actions (Yellow) */}
                <path d="M 230 330 L 270 330 L 270 360"
                      className="flow-path stroke-yellow-400" fill="none" strokeWidth="3" />

                {/* Path 5: Smart Interruption Handling (Loop back to agent - Cyan) */}
                <path d="M 170 330 L 100 330 L 100 200 L 155 200"
                      className="flow-path stroke-cyan-400" fill="none" strokeWidth="3" />
            </svg>
        </div>
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
 * Replaced GSAP with Native Intersection Observer + Scroll Listener
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

      // Determine if section is generally visible
      const isSectionVisible = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isSectionVisible);

      if (isSectionVisible) {
        // Calculate progress as element crosses the viewport
        // 0 when top is at bottom of viewport, 1 when top is at top of viewport (approx)
        const progress = Math.min(Math.max(1 - (rect.top / (windowHeight * 0.6)), 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quote = "Integrating Callers AI was a paradigm shift. We automated 12,000+ support calls in the first 48 hours. The context retention is flawless.";
  const words = quote.split(' ');

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden py-20">
      {/* Background Accents */}
      <HeroCanvas />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className={`flex items-center gap-3 mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-900 text-xl font-bold">X</div>
            <span className="text-white font-bold tracking-wide text-xl">xeny</span>
            <span className="h-px w-12 bg-white/20 ml-4"></span>
            <span className="text-slate-400 text-xs uppercase tracking-widest">Enterprise Case Study</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 relative z-20 text-white">
            <span className="text-indigo-500 text-4xl md:text-6xl absolute -ml-8 md:-ml-12 -mt-4 opacity-50">"</span>
            <ScrollTextReveal
              text={quote}
              splitBy="word"
              staggerDelay={20}
            />
          </h2>
          {/* 
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
                </div> */}
        </div>
      </div>
    </section>
  );
};

// --- Configuration Constants ---
const BASE_RATE_CREDITS = 5; // India Base Credits per minute
const DID_RENTAL_CREDITS = 100; // Not directly used in per-minute calculation, but good to keep in mind
const INR_PER_CREDIT_RATE = 5 / 5; // Assuming 5 INR / 5 credits base rate means 1 INR = 1 Credit for simplicity.
                                    // You might need to adjust this conversion factor if the exchange is different.
const INITIAL_MONTHLY_MINUTES = 5000;
const INITIAL_MANUAL_COST_INR = 15.00;

// --- Pricing Tiers ---
const VOICE_QUALITY_OPTIONS = [
    { label: 'Standard', value: 'standard', credits: 0 },
    { label: 'Premium', value: 'premium', credits: 0.5 },
    { label: 'Premium Realistic', value: 'premium_realistic', credits: 1 },
    { label: 'Premium Ultrarealistic', value: 'premium_ultrarealistic', credits: 1.5 },
];

const PHONE_CATEGORY_OPTIONS = [
    { label: 'Standard', value: 'standard', credits: 0 },
    { label: 'Premium', value: 'premium', credits: 1 },
];

// --- Savings Calculator Component ---
const SavingsCalculator = () => {
    const [monthlyMinutes, setMonthlyMinutes] = useState(INITIAL_MONTHLY_MINUTES);
    const [manualCostINR, setManualCostINR] = useState(INITIAL_MANUAL_COST_INR);
    const [callType, setCallType] = useState('live'); // 'live' or 'test'
    const [qualityLevel, setQualityLevel] = useState(VOICE_QUALITY_OPTIONS[0]);
    const [phoneCategory, setPhoneCategory] = useState(PHONE_CATEGORY_OPTIONS[0]);
    const [isQualityDropdownOpen, setIsQualityDropdownOpen] = useState(false);
    const [isPremiumNumberActive, setIsPremiumNumberActive] = useState(false);

    // Toggle logic for Phone Number Category (based on the switch in the design)
    const handlePremiumNumberToggle = () => {
        const isCurrentlyPremium = phoneCategory.value === 'premium';
        setIsPremiumNumberActive(!isCurrentlyPremium);
        setPhoneCategory(isCurrentlyPremium ? PHONE_CATEGORY_OPTIONS[0] : PHONE_CATEGORY_OPTIONS[1]);
    };

    // --- Core Calculation Logic ---
    const calculateCost = useCallback(() => {
        let costPerMinute = 0;
        let qualityCredits = 0;
        let numberCredits = 0;

        if (callType === 'test') {
            // Rule: Test Calls have a flat rate of 1 credit/minute, ignoring other factors
            costPerMinute = 1;
        } else {
            // Rule: Live Calls use full pricing logic
            
            // 1. Base Rate
            costPerMinute += BASE_RATE_CREDITS;
            
            // 2. Voice Quality
            qualityCredits = qualityLevel.credits;
            costPerMinute += qualityCredits;
            
            // 3. Phone Number Category
            numberCredits = isPremiumNumberActive ? PHONE_CATEGORY_OPTIONS[1].credits : PHONE_CATEGORY_OPTIONS[0].credits;
            costPerMinute += numberCredits;
        }

        const totalMonthlyCredits = costPerMinute * monthlyMinutes;
        const totalMonthlyCostINR = totalMonthlyCredits * INR_PER_CREDIT_RATE;

        // Savings Calculation
        const totalManualCostINR = monthlyMinutes * manualCostINR;
        const estimatedINRSavings = totalManualCostINR - totalMonthlyCostINR;

        // Credit Savings (as credits saved compared to a benchmark, e.g., 10 credits/min industry average)
        // For simplicity, we compare to the Base Rate (5 credits/min) + Credit Savings is the difference.
        // A more realistic calculation might be comparing to a perceived manual cost in credits.
        const benchmarkCreditCostPerMin = 10; // A high estimate for manual call cost in credits
        const estimatedCreditSavings = (benchmarkCreditCostPerMin * monthlyMinutes) - totalMonthlyCredits;
        
        return {
            costPerMinute,
            totalMonthlyCredits,
            estimatedINRSavings,
            estimatedCreditSavings,
            qualityCredits,
            numberCredits,
            totalManualCostINR,
            totalMonthlyCostINR,
        };
    }, [monthlyMinutes, manualCostINR, callType, qualityLevel, isPremiumNumberActive]);


    const {
        costPerMinute,
        totalMonthlyCredits,
        estimatedINRSavings,
        estimatedCreditSavings,
        qualityCredits,
        numberCredits,
        totalManualCostINR,
        totalMonthlyCostINR,
    } = useMemo(calculateCost, [monthlyMinutes, manualCostINR, callType, qualityLevel, isPremiumNumberActive]);


    // --- UI Component Logic ---
    const InputField = ({ label, value, unit, onChange, type = 'text' }) => (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                    min={type === 'number' ? 0 : undefined}
                />
                {unit && <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">{unit}</span>}
            </div>
        </div>
    );

    const Dropdown = ({ label, options, selected, onSelect, isOpen, setIsOpen, disabled = false }) => (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`w-full flex justify-between items-center px-4 py-2 border rounded-lg transition-all ${
                        disabled ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-white border-slate-300 hover:border-indigo-500 text-slate-900'
                    }`}
                    disabled={disabled}
                >
                    <span>{selected.label} ({selected.credits} credits/min)</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen && !disabled ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && !disabled && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => { onSelect(option); setIsOpen(false); }}
                                className="px-4 py-2 cursor-pointer hover:bg-slate-100 text-slate-900 text-sm"
                            >
                                {option.label} ({option.credits} credits/min)
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const ToggleInput = ({ label, checked, onChange, credits, disabled = false }) => (
        <div className="flex items-center justify-between py-2 border-b border-slate-200 last:border-b-0">
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">{credits} credit/min</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" disabled={disabled} />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                </label>
            </div>
        </div>
    );

    const CallTypeSelector = ({ selected, onSelect }) => (
        <div className="flex space-x-2 my-4">
            <label className="text-sm font-medium text-slate-700 mr-2">Call Type</label>
            {['live', 'test'].map((type) => (
                <button
                    key={type}
                    onClick={() => onSelect(type)}
                    className={`px-4 py-1 text-sm rounded-full transition-colors ${
                        selected === type
                            ? 'bg-cyan-600 text-white font-semibold'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                >
                    {type === 'live' ? 'Live Calls' : 'Test Calls'}
                </button>
            ))}
        </div>
    );

    const formatCurrency = (amount) => `₹${Math.max(0, amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    const formatCredits = (amount) => `${Math.max(0, amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* --- Left Column: Scenario Configuration --- */}
            <div className="p-8 bg-white shadow-2xl rounded-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Scenario Configuration</h3>

                <InputField
                    label="Monthly Call Minutes"
                    type="number"
                    value={monthlyMinutes}
                    unit="mins"
                    onChange={setMonthlyMinutes}
                />
                
                <InputField
                    label="Average Manual Cost/Min (INR)"
                    type="number"
                    value={manualCostINR}
                    unit="INR"
                    onChange={setManualCostINR}
                />

                <CallTypeSelector selected={callType} onSelect={setCallType} />

                <div className="mt-6 p-4 border border-slate-200 rounded-lg">
                    <h4 className="text-md font-semibold text-slate-800 mb-3">Pricing Factors</h4>
                    
                    {/* Voice Quality Level Dropdown */}
                    <Dropdown
                        label="Voice Quality Level"
                        options={VOICE_QUALITY_OPTIONS}
                        selected={qualityLevel}
                        onSelect={setQualityLevel}
                        isOpen={isQualityDropdownOpen}
                        setIsOpen={setIsQualityDropdownOpen}
                        disabled={callType === 'test'} // Disabled for Test Calls
                    />

                    {/* Phone Number Category Toggle */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number Category</label>
                        <div className={`p-3 border rounded-lg ${callType === 'test' ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300'}`}>
                            <ToggleInput
                                label="Premium Number Category"
                                checked={isPremiumNumberActive}
                                onChange={handlePremiumNumberToggle}
                                credits={PHONE_CATEGORY_OPTIONS[1].credits}
                                disabled={callType === 'test'} // Disabled for Test Calls
                            />
                        </div>
                        {callType === 'test' && (
                            <p className="text-xs text-indigo-500 mt-1">Pricing factors are ignored for Test Calls (Flat 1 credit/min).</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 p-4 bg-indigo-50 rounded-lg flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-800">India (INR)</span>
                    <span className="text-sm text-indigo-600">Base Rate: {BASE_RATE_CREDITS} credits/min</span>
                </div>
            </div>

            {/* --- Right Column: Estimated Savings --- */}
            <div className="p-8 bg-white shadow-2xl rounded-xl flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-8">Your Estimated Savings</h3>

                    <div className="mb-8 p-4 border-b border-slate-200">
                        <DollarSign className="w-6 h-6 text-green-500 mb-2" />
                        <p className="text-5xl font-extrabold text-slate-900">{formatCurrency(estimatedINRSavings)}</p>
                        <p className="text-slate-500 mt-1">Estimated Monthly INR Savings</p>
                        <p className="text-xs text-slate-400 mt-2">
                            (Savings = Manual Cost {formatCurrency(totalManualCostINR)} - TechnoTask Cost {formatCurrency(totalMonthlyCostINR)})
                        </p>
                    </div>

                    <div className="mb-8 p-4 border-b border-slate-200">
                        <CreditCard className="w-6 h-6 text-indigo-500 mb-2" />
                        <p className="text-5xl font-extrabold text-slate-900">{formatCredits(totalMonthlyCredits)}</p>
                        <p className="text-slate-500 mt-1">Estimated Monthly Credit Usage</p>
                        <p className="text-xs text-slate-400 mt-2">
                             ({formatCredits(estimatedCreditSavings)} credits saved compared to a benchmark)
                        </p>
                    </div>

                    {/* Cost Per Minute Breakdown */}
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-3xl font-extrabold text-slate-900 mb-2">
                            {costPerMinute.toFixed(1)} <span className="text-xl text-slate-500">credits/min</span>
                        </p>
                        <div className="text-sm text-slate-600">
                            {callType === 'test' ? (
                                <p className="font-semibold text-indigo-600">Flat rate for Testing & Development.</p>
                            ) : (
                                <>
                                    <p>({BASE_RATE_CREDITS.toFixed(1)} base</p>
                                    <p>+ {qualityCredits.toFixed(1)} {qualityLevel.label.toLowerCase()} quality</p>
                                    <p>+ {numberCredits.toFixed(1)} {phoneCategory.label.toLowerCase()} number)</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <button className="w-full mt-8 flex items-center justify-center space-x-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Download Detailed Report (PDF)</span>
                </button>
            </div>
        </div>
    );
};

// --- Main Page Component ---

export default function CallersPage() {
  const [activeServiceTab, setActiveServiceTab] = useState<ServiceId>('edu');
  const [activeUseCaseTab, setActiveUseCaseTab] = useState<TabId>('growth');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number')
      return
    }

    if (!phoneNumber.match(/^[0-9]{10}$/)) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Determine campaign ID based on selected country
      const campaignId = selectedCountry === '+91'
        ? process.env.NEXT_CAMPAIGN_ID_IND || "69391e24f8a4456f85e108b8"
        : process.env.NEXT_CAMPAIGN_ID_UAE || "693a53a6bda2a468cca3b453"

      // Construct the full phone number with country code
      const fullPhoneNumber = `${selectedCountry}${phoneNumber}`

      // Make API call using environment variable
      const baseUrl = process.env.NEXT_XENY_CRM_BASE_URL || 'https://app.xeny.ai/apis/api'
      const response = await fetch(`${baseUrl}/public/test-outbound-call/${campaignId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentNumber: fullPhoneNumber
        })
      })

      if (!response.ok) {
        throw new Error('Failed to initiate call')
      }

      const data = await response.json()
      setSuccess('AI call initiated successfully! You will receive a call shortly.')
      console.log('Call initiated:', data)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate call')
      console.error('Call initiation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle country selection
  const handleCountrySelect = () => {
    setSelectedCountry(selectedCountry === '+91' ? '+971' : '+91');
  };

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  // Load external styles for specific brand icons (FontAwesome) and flags
  useEffect(() => {
    const faLink = document.createElement('link');
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    faLink.rel = 'stylesheet';
    document.head.appendChild(faLink);

    const flagLink = document.createElement('link');
    flagLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css';
    flagLink.rel = 'stylesheet';
    document.head.appendChild(flagLink);

    return () => {
      document.head.removeChild(faLink);
      document.head.removeChild(flagLink);
    }
  }, []);

  return (
<main className="font-sans text-slate-900 bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <ThreeBackground />
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm mb-8 animate-bounce-slow">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600  tracking-widest">Christmas discount is live</span>
          </div>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-slate-900">
              <ScrollTextReveal
                text="Your 24/7 AI Voice Employee For"
                splitBy="word"
                className="block mb-4"
              />
              <br />
              <HeroTypewriter />
              <span className="animate-pulse text-indigo-600">|</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="text-xl text-slate-500 mb-12 max-w-4xl mx-auto leading-relaxed">
              <ScrollTextReveal
                text="Xeny automates calls, callbacks, and bookings—powering your digital transformation and keeping your business responsive, consistent, and miles ahead of competitors."
                splitBy="word"
              />
            </div>
          </ScrollReveal>


          {/* Simulated Input */}
          <div className="w-full max-w-md bg-white p-2 sm:p-3 rounded-[24px] shadow-lg border border-slate-200 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col gap-2">
              <div className="flex items-center bg-slate-50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-slate-100 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                <div className="flex items-center gap-2 border-r border-slate-300 pr-2 sm:pr-3 mr-2 sm:mr-3 cursor-pointer" onClick={handleCountrySelect}>
                  <span className={`fi ${selectedCountry === '+91' ? 'fi-in' : 'fi-ae'} rounded-sm text-lg shadow-sm`}></span>
                  <span className="text-slate-800 font-bold text-sm">{selectedCountry}</span>
                  <FontAwesomeIcon icon={faChevronDown} className="text-[10px] text-slate-400" />
                </div>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  className="bg-transparent w-full outline-none text-slate-900 font-bold placeholder-slate-400 text-base sm:text-lg h-full"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={10}
                />
              </div>

              <button
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3 text-base sm:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">
                      <FontAwesomeIcon icon={faSpinner} className="text-white" />
                    </span>
                    Initiating Call...
                  </>
                ) : (
                  <>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    Receive AI Call Now
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faLock} /> Free demo • No credit card required
            </p>
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center mt-2">{success}</p>}
          </div>
        </div>
      </section>

      <UrbanPiperSection />

      {/* CLIENTS MARQUEE */}
      <div className="bg-white border-y border-slate-100 py-10 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex w-max gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500 animate-[scroll_40s_linear_infinite]">
          {/* Note: Using FontAwesome classes for brands as Lucide doesn't have them all */}
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
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Proven Results</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
                <ScrollTextReveal text="Real Numbers, Real Growth" splitBy="word" />
              </h2>
              <p className="text-slate-500">Here is the impact we deliver to businesses like yours.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-indigo-600 mb-2">90%</div><p className="text-xs font-bold uppercase text-slate-400">Call Automation</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-green-500 mb-2">90%</div><p className="text-xs font-bold uppercase text-slate-400">Less Staffing</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-blue-500 mb-2">50%</div><p className="text-xs font-bold uppercase text-slate-400">Fewer Errors</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-orange-500 mb-2">60%</div><p className="text-xs font-bold uppercase text-slate-400">Cost Savings</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-purple-500 mb-2">60%</div><p className="text-xs font-bold uppercase text-slate-400">Qualified Leads</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-pink-500 mb-2">10X</div><p className="text-xs font-bold uppercase text-slate-400">Sales Velocity</p></div>
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section id="industries" className="py-24 bg-slate-100 border-y border-slate-100 relative z-10">

        {/* 4. WHAT POWERS EVERY CALL (Features) */}
         <section id="features" className="py-24 ">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                <ScrollTextReveal text="What Powers Every Call" splitBy="word" />
              </h2>
              <p className="text-slate-500">The technology stack behind the voice.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">01</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Multilingual AI Agent</h3>
              <p className="text-sm text-slate-600">Speaks naturally, handles interruptions, and switches languages mid-call - no IVR, no robotic pauses.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">02</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">LLM-Powered Understanding</h3>
              <p className="text-sm text-slate-600">Understands meaning, tone, and context to respond, clarify, and adjust the flow in real time.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">03</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smooth Handoff</h3>
              <p className="text-sm text-slate-600">When a lead shows intent, AI hands off instantly with full context—no repeats, no friction.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">04</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Post-Call Actions</h3>
              <p className="text-sm text-slate-600">Sends confirmations, reminders, messages, quotes, or summaries automatically right after the call.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">05</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Interruption Handling</h3>
              <p className="text-sm text-slate-600">Stays on track through noise, overlap, or sudden questions and adapts without breaking the flow.</p>
            </div>
          </div>
        </div>
      </section>


        {/* 5. INDUSTRIES (Service Tabs) */}
        <section id="industries-tabs" className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6">
            <ScrollReveal direction="up" delay={0}>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  <ScrollTextReveal text="Our Network. Your Growth." splitBy="word" />
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <button
                    className={`px-8 py-3 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${activeServiceTab === 'edu'
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    onClick={() => setActiveServiceTab('edu')}
                  >
                    <FontAwesomeIcon icon={faGraduationCap} /> Education
                  </button>
                  <button
                    className={`px-8 py-3 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${activeServiceTab === 'logistics'
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    onClick={() => setActiveServiceTab('logistics')}
                  >
                    <FontAwesomeIcon icon={faTruckLoading} /> Logistics
                  </button>
                  <button
                    className={`px-8 py-3 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${activeServiceTab === 'finance_serv'
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    onClick={() => setActiveServiceTab('finance_serv')}
                  >
                    <FontAwesomeIcon icon={faCoins} /> Financial Services
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* SERVICE CONTENT: EDUCATION */}
            {activeServiceTab === 'edu' && (
              <div className="max-w-4xl mx-auto grid gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                      <FontAwesomeIcon icon={faChartBar} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">1M+</h3>
                      <p className="text-slate-500 leading-snug">leads qualified across universities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 text-xl">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">7x</h3>
                      <p className="text-slate-500 leading-snug">more outreach in half the time</p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-xl">
                      <i className="fas fa-headset"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">78%</h3>
                      <p className="text-slate-500 leading-snug">inquiries resolved autonomously</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
                      <i className="fas fa-history"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">99.8%</h3>
                      <p className="text-slate-500 leading-snug">uptime during peak admission</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICE CONTENT: LOGISTICS */}
            {activeServiceTab === 'logistics' && (
              <div className="max-w-4xl mx-auto grid gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">8M+</h3>
                      <p className="text-slate-500 leading-snug">deliveries coordinated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 text-xl">
                      <i className="fas fa-route"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">46%</h3>
                      <p className="text-slate-500 leading-snug">reduction in last mile costs</p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-xl">
                      <i className="fas fa-box-open"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">92%</h3>
                      <p className="text-slate-500 leading-snug">queries handled without humans</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
                      <i className="fas fa-clipboard-check"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">99.9%</h3>
                      <p className="text-slate-500 leading-snug">uptime during peak shipping</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICE CONTENT: FINANCE */}
            {activeServiceTab === 'finance_serv' && (
              <div className="max-w-4xl mx-auto grid gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                      <i className="fas fa-chart-pie"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">5.2M+</h3>
                      <p className="text-slate-500 leading-snug">financial conversations handled</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 text-xl">
                      <i className="fas fa-rocket"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">8x</h3>
                      <p className="text-slate-500 leading-snug">more productive than outbound</p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-xl">
                      <i className="fas fa-phone-volume"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">83%</h3>
                      <p className="text-slate-500 leading-snug">queries resolved autonomously</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">99.9%</h3>
                      <p className="text-slate-500 leading-snug">uptime during tax seasons</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="container mx-auto px-6 pt-20">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Industries</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
                <ScrollTextReveal text="Expertise in Every Sector" splitBy="word" />
              </h2>
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
                    onClick={() => setActiveServiceTab(tab.id as ServiceId)}
                    className={`px-6 py-3 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${activeServiceTab === tab.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Dynamic Content for Industries */}
          <div className="max-w-4xl mx-auto min-h-[300px]">
            {activeServiceTab === 'edu' && (
              <StaggerReveal staggerDelay={100} direction="up" className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="University" />
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">1M+</h3><p className="text-slate-500 leading-snug">leads qualified across universities</p></div>
                </div>
                <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-yellow-100 text-yellow-600"><Phone /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">7x</h3><p className="text-slate-500 leading-snug">faster outreach to applicants</p></div></div>
                <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-100 text-orange-600"><MessageSquare /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">78%</h3><p className="text-slate-500 leading-snug">FAQs answered without humans</p></div></div>
                <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-200 text-slate-600"><Clock /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">99.8%</h3><p className="text-slate-500 leading-snug">uptime during admission season</p></div></div>
              </StaggerReveal>
            )}
            {activeServiceTab === 'ecommerce' && (
              <StaggerReveal staggerDelay={100} direction="up" className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Shop" />
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">$4.2M</h3><p className="text-slate-500 leading-snug">revenue recovered from abandoned carts</p></div>
                </div>
                <div className="flex items-start gap-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-purple-100 text-purple-600"><ShoppingBag /></div><div><h3 className="text-3xl font-bold text-slate-900 mb-1">35%</h3><p className="text-slate-500 leading-snug">cart recovery rate via voice</p></div></div>
              </StaggerReveal>
            )}
            {activeServiceTab === 'realestate' && (
              <StaggerReveal staggerDelay={100} direction="up" className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Real Estate" />
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">2.5M+</h3><p className="text-slate-500 leading-snug">property inquiries handled</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-100 text-green-600"><Home /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">65%</h3><p className="text-slate-500 leading-snug">lead conversion rate</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-100 text-blue-600"><Phone /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">24/7</h3><p className="text-slate-500 leading-snug">property viewing scheduling</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-indigo-100 text-indigo-600"><MessageSquare /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">88%</h3><p className="text-slate-500 leading-snug">tenant queries resolved</p></div>
                </div>
              </StaggerReveal>
            )}
            {activeServiceTab === 'healthcare' && (
              <StaggerReveal staggerDelay={100} direction="up" className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Healthcare" />
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">3.8M+</h3><p className="text-slate-500 leading-snug">appointments scheduled</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-red-100 text-red-600"><HeartPulse /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">72%</h3><p className="text-slate-500 leading-snug">no-show reduction</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-pink-100 text-pink-600"><Clock /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">95%</h3><p className="text-slate-500 leading-snug">reminder accuracy</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-cyan-100 text-cyan-600"><MessageSquare /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">81%</h3><p className="text-slate-500 leading-snug">patient inquiries automated</p></div>
                </div>
              </StaggerReveal>
            )}
            {activeServiceTab === 'logistics' && (
              <StaggerReveal staggerDelay={100} direction="up" className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <img src="https://images.unsplash.com/photo-1601581875036-1c921f32e75e?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Logistics" />
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">8M+</h3><p className="text-slate-500 leading-snug">deliveries coordinated</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-100 text-orange-600"><Truck /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">46%</h3><p className="text-slate-500 leading-snug">reduction in last mile costs</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-yellow-100 text-yellow-600"><Phone /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">92%</h3><p className="text-slate-500 leading-snug">queries handled without humans</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-200 text-slate-600"><Clock /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">99.9%</h3><p className="text-slate-500 leading-snug">uptime during peak shipping</p></div>
                </div>
              </StaggerReveal>
            )}
            {activeServiceTab === 'finance_serv' && (
              <StaggerReveal staggerDelay={100} direction="up" className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Finance" />
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">5.2M+</h3><p className="text-slate-500 leading-snug">financial conversations handled</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-100 text-green-600"><Coins /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">8x</h3><p className="text-slate-500 leading-snug">more productive than outbound</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-100 text-blue-600"><Phone /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">83%</h3><p className="text-slate-500 leading-snug">queries resolved autonomously</p></div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-200 text-slate-600"><Clock /></div>
                  <div><h3 className="text-3xl font-bold text-slate-900 mb-1">99.9%</h3><p className="text-slate-500 leading-snug">uptime during tax seasons</p></div>
                </div>
              </StaggerReveal>
            )}
          </div>
        </div>
      </section>

      {/* USE CASES TABS */ }
    <section id="use-cases" className="py-24 bg-white relative z-10">
    <div className="container mx-auto px-6">
      <ScrollReveal direction="up" delay={0}>
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Applications</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            <ScrollTextReveal text="Workflows That Save You Time" splitBy="word" />
          </h2>

          <div className="flex overflow-x-auto pb-4 gap-2 mt-8 justify-start md:justify-center no-scrollbar">
            {['real_estate', 'growth', 'hr', 'finance', 'cx', 'ops', 'marketing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveUseCaseTab(tab as TabId)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border transition-all ${activeUseCaseTab === tab
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200'
                  }`}
              >
                {tab.replace('_', ' ').charAt(0).toUpperCase() + tab.replace('_', ' ').slice(1)}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Use Cases Content */}
      <div className="max-w-5xl mx-auto min-h-[400px]">
        {activeUseCaseTab === 'real_estate' && (
          <StaggerReveal staggerDelay={150} direction="up" className="grid md:grid-cols-2 gap-8 justify-center">
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
          </StaggerReveal>
        )}
        {activeUseCaseTab === 'growth' && (
          <StaggerReveal staggerDelay={150} direction="up" className="grid md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Sales Growth" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><TrendingUp className="text-blue-400" /> Sales Growth</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Lead Generation & Qualification</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Automated lead qualification</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Outbound sales calls</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Follow-up automation</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Revenue" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><BarChart3 className="text-purple-400" /> Revenue Growth</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Revenue Optimization</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Upsell & cross-sell calls</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Customer retention campaigns</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
          </StaggerReveal>
        )}
        {activeUseCaseTab === 'hr' && (
          <StaggerReveal staggerDelay={150} direction="up" className="grid md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Recruitment" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Users className="text-indigo-400" /> Recruitment</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Candidate Screening</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Initial candidate screening</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Interview scheduling</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Application status updates</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Employee Management" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><User className="text-blue-400" /> Employee Management</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Employee Engagement</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Onboarding calls</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Employee surveys</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
          </StaggerReveal>
        )}
        {activeUseCaseTab === 'finance' && (
          <StaggerReveal staggerDelay={150} direction="up" className="grid md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Collections" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><CreditCard className="text-green-400" /> Collections</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Payment Reminders</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Automated payment reminders</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Overdue account follow-ups</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Payment plan negotiations</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Financial Services" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Coins className="text-yellow-400" /> Financial Services</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Account Management</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Account balance inquiries</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Transaction verification</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
          </StaggerReveal>
        )}
        {activeUseCaseTab === 'cx' && (
          <StaggerReveal staggerDelay={150} direction="up" className="grid md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Customer Support" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Headphones className="text-blue-400" /> Support</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">24/7 Customer Support</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Issue resolution</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Product inquiries</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Technical troubleshooting</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Customer Experience" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><MessageSquare className="text-purple-400" /> Experience</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Customer Engagement</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Satisfaction surveys</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Feedback collection</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
          </StaggerReveal>
        )}
        {activeUseCaseTab === 'ops' && (
          <StaggerReveal staggerDelay={150} direction="up" className="grid md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Operations" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Settings className="text-orange-400" /> Operations</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Process Automation</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Order status updates</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Inventory notifications</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Delivery confirmations</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Workflow" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><BarChart3 className="text-indigo-400" /> Workflow</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Operational Efficiency</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Vendor communications</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Internal notifications</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
          </StaggerReveal>
        )}
        {activeUseCaseTab === 'marketing' && (
          <StaggerReveal staggerDelay={150} direction="up" className="grid md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Campaigns" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><Megaphone className="text-pink-400" /> Campaigns</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Marketing Campaigns</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Product launch calls</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Promotional announcements</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Event invitations</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl group overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt="Engagement" />
                <div className="absolute bottom-4 left-6 z-20 text-white font-bold text-lg flex items-center gap-2"><TrendingUp className="text-cyan-400" /> Engagement</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Customer Engagement</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Win-back campaigns</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /><span className="text-slate-600 text-sm">Loyalty program updates</span></div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">View Workflow</button>
              </div>
            </div>
          </StaggerReveal>
        )}
      </div>
    </div>
  </section>



  {/* DASHBOARD SECTION */ }
      <section id="dashboard" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal direction="up" delay={0}>
              <div className="text-center mb-16 hidden md:block">
                <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">The Control Room</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
                  <ScrollTextReveal text="Your AI Command Center" splitBy="word" />
                </h2>
                <p className="text-slate-500">Watch your agents work, listen to calls, and track ROI in real-time.</p>
              </div>
            </ScrollReveal>
            
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

                  <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">Seamless Integrations, <br /> Seamless Actions</h2>

          <div className="relative max-w-3xl mx-auto h-[400px] flex items-center justify-center">
            {/* Center Hub */}
            <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center z-10 relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                <i className="fas fa-bolt"></i>
              </div>
            </div>

            {/* Orbiting Logos */}
            <div className="absolute inset-0 animate-spin" style={{animationDuration: '40s'}}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-blue-600">
                <FontAwesomeIcon icon={faSalesforce} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-orange-500">
                <FontAwesomeIcon icon={faHubspot} />
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-green-500">
                <FontAwesomeIcon icon={faWhatsapp} />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-purple-500">
                <FontAwesomeIcon icon={faSlack} />
              </div>
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 0}}>
              <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </section>

  {/* CALCULATOR */ }
  <section id="calculator" className="py-24 bg-slate-100 border-y border-slate-100 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5 bg-noise"></div>
    <div className="container mx-auto px-6 relative z-10">
      <ScrollReveal direction="up" delay={0}>
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">ROI Engine</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
            <ScrollTextReveal text="See How Much You'll Save" splitBy="word" />
          </h2>
          <p className="text-slate-500">Stop overpaying for manual calls.</p>
        </div>
      </ScrollReveal>
      <SavingsCalculator />
    </div>
  </section>

  {/* INSIGHTS */ }
  {/* <section className="py-24 bg-white border-y border-slate-100">
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
      </section> */}

  {/* FAQ SECTION */ }
  <section className="py-24 bg-slate-50 border-y border-slate-100 relative z-10">
    <div className="container mx-auto px-6 max-w-4xl">
      <ScrollReveal direction="up" delay={0}>
        <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
          <ScrollTextReveal text="Frequently Asked Questions" splitBy="word" />
        </h2>
      </ScrollReveal>
      <div className="space-y-4">
        {[
          { q: "How quickly can I really create a Voice AI agent?", a: "You can create a fully functional Voice AI agent in just a few minutes. Simply choose a voice, set your goals, add scripts or knowledge, and your agent is ready to make calls instantly." },
          { q: "Do I need any technical or coding knowledge?", a: "No technical or coding skills are required. Everything is no-code. However, developers can use our API, webhook events, and Zapier integrations for deeper customization." },
          { q: "What kind of Voice AI agents can I build?", a: "You can build agents for sales, support, appointment booking, lead qualification, automated callbacks, follow-ups, surveys, and more—fully customizable for any workflow." },
          { q: "Can I customize how the AI agent sounds and responds?", a: "Yes. You can customize the voice, tone, speaking style, accent, and full behavior. You can even create dynamic responses using conditions, memory, and custom prompts." },
          { q: "What happens after I create my agent?", a: "Once created, your agent can immediately start making or receiving calls. You can monitor conversations, analyze transcripts, track performance, and refine the agent anytime." },
          { q: "Is there a free trial or demo available?", a: "Yes. You can try the platform for free with demo minutes included. No credit card required. A live demo with our team is also available." },
          { q: "Can I integrate my AI agent with existing systems?", a: "Absolutely. We offer native integrations with Salesforce, HubSpot, Zoho, and Pipedrive, along with API access and Zapier for custom workflows." },

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
  {/* FINAL CTA */ }
  <section className="py-24 bg-slate-50 border-t border-slate-200 ">
    <div className="container mx-auto px-6 flex justify-center bg-noise relative">
      <div className="bg-white p-6 sm:p-8 rounded-[40px] shadow-lg border border-slate-100 max-w-lg w-full">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">C'mon, Make That Call!</h3>
          <p className="text-slate-500 text-sm">Try Callers – Meet Paul / Cassie</p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer group">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
              alt="Cassie"
              className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 transition-all duration-300"
            />
            <div className="absolute bottom-3 left-3 text-white font-bold drop-shadow-md">Cassie</div>
          </div>
          <div className="flex-1 relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer ring-4 ring-indigo-600 shadow-lg transform scale-105">
            <div className="absolute top-3 left-3 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md z-10">
              <i className="fas fa-check"></i>
            </div>
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
              alt="Paul"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-white">
              <div className="font-bold text-lg">Paul</div>
              <div className="text-[10px] opacity-90">(Male AI Agent)</div>
            </div>
          </div>
        </div>

        <div className="flex items-center border border-slate-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 mb-4 bg-slate-50 shadow-inner">
          <div className="flex items-center gap-2 border-r border-slate-300 pr-2 sm:pr-3 mr-2 sm:mr-3 cursor-pointer">
            <span className="fi fi-in rounded-sm text-xl shadow-sm"></span>
            <span className="text-slate-800 font-bold text-sm">+91</span>
            <i className="fas fa-chevron-down text-[10px] text-slate-400"></i>
          </div>
          <input type="tel" placeholder="081234 56789" className="bg-transparent w-full outline-none text-slate-900 font-bold placeholder-slate-400 text-base sm:text-lg" />
        </div>

        <button className="w-full bg-cyan-600 hover:bg-indigo-700 text-white font-bold py-3 sm:py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 text-base sm:text-lg">
          <FontAwesomeIcon icon={faPhoneVolume} /> Receive AI Call
        </button>
      </div>
    </div>
  </section>

  {/* SECURITY STRIP */ }
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

  {/* ASK AI */ }
      <section className="py-24 bg-slate-100 border-t border-slate-200 relative z-10">
        <div className="container mx-auto px-6 text-center">
            <ScrollReveal direction="up" delay={0}>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                <ScrollTextReveal text="Still not sure? Ask the AI." splitBy="word" />
              </h2>
            </ScrollReveal>
            <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
                <a href="#" className="flex-1 bg-[#4129F9] hover:bg-[#3520D0] text-white py-5 px-8 rounded-full font-bold shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"><Bot className="w-5 h-5"/> Ask ChatGPT</a>
                <a href="#" className="flex-1 bg-[#D97757] hover:bg-[#C56545] text-white py-5 px-8 rounded-full font-bold shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"><Bot className="w-5 h-5"/> Ask Claude</a>
                <a href="#" className="flex-1 bg-[#1A7F85] hover:bg-[#14686D] text-white py-5 px-8 rounded-full font-bold shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"><Search className="w-5 h-5"/> Ask Perplexity</a>
            </div>
        </div>
      </section>



       <Footer />
</main >
  );
}