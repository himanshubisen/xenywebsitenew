"use client"

import { motion } from "framer-motion"
import { Zap, Smartphone, Globe, BarChart3, MessageSquare, Lock } from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Omni-Channel AI",
    description: "Always-On Context end-to-end platform sync across all channels",
  },
  {
    icon: Zap,
    title: "Seamless Integrations",
    description: "Connect with 300+ integrations out of the box",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Deploy agents in multiple languages globally",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time insights and detailed performance metrics",
  },
  {
    icon: MessageSquare,
    title: "24/7 Customer Support",
    description: "Always available support for your campaigns",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance",
  },
]

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Why Choose Xeny?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to automate your business and drive growth
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all"
                >
                  <Icon size={24} className="text-blue-600" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
