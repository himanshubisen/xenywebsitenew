'use client';

import React, { useState, useEffect } from 'react';
import {
  Workflow,
  Mic,
  Zap,
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";

const LandingPageFlow = () => {
  // Retained for logic/hover effect, even if not tied to a click handler
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Design Flow",
      subtitle: "Min 1",
      description: "Drag & drop setup.",
      fullDesc: "Drag-and-drop builder to create conversation paths.",
      icon: <Workflow className="w-4 h-4 md:w-5 md:h-5" />,
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Select Voice",
      subtitle: "Min 2",
      description: "Neural AI voices.",
      fullDesc: "Choose from neural voices or clone your own.",
      icon: <Mic className="w-4 h-4 md:w-5 md:h-5" />,
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200"
    },
    {
      id: 3,
      title: "Go Live",
      subtitle: "Min 3",
      description: "Instant deploy.",
      fullDesc: "Deploy instantly to your phone lines.",
      icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />,
      color: "bg-violet-600",
      lightColor: "bg-violet-50",
      textColor: "text-violet-600",
      borderColor: "border-violet-200"
    },
    {
      id: 4,
      title: "Scale & Profit",
      subtitle: "Min 10",
      description: "10X Calls, 3X ROI.",
      fullDesc: "Achieve 10X calls with 3X ROI via auto-optimization.",
      icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200"
    }
  ];

  return (
    // NOTE: Removed h-screen to allow content to naturally flow on small screens.
    // Added px-4 for minimal horizontal padding on the whole component.
    <div className="w-full font-sans text-slate-900 overflow-x-hidden flex flex-col selection:bg-blue-100 px-2  mb-12  py-10 pb-4 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-indigo-50/15 to-purple-50/20"></div>
        {[
          { left: 10, top: 30, delay: 0.5, duration: 4 },
          { left: 80, top: 20, delay: 1.2, duration: 3.5 },
          { left: 60, top: 70, delay: 0.8, duration: 4.2 },
          { left: 30, top: 50, delay: 1.5, duration: 3.8 },
          { left: 90, top: 40, delay: 0.3, duration: 4.5 },
          { left: 20, top: 80, delay: 1.8, duration: 3.2 },
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
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-sm flex items-center justify-center backdrop-blur-sm border border-white/20">
              <div className="w-3 h-3 bg-gradient-to-br from-purple-400/40 to-blue-400/40 rounded-full"></div>
            </div>
          </div>
        ))}
        {/* Floating Theme Icons */}
        {[
          { icon: <Workflow className="w-4 h-4 text-blue-500/50" />, left: 15, top: 25, delay: 0 },
          { icon: <Mic className="w-4 h-4 text-indigo-500/50" />, left: 70, top: 60, delay: 1 },
          { icon: <Zap className="w-4 h-4 text-purple-500/50" />, left: 45, top: 35, delay: 2 },
        ].map((item, i) => (
          <div
            key={`flow-${i}`}
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

      {/* 2. Main Content (Flex Grow to fill space) */}
      {/* NOTE: Reduced vertical padding by changing justify-center to pt-12 (or similar) on small screens */}
      <main className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto  py-4  md:pt-10">
        
        {/* Header Section */}
        {/* NOTE: Reduced bottom margin on h1 and top/bottom padding on the entire div. */}
        <div className="text-center flex-none mb-6"> 
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-blue-500"></span>
            </span>
            How it works
          </div>
          {/* NOTE: Reduced text size on mobile (md:text-4xl) and removed mb-2 from base for h1 */}
          <ScrollReveal direction="up" delay={100}>
            <StaggerReveal staggerDelay={100} direction="up">
              <h1 className="text-2xl md:text-4xl  p-1 lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-1">
                Launch Fast. Scale Faster.
              </h1>
            </StaggerReveal>
          </ScrollReveal>
          {/* NOTE: Reduced max-w-md to max-w-sm for mobile. Reduced base text size slightly */}
          <p className="text-slate-500  p-2 py-8  text-sm md:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed">
            From setup to first call in minutes.
          </p>
        </div>

        {/* Steps Grid - Auto Sizing */}
        {/* NOTE: Changed min-h-0 and max-h on mobile to allow the content to dictate its height naturally */}
        <div className="w-full  max-w-5xl flex-1 flex flex-col justify-center relative mt-7 md:mt-8">

          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10 -translate-y-8 mx-12 rounded-full" />

          {/* NOTE: Reduced gap on mobile (gap-3 to gap-2) and removed max-h restrictions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
            {steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  key={step.id}
                  className="relative group min-h-[180px]" // Added min-height for uniformity
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Badge (Desktop) */}
                  <div className={`
                    hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+160px)] w-6 h-6 rounded-full items-center justify-center text-xs font-bold border-2 border-slate-50 z-10 transition-all duration-300
                    ${isActive ? 'bg-slate-900 text-white scale-110 shadow-lg' : 'bg-white text-slate-300 border-slate-100'}
                  `}>
                    {step.id}
                  </div>

                  {/* Card */}
                  <div className={`
                    h-full w-full bg-white rounded-xl md:rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 cursor-pointer
                    ${isActive
                      ? `${step.borderColor} shadow-lg md:shadow-xl shadow-blue-900/5 ring-1 ring-blue-500/10 md:-translate-y-2`
                      : 'border-slate-100 shadow-sm hover:border-slate-200'
                    }
                  `}>

                    {/* Card Content Wrapper */}
                    {/* NOTE: Reduced mobile padding from p-3 to p-2.5 */}
                    <div className="p-2.5 md:p-5 flex flex-col h-full">

                      {/* Top Row */}
                      {/* NOTE: Reduced mobile margin-bottom from mb-2 to mb-1.5 */}
                      <div className="flex justify-between items-start mb-1.5 md:mb-3">
                        <div className={`
                          w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-colors duration-300
                          ${isActive ? step.color + ' text-white' : step.lightColor + ' ' + step.textColor}
                        `}>
                          {step.icon}
                        </div>
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                          {step.subtitle}
                        </span>
                      </div>

                      {/* Text Content */}
                      {/* NOTE: Reduced base text size and margin-bottom for title */}
                      <h3 className={`font-bold text-sm md:text-lg text-slate-900 mb-0.5 transition-colors ${isActive ? 'text-blue-900' : ''}`}>
                        {step.title}
                      </h3>

                      {/* Description Area */}
                      {/* NOTE: Reduced margin-bottom */}
                      <div className="mb-1"> 
                        {/* On Desktop/Large: Show full desc */}
                        <p className="hidden md:block text-sm text-slate-500 leading-snug">
                          {step.fullDesc}
                        </p>
                        {/* On Mobile: Show short desc, OR highlight the stat for step 4 */}
                        {/* NOTE: Reduced text size on mobile from text-[11px] to text-xs (12px) for better legibility */}
                        <p className={`md:hidden text-xs leading-snug ${index === 3 ? 'font-bold text-purple-600' : 'text-slate-500'}`}>
                          {step.description}
                        </p>
                      </div>

                      {/* Dynamic Visual Area (Fills remaining height) */}
                      {/* NOTE: Reduced top padding on mobile */}
                      <div className="mt-auto pt-1.5 md:pt-4 border-t border-slate-50">
                        {index === 0 && (
                          <div className="flex items-center gap-1.5 md:gap-2 opacity-80">
                            <div className={`h-1.5 md:h-2 w-6 md:w-10 rounded-full transition-colors ${isActive ? 'bg-blue-200' : 'bg-slate-100'}`}></div>
                            <div className="h-px flex-1 bg-slate-100"></div>
                            <div className={`h-4 w-6 md:h-6 md:w-10 border rounded shadow-sm transition-colors ${isActive ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}></div>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-indigo-100' : 'bg-slate-50'}`}>
                              <Play className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 ml-0.5 ${isActive ? 'text-indigo-600' : 'text-slate-300'}`} />
                            </div>
                            <div className="flex gap-0.5 items-end h-2 md:h-3 flex-1 opacity-60">
                              {[65, 45, 80, 30, 90, 55, 70, 40].map((height, i) => (
                                <div key={i} className={`w-0.5 rounded-full transition-colors ${isActive ? 'bg-indigo-400' : 'bg-slate-200'}`} style={{ height: `${height}%` }}></div>
                              ))}
                            </div>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className={`w-3 h-3 ${isActive ? 'text-green-500' : 'text-slate-300'}`} />
                              <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full bg-green-500 transition-all duration-1000 ${isActive ? 'w-full' : 'w-0'}`}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        {index === 3 && (
                          <div className="relative w-full">
                            {/* Background Bars */}
                            <div className="flex items-end gap-1 h-5 md:h-8 w-full px-1 opacity-30">
                              {[30, 45, 40, 60, 50, 70].map((h, i) => (
                                <div key={i} className={`flex-1 rounded-t-sm transition-colors ${isActive ? 'bg-purple-300' : 'bg-slate-200'}`} style={{ height: `${h}%` }}></div>
                              ))}
                            </div>
                            {/* Overlay Text */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                              <span className="bg-purple-100 text-purple-700 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm border border-purple-200">
                                3X ROI
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPageFlow;