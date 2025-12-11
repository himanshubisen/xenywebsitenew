"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function CustomerStories() {
  const [channelInput, setChannelInput] = useState("")

  const stories = [
    {
      metric: "89%",
      description: "Increase in CVR for Support Call",
    },
    {
      metric: "73%",
      description: "Reduction Goals for SARS",
    },
    {
      metric: "3x ROI",
      description: "Average Return on Investment",
    },
  ]

  const testimonials = [
    {
      name: "Paul - Male AI Agent",
      feedback: "Increased conversation rates by 40%",
      image: "👨‍💼",
      company: "TechCorp",
    },
    {
      name: "Cassie - Female AI Agent",
      feedback: "Reduced customer wait times significantly",
      image: "👩‍💼",
      company: "RetailHub",
    },
  ]

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Customer Stories Metrics */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Customer Stories</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {stories.map((story, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.p
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-2"
                >
                  {story.metric}
                </motion.p>
                <p className="text-gray-600 font-medium">{story.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Experience Xeny.ai</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-3">{testimonial.image}</div>
                <p className="font-semibold text-gray-900 mb-1">{testimonial.name}</p>
                <p className="text-xs text-blue-600 mb-3 font-medium">{testimonial.company}</p>
                <p className="text-sm text-gray-600">{testimonial.feedback}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call Me Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-8 text-center"
          >
            <h4 className="text-xl font-bold mb-4 text-gray-900">Ready to Try Xeny.ai?</h4>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <input
                type="text"
                placeholder="Your email"
                value={channelInput}
                onChange={(e) => setChannelInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all"
              >
                Call Me
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
