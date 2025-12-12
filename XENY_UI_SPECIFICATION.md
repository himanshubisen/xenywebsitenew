# Xeny AI - Complete UI Technical Specification

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [Tailwind CSS Configuration](#tailwind-css-configuration)
4. [Three.js & Particle System Integration](#threejs--particle-system-integration)
5. [Scroll Animation System](#scroll-animation-system)
6. [Section-by-Section Implementation](#section-by-section-implementation)
7. [Performance Optimization](#performance-optimization)
8. [Responsive Design Strategy](#responsive-design-strategy)

---

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS 4.x (Utility-first)
- **3D Graphics**: Three.js (r182+)
- **Animation**: Native Intersection Observer API + Custom Scroll Listener
- **Type Safety**: TypeScript 5.x

### Core Principles
1. **Performance First**: 60fps animations, lazy loading, code splitting
2. **Responsive Design**: Mobile-first approach with breakpoint optimization
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Progressive Enhancement**: Graceful degradation for older browsers

---

## 📁 Component Structure

```
app/
├── page.tsx                          # Main landing page
├── layout.tsx                        # Root layout with providers
├── globals.css                       # Global styles & Tailwind config
│
components/
├── sections/
│   ├── HeroSection.tsx              # Hero with 3D logo & particle BG
│   ├── VoiceAgentsSection.tsx       # AI Voice Agents visualization
│   ├── GlobalCoverageSection.tsx    # Interactive 3D globe
│   ├── CallRecordingSection.tsx     # Call recording animation
│   ├── DashboardSection.tsx         # Real-time metrics visualization
│   └── ServiceNarrativeSection.tsx  # Scroll-driven storytelling
│
├── animations/
│   ├── ScrollReveal.tsx             # Intersection Observer wrapper
│   ├── TextReveal.tsx               # Split-text reveal animation
│   ├── TypingEffect.tsx             # Typewriter effect
│   └── ParallaxContainer.tsx        # Parallax scroll container
│
├── three/
│   ├── ParticleBackground.tsx       # Three.js particle system
│   ├── XenyLogo3D.tsx               # 3D Xeny logo component
│   ├── VoiceWaveform.tsx            # 3D voice waveform visualization
│   ├── InteractiveGlobe.tsx         # Low-poly 3D globe with nodes
│   └── DataVisualization.tsx        # Animated data points/charts
│
├── ui/
│   ├── Button.tsx                   # Enhanced button component
│   ├── Card.tsx                     # Animated card component
│   └── GradientText.tsx             # Gradient text utility
│
└── hooks/
    ├── useScrollProgress.ts         # Scroll progress tracking
    ├── useIntersectionObserver.ts   # Intersection Observer hook
    ├── useParallax.ts               # Parallax effect hook
    └── useThreeScene.ts             # Three.js scene management
```

---

## 🎨 Tailwind CSS Configuration

### Custom Color Palette (Add to `globals.css`)

```css
@theme inline {
  /* Xeny Brand Colors */
  --color-xeny-primary: #4F46E5;        /* Indigo-600 */
  --color-xeny-secondary: #EC4899;      /* Pink-500 */
  --color-xeny-accent: #8B5CF6;         /* Purple-500 */
  --color-xeny-cyan: #06B6D4;           /* Cyan-500 */
  --color-xeny-gradient-start: #3B82F6; /* Blue-500 */
  --color-xeny-gradient-end: #D100FF;   /* Magenta */
  
  /* Gradient Combinations */
  --gradient-xeny-primary: linear-gradient(135deg, #4F46E5 0%, #EC4899 50%, #8B5CF6 100%);
  --gradient-xeny-voice: linear-gradient(90deg, #3B82F6 0%, #D100FF 100%);
  --gradient-xeny-ai: linear-gradient(135deg, #06B6D4 0%, #4F46E5 50%, #EC4899 100%);
  
  /* Particle Colors */
  --particle-color-1: rgba(59, 130, 246, 0.8);   /* Blue */
  --particle-color-2: rgba(209, 0, 255, 0.8);    /* Magenta */
  --particle-color-3: rgba(79, 70, 229, 0.6);    /* Indigo */
  --particle-color-4: rgba(236, 72, 153, 0.6);   /* Pink */
  
  /* Background Gradients */
  --bg-gradient-ai: linear-gradient(180deg, 
    rgba(15, 23, 42, 0.95) 0%, 
    rgba(30, 41, 59, 0.98) 50%, 
    rgba(15, 23, 42, 1) 100%);
  
  /* Glow Effects */
  --glow-xeny-blue: 0 0 20px rgba(59, 130, 246, 0.5), 
                    0 0 40px rgba(59, 130, 246, 0.3);
  --glow-xeny-purple: 0 0 30px rgba(139, 92, 246, 0.6), 
                      0 0 60px rgba(139, 92, 246, 0.4);
  --glow-xeny-pink: 0 0 25px rgba(236, 72, 153, 0.5), 
                    0 0 50px rgba(236, 72, 153, 0.3);
}

/* Custom Utility Classes */
@layer utilities {
  /* Gradient Text */
  .text-gradient-xeny {
    @apply bg-clip-text text-transparent;
    background-image: var(--gradient-xeny-primary);
  }
  
  .text-gradient-voice {
    @apply bg-clip-text text-transparent;
    background-image: var(--gradient-xeny-voice);
  }
  
  /* Glow Effects */
  .glow-blue {
    box-shadow: var(--glow-xeny-blue);
  }
  
  .glow-purple {
    box-shadow: var(--glow-xeny-purple);
  }
  
  .glow-pink {
    box-shadow: var(--glow-xeny-pink);
  }
  
  /* Animated Gradient Background */
  .bg-gradient-xeny-animated {
    background: var(--gradient-xeny-primary);
    background-size: 200% 200%;
    animation: gradient-shift 8s ease infinite;
  }
  
  /* Scroll Reveal Base */
  .scroll-reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Split Text Animation */
  .split-text-word {
    display: inline-block;
    overflow: hidden;
  }
  
  .split-text-char {
    display: inline-block;
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .split-text-char.revealed {
    transform: translateY(0);
  }
}
```

### Custom Animations

```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes particle-float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-30px) translateX(15px) scale(1.2);
    opacity: 1;
  }
}

@keyframes text-reveal {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  0%, 50% { border-color: transparent; }
  51%, 100% { border-color: currentColor; }
}
```

---

## 🎭 Three.js & Particle System Integration

### Core Particle Background Component

```typescript
// components/three/ParticleBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  particleCount?: number;
  speed?: number;
  color1?: string;
  color2?: string;
}

export default function ParticleBackground({
  particleCount = 2000,
  speed = 0.5,
  color1 = '#3B82F6',
  color2 = '#D100FF'
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = particleCount;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    // Color conversion helper
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : { r: 0.23, g: 0.51, b: 0.96 };
    };

    const color1Rgb = hexToRgb(color1);
    const color2Rgb = hexToRgb(color2);

    // Initialize particle positions and colors
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;     // x
      posArray[i + 1] = (Math.random() - 0.5) * 20; // y
      posArray[i + 2] = (Math.random() - 0.5) * 20; // z

      // Interpolate colors
      const t = Math.random();
      colorArray[i] = color1Rgb.r * (1 - t) + color2Rgb.r * t;     // r
      colorArray[i + 1] = color1Rgb.g * (1 - t) + color2Rgb.g * t; // g
      colorArray[i + 2] = color1Rgb.b * (1 - t) + color2Rgb.b * t; // b
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * speed * 0.1;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;

      // Animate individual particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.001;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, speed, color1, color2]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
```

### 3D Xeny Logo Component

```typescript
// components/three/XenyLogo3D.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

interface XenyLogo3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function XenyLogo3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: XenyLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const size = 400;
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);

    // Create 3D Text "Xeny"
    const loader = new FontLoader();
    // Note: You'll need to load a font file (e.g., via Google Fonts or local file)
    // For now, using a canvas-based approach similar to your existing code
    
    const textCanvas = document.createElement('canvas');
    const ctx = textCanvas.getContext('2d');
    if (ctx) {
      textCanvas.width = 1024;
      textCanvas.height = 512;
      ctx.clearRect(0, 0, 1024, 512);
      ctx.font = 'bold 200px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#4F46E5';
      ctx.shadowBlur = 40;
      ctx.fillText('Xeny', 512, 256);
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
    textMesh.position.set(...position);
    textMesh.rotation.set(...rotation);
    textMesh.scale.set(scale, scale, scale);
    scene.add(textMesh);

    // Add glowing orb behind text
    const orbGeometry = new THREE.IcosahedronGeometry(2.5, 2);
    const orbMaterial = new THREE.MeshStandardMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      color: '#4F46E5',
      emissive: '#4F46E5',
      emissiveIntensity: 0.5
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x4F46E5, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      
      orb.rotation.y += 0.002;
      orb.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      textMesh.position.y = position[1] + Math.sin(time) * 0.1;
      textMesh.rotation.y = rotation[1] + Math.sin(time * 0.5) * 0.15;
      textMesh.lookAt(camera.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      texture.dispose();
      textGeometry.dispose();
      textMaterial.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
    };
  }, [position, rotation, scale]);

  return <div ref={containerRef} className="w-full h-full" />;
}
```

---

## 📜 Scroll Animation System

### Intersection Observer Hook

```typescript
// hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean, number] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false
  } = options;

  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isCurrentlyIntersecting = entry.isIntersecting;
        const ratio = entry.intersectionRatio;

        setIsIntersecting(isCurrentlyIntersecting);
        setIntersectionRatio(ratio);

        if (triggerOnce && isCurrentlyIntersecting) {
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return [elementRef, isIntersecting, intersectionRatio];
}
```

### Scroll Progress Hook

```typescript
// hooks/useScrollProgress.ts
import { useEffect, useState } from 'react';

export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const progress = scrollTop / (documentHeight - windowHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}
```

### Scroll Reveal Component

```typescript
// components/animations/ScrollReveal.tsx
'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 50,
  className = ''
}: ScrollRevealProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const directionMap = {
    up: 'translateY',
    down: 'translateY',
    left: 'translateX',
    right: 'translateX'
  };

  const directionValue = {
    up: distance,
    down: -distance,
    left: distance,
    right: -distance
  };

  const transform = isVisible
    ? 'translate(0, 0)'
    : `${directionMap[direction]}(${directionValue[direction]}px)`;

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform,
        transitionDelay: `${delay}ms`,
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
}
```

### Text Reveal Animation

```typescript
// components/animations/TextReveal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: 'word' | 'char';
}

export default function TextReveal({
  text,
  className = '',
  delay = 50,
  splitBy = 'word'
}: TextRevealProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setRevealed(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  const splitText = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <div ref={ref} className={className}>
      {splitText.map((item, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          style={{
            transitionDelay: `${index * (delay / splitText.length)}ms`
          }}
        >
          <span
            className={`inline-block transition-transform duration-500 ease-out ${
              revealed ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {item}
            {splitBy === 'word' && ' '}
          </span>
        </span>
      ))}
    </div>
  );
}
```

### Scroll-Driven Storytelling Component

```typescript
// components/animations/ScrollStorytelling.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollStorytellingProps {
  children: ReactNode;
  scrollStart?: number; // Percentage of viewport where animation starts
  scrollEnd?: number;   // Percentage of viewport where animation ends
}

export default function ScrollStorytelling({
  children,
  scrollStart = 0,
  scrollEnd = 100
}: ScrollStorytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate progress based on element position in viewport
      const startPoint = windowHeight * (scrollStart / 100);
      const endPoint = windowHeight * (scrollEnd / 100);
      const scrollRange = endPoint - startPoint;
      
      const currentScroll = windowHeight - elementTop;
      const normalizedProgress = Math.min(
        Math.max((currentScroll - startPoint) / scrollRange, 0),
        1
      );

      setProgress(normalizedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollStart, scrollEnd]);

  return (
    <div ref={containerRef} style={{ '--scroll-progress': progress } as React.CSSProperties}>
      {children}
    </div>
  );
}
```

---

## 🎯 Section-by-Section Implementation

### 1. Hero Section with 3D Logo & Particle Background

```typescript
// components/sections/HeroSection.tsx
'use client';

import ParticleBackground from '@/components/three/ParticleBackground';
import XenyLogo3D from '@/components/three/XenyLogo3D';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground 
        particleCount={2000}
        speed={0.5}
        color1="#3B82F6"
        color2="#D100FF"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900" />

      {/* 3D Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <XenyLogo3D 
          position={[0, 0, 0]}
          scale={1.2}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <ScrollReveal direction="up" delay={200}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <TextReveal 
              text="Xeny AI"
              splitBy="char"
              className="text-gradient-xeny"
            />
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            <TextReveal 
              text="Comprehensive AI-powered CRM platform connecting humans to AI through voice"
              splitBy="word"
            />
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={600}>
          <button className="bg-gradient-xeny-voice text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform glow-blue">
            Get Started
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

### 2. AI Voice Agents Section (3D Waveform)

```typescript
// components/three/VoiceWaveform.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function VoiceWaveform() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const size = 600;
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);

    // Create waveform visualization
    const waveformGeometry = new THREE.BufferGeometry();
    const points = 128;
    const positions = new Float32Array(points * 3);

    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10 - 5;
      const y = Math.sin(i * 0.1) * 2;
      const z = 0;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    waveformGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create multiple waveform layers
    const waveforms: THREE.Line[] = [];
    for (let layer = 0; layer < 5; layer++) {
      const material = new THREE.LineBasicMaterial({
        color: layer === 2 ? '#3B82F6' : '#8B5CF6',
        transparent: true,
        opacity: 0.6 - layer * 0.1
      });
      const line = new THREE.Line(waveformGeometry, material);
      line.position.z = layer * 0.5;
      scene.add(line);
      waveforms.push(line);
    }

    // Add microphone/headset icon (simplified as a sphere)
    const micGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const micMaterial = new THREE.MeshStandardMaterial({
      color: '#EC4899',
      emissive: '#EC4899',
      emissiveIntensity: 0.5
    });
    const mic = new THREE.Mesh(micGeometry, micMaterial);
    mic.position.set(-4, 0, 0);
    scene.add(mic);

    // Add AI processing nodes
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const nodeGeometry = new THREE.IcosahedronGeometry(0.2, 1);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: '#4F46E5',
        emissive: '#4F46E5',
        emissiveIntensity: 0.8
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const angle = (i / 8) * Math.PI * 2;
      node.position.set(
        Math.cos(angle) * 3,
        Math.sin(angle) * 3,
        (Math.random() - 0.5) * 2
      );
      scene.add(node);
      nodes.push(node);
    }

    // Connect nodes with lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: '#8B5CF6',
      transparent: true,
      opacity: 0.3
    });
    for (let i = 0; i < nodes.length; i++) {
      const nextNode = nodes[(i + 1) % nodes.length];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        nodes[i].position,
        nextNode.position
      ]);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x4F46E5, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 8;

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Animate waveforms
      waveforms.forEach((waveform, index) => {
        const positions = waveform.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < points; i++) {
          positions[i * 3 + 1] = Math.sin(i * 0.1 + time * 2 + index) * (2 + index * 0.3);
        }
        waveform.geometry.attributes.position.needsUpdate = true;
      });

      // Rotate nodes
      nodes.forEach((node, index) => {
        node.rotation.y += 0.01;
        node.position.y += Math.sin(time + index) * 0.01;
      });

      // Pulse mic
      mic.scale.setScalar(1 + Math.sin(time * 2) * 0.1);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      waveformGeometry.dispose();
      micGeometry.dispose();
      micMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
```

### 3. Global Coverage Section (Interactive 3D Globe)

```typescript
// components/three/InteractiveGlobe.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface GlobeNode {
  lat: number;
  lon: number;
  label: string;
  color: string;
}

const countries: GlobeNode[] = [
  { lat: 20.5937, lon: 78.9629, label: 'India', color: '#3B82F6' },
  { lat: 25.2048, lon: 55.2708, label: 'UAE', color: '#EC4899' },
  { lat: 37.7749, lon: -122.4194, label: 'USA', color: '#8B5CF6' },
  { lat: 51.5074, lon: -0.1278, label: 'UK', color: '#06B6D4' },
  // Add more countries...
];

export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1
  });

  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const size = 800;
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);

    // Create low-poly globe
    const globeGeometry = new THREE.IcosahedronGeometry(3, 2);
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: '#1E293B',
      wireframe: false,
      transparent: true,
      opacity: 0.8
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add country nodes
    const nodes: THREE.Mesh[] = [];
    countries.forEach((country) => {
      // Convert lat/lon to 3D coordinates
      const phi = (90 - country.lat) * (Math.PI / 180);
      const theta = (country.lon + 180) * (Math.PI / 180);
      const radius = 3.2;

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      // Create node
      const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: country.color,
        emissive: country.color,
        emissiveIntensity: 0.8
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);

      // Add connecting line from center
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z)
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: country.color,
        transparent: true,
        opacity: 0.3
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x4F46E5, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 8;

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotate globe
      globe.rotation.y += 0.002;

      // Pulse nodes
      nodes.forEach((node, index) => {
        const scale = 1 + Math.sin(time * 2 + index) * 0.2;
        node.scale.setScalar(scale);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
    };
  }, [isVisible]);

  return <div ref={ref}><div ref={containerRef} className="w-full h-full" /></div>;
}
```

### 4. Call Recording & Analysis Section

```typescript
// components/sections/CallRecordingSection.tsx
'use client';

import { useEffect, useState } from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function CallRecordingSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2
  });
  const [animationPhase, setAnimationPhase] = useState<'recording' | 'transcription' | 'analysis'>('recording');

  useEffect(() => {
    if (!isVisible) return;

    const timer1 = setTimeout(() => setAnimationPhase('transcription'), 2000);
    const timer2 = setTimeout(() => setAnimationPhase('analysis'), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isVisible]);

  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <TextReveal text="Call Recording & Analysis" splitBy="word" />
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Phase 1: Recording */}
          <ScrollReveal direction="up" delay={200}>
            <div className={`p-8 rounded-3xl border-2 transition-all ${
              animationPhase === 'recording' 
                ? 'border-cyan-500 bg-cyan-500/10 glow-blue' 
                : 'border-slate-700'
            }`}>
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Recording</h3>
              <p className="text-slate-400 text-center">
                Every call is automatically recorded with crystal-clear quality
              </p>
            </div>
          </ScrollReveal>

          {/* Phase 2: Transcription */}
          <ScrollReveal direction="up" delay={400}>
            <div className={`p-8 rounded-3xl border-2 transition-all ${
              animationPhase === 'transcription' 
                ? 'border-purple-500 bg-purple-500/10 glow-purple' 
                : 'border-slate-700'
            }`}>
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="text-white text-2xl font-bold animate-pulse">T</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Transcription</h3>
              <p className="text-slate-400 text-center">
                Real-time transcription with 99%+ accuracy in multiple languages
              </p>
            </div>
          </ScrollReveal>

          {/* Phase 3: Analysis */}
          <ScrollReveal direction="up" delay={600}>
            <div className={`p-8 rounded-3xl border-2 transition-all ${
              animationPhase === 'analysis' 
                ? 'border-pink-500 bg-pink-500/10 glow-pink' 
                : 'border-slate-700'
            }`}>
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Analysis</h3>
              <p className="text-slate-400 text-center">
                Sentiment analysis, key insights, and actionable recommendations
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

