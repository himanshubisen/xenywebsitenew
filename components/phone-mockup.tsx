"use client"

import { motion } from "framer-motion"

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mx-auto w-full max-w-sm"
    >
      {/* Phone Frame */}
      <div className="relative mx-auto w-64 bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
        {/* Screen */}
        <div className="bg-gradient-to-b from-blue-600 to-blue-900 p-4 h-96 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Animated Network Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 256 256">
              <defs>
                <pattern id="network" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="16" cy="16" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="28" cy="4" r="1.5" fill="white" opacity="0.5" />
                  <circle cx="28" cy="28" r="1.5" fill="white" opacity="0.5" />
                  <line x1="4" y1="4" x2="16" y2="16" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  <line x1="16" y1="16" x2="28" y2="4" stroke="white" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="256" height="256" fill="url(#network)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
            {/* Animated Mic Icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-white rounded-full blur-lg"
              />
              <div className="relative w-16 h-16 bg-gradient-to-br from-white to-blue-200 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 16.91c-1.48 1.45-3.5 2.33-5.75 2.33s-4.27-.88-5.75-2.33M19 12h2c0 2.96-1.37 5.61-3.53 7.39l1.42 1.42c2.67-2.28 4.37-5.61 4.37-9.39z" />
                </svg>
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-center space-y-2">
              <h3 className="text-white font-semibold text-sm">AI Voice Agent Ready</h3>
              <p className="text-white/70 text-xs">+91 98765 43210</p>
            </div>

            {/* Animated Dots */}
            <motion.div className="flex gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 1.4,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-50" />
      </div>
    </motion.div>
  )
}
