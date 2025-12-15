'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { faGraduationCap, faTruckLoading, faCoins, faPhoneAlt, faUserPlus, faFileInvoiceDollar, faMicrophoneAlt, faClock, faCalendarCheck, faGlobe, faPaperPlane, faCalendarAlt, faSearch, faCheckCircle, faHistory, faCreditCard, faChartBar, faRoute, faBoxOpen, faClipboardCheck, faChartPie, faRocket, faPhoneVolume, faHeadset, faChartLine, faBolt, faRobot, faBrain, faPlay, faChevronDown, faLock, faCheck, faBars, faTimes, faSpinner, faCircle } from "@fortawesome/free-solid-svg-icons"
import { faAmazon, faGoogle, faSpotify, faAirbnb, faUber, faStripe, faMicrosoft, faSalesforce, faHubspot, faWhatsapp, faSlack } from "@fortawesome/free-brands-svg-icons"
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
  FileSpreadsheet,
  Calendar,
  Mail,
  Zap,
  Database,
  FileText,
  Layout,
  Mic,
  PlayCircle,
  Rocket,
  Sparkles,


} from 'lucide-react';

import Header from "@/components/header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as THREE from 'three';
import HeroCanvas from "@/components/hero-canvas"
import Footer from "@/components/footer"
import ScrollReveal from "@/components/animations/ScrollReveal"
import TextReveal from "@/components/animations/TextReveal"
import ScrollTextReveal from "@/components/animations/ScrollTextReveal"
import StaggerReveal from "@/components/animations/StaggerReveal"
import AnimatedFeatureDashboard from "@/components/animated-feature-dashboard"
import TestCom from "@/components/test-component"
import HowItsWork from "@/components/LandingPageFlow"
const IndustrialUseCases = dynamic(() => import("@/components/customer-stories"), { ssr: false })

import {  faChevronUp} from '@fortawesome/free-solid-svg-icons';

import { Points, PointMaterial } from '@react-three/drei';
import { useFrame, Canvas } from '@react-three/fiber';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as FlagIcons from 'country-flag-icons/react/3x2';
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
// AI Image Morph: A futuristic visual showing a human face transitioning into a complex digital data mesh through pixel-morphing effects.

// --- Types ---
type TabId = 'real_estate' | 'growth' | 'hr' | 'finance' | 'cx' | 'ops' | 'marketing' | 'sales';
type ServiceId = 'edu' | 'ecommerce' | 'realestate' | 'healthcare' | 'logistics' | 'finance_serv';

// --- Counter Component ---
const Counter = ({ target }: { target: string }) => {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (!isIntersecting) return;

    const match = target.match(/^(\d+)([%X]?)$/);
    if (!match) return;

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const increment = targetNum / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isIntersecting, target]);

  const match = target.match(/^(\d+)([%X]?)$/);
  const suffix = match ? match[2] || '' : '';

  return <div ref={ref}>{count}{suffix}</div>;
};

// --- Components ---
const COUNTRIES = [
  { code: '+91', countryCode: 'IN', emoji: '🇮🇳' },
  { code: '+971', countryCode: 'AE', emoji: '🇦🇪' },
];
/**
 * Three.js Background Component
 * Renders the Orb and the 3D "Xeny" text
 */
// const ThreeBackground = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
//     while (containerRef.current.firstChild) {
//       containerRef.current.removeChild(containerRef.current.firstChild);
//     }
//     containerRef.current.appendChild(renderer.domElement);

//     // Neural Network Particles
//     const particleCount = 150;
//     const particles = new THREE.BufferGeometry();
//     const positions = new Float32Array(particleCount * 3);
//     const velocities: {x: number, y: number, z: number}[] = [];

//     const range = 40;
//     for (let i = 0; i < particleCount; i++) {
//         positions[i * 3] = (Math.random() - 0.5) * range;
//         positions[i * 3 + 1] = (Math.random() - 0.5) * range;
//         positions[i * 3 + 2] = (Math.random() - 0.5) * range;
        
//         velocities.push({
//             x: (Math.random() - 0.5) * 0.05,
//             y: (Math.random() - 0.5) * 0.05,
//             z: (Math.random() - 0.5) * 0.05
//         });
//     }
//     particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//     const pMaterial = new THREE.PointsMaterial({
//         color: 0x6366f1,
//         size: 0.4,
//         transparent: true,
//         opacity: 0.8,
//         blending: THREE.AdditiveBlending
//     });

//     const particleSystem = new THREE.Points(particles, pMaterial);
//     scene.add(particleSystem);

//     // Connection Lines
//     const lineMaterial = new THREE.LineBasicMaterial({
//         color: 0x818cf8,
//         transparent: true,
//         opacity: 0.15 
//     });

//     const lineGeometry = new THREE.BufferGeometry();
//     const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
//     scene.add(lineMesh);

//     // Main Orbiting Ring
//     const orbitGeometry = new THREE.TorusGeometry(12, 0.1, 64, 100);
//     const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.15 });
//     const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
//     orbitRing.rotation.x = Math.PI / 2;
//     scene.add(orbitRing);

//     // Central Icosahedron
//     const icoGeometry = new THREE.IcosahedronGeometry(3, 1);
//     const icoMaterial = new THREE.MeshBasicMaterial({ 
//       color: 0x4f46e5, 
//       wireframe: true, 
//       transparent: true, 
//       opacity: 0.1 
//     });
//     const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
//     scene.add(icosahedron);

