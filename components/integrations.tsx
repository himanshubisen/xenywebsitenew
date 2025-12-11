"use client"

import { motion } from "framer-motion"

const integrations = [
  "📊 Salesforce",
  "🔗 Zapier",
  "📱 Twilio",
  "💬 Slack",
  "📧 HubSpot",
  "🎯 Intercom",
  "🤖 OpenAI",
  "📞 VoiceFlow",
  "💳 Stripe",
  "📅 Calendly",
  "📊 Mixpanel",
  "🔐 Auth0",
]

export default function Integrations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">300+ Native Integrations</h2>
          <p className="text-lg text-gray-600">Connect Xeny with your favorite tools and platforms</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {integrations.map((integration, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.2 } }}
              className="aspect-square bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-2xl cursor-pointer"
            >
              {integration}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
