"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  onDemoClick: () => void
}

export default function Header({ onDemoClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-white/80 via-white/60 to-white/0 backdrop-blur-md border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/xeny-logo.png" alt="Xeny Logo" width={32} height={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Xeny
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {[
            { label: "Home", href: "/" },
            { label: "Use Cases", href: "/use-cases" },
            { label: "About", href: "/about" },
            { label: "Pricing", href: "/pricing" },
            { label: "Blog", href: "/blog" },
          ].map((item, idx) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href="https://app.xeny.ai/login" className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium" target="_blank" rel="noopener noreferrer">
            Sign In
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => window.open('https://app.xeny.ai/signup-with-voiceagent', '_blank')}
              className=" bg-cyan-600 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6"
            >
              Book a Demo
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} className="text-gray-900" /> : <Menu size={24} className="text-gray-900" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-200/30 bg-white/80 backdrop-blur-md p-4 space-y-3"
        >
          {[
            { label: "Home", href: "/" },
            { label: "Use Cases", href: "/use-cases" },
            { label: "About", href: "/about" },
            { label: "Pricing", href: "/pricing" },
            { label: "Blog", href: "/blog" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button onClick={() => window.open('https://app.xeny.ai/signup-with-voiceagent', '_blank')} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
            Book a Demo
          </Button>
        </motion.div>
      )}
    </header>
  )
}
