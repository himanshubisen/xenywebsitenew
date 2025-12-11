// app/page.js

"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons" // Example icon

// --- 1. Data Structure ---
const voices = [
  { name: "Telugu", accent: "Young adult", image: "/images/img-01.png", position: "top-center" },
  { name: "English", accent: "Young adult", image: "/images/img-01.png", position: "top-right" },
  { name: "Spanish", accent: "Young adult", image: "/images/img-01.png", position: "mid-left" },
  { name: "Hindi", accent: "Young adult", image: "/images/img-01.png", position: "mid-right" },
  { name: "Marathi", accent: "Young adult", image: "/images/img-01.png", position: "bottom-left" },
  { name: "Bengali", accent: "Young adult", image: "/images/img-01.png", position: "bottom-center" },
  { name: "Arabic", accent: "Young adult", image: "/images/img-01.png", position: "bottom-right" },
]

// NOTE: You must place your 7 image files in the 'public/images/' directory
// and name them exactly as shown above (e.g., telugu.jpg, english.jpg, etc.)
// For simplicity in this demo, I'll use placeholders. You can replace the '/images/...' path
// with actual image URLs or local paths from your public directory.
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150"

// --- 2. Framer Motion Variants and Configuration ---

// Container for staggered entrance animation
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

// Item (voice) animation: Fade in and drift up
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
}

// Center text animation
const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
}

// --- 3. The Voice Item Component ---
interface VoiceItemProps {
  name: string;
  accent: string;
  image: string;
  index: number;
}

const VoiceItem = ({ name, accent, image, index }: VoiceItemProps) => {
  return (
    <motion.div
      variants={itemVariants}
      // Hover animation: Scale up slightly and change shadow
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center justify-center p-2 text-center"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full  shadow-xl overflow-hidden mb-2">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Subtle FontAwesome effect (Optional) */}
        <FontAwesomeIcon
          icon={faCircle}
          className="absolute bottom-1 right-1 text-xs text-blue-500/80"
        />
      </div>
      <div className="bg-blue-50 p-1 px-3 rounded-md text-xs font-semibold text-blue-800 shadow-sm">
        {name}
      </div>
      <div className="text-xs text-gray-600 mt-0.5">{accent}</div>
    </motion.div>
  )
}

// --- 4. The Page Component ---
export default function LightThemeVoicePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        className="relative  bg-gradient-to-r from-black-700 to-cyan-700 p-12 rounded-3xl shadow-2xl  rounded-[3rem] p-8 sm:p-12 shadow-2xl w-full max-w-8xl border border-blue-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Central Text Block */}
        <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10">
       <motion.h1
  variants={textVariants}
  className="text-2xl sm:text-4xl font-extrabold text-blue-800"
>
  <span className="bg-gradient-to-r from-indigo-600 via-pink-500 to-violet-500 
    bg-clip-text text-transparent bg-[length:300%_auto] animate-gradient-flow">
    Any Accent. Any Emotion.
  </span>
</motion.h1>

<motion.h1
  variants={textVariants}
  className="text-2xl sm:text-4xl font-extrabold text-blue-800 mb-4"
>
  <span className="bg-gradient-to-r from-indigo-600 via-pink-500 to-violet-500 
    bg-clip-text text-transparent bg-[length:300%_auto] animate-gradient-flow">
    Any Language
  </span>
</motion.h1>

          <motion.p
            variants={textVariants}
            className="text-sm sm:text-base text-gray-900 max-w-sm"
          >
            Craft the Voice you imagine - Friendly, Formal, or Humorous!
          </motion.p>
        </div>

        {/* Voice Grid - Use absolute positioning for the "floating" look */}
        <div className="relative h-[400px] w-full max-w-[600px] mx-auto hidden sm:block">
          {voices.map((voice, index) => {
            let positionClasses = ""
            switch (voice.position) {
              case "top-center":
                positionClasses = "absolute top-0 left-1/2 -translate-x-1/2"
                break
              case "top-right":
                positionClasses = "absolute top-8 right-0"
                break
              case "mid-left":
                positionClasses = "absolute top-1/3 left-0 -translate-y-1/2"
                break
              case "mid-right":
                positionClasses = "absolute top-1/3 right-0 -translate-y-1/2"
                break
              case "bottom-left":
                positionClasses = "absolute bottom-0 left-8"
                break
              case "bottom-center":
                positionClasses = "absolute bottom-0 left-1/2 -translate-x-1/2"
                break
              case "bottom-right":
                positionClasses = "absolute bottom-0 right-8"
                break
              default:
                break
            }

            return (
              <div key={voice.name} className={positionClasses}>
                <VoiceItem {...voice} index={index} image={PLACEHOLDER_IMAGE} />
              </div>
            )
          })}
        </div>
        
        {/* Voice Grid - Standard grid for small screens */}
        <div className="grid grid-cols-3 gap-y-8 sm:hidden mt-8">
            {voices.map((voice, index) => (
                <VoiceItem key={voice.name} {...voice} index={index} image={PLACEHOLDER_IMAGE} />
            ))}
        </div>
        
      </motion.div>
    </div>
  )
}