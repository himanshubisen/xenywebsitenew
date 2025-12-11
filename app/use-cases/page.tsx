"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroCanvas from "@/components/hero-canvas"
import { ArrowRight, Phone, Zap, TrendingUp, Users } from "lucide-react"

const useCases = [
  {
    title: "Customer Support",
    description: "Automate incoming support calls with intelligent routing and resolution",
    icon: Phone,
    color: "from-blue-500 to-cyan-500",
    features: ["24/7 availability", "Instant responses", "Ticket creation"],
  },
  {
    title: "Sales Outreach",
    description: "Scale your sales team with AI-powered outbound calling",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    features: ["Lead qualification", "Call scheduling", "Performance tracking"],
  },
  {
    title: "Appointment Booking",
    description: "Handle appointment requests automatically",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    features: ["Calendar integration", "Reminders", "Rescheduling"],
  },
  {
    title: "Lead Generation",
    description: "Generate and qualify leads with conversational AI",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
    features: ["Interest qualification", "Contact collection", "CRM sync"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function UseCases() {
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 text-gradient">
            Real-World Use Cases
          </h1>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Discover how businesses across industries are using Xeny.ai to automate conversations and scale operations
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div
                    className={`inline-flex bg-gradient-to-r ${useCase.color} p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{useCase.title}</h3>
                  <p className="text-gray-600 mb-6">{useCase.description}</p>

                  <div className="space-y-2 mb-6">
                    {useCase.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></span>
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