//     camera.position.z = 30;

//     // Mouse Interaction
//     const mouse = new THREE.Vector2();
//     const onMouseMove = (event: MouseEvent) => {
//         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener('mousemove', onMouseMove);

//     // Animation Loop
//     let animationId: number;
//     const animate = () => {
//       animationId = requestAnimationFrame(animate);

//       // Update Particles
//       const positions = particleSystem.geometry.attributes.position.array as Float32Array;
//       for (let i = 0; i < particleCount; i++) {
//           positions[i * 3] += velocities[i].x;
//           positions[i * 3 + 1] += velocities[i].y;
//           positions[i * 3 + 2] += velocities[i].z;

//           const limit = range / 2;
//           if (positions[i*3] > limit || positions[i*3] < -limit) velocities[i].x *= -1;
//           if (positions[i*3+1] > limit || positions[i*3+1] < -limit) velocities[i].y *= -1;
//           if (positions[i*3+2] > limit || positions[i*3+2] < -limit) velocities[i].z *= -1;
//       }
//       particleSystem.geometry.attributes.position.needsUpdate = true;

//       // Update Lines
//       const linePositions: number[] = [];
//       const connectionDistance = 6;

//       for (let i = 0; i < particleCount; i++) {
//           for (let j = i + 1; j < particleCount; j++) {
//               const x1 = positions[i*3];
//               const y1 = positions[i*3+1];
//               const z1 = positions[i*3+2];

//               const x2 = positions[j*3];
//               const y2 = positions[j*3+1];
//               const z2 = positions[j*3+2];

//               const dist = Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2);

//               if (dist < connectionDistance) {
//                   linePositions.push(x1, y1, z1);
//                   linePositions.push(x2, y2, z2);
//               }
//           }
//       }
//       lineMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

//       // Rotation with mouse interaction
//       const time = Date.now() * 0.0005;
//       const scrollY = window.scrollY;
      
//       scene.rotation.y = time * 0.05 + (mouse.x * 0.1);
//       scene.rotation.x = (mouse.y * 0.1) + (scrollY * 0.0002);

//       orbitRing.rotation.z = time * 0.1;
//       orbitRing.rotation.x = Math.PI / 2 + Math.sin(time * 0.2) * 0.1;

//       icosahedron.rotation.y = time * 0.15;
//       icosahedron.rotation.x = scrollY * 0.0005;
//       icosahedron.position.y = Math.sin(time) * 0.3;

//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       if (!containerRef.current) return;
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', onMouseMove);
//       if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
//         containerRef.current.removeChild(renderer.domElement);
//       }
//       particles.dispose();
//       pMaterial.dispose();
//       lineGeometry.dispose();
//       lineMaterial.dispose();
//       orbitGeometry.dispose();
//       orbitMaterial.dispose();
//       icoGeometry.dispose();
//       icoMaterial.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div 
//       ref={containerRef} 
//       className="fixed top-0 left-0 w-full h-full pointer-events-none"
//       style={{ 
//         zIndex: 0, 
//         background: 'linear-gradient(to bottom, #f8fafc 0%, #eef2ff 50%, #faf5ff 100%)' 
//       }}
//     />
//   );
// };

const ICON_PATHS = {
    // 1. Xeny Logo / AI Icon
    ai: '../public/logo/xeny-logo.png', 
    
    // 2. Caller Icon (Replace with your actual path)
    caller: '/icons/phone-call.png', 
    
    // 3. Bot Icon (Replace with your actual path)
    bot: '/icons/bot.png',       
};

const ThreeBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // Arrays to hold the dynamically created icon meshes/sprites and their velocities
    const iconSprites: THREE.Sprite[] = [];
    const velocities: {x: number, y: number, z: number}[] = [];

    // We will use a smaller particle count for distinct icons
    const ICON_COUNT = 50;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !containerRef.current || typeof window === 'undefined') return;
        if (!containerRef.current || typeof window === 'undefined') return;

        // --- 1. SETUP: Scene, Camera, Renderer ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(renderer.domElement);

        // --- 2. LIGHTING (Kept for subtle scene shading) ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xa5b4fc, 3);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xf0abfc, 5, 50);
        pointLight.position.set(-10, -5, 10);
        scene.add(pointLight);

        // --- 3. OBJECTS AND EFFECTS ---

        // A. Icon Sprites (Nodes)
        const textureLoader = new THREE.TextureLoader();
        const iconTextures = {
            ai: textureLoader.load(ICON_PATHS.ai),
            caller: textureLoader.load(ICON_PATHS.caller),
            bot: textureLoader.load(ICON_PATHS.bot),
        };
        const iconKeys = Object.keys(iconTextures) as ('ai' | 'caller' | 'bot')[];

        const range = 40;
        
        for (let i = 0; i < ICON_COUNT; i++) {
            // Select icon type cyclically
            const iconType = iconKeys[i % iconKeys.length];
            const texture = iconTextures[iconType];

            // Create a SpriteMaterial and Sprite (2D image facing camera)
            const spriteMaterial = new THREE.SpriteMaterial({ 
                map: texture,
                color: 0xffffff, // White color preserves texture colors (important for logos/icons)
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending 
            });
            const sprite = new THREE.Sprite(spriteMaterial);
            
            // Set initial position
            sprite.position.set(
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * range
            );
            
            // Set size - Adjust this value if the icons look too big/small
            sprite.scale.set(3, 3, 3); 
            
            iconSprites.push(sprite);
            scene.add(sprite);
            
            // Set velocity for animation
            velocities.push({
                x: (Math.random() - 0.5) * 0.03,
                y: (Math.random() - 0.5) * 0.03,
                z: (Math.random() - 0.5) * 0.03
            });
        }
        
        // B. Connection Lines (Edges) - KEPT
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xc4b5fd,
            transparent: true,
            opacity: 0.1 
        });

        const lineGeometry = new THREE.BufferGeometry();
        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lineMesh);

        // C & D. Central Icosahedron and Orbiting Ring are removed.

        camera.position.z = 30;

        // Mouse Interaction
        const mouse = new THREE.Vector2();
        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        // Animation Loop
        let animationId: number;
        const animate = () => {
          animationId = requestAnimationFrame(animate);

          // Update Icon Sprites
          const currentPositions: number[] = [];
          for (let i = 0; i < ICON_COUNT; i++) {
              const sprite = iconSprites[i];
              
              // Update position
              sprite.position.x += velocities[i].x;
              sprite.position.y += velocities[i].y;
              sprite.position.z += velocities[i].z;

              // Check boundaries and reverse direction
              const limit = range / 2;
              if (sprite.position.x > limit || sprite.position.x < -limit) velocities[i].x *= -1;
              if (sprite.position.y > limit || sprite.position.y < -limit) velocities[i].y *= -1;
              if (sprite.position.z > limit || sprite.position.z < -limit) velocities[i].z *= -1;
              
              // Collect positions for line drawing
              currentPositions.push(sprite.position.x, sprite.position.y, sprite.position.z);
          }

          // Update Lines
          const linePositions: number[] = [];
          const connectionDistance = 8; 

          for (let i = 0; i < ICON_COUNT; i++) {
              for (let j = i + 1; j < ICON_COUNT; j++) {
                  const x1 = currentPositions[i*3];
                  const y1 = currentPositions[i*3+1];
                  const z1 = currentPositions[i*3+2];
                  const x2 = currentPositions[j*3];
                  const y2 = currentPositions[j*3+1];
                  const z2 = currentPositions[j*3+2];
                  
                  const distSq = (x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2; 

                  if (distSq < connectionDistance ** 2) {
                      linePositions.push(x1, y1, z1);
                      linePositions.push(x2, y2, z2);
                  }
              }
          }
          lineMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

          // Rotation with mouse interaction
          const time = Date.now() * 0.0005;
          const scrollY = window.scrollY;
          
          scene.rotation.y = time * 0.02 + (mouse.x * 0.05); 
          scene.rotation.x = (mouse.y * 0.05) + (scrollY * 0.0001); 

          // Subtle camera movement
          camera.position.x = Math.sin(time * 0.05) * 1.0;
          camera.position.y = Math.cos(time * 0.05) * 0.5;

          renderer.render(scene, camera);
        };
        animate();

        // Resize handlers
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
          window.removeEventListener('mousemove', onMouseMove);
          if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement);
          }
          // Disposal of resources
          lineGeometry.dispose();
          lineMaterial.dispose();
          
          // Dispose of Sprites and their materials/textures
          iconSprites.forEach(sprite => {
            sprite.material.map?.dispose();
            sprite.material.dispose();
            scene.remove(sprite);
          });

          renderer.dispose();
        };
    }, []); 

    return (
        <div 
          ref={containerRef} 
          className="fixed top-0 left-0 w-full h-full pointer-events-none"
          style={{ 
            zIndex: 0, 
            // Glassy Grading CSS Background for white theme
            background: 'linear-gradient(135deg, #f0f4f8 0%, #e0e7ff 40%, #f3e8ff 70%, #ffffff 100%)' 
          }}
        />
    );
};

/**
 * Typewriter Effect for Hero Section
 */
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
  const bgRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!bgRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, bgRef.current.clientWidth / bgRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bgRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2.5, 1); 
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x6366f1, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.08 
    });
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);
    
    const orbitGeometry = new THREE.TorusGeometry(3.5, 0.05, 16, 100);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.2 });
    const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitRing.rotation.x = Math.PI / 2;
    scene.add(orbitRing);

    camera.position.z = 5;

    let animationId: number;
    const animate = () => {
        animationId = requestAnimationFrame(animate);
        orb.rotation.y += 0.002;
        orb.rotation.x += 0.001;
        
        orbitRing.rotation.z -= 0.005;
        orbitRing.rotation.x = Math.PI / 2 + Math.sin(Date.now() * 0.001) * 0.1;

        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
       if (!bgRef.current) return;
       camera.aspect = bgRef.current.clientWidth / bgRef.current.clientHeight;
       camera.updateProjectionMatrix();
       renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        if (bgRef.current && bgRef.current.contains(renderer.domElement)) {
            bgRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        orbitGeometry.dispose();
        orbitMaterial.dispose();
        renderer.dispose();
    };
  }, []);

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
      <HeroCanvas/>
       <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />

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
  const [activeServiceTab, setActiveServiceTab] = useState<ServiceId>('edu');
  const [activeUseCaseTab, setActiveUseCaseTab] = useState<TabId>('sales');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [selectedUseCase, setSelectedUseCase] = useState('Sales');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<'male' | 'female'>('male');

  const currentFlag = COUNTRIES.find(c => c.code === selectedCountry)?.emoji || '🇮🇳';

  // Handle form submission
  const handleSubmit = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number')
      return
    }

    const expectedLength = selectedCountry === '+91' ? 10 : 9; // India: 10 digits, UAE: 9 digits
    if (!phoneNumber.match(new RegExp(`^[0-9]{${expectedLength}}$`))) {
      setError(`Please enter a valid ${expectedLength}-digit phone number`)
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
      const baseUrl = process.env.NEXT_PUBLIC_XENY_CRM_BASE_URL || 'https://app.xeny.ai/apis/api'
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to initiate call (${response.status})`)
      }

      const data = await response.json()
      setSuccess('AI call initiated successfully! You will receive a call shortly.')
      console.log('Call initiated:', data)

    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Network error: Please check your internet connection')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to initiate call')
      }
      console.error('Call initiation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle country selection
  const handleCountrySelect = (newCode: string) => {
    setSelectedCountry(newCode);
    setIsPickerOpen(false);
  };

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10));
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
      <HeroCanvas />
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
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold leading-[1.1] mb-2 text-slate-900">
              <ScrollTextReveal
                text="Your 24/7 AI Voice Employee For"
                splitBy="word"
                className="block "
              />
              <br />
              <HeroTypewriter />
              <span className="animate-pulse text-indigo-600">|</span>
            </h1>
          </ScrollReveal>

          <div className="text-xl text-slate-500 mb-12 max-w-4xl mx-auto leading-relaxed">
            Xeny automates calls, callbacks, and bookings—powering your digital transformation and keeping your business responsive, consistent, and miles ahead of competitors.
          </div>


          {/* Simulated Input */}
     <div className="w-full max-w-md bg-white p-2 sm:p-3 rounded-[24px] shadow-lg border border-slate-200 transform hover:scale-[1.02] transition-transform duration-300 z-10 ">
  <div className="flex flex-col gap-2">
    
    {/* Input and Picker Container */}
    <div className="relative">
      <div className="flex items-center bg-slate-50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-slate-100 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
        
        {/* Country Code Selector - CLICKABLE (Assuming you implement the toggle logic) */}
        <div 
          className="flex items-center gap-2 border-r border-slate-300 pr-2 sm:pr-3 mr-2 sm:mr-3 cursor-pointer hover:bg-slate-100 p-1 rounded-md transition-colors" 
          onClick={() => setIsPickerOpen(!isPickerOpen)} // Replace with your actual toggle function
        >
          {/* Flag Display */}
          {selectedCountry === '+91' ? <FlagIcons.IN style={{width: '20px', height: '15px'}} /> : <FlagIcons.AE style={{width: '20px', height: '15px'}} />}
          
          {/* Country Code */}
          <span className="text-slate-800 font-bold text-sm">{selectedCountry}</span>
          
          {/* Dropdown Indicator */}
          <FontAwesomeIcon 
            icon={isPickerOpen ? faChevronUp : faChevronDown} // Replace with your state variable
            className="text-[10px] text-slate-400 transition-transform" 
          />
        </div>
        
        {/* Phone Number Input Field */}
        <input
          type="tel"
          // UPDATED, SHORTER PLACEHOLDER
          placeholder="Enter your number for Xeny Call" 
          className="bg-transparent w-full outline-none text-slate-900 font-bold placeholder-slate-400 text-base sm:text-lg h-full"
          value={phoneNumber}
          onChange={handlePhoneChange}
          maxLength={10}
        />
      </div>

      {/* Country Code Picker Dropdown (Conditional rendering based on isPickerOpen state) */}
      {isPickerOpen && (
        <div className="absolute top-full w-30 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg mt-1 z-20">
          {COUNTRIES.map((country) => (
            <div
              key={country.code}
              className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 cursor-pointer"
              onClick={() => handleCountrySelect(country.code)}
            >
              {country.countryCode === 'IN' ? <FlagIcons.IN style={{width: '20px', height: '15px'}} /> : <FlagIcons.AE style={{width: '20px', height: '15px'}} />}
              <span className="text-slate-800 font-bold text-sm">{country.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
    
    {/* Submit Button */}
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
  
  {/* Footer Text */}
  <p className="text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
    <FontAwesomeIcon icon={faLock} /> Free demo • No credit card required
  </p>
  
  {/* Error/Success Messages */}
  {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
  {success && <p className="text-green-500 text-sm text-center mt-2">{success}</p>}
</div>
        </div>
      </section>

      <UrbanPiperSection />

      {/* CLIENTS MARQUEE */}
    
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
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
                <ScrollTextReveal
                  text="Real Numbers, Real Growth"
                  splitBy="word"
                  className="block"
                />
              </h2>
            </ScrollReveal>
            <p className="text-slate-500">Here is the impact we deliver to businesses like yours.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-indigo-600 mb-2"><Counter target="90%" /></div><p className="text-xs font-bold uppercase text-slate-400">Call Automation</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-green-500 mb-2"><Counter target="90%" /></div><p className="text-xs font-bold uppercase text-slate-400">Less Staffing</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-blue-500 mb-2"><Counter target="50%" /></div><p className="text-xs font-bold uppercase text-slate-400">Fewer Errors</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-orange-500 mb-2"><Counter target="60%" /></div><p className="text-xs font-bold uppercase text-slate-400">Cost Savings</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-purple-500 mb-2"><Counter target="60%" /></div><p className="text-xs font-bold uppercase text-slate-400">Qualified Leads</p></div>
            </StaggerReveal>
            <StaggerReveal staggerDelay={100} direction="up">
              <div className="group"><div className="text-4xl font-bold text-pink-500 mb-2"><Counter target="10X" /></div><p className="text-xs font-bold uppercase text-slate-400">Sales Velocity</p></div>
            </StaggerReveal>
          </div>
        </div>
      </section>
      
      {/* 3. CUSTOMER STORIES */}
      <IndustrialUseCases />

      {/* INDUSTRIES SECTION */}
      <section id="industries" className="py-10 bg-slate-50 border-y border-slate-100 relative z-10">

        {/* 4. WHAT POWERS EVERY CALL (Features) */}
         {/* <section id="features" className="py-24 ">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What Powers Every Call
            </h2>
            <p className="text-slate-500">The technology stack behind the voice.</p>
          </div>

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
      </section> */}


        {/* 5. INDUSTRIES (Service Tabs) */}
  

     
      </section>

      {/* USE CASES TABS */ }


      {/* NEW: LAUNCH PROCESS SECTION */}
      <section className="py-3  bg-slate-50 z-10 relative">
    <HowItsWork/>
      </section>

      {/* NEW: WHAT HAPPENS AFTER THE CALL */}
      <section id="workflow" className="py-16 sm:py-24 bg-gray-100 z-10 relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

            {/* Heading Area - Centered */}
            <div className="text-center mb-12 sm:mb-16">
                <ScrollReveal direction="up" delay={100}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2">
                        <ScrollTextReveal
                            text="What Happens After the Call Ends?"
                            splitBy="word"
                            className="block"
                        />
                    </h2>
                </ScrollReveal>

            
            </div>

            {/* Cards Grid: grid-cols-2 for mobile, lg:grid-cols-3 for desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: <Database className="w-5 h-5 text-blue-600" />, title: "Automated CRM Updates", desc: "Every detail—budget, timeline, objections—is extracted and logged instantly.", color: "bg-blue-50" },
                  { icon: <Calendar className="w-5 h-5 text-green-600" />, title: "Instant Follow-ups", desc: "AI sets reminders, books callbacks, and sends messages based on next steps.", color: "bg-green-50" },
                  { icon: <Zap className="w-5 h-5 text-orange-600" />, title: "Lead Scoring", desc: "Leads are scored automatically based on intent signals for focused effort.", color: "bg-orange-50" },
                  { icon: <HeartPulse className="w-5 h-5 text-purple-600" />, title: "Sentiment Analysis", desc: "Identify frustration or delight to understand customer feelings instantly.", color: "bg-purple-50" },
                  { icon: <FileText className="w-5 h-5 text-pink-600" />, title: "AI Call Summary", desc: "A concise, accurate summary including key decisions and action items.", color: "bg-pink-50" },
                  { icon: <Layout className="w-5 h-5 text-cyan-600" />, title: "Trigger Workflows", desc: "Fire webhooks to trigger downstream actions in Zapier, Slack, or internal tools.", color: "bg-cyan-50" },
                ].map((item, i) => (
                    // Card Styling: Smaller padding, smaller text, and hover effect
                    <div
                        key={i}
                        className="p-4 sm:p-6 rounded-2xl bg-white shadow-xl min-h-[220px] // Min-height added for consistent row size
                            transition-all duration-300 transform
                            hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-300
                            border border-transparent"
                    >
                        <div className="flex flex-col h-full">
                            {/* Icon Container: Slightly smaller for mobile */}
                            <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                                {item.icon}
                            </div>

                            {/* Title: Smaller font size for mobile */}
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                                {item.title}
                            </h4>

                            {/* Description: Smallest font size for mobile */}
                            <p className="text-xs sm:text-sm text-slate-500 leading-snug flex-grow">
                                {item.desc}
                            </p>

                            {/* Placeholder Line */}
                            <div className="mt-3 h-1 w-1/3 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

<section
  id="Dashboard"
  className="relative z-10 bg-slate-50 hidden md:block"
>
  <AnimatedFeatureDashboard />
</section>

{/* CALCULATOR */ }
                            <section id="calculator" className="py-6 bg-slate-50 border-y border-slate-100 relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-5 bg-noise"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-10">
                {/* <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">ROI Engine</span> */}
                <ScrollReveal direction="up" delay={100}>
                    <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
                        <ScrollTextReveal
                            text="See How Much You'll Save"
                            splitBy="word"
                            className="block"
                        />
                    </h2>
                </ScrollReveal>
                {/* <p className="text-slate-500">Stop overpaying for manual calls.</p> */}
            </div>
            <SavingsCalculator />
        </div>
      </section>

              <section className="py-24 bg-white border-y border-slate-100 z-10 relative overflow-hidden">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30"></div>
          {[
            { left: 10, top: 20, delay: 0.5, duration: 4 },
            { left: 30, top: 40, delay: 1.2, duration: 3.5 },
            { left: 50, top: 60, delay: 0.8, duration: 4.2 },
            { left: 70, top: 30, delay: 1.5, duration: 3.8 },
            { left: 20, top: 70, delay: 0.3, duration: 4.5 },
            { left: 80, top: 50, delay: 1.8, duration: 3.2 },
            { left: 40, top: 10, delay: 0.9, duration: 4.1 },
            { left: 60, top: 80, delay: 1.1, duration: 3.9 },
            { left: 15, top: 35, delay: 2.0, duration: 4.3 },
            { left: 85, top: 65, delay: 0.6, duration: 3.7 },
            { left: 55, top: 25, delay: 1.4, duration: 4.0 },
            { left: 25, top: 55, delay: 0.7, duration: 3.6 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute animate-pulse opacity-20"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`,
                animationDuration: `${pos.duration}s`,
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400/40 to-purple-400/40 rounded-full blur-sm flex items-center justify-center backdrop-blur-sm border border-white/20">
                <div className="w-4 h-4 bg-gradient-to-br from-pink-400/50 to-indigo-400/50 rounded-full"></div>
              </div>
            </div>
          ))}
          {[
            { left: 15, top: 25, rotate: 45 },
            { left: 35, top: 55, rotate: 135 },
            { left: 55, top: 35, rotate: 225 },
            { left: 75, top: 65, rotate: 315 },
            { left: 25, top: 45, rotate: 90 },
            { left: 45, top: 75, rotate: 180 },
            { left: 65, top: 15, rotate: 270 },
            { left: 85, top: 85, rotate: 0 },
          ].map((line, i) => (
            <div
              key={`line-${i}`}
              className="absolute opacity-10"
              style={{
                left: `${line.left}%`,
                top: `${line.top}%`,
                transform: `rotate(${line.rotate}deg)`,
              }}
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent"></div>
            </div>
          ))}
          {/* Floating Theme Icons - Center */}
          {[
            { icon: <Bot className="w-6 h-6 text-indigo-500/60" />, left: 30, top: 40, delay: 0 },
            { icon: <Phone className="w-6 h-6 text-purple-500/60" />, left: 50, top: 30, delay: 1 },
            { icon: <Bot className="w-6 h-6 text-pink-500/60" />, left: 40, top: 60, delay: 2 },
            { icon: <Mic className="w-6 h-6 text-indigo-600/60" />, left: 60, top: 50, delay: 3 },
            { icon: <Sparkles className="w-6 h-6 text-purple-600/60" />, left: 35, top: 45, delay: 4 },
            { icon: <Headphones className="w-6 h-6 text-pink-600/60" />, left: 55, top: 35, delay: 5 },
          ].map((item, i) => (
            <div
              key={`theme-center-${i}`}
              className="absolute opacity-30 animate-bounce"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${item.delay * 0.5}s`,
                animationDuration: `${2 + (i % 2) * 0.5}s`,
              }}
            >
              <div className="w-12 h-12 bg-white/40 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-white/30">
                {item.icon}
              </div>
            </div>
          ))}
          {/* Floating Theme Icons - Left Side */}
          {[
            { icon: <Bot className="w-5 h-5 text-indigo-400/50" />, left: 5, top: 30, delay: 0 },
            { icon: <Phone className="w-5 h-5 text-purple-400/50" />, left: 10, top: 60, delay: 1 },
            { icon: <Sparkles className="w-5 h-5 text-pink-400/50" />, left: 8, top: 45, delay: 2 },
            { icon: <Mic className="w-5 h-5 text-indigo-500/50" />, left: 12, top: 70, delay: 3 },
          ].map((item, i) => (
            <div
              key={`theme-left-${i}`}
              className="absolute opacity-25 animate-pulse"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${item.delay * 0.7}s`,
                animationDuration: `${3 + (i % 2) * 1}s`,
              }}
            >
              <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-white/20">
                {item.icon}
              </div>
            </div>
          ))}
          {/* Floating Theme Icons - Right Side */}
          {[
            { icon: <Bot className="w-5 h-5 text-purple-400/50" />, left: 88, top: 25, delay: 0 },
            { icon: <Headphones className="w-5 h-5 text-pink-400/50" />, left: 90, top: 55, delay: 1 },
            { icon: <Sparkles className="w-5 h-5 text-indigo-500/50" />, left: 85, top: 40, delay: 2 },
            { icon: <Phone className="w-5 h-5 text-purple-500/50" />, left: 92, top: 75, delay: 3 },
          ].map((item, i) => (
            <div
              key={`theme-right-${i}`}
              className="absolute opacity-25 animate-pulse"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${item.delay * 0.7}s`,
                animationDuration: `${3 + (i % 2) * 1}s`,
              }}
            >
              <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-white/20">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl font-bold text-slate-900 mb-12">
                <ScrollTextReveal
                  text="Connects With Your Favorite Tools"
                  splitBy="word"
                  className="block"
                />
              </h2>
            </ScrollReveal>
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

  {/* CALCULATOR */ }


      {/* CALCULATOR */}


          {/* INSIGHTS */}
      {/* <section className="py-24 bg-white border-y border-slate-100 z-10 relative">
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


{/* <TestCom/> */}
 
  {/* FAQ SECTION */ }

  <section className="py-24 bg-slate-50 border-y border-slate-100 relative z-10">
    <div className="container mx-auto px-6 max-w-4xl">
      <ScrollReveal direction="up" delay={100}>
        <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
          <ScrollTextReveal
            text="Frequently Asked Questions"
            splitBy="word"
            className="block"
          />
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




  {/* ASK AI */ }
 {/* ASK AI - Updated UI to match image */}
<section className="py-12 md:py-32 bg-white relative z-10 border-t border-slate-200 overflow-hidden">
  {/* Floating Icons Background */}
  <div className="absolute inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-purple-50/15 to-pink-50/20"></div>
    {[
      { left: 15, top: 25, delay: 0.5, duration: 4 },
      { left: 35, top: 45, delay: 1.2, duration: 3.5 },
      { left: 55, top: 65, delay: 0.8, duration: 4.2 },
      { left: 75, top: 35, delay: 1.5, duration: 3.8 },
      { left: 25, top: 75, delay: 0.3, duration: 4.5 },
      { left: 85, top: 55, delay: 1.8, duration: 3.2 },
      { left: 45, top: 15, delay: 0.9, duration: 4.1 },
      { left: 65, top: 85, delay: 1.1, duration: 3.9 },
    ].map((pos, i) => (
      <div
        key={i}
        className="absolute animate-pulse opacity-15"
        style={{
          left: `${pos.left}%`,
          top: `${pos.top}%`,
          animationDelay: `${pos.delay}s`,
          animationDuration: `${pos.duration}s`,
        }}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-sm flex items-center justify-center backdrop-blur-sm border border-white/20">
          <div className="w-3 h-3 bg-gradient-to-br from-pink-400/40 to-indigo-400/40 rounded-full"></div>
        </div>
      </div>
    ))}
    {/* Floating Theme Icons */}
    {[
      { icon: <Bot className="w-4 h-4 text-indigo-500/50" />, left: 20, top: 30, delay: 0 },
      { icon: <Phone className="w-4 h-4 text-purple-500/50" />, left: 40, top: 50, delay: 1 },
      { icon: <Sparkles className="w-4 h-4 text-pink-500/50" />, left: 60, top: 40, delay: 2 },
      { icon: <Mic className="w-4 h-4 text-indigo-600/50" />, left: 80, top: 60, delay: 3 },
    ].map((item, i) => (
      <div
        key={`ask-${i}`}
        className="absolute opacity-20 animate-bounce"
        style={{
          left: `${item.left}%`,
          top: `${item.top}%`,
          animationDelay: `${item.delay * 0.5}s`,
          animationDuration: `${2 + (i % 2) * 0.5}s`,
        }}
      >
        <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-white/20">
          {item.icon}
        </div>
      </div>
    ))}
  </div>
  <div className="container mx-auto px-6 max-w-7xl relative z-10">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
      
      {/* Left Text Content */}
      <div className="lg:w-1/2 lg:pr-12 text-left">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            <ScrollTextReveal
              text="Still not sure if Callers is right for you?"
              splitBy="word"
              className="block"
            />
          </h2>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200}>
          <p className="text-xl text-slate-700 max-w-md">
            Let ChatGPT, Claude, or Perplexity do the thinking for you. Click a button and see what your favorite AI says about Callers.
          </p>
        </ScrollReveal>
      </div>

      {/* Right Button Group */}
      <div className="lg:w-1/2 flex flex-col items-start lg:items-end space-y-4">
        
        {/* Ask ChatGPT Button - Blue */}
        <ScrollReveal direction="up" delay={300}>
          <a
            href="#"
            className="w-full md:w-96 bg-[#4129F9] hover:bg-[#3520D0] text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 013.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 01-2.292-2.292L14.25 6l1.035-.259a3.375 3.375 0 012.292-2.292L18 2.25l.259 1.035a3.375 3.375 0 012.292 2.292L21.75 6l-1.035.259a3.375 3.375 0 01-2.292 2.292z" />
            </svg>
            Ask ChatGPT
          </a>
        </ScrollReveal>

        {/* Ask Claude Button - Black */}
        <ScrollReveal direction="up" delay={400}>
          <a
            href="#"
            className="w-full md:w-96 bg-slate-900 hover:bg-slate-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-100"
          >
            {/* Using a generic bot icon for Claude and Perplexity since the image shows similar icons */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 013.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 01-2.292-2.292L14.25 6l1.035-.259a3.375 3.375 0 012.292-2.292L18 2.25l.259 1.035a3.375 3.375 0 012.292 2.292L21.75 6l-1.035.259a3.375 3.375 0 01-2.292 2.292z" />
            </svg>
            Ask Claude
          </a>
        </ScrollReveal>

        {/* Ask Perplexity Button - Black */}
        <ScrollReveal direction="up" delay={500}>
          <a
            href="#"
            className="w-full md:w-96 bg-slate-900 hover:bg-slate-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 013.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 01-2.292-2.292L14.25 6l1.035-.259a3.375 3.375 0 012.292-2.292L18 2.25l.259 1.035a3.375 3.375 0 012.292 2.292L21.75 6l-1.035.259a3.375 3.375 0 01-2.292 2.292z" />
            </svg>
            Ask Perplexity
          </a>
        </ScrollReveal>
      </div>

    </div>
  </div>
</section>
             {/* FINAL CTA */ }
{/* FINAL CTA */}
{/* FINAL CTA */}
<section className="py-24 bg-slate-50 border-t border-slate-200 z-10 relative overflow-hidden">
  {/* Floating Icons Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-purple-50/15 to-pink-50/20"></div>
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-pulse opacity-15"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-sm flex items-center justify-center backdrop-blur-sm border border-white/20">
          <div className="w-3 h-3 bg-gradient-to-br from-pink-400/40 to-indigo-400/40 rounded-full"></div>
        </div>
      </div>
    ))}
    {/* Floating Theme Icons */}
    {[
      { icon: <Bot className="w-4 h-4 text-indigo-500/50" />, delay: 0 },
      { icon: <Phone className="w-4 h-4 text-purple-500/50" />, delay: 1 },
      { icon: <Sparkles className="w-4 h-4 text-pink-500/50" />, delay: 2 },
      { icon: <Mic className="w-4 h-4 text-indigo-600/50" />, delay: 3 },
      { icon: <Headphones className="w-4 h-4 text-purple-600/50" />, delay: 4 },
      { icon: <Zap className="w-4 h-4 text-pink-600/50" />, delay: 5 },
      { icon: <MessageSquare className="w-4 h-4 text-indigo-400/50" />, delay: 6 },
      { icon: <User className="w-4 h-4 text-purple-400/50" />, delay: 7 },
    ].map((item, i) => (
      <div
        key={`cta-${i}`}
        className="absolute opacity-20 animate-bounce"
        style={{
          left: `${5 + Math.random() * 90}%`,
          top: `${5 + Math.random() * 90}%`,
          animationDelay: `${item.delay * 0.3}s`,
          animationDuration: `${2 + Math.random() * 1}s`,
        }}
      >
        <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-white/20">
          {item.icon}
        </div>
      </div>
    ))}
  </div>
  <div className="container mx-auto px-6 flex justify-center bg-noise relative z-10">
    <div className="bg-white p-6 sm:p-8 rounded-[40px] shadow-lg border border-slate-100 max-w-lg w-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-900">C'mon, Make That Call!</h3>
        <p className="text-slate-500 text-sm">Try Callers – Meet Paul / Cassie</p>
      </div>

      {/* Agent Selection */}
      <div className="flex gap-4 mb-6">
        <div
          className={`flex-1 relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer group transition-all duration-300 ${
            selectedAgent === 'female' ? 'ring-4 ring-indigo-600 shadow-lg transform scale-105' : 'ring-2 ring-slate-200'
          }`}
          onClick={() => setSelectedAgent('female')}
        >
          {selectedAgent === 'female' && (
            <div className="absolute top-3 left-3 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md z-10">
              <i className="fas fa-check"></i>
            </div>
          )}
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
            alt="Cassie"
            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 transition-all duration-300"
          />
          <div className="absolute bottom-6    w-full left-3 text-gray-800 font-bold drop-shadow-md">Cassie</div>
          
          <div className="absolute bottom-3 left-3 text-gray-600 text-xs opacity-80">(Female AI Agent)</div>
        </div>
        <div
          className={`flex-1 relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer group transition-all duration-300 ${
            selectedAgent === 'male' ? 'ring-4 ring-indigo-600 shadow-lg transform scale-105' : 'ring-2 ring-slate-200'
          }`}
          onClick={() => setSelectedAgent('male')}
        >
          {selectedAgent === 'male' && (
            <div className="absolute top-3 left-3 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md z-10">
              <i className="fas fa-check"></i>
            </div>
          )}
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

      {/* --- WOW Use Case Selection (Updated UI) --- */}
      <div className="mb-6">
        {/* Label */}
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Select Use Case
        </label>

        {/* Select Dropdown */}
        <select
          value={selectedUseCase}
          onChange={(e) => setSelectedUseCase(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
        >
          {['Sales', 'Appointment Booking', 'Recovery', 'Support', 'General'].map((useCase) => (
            <option key={useCase} value={useCase}>• {useCase}</option>
          ))}
        </select>
      </div>
      {/* ------------------------------------------- */}

      {/* Phone Number Input */}
      <div className="flex items-center border border-slate-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 mb-4 bg-slate-50 shadow-inner">
        {/* Country Code Dropdown */}
        <div className="flex items-center gap-2 border-r border-slate-300 pr-2 sm:pr-3 mr-2 sm:mr-3 cursor-pointer" onClick={() => setSelectedCountry(selectedCountry === '+91' ? '+971' : '+91')}>
          {selectedCountry === '+91' ? <FlagIcons.IN style={{width: '20px', height: '15px'}} /> : <FlagIcons.AE style={{width: '20px', height: '15px'}} />}
          <span className="text-slate-800 font-bold text-sm">{selectedCountry}</span>
          <i className="fas fa-chevron-down text-[10px] text-slate-400"></i>
        </div>
        <span className="text-slate-600 font-medium text-sm mr-2">{selectedUseCase}:</span>
        <input
          type="tel"
          placeholder="Enter your number"
          className="bg-transparent w-full outline-none text-slate-900 font-bold placeholder-slate-400 text-base sm:text-lg"
        />
      </div>

      {/* CTA Button */}
      <button className="w-full bg-cyan-600 hover:bg-indigo-700 text-white font-bold py-3 sm:py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 text-base sm:text-lg">
        <i className="fas fa-phone-volume"></i> Receive AI Call
      </button>
    </div>
  </div>
</section>

       <Footer />
</main >
  );
}