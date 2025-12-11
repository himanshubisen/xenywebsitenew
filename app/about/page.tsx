// app/about/page.js

"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroCanvas from "@/components/hero-canvas"
// Importing relevant Lucide icons for Core Values
import { Rocket, Eye, HeartHandshake, Users, Map, Globe, CheckCircle } from "lucide-react"

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
const GradientText = ({ children, className }) => (
  <h1 className={`bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent ${className}`}>
    {children}
  </h1>
)

// --- About Page Component ---
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      <HeroCanvas />
      <Header onDemoClick={() => {}} />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mx-auto"
        >
          {/* --- Section 1: About Xeny.ai Header and Parent Info (Center Aligned with Gradient) --- */}
          <div className="text-center mb-16">
            <GradientText className="text-5xl font-bold mb-4">
              About Xeny.ai
            </GradientText>
            <p className="text-xl text-gray-700 font-medium mb-2">
              {aboutData.powering}
            </p>
            <p className="text-sm text-gray-500">
              **Business Name:** {aboutData.businessName} | **Merchant Name:** {aboutData.merchantName}
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

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
          <GradientText className="text-4xl font-bold text-center mb-12">
            Our Core Values
          </GradientText>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
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
                <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: value.content }} />
              </motion.div>
            ))}
          </motion.div>

          {/* --- Section 3: Parent Organization - Triotech (Center Aligned) --- */}
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Parent Organization - Triotech</h2>
          
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
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
          </motion.div>
          
        </motion.div>
      </section>

      {/* --- Section 4: CTA (Ready to transform?) --- */}
      <section className="bg-gray-900/90 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8"
          >
            Ready to transform your customer experience?
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={() => {/* Implement your navigation logic here */}}
          >
            Explore Xeny.ai Voice Agents
          </motion.button>
        </div>
      </section>

      <Footer />
    </main>
  )
}