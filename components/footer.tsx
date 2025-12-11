"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      items: ["Features", "Pricing", "Security", "Enterprise"],
    },
    {
      title: "Company",
      items: ["About", "Blog", "Careers", "Contact"],
    },
    {
      title: "Legal",
      items: ["Privacy", "Terms", "Compliance", "Cookies"],
    },
  ]

  const socialLinks = [
    { icon: Github, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo/xeny-logo.png" alt="Xeny Logo" width={52} height={52} />
             
            </div>
            <p className="text-sm text-gray-600">Create AI voice agents to automate your customer conversations</p>
          </motion.div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">Copyright © 2025 All rights reserved Xeny.ai</p>
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
