"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroCanvas from "@/components/hero-canvas"
import { Calendar, ArrowRight } from "lucide-react"

const posts = [
  {
    title: "The Future of Voice AI in Customer Service",
    excerpt: "Discover how voice AI is revolutionizing customer interactions and improving satisfaction scores.",
    date: "Dec 10, 2024",
    category: "AI & Technology",
    image: "from-blue-500 to-cyan-500",
  },
  {
    title: "5 Ways to Automate Your Outbound Calling",
    excerpt: "Learn proven strategies to scale your sales team with AI-powered outbound calling campaigns.",
    date: "Dec 5, 2024",
    category: "Sales",
    image: "from-purple-500 to-pink-500",
  },
  {
    title: "Integrating Xeny with Your Existing Systems",
    excerpt: "A complete guide to seamlessly integrating Xeny.ai with your current tech stack.",
    date: "Nov 28, 2024",
    category: "Integration",
    image: "from-green-500 to-emerald-500",
  },
  {
    title: "Measuring ROI from AI Voice Agents",
    excerpt: "Understand the metrics that matter and track the true impact of your AI investments.",
    date: "Nov 22, 2024",
    category: "Analytics",
    image: "from-orange-500 to-red-500",
  },
  {
    title: "Security Best Practices for Voice AI",
    excerpt: "Protect your customer data with enterprise-grade security for voice AI platforms.",
    date: "Nov 15, 2024",
    category: "Security",
    image: "from-indigo-500 to-purple-500",
  },
  {
    title: "Case Study: 300% Increase in Lead Conversion",
    excerpt: "How a SaaS company used Xeny.ai to triple their lead conversion rates in 90 days.",
    date: "Nov 8, 2024",
    category: "Case Study",
    image: "from-teal-500 to-cyan-500",
  },
]

export default function Blog() {
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative z-10">
      <HeroCanvas />
      <Header onDemoClick={() => {}} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-32 relative z-20 bg-white/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-center mb-6 text-gray-900">Blog & Resources</h1>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in AI-powered communication
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, index) => (
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <div
                  className={`h-40 bg-gradient-to-br ${post.image} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                <div className="p-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3"
                  >
                    {post.category}
                  </motion.span>

                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {post.date}
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                      <ArrowRight size={18} className="text-blue-600" />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
