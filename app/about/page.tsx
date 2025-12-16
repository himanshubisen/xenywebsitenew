// app/about/page.js

"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroCanvas from "@/components/hero-canvas"
// Importing relevant Lucide icons for Core Values
import { Rocket, Eye, HeartHandshake, Users, Map, Globe, CheckCircle, Bot, Phone, Sparkles, Headphones, Mic } from "lucide-react"
import ScrollReveal from "@/components/animations/ScrollReveal"
import ScrollTextReveal from "@/components/animations/ScrollTextReveal"
import StaggerReveal from "@/components/animations/StaggerReveal"

// --- Data Structure based on images ---
const aboutData = {
  powering: "Human-First AI Voice Automation, Powered by Triotech.",
  businessName: "TRIOTECH BIZSERVE PRIVATE LIMITED",
  merchantName: "Talib Ahmed",
  aboutXeny: "Xeny.ai is an AI Voice Agent SaaS platform developed by TRIOTECH BIZSERVE PRIVATE LIMITED, a next-generation contact center and AI solutions provider transforming customer experiences across industries. With headquarters in India and an international presence in the UAE, Triotech powers Xeny.ai with over a decade of contact center expertise, serving clients globally through scalable Gen-AI automation and multilingual voice intelligence.",
};

const coreValues = [
  {
    title: "Our Mission",
    icon: Rocket,
    content: "To lead in **AI innovation**, empowering businesses to deliver seamless and personalized customer experiences worldwide.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    content: "To **revolutionize global customer experiences** with AI-powered voice solutions that enhance human communication, trust, and efficiency.",
  },
  {
    title: "Our Commitment",
    icon: HeartHandshake,
    content: "At Xeny.ai, we're not just building bots – we're building **human-first AI systems** that transform every customer interaction into a meaningful experience.",
  },
];

const triotechData = {
  description: "Triotech is a global leader in **AI-driven contact center services**, delivering next-gen CX solutions that combine technology, analytics, and human empathy.",
  stats: [
    { value: "5500+", label: "Employees", icon: Users },
    { value: "16+", label: "Delivery Centers", icon: Map },
    { value: "6", label: "Countries of Operation", icon: Globe },
    { value: "40+", label: "Global Clients", icon: CheckCircle },
  ],
};

// Custom Tailwind utility for gradient text (needs to be defined in global.css if not already)
// The existing `text-gradient` utility uses: bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent
const GradientText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h1 className={`bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent ${className}`}>
    {children}
  </h1>
)

// --- About Page Component ---
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative z-10">
      <HeroCanvas />
      <Header onDemoClick={() => {}} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden  z-10 relative bg-white/70 backdrop-blur-sm  mx-auto max-w-7xl">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mx-auto relative z-10"
        >
          {/* --- Section 1: About Xeny.ai Header and Parent Info (Center Aligned with Gradient) --- */}
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <GradientText className="text-5xl font-bold mb-4">
                <ScrollTextReveal text="About Xeny.ai" splitBy="word" />
              </GradientText>
              <p className="text-xl text-gray-700 font-medium mb-2">
                <ScrollTextReveal text={aboutData.powering} splitBy="word" />
              </p>
            <p className="text-sm text-gray-500">
              **Business Name:** {aboutData.businessName} | **Merchant Name:** {aboutData.merchantName}
            </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
            </div>
          </ScrollReveal>

          {/* About Xeny Content Card (Aligned left but container is centered) */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-2xl border border-blue-100 mb-20 max-w-7xl w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-700 text-left">About Xeny</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-left">
                <span className="font-semibold text-blue-600">Xeny.ai</span> {aboutData.aboutXeny.substring(aboutData.aboutXeny.indexOf('is an AI Voice Agent SaaS platform'))}
              </p>
            </motion.div>
          </div>

          {/* --- Section 2: Our Core Values (Center Aligned) --- */}
          <ScrollReveal direction="up" delay={0}>
            <GradientText className="text-4xl font-bold text-center mb-12">
              <ScrollTextReveal text="Our Core Values" splitBy="word" />
            </GradientText>
          </ScrollReveal>
          
          <StaggerReveal staggerDelay={150} direction="up" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
                }}
                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl transition-all"
              >
                <value.icon className="w-8 h-8 text-blue-600 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-bold mb-3 text-blue-700">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: value.content }}></p>
              </motion.div>
            ))}
          </StaggerReveal>

          {/* --- Section 3: Parent Organization - Triotech (Center Aligned) --- */}
          <ScrollReveal direction="up" delay={0}>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              <ScrollTextReveal text="Our Parent Organization - Triotech" splitBy="word" />
            </h2>
          </ScrollReveal>
          
          {/* Triotech Description Card (Container centered) */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blue-600/10 p-8 rounded-xl shadow-lg border border-blue-200 mb-12 max-w-4xl w-full text-center"
            >
              <p className="text-lg text-gray-800 font-medium">
                <span className="font-bold text-blue-700">Triotech</span> {triotechData.description.substring(triotechData.description.indexOf('is a global leader'))}
              </p>
            </motion.div>
          </div>


          {/* Triotech Stats Grid */}
          <StaggerReveal staggerDelay={100} direction="up" className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {triotechData.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150 } },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md border-b-4 border-blue-600 text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </StaggerReveal>
          
        </motion.div>
      </section>

      {/* --- Section 4: CTA (Ready to transform?) --- */}
      <section className="bg-gray-900/90 py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8"
          >
            <ScrollTextReveal text="Ready to transform your customer experience?" splitBy="word" />
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() =>
          window.location.href =
            "https://app.xeny.ai/signup-with-voiceagent"
        }
          >
            Explore Xeny.ai Voice Agents
          </motion.button>
        </div>
      </section>

      <Footer />
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
    </main>
  )
}