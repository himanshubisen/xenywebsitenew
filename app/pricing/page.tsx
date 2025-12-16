// app/pricing/page.js (Assuming your file is named this)

"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { Check, Zap, DollarSign, Briefcase, Phone, CreditCard, Bot, Mic, Sparkles, Headphones } from "lucide-react"
// Assuming Header and Footer are defined in your components directory
import Header from "@/components/header"
import Footer from "@/components/footer"
// Assuming HeroCanvas is defined in your components directory
import HeroCanvas from "@/components/hero-canvas"
import ScrollReveal from "@/components/animations/ScrollReveal"
import ScrollTextReveal from "@/components/animations/ScrollTextReveal"
import StaggerReveal from "@/components/animations/StaggerReveal"

const CORE_RATE = {
    credits: 5, // Example value
    includes: "HD Audio, Call Recording, Standard Support", // Example value
    currency: {
        INR: 1.5, // Example value
        AED: 0.066, // Example value
    }
};

// --- 1. Data Structure from Images ---
// const CORE_RATE = {
//   credits: 5,
//   currency: {
//     INR: 1,
//     AED: 0.1,
//   },
//   includes: "Normal Connectivity + Standard Voice",
// }

const creditFeatures = [
  { group: "Connectivity", type: "Normal", description: "Normal connectivity for smooth, consistent performance.", growth: <Check className="w-5 h-5 text-green-500" />, enterprise: <Check className="w-5 h-5 text-green-500" />, credit: "Included" },
  { group: "Connectivity", type: "HD", description: "Enhanced network stability with fewer interruptions and clearer communication.", growth: "Additional 1 credit/min", enterprise: "Contact sales (custom pricing)", credit: 1 },
  { group: "Voice", type: "Standard", description: "Reliable and natural - perfect for clear, everyday conversations.", growth: <Check className="w-5 h-5 text-green-500" />, enterprise: <Check className="w-5 h-5 text-green-500" />, credit: "Included" },
  { group: "Voice", type: "Premium", description: "Reliable and natural - perfect for clear, everyday conversations.", growth: "Additional 0.5 credits/min", enterprise: "Contact sales (custom pricing)", credit: 0.5 },
  { group: "Voice", type: "Realistic", description: "Human-like warmth and tone for authentic, natural interactions.", growth: "Additional 1 credit/min", enterprise: "Contact sales (custom pricing)", credit: 1 },
  { group: "Voice", type: "Ultra-realistic", description: "Immersive and emotionally rich - so real, it feels truly human.", growth: "Additional 1.5 credits/min", enterprise: "Contact sales (custom pricing)", credit: 1.5 },
  { group: "Management", type: "Agent management", description: "Create and manage up to 3 AI agents for free.", growth: "Additional 50 credits/agent", enterprise: "Contact sales (custom pricing)", credit: 50 },
  { group: "Management", type: "Campaign management", description: "Run and track up to 3 campaigns effortlessly.", growth: "Additional 50 credits/campaign", enterprise: "Contact sales (custom pricing)", credit: 50 },
  { group: "Tools & Functions", type: "Data capture", description: "Auto-collect and organize customer information.", growth: <Check className="w-5 h-5 text-green-500" />, enterprise: <Check className="w-5 h-5 text-green-500" />, credit: 0 },
  { group: "Tools & Functions", type: "Call transcription", description: "Get transcriptions / recordings for every call.", growth: <Check className="w-5 h-5 text-green-500" />, enterprise: <Check className="w-5 h-5 text-green-500" />, credit: 0 },
  { group: "Tools & Functions", type: "Analytics dashboard", description: "Access real-time insights and performance reports.", growth: <Check className="w-5 h-5 text-green-500" />, enterprise: <Check className="w-5 h-5 text-green-500" />, credit: 0 },
  { group: "Tools & Functions", type: "Call transfer", description: "Easily route calls to the right agent or team.", growth: "1 credit/transfer", enterprise: "Contact sales (custom pricing)", credit: 1 },
  { group: "Tools & Functions", type: "AI intent detection", description: "Understand customer needs with smart AI analysis.", growth: <Check className="w-5 h-5 text-green-500" />, enterprise: <Check className="w-5 h-5 text-green-500" />, credit: 0 },
  { group: "Tools & Functions", type: "Multi language support", description: "Engage customers in their preferred language.", growth: <Check className="w-5 h-5 text-green-500" />, enterprise: <Check className="w-5 h-5 text-green-500" />, credit: 0 },
  { group: "Tools & Functions", type: "Appointment scheduling", description: "Book and manage meetings automatically.", growth: "0.3 credits/booking", enterprise: "Contact sales (custom pricing)", credit: 0.3 },
  { group: "Tools & Functions", type: "SMS follow up", description: "Send automated text follow-ups after every call.", growth: "0.4 credits/SMS", enterprise: "Contact sales (custom pricing)", credit: 0.4 },
]

const whyCreditBased = [
  { title: "Transparent & Flexible Pricing ", description: "Pay only for what you use", icon: DollarSign },
  { title: "Perfect for startups to enterprises", description: "Scale at your own pace", icon: Briefcase },
  { title: "Upgrade connectivity or voice anytime", description: "Change quality on demand", icon: Zap },
  { title: "No hidden fees or long-term contracts", description: "Complete transparency", icon: CreditCard },
]