### 5. Real-time Dashboard Section

```typescript
// components/sections/DashboardSection.tsx
'use client';

import { useEffect, useState } from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const metrics: Metric[] = [
  { label: 'Total Calls', value: 12450, suffix: '', color: 'blue' },
  { label: 'Avg Duration', value: 4.2, suffix: 'm', color: 'purple' },
  { label: 'Success Rate', value: 94.2, suffix: '%', color: 'green' }
];

export default function DashboardSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2
  });
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0));

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    metrics.forEach((metric, index) => {
      let currentStep = 0;
      const increment = metric.value / steps;

      const interval = setInterval(() => {
        currentStep++;
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.min(increment * currentStep, metric.value);
          return newValues;
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    });
  }, [isVisible]);

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900">
            Real-time Dashboards & Performance Metrics
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <ScrollReveal key={metric.label} direction="up" delay={index * 200}>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
                <p className="text-sm font-bold text-slate-400 uppercase mb-4">
                  {metric.label}
                </p>
                <div className={`text-5xl font-bold mb-2 text-${metric.color}-600`}>
                  {animatedValues[index].toFixed(metric.suffix === '%' ? 1 : 0)}
                  {metric.suffix}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                  <div
                    className={`bg-${metric.color}-600 h-2 rounded-full transition-all duration-1000`}
                    style={{
                      width: `${(animatedValues[index] / metric.value) * 100}%`
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## ⚡ Performance Optimization

### 1. Code Splitting
```typescript
// Lazy load Three.js components
const ParticleBackground = dynamic(() => import('@/components/three/ParticleBackground'), {
  ssr: false
});

const XenyLogo3D = dynamic(() => import('@/components/three/XenyLogo3D'), {
  ssr: false
});
```

### 2. Three.js Optimization
- Use `InstancedMesh` for repeated particles
- Implement frustum culling
- Use `requestAnimationFrame` with frame rate limiting
- Dispose of geometries and materials properly

### 3. Scroll Performance
- Use `passive: true` on scroll listeners
- Throttle scroll events (use `requestAnimationFrame`)
- Use `will-change` CSS property sparingly
- Implement virtual scrolling for long lists

### 4. Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/logo/xeny-logo.png"
  alt="Xeny Logo"
  width={102}
  height={102}
  priority // For above-the-fold images
  loading="lazy" // For below-the-fold images
/>
```

---

## 📱 Responsive Design Strategy

### Breakpoints
```css
/* Tailwind default breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large desktop */
```

### Responsive Three.js
```typescript
// Adjust particle count based on device
const particleCount = window.innerWidth < 768 ? 1000 : 2000;

// Reduce quality on mobile
const pixelRatio = window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRatio);
```

### Mobile Optimizations
- Reduce particle count on mobile
- Simplify 3D models
- Use CSS transforms instead of JavaScript where possible
- Implement touch-friendly interactions

---

## 🚀 Implementation Checklist

- [ ] Set up Tailwind CSS with custom theme
- [ ] Create base component structure
- [ ] Implement ParticleBackground component
- [ ] Implement XenyLogo3D component
- [ ] Create Intersection Observer hooks
- [ ] Build ScrollReveal component
- [ ] Build TextReveal component
- [ ] Implement Hero Section
- [ ] Implement Voice Agents Section
- [ ] Implement Global Coverage Section
- [ ] Implement Call Recording Section
- [ ] Implement Dashboard Section
- [ ] Add responsive breakpoints
- [ ] Optimize performance
- [ ] Test on multiple devices
- [ ] Add accessibility features
- [ ] Implement error boundaries
- [ ] Add loading states

---

## 📚 Additional Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: Xeny AI Development Team

