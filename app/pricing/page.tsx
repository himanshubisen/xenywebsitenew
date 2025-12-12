// app/pricing/page.js (Assuming your file is named this)

"use client"

import { motion } from "framer-motion"
import { Check, Zap, DollarSign, Briefcase, Phone, CreditCard } from "lucide-react"
// Assuming Header and Footer are defined in your components directory
import Header from "@/components/header"
import Footer from "@/components/footer"
// Assuming HeroCanvas is defined in your components directory
import HeroCanvas from "@/components/hero-canvas"
import ScrollReveal from "@/components/animations/ScrollReveal"
import ScrollTextReveal from "@/components/animations/ScrollTextReveal"
import StaggerReveal from "@/components/animations/StaggerReveal"

// --- 1. Data Structure from Images ---
const CORE_RATE = {
  credits: 5,
  currency: {
    INR: 1,
    AED: 0.1,
  },
  includes: "Normal Connectivity + Standard Voice",
}

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
  { title: "Transparent & flexible", description: "Pay only for what you use", icon: DollarSign },
  { title: "Perfect for startups to enterprises", description: "Scale at your own pace", icon: Briefcase },
  { title: "Upgrade connectivity or voice anytime", description: "Change quality on demand", icon: Zap },
  { title: "No hidden fees or long-term contracts", description: "Complete transparency", icon: CreditCard },
]


// --- 2. Main Pricing Component ---
export default function Pricing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      <HeroCanvas />
      <Header onDemoClick={() => {}} />

      {/* --- Section 1: Main Pay As You Use Card --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <ScrollReveal direction="up" delay={0}>
            <h1 className="text-5xl font-bold text-center mb-6 text-gradient">
              <ScrollTextReveal text="AI Voicebot Pricing" splitBy="word" />
            </h1>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              <ScrollTextReveal 
                text="Deliver seamless, human-like customer conversations powered by AI – with flexible credit-based pricing designed for every business." 
                splitBy="word"
              />
            </p>
          </ScrollReveal>

          {/* Main Price Card */}
          <div className="flex justify-center mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="bg-gray-900 text-white rounded-2xl p-8 sm:p-12 shadow-2xl w-full max-w-md"
            >
              <p className="text-center text-blue-400 mb-6 font-semibold">Pay As You Use</p>
              <div className="flex justify-center items-center mb-4">
                <Phone className="w-10 h-10 mr-4 text-blue-400" />
                <span className="text-6xl font-bold">{CORE_RATE.credits} Credits</span>
              </div>
              <p className="text-center text-sm text-gray-400 mb-8">per minute</p>
              
              <div className="bg-gray-800 p-3 rounded-lg text-center mb-8">
                <p className="text-sm font-medium">1 Credit = ₹{CORE_RATE.currency.INR}</p>
                <p className="text-sm font-medium">1 Credit = AED {CORE_RATE.currency.AED}</p>
              </div>

              <p className="text-center text-sm text-gray-400">Includes: {CORE_RATE.includes}</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- Section 2: Why Credit-Based (Feature Cards) --- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
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

      {/* --- Section 3: Full Feature/Credit Table --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto text-center">
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
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Free →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border border-white text-white py-3 px-8 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Talk to Sales
              </motion.button>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  )
}