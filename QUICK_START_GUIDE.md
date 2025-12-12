# Xeny AI UI - Quick Start Guide

This guide will help you quickly implement the Xeny AI UI specification.

## 🚀 Getting Started

### 1. Install Dependencies

All required dependencies are already in your `package.json`. Key packages:
- `three` - 3D graphics
- `framer-motion` - Additional animations (optional, for complex animations)
- `next` - Framework
- `tailwindcss` - Styling

### 2. Component Structure

The specification includes these key components:

#### Core Hooks (Already Created)
- ✅ `hooks/useIntersectionObserver.ts` - Intersection Observer wrapper
- ✅ `hooks/useScrollProgress.ts` - Scroll progress tracking

#### Animation Components (Already Created)
- ✅ `components/animations/ScrollReveal.tsx` - Scroll-triggered reveal
- ✅ `components/animations/TextReveal.tsx` - Text reveal animation

#### Three.js Components (Already Created)
- ✅ `components/three/ParticleBackground.tsx` - Particle system background

#### Components to Create
- `components/three/XenyLogo3D.tsx` - 3D Xeny logo
- `components/three/VoiceWaveform.tsx` - Voice waveform visualization
- `components/three/InteractiveGlobe.tsx` - Interactive 3D globe
- `components/sections/HeroSection.tsx` - Hero section
- `components/sections/VoiceAgentsSection.tsx` - Voice agents section
- `components/sections/GlobalCoverageSection.tsx` - Global coverage section
- `components/sections/CallRecordingSection.tsx` - Call recording section
- `components/sections/DashboardSection.tsx` - Dashboard section

## 📝 Implementation Steps

### Step 1: Update Your Main Page

Replace or enhance your `app/page.tsx` with sections using the new components:

```typescript
import ParticleBackground from '@/components/three/ParticleBackground';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';

export default function HomePage() {
  return (
    <main>
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center">
        <ScrollReveal direction="up">
          <h1 className="text-7xl font-bold">
            <TextReveal text="Xeny AI" splitBy="char" className="text-gradient-xeny" />
          </h1>
        </ScrollReveal>
      </section>
      
      {/* Add other sections */}
    </main>
  );
}
```

### Step 2: Use Scroll Animations

Wrap any content you want to animate on scroll:

```typescript
<ScrollReveal direction="up" delay={200}>
  <div>Your content here</div>
</ScrollReveal>
```

### Step 3: Add Text Reveals

Use TextReveal for animated text:

```typescript
<TextReveal 
  text="Your text here" 
  splitBy="word" // or "char"
  delay={50}
/>
```

### Step 4: Integrate Particle Background

Add the particle background to any section:

```typescript
<ParticleBackground 
  particleCount={2000}
  speed={0.5}
  color1="#3B82F6"
  color2="#D100FF"
/>
```

## 🎨 Using Custom Tailwind Classes

The specification includes custom utility classes:

### Gradient Text
```html
<h1 className="text-gradient-xeny">Xeny AI</h1>
<h2 className="text-gradient-voice">Voice Agents</h2>
```

### Glow Effects
```html
<div className="glow-blue">Blue glow</div>
<div className="glow-purple">Purple glow</div>
<div className="glow-pink">Pink glow</div>
```

### Animated Gradient Background
```html
<div className="bg-gradient-xeny-animated">Animated gradient</div>
```

## 🔧 Customization

### Adjust Particle Count for Performance

For mobile devices, reduce particle count:

```typescript
const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 
  ? 1000 
  : 2000;
```

### Customize Animation Timing

Adjust delays and durations in components:

```typescript
<ScrollReveal delay={300} distance={100}>
  {/* Content */}
</ScrollReveal>
```

## 📱 Responsive Considerations

1. **Reduce 3D complexity on mobile** - Lower particle counts, simpler geometries
2. **Use CSS transforms** - Prefer CSS over JavaScript for simple animations
3. **Lazy load Three.js** - Use dynamic imports for 3D components
4. **Test on real devices** - Performance can vary significantly

## 🐛 Troubleshooting

### Three.js not rendering
- Ensure components are client-side only (`'use client'`)
- Check browser console for WebGL errors
- Verify Three.js is properly imported

### Animations not triggering
- Check Intersection Observer support
- Verify elements have proper height/visibility
- Check threshold values in hooks

### Performance issues
- Reduce particle count
- Lower pixel ratio on mobile
- Use `will-change` sparingly
- Profile with Chrome DevTools

## 📚 Next Steps

1. Review the full specification in `XENY_UI_SPECIFICATION.md`
2. Implement remaining Three.js components
3. Create section components
4. Test on multiple devices
5. Optimize performance
6. Add accessibility features

## 🆘 Need Help?

Refer to:
- Full specification: `XENY_UI_SPECIFICATION.md`
- Three.js docs: https://threejs.org/docs/
- Tailwind CSS docs: https://tailwindcss.com/docs
- Next.js docs: https://nextjs.org/docs

