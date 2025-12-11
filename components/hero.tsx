"use client"

import { motion } from "framer-motion"
import CallForm from "./call-form"
import PhoneMockup from "./phone-mockup"
import AnimatedNetwork from "./animated-network"

interface HeroProps {
  onDemoClick: () => void
}

export default function Hero({ onDemoClick }: HeroProps) {
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
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative min-h-screen pt-20 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 -z-20" />

      {/* Animated Network Background */}
      <div className="absolute top-0 right-0 w-1/2 h-3/4 -z-10 opacity-40">
        <AnimatedNetwork />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight text-foreground">
                AI Communication Platform for Every Customer Conversation
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
                Unify every customer interaction from voice AI calls to chat conversations under ONE brain that's
                integrated with your data. Built to scale with proven business outcomes.
              </p>
            </motion.div>

            {/* Call Form */}
            <motion.div variants={itemVariants} className="pt-6">
              <CallForm onSuccess={onDemoClick} />
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="pt-8 space-y-4">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Trusted by Leading Companies
              </p>
              <div className="flex flex-wrap gap-3">
                {["Codere", "Next Coast", "Einride", "DoorDash", "CreditCube"].map((brand, i) => (
                  <motion.div
                    key={brand}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-border shadow-sm text-sm font-medium text-foreground/70"
                  >
                    {brand}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Phone Mockup */}
          <motion.div variants={itemVariants} className="hidden md:flex justify-center">
            <PhoneMockup />
          </motion.div>
        </motion.div>

        {/* Mobile Phone Mockup */}
        <motion.div variants={itemVariants} className="md:hidden mt-12">
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  )
}
