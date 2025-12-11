"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface FloatingBotIconProps {
  onOpen: () => void
}

export default function FloatingBotIcon({ onOpen }: FloatingBotIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onOpen}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 z-40 focus:outline-none"
      aria-label="Open AI Voice Bot"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          boxShadow: [
            "0 0 20px rgba(99, 102, 241, 0.5)",
            "0 0 40px rgba(99, 102, 241, 0.8)",
            "0 0 20px rgba(99, 102, 241, 0.5)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg relative"
      >
        {/* Pulsing outer ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-blue-500/30 rounded-full"
        />

        {/* Microphone icon */}
        <motion.svg
          className="w-8 h-8 text-white relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
        >
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.5 14.47 16 12 16s-4.52-1.5-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1.01 1.14.9 5.09 5.05 8.86 10.92 8.86s10.02-3.77 10.92-8.86c.08-.6-.4-1.14-1.01-1.14z" />
        </motion.svg>

        {/* Tooltip on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-3 right-0 bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap"
          >
            Test AI Agent
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  )
}
