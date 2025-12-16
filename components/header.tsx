"use client"

import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  onDemoClick?: () => void
}

export default function Header({ onDemoClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-sm rounded-full px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          {isMobile ? (
         <div>
  <Link
    href="/"
    className="flex items-center gap-2 hover:opacity-90 transition-opacity"
  >
    <Image
      src="/logo/xeny-logo.png"
      alt="Xeny Logo"
      width={102}
      height={102}
      priority
      quality={100}
      className="object-contain"
    />
  </Link>
</div>

          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image src="/logo/xeny-logo.png" alt="Xeny Logo" width={102} height={102} />
              </Link>
            </motion.div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link href="/use-cases" className="hover:text-indigo-600 transition-colors">Use Cases</Link>
              <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
              <Link href="/contact-us" className="hover:text-indigo-600 transition-colors">Contact Us</Link>
            <Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="https://app.xeny.ai/login" 
              className="text-sm text-slate-600 hover:text-indigo-600 transition-colors font-medium" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Sign In
            </Link>
            {isMobile ? (
             <Button
  onClick={() => window.open('https://app.xeny.ai/signup-with-voiceagent', '_blank')}
  className="
    bg-gradient-to-r
    from-black
    via-neutral-900
    to-neutral-800
    hover:from-neutral-900
    hover:to-black
    text-white
    px-6
    rounded-full
    font-bold
    text-sm
    shadow-xl
    hover:shadow-black/60
    border border-white/10
  "
>
  Get Started
</Button>

            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {/* <Button
                  onClick={() => window.open('https://app.xeny.ai/signup-with-voiceagent', '_blank')}
                  className="bg-slate-600 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 rounded-full font-bold text-sm shadow-lg hover:shadow-indigo-500/30"
                >
                  Get Started
                </Button> */}
                <Button
  onClick={() => window.open('https://app.xeny.ai/signup-with-voiceagent', '_blank')}
className="
  bg-gradient-to-r
  from-black
  via-neutral-900
  to-neutral-800
  hover:from-neutral-900
  hover:to-black
  text-white
  px-5
  rounded-full
  font-bold
  text-sm
  shadow-xl
  hover:shadow-black/60
"

>
  Get Started
</Button>

              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className="text-slate-900" /> : <Menu size={24} className="text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden fixed top-[88px] z-100  left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/50 shadow-lg mx-4 rounded-2xl overflow-hidden"
        >
          <div className="p-4 space-y-3">
            {[
              { label: "Home", href: "/" },
              { label: "Use Cases", href: "/use-cases" },
              { label: "Blog", href: "/blog" },
              { label: "Pricing", href: "/pricing" },
              { label: "Contact Us", href: "/contact-us" },
              { label: "About", href: "/about" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-slate-700 hover:text-indigo-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <Link
                href="https://app.xeny.ai/login"
                className="block text-sm text-slate-700 hover:text-indigo-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-center"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
           <Button 
  onClick={() => {
    window.open('https://app.xeny.ai/signup-with-voiceagent', '_blank')
    setIsOpen(false)
  }} 
  className="
    w-full
    bg-gradient-to-r
    from-black
    via-neutral-900
    to-neutral-800
    hover:from-neutral-900
    hover:to-black
    text-white
    rounded-full
    font-bold
    shadow-xl
    hover:shadow-black/60
    border border-white/10
    transition-all duration-300 ease-in-out
  "
>
  Get Started
</Button>

            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