// --- 2. Main Pricing Component ---
export default function Pricing() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroCanvas />
      <Header onDemoClick={() => {}} />

      <section className="relative overflow-hidden pt-16 mt-15 md:mt-10 md:pt-24 pb-12 md:pb-20">
        <HeroCanvas />
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="md:text-5xl  text-4xl md:text-7xl font-extrabold mb-4 tracking-tight
                       bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                       animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            Voicebot Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover flexible credit-based pricing designed for every business.
          </p>
        </div>
      </section>
            {/* --- Section 2: Why Credit-Based (Feature Cards) --- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm relative overflow-hidden border-t border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal direction="up" delay={0}>
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              <ScrollTextReveal text="Why Credit-Based?" splitBy="word" />
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">Flexible pricing that grows with your business</p>
          </ScrollReveal>

          <StaggerReveal staggerDelay={100} direction="up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCreditBased.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
              >
                <item.icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>


   {/* --- Section 1: Main Pay As You Use Card --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 z-10 relative"> {/* Use a light background for contrast */}
            <div className="max-w-7xl mx-auto">
                {/* Main Price Card */}
                <div className="flex justify-center ">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: "tween", duration: 0.5 }} // Subtle animation adjustment
                        className="bg-white text-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-indigo-100 ring-1 ring-gray-100 w-full " // White card with softer shadow and border
                    >
                        <h3 className="text-center text-indigo-600 mb-6 font-bold text-xl tracking-wider uppercase">
                            Pay As You Use
                        </h3>
                        
                        {/* Credits Rate */}
                        <div className="flex justify-center items-center mb-2">
                            <Phone className="w-8 h-8 mr-4 text-indigo-500" />
                            <span className="md:text-6xl text-5xl font-extrabold text-gray-900">
                                {CORE_RATE.credits} Credits
                            </span>
                        </div>
                        <p className="text-center text-md text-gray-500 mb-8">
                            per minute
                        </p>

                        {/* Currency Rate Box */}
                        <div className="bg-indigo-50/70 p-4 rounded-xl text-center mb-8 border-l-4 border-indigo-400"> {/* Light-colored, accented box */}
                            <p className="text-md font-semibold text-gray-700">
                                Equivalent Rates:
                            </p>
                            <div className="mt-2 space-y-1">
                                <p className="text-sm text-gray-600">
                                    <span className="font-bold">1 Credit</span> = ₹{CORE_RATE.currency.INR}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-bold">1 Credit</span> = AED {CORE_RATE.currency.AED}
                                </p>
                            </div>
                        </div>

                        {/* Includes Section */}
                        <div className="mt-6 border-t pt-6 border-gray-100">
                            <p className="text-center text-sm font-medium text-gray-600">
                                <span className="font-bold text-gray-700">Includes:</span> {CORE_RATE.includes}
                            </p>
                        </div>
                        
                    </motion.div>
                </div>
            </div>
        </section>


      {/* --- Section 3: Full Feature/Credit Table --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 z-10 relative overflow-hidden border-b border-gray-200">
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal direction="up" delay={0}>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              <ScrollTextReveal text="Credit Add-ons & Feature Breakdown" splitBy="word" />
            </h2>
          </ScrollReveal>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-x-auto bg-white rounded-xl shadow-2xl border border-blue-100"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Growth (Credits)</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Enterprise</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {creditFeatures.map((feature, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="hover:bg-blue-50/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{feature.type} <span className="text-xs font-normal text-blue-500">({feature.group})</span></div>
                      <div className="text-xs text-gray-500 max-w-md">{feature.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {typeof feature.growth === 'string' ? feature.growth : feature.growth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {typeof feature.enterprise === 'string' ? feature.enterprise : feature.enterprise}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* --- Section 4: Enterprise Solutions & Free Trial (from image_37c36f.png) --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white z-10 relative overflow-hidden border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up" delay={0}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <ScrollTextReveal text="Enterprise Solutions" splitBy="word" />
            </h2>
            <p className="text-lg text-gray-600 mb-12">Scale your operations with custom solutions tailored to your business needs</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
            >
              <Zap className="w-8 h-8 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Increased Concurrency</h3>
              <p className="text-gray-600 mb-6">Handle thousands of simultaneous calls with enterprise-grade infrastructure. Perfect for high-volume operations and peak seasons.</p>
              <button className="py-2 px-6 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Contact Sales
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
            >
              <Briefcase className="w-8 h-8 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Whitelabelling</h3>
              <p className="text-gray-600 mb-6">Fully customize the platform with your brand identity, logo, and domain. Deliver a seamless branded experience to your customers.</p>
              <button className="py-2 px-6 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Contact Sales
              </button>
            </motion.div>
          </div>

          {/* Start Your Free Trial */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-700 to-cyan-600 p-12 rounded-3xl shadow-2xl text-white"
          >
            <ScrollReveal direction="up" delay={0}>
              <h2 className="text-4xl font-bold mb-4">
                <ScrollTextReveal text="Start Your Free Trial" splitBy="word" />
              </h2>
              <p className="text-xl mb-6">Get **100 free credits** to experience real conversations powered by AI Voicebot.</p>
            </ScrollReveal>
            <p className="text-sm text-blue-200 mb-8">Upgrade anytime – scale effortlessly.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
      
      {/* Start Free */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() =>
          window.location.href =
            "https://app.xeny.ai/signup-with-voiceagent"
        }
        className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
      >
        Start Free →
      </motion.button>

      {/* Talk to Sales */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        // onClick={() => router.push("/about")}
        className="bg-transparent border border-white text-white py-3 px-8 rounded-lg font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto"
      >
        Talk to Sales
      </motion.button>
    </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  )
}