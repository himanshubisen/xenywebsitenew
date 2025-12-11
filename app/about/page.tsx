"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroCanvas from "@/components/hero-canvas"
import { CheckCircle } from "lucide-react"

const stats = [
  { label: "Active Users", value: "10,000+" },
  { label: "Campaigns Run", value: "100,000+" },
  { label: "Countries Served", value: "50+" },
  { label: "Success Rate", value: "95%+" },
]

const team = [
  { name: "Tech Pioneers", description: "Building AI-powered solutions since 2020" },
  { name: "Customer-Centric", description: "Your success is our mission" },
  { name: "Secure & Reliable", description: "Enterprise-grade security and uptime" },
]

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
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-center mb-6 text-gradient">About Xeny.ai</h1>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            We're building the future of conversational AI, making it accessible to businesses of all sizes
          </p>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <motion.h3
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100"
              >
                <CheckCircle className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{value.name}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
