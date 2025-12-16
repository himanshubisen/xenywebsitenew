"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroCanvas from "@/components/hero-canvas"
import HeroCanvasEffect from "@/components/hero-canvas"
import { Calendar, ArrowRight, Bot, Phone, Sparkles, Headphones, Mic } from "lucide-react"

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

      <section className="relative overflow-hidden pt-16 mt-15 md:mt-10 md:pt-24 pb-12 md:pb-20">
        <HeroCanvasEffect />
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
            className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight
                       bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                       animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            Blog & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in AI-powered communication.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-16 relative z-20 bg-white/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
       

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
