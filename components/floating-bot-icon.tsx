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
      "0 0 20px rgba(56, 189, 248, 0.6)",  // cyan glow
      "0 0 35px rgba(168, 85, 247, 0.8)",  // purple glow
      "0 0 20px rgba(56, 189, 248, 0.6)",
    ],
  }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  className="
    w-20 h-20
    rounded-full
    flex items-center justify-center
    bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500
    relative shadow-xl
  "
>
  {/* Pulsing AI glow ring */}
  <motion.div
    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 rounded-full bg-white/20"
  />

  {/* Your Xeny logo icon (SVG extracted + optimized) */}
  <svg
    className="relative z-10 w-12 h-12"
    viewBox="0 0 200 200"
    fill="none"
    strokeWidth="20"
    strokeLinecap="round"
  >
    {/* X shape */}
    <path
      d="M40 40 L160 160"
      stroke="white"
    />
    <path
      d="M160 40 L40 160"
      stroke="white"
    />

    {/* Left waves */}
    <path
      d="M20 90 C10 100 10 120 20 130"
      stroke="#5be7ff"
    />
    <path
      d="M40 80 C20 100 20 120 40 140"
      stroke="#74f0ff"
    />

    {/* Right waves */}
    <path
      d="M180 90 C190 100 190 120 180 130"
      stroke="#d28bff"
    />
    <path
      d="M160 80 C180 100 180 120 160 140"
      stroke="#c46aff"
    />
  </svg>
</motion.div>

    </motion.button>
  )
}
