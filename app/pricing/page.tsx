"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroCanvas from "@/components/hero-canvas"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small teams",
    features: ["100 minutes/month", "2 AI agents", "Basic analytics", "Email support", "API access"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$299",
    description: "For growing businesses",
    features: [
      "500 minutes/month",
      "10 AI agents",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Knowledge base",
      "Call recording",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited minutes",
      "Unlimited agents",
      "Real-time analytics",
      "24/7 dedicated support",
      "Custom integrations",
      "White-label options",
      "Advanced security",
      "SLA guarantee",
    ],
    highlighted: false,
  },
]

export default function Pricing() {
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
          <h1 className="text-5xl font-bold text-center mb-6 text-gradient">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 text-center mb-16">Choose the plan that's right for your business</p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className={`rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl scale-105"
                    : "bg-white text-gray-900 shadow-lg border border-gray-100 hover:shadow-xl"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`mb-4 ${plan.highlighted ? "text-blue-100" : "text-gray-600"}`}>{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className={plan.highlighted ? "text-blue-100" : "text-gray-600"}>/month</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold mb-8 transition-all ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg"
                  }`}
                >
                  Get Started
                </motion.button>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center"
                    >
                      <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
