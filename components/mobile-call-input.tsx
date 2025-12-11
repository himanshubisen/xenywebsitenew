"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function MobileCallInput() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    const formattedValue = value.slice(0, 10)

    // Format as: 98765 43210
    if (formattedValue.length <= 5) {
      setPhoneNumber(formattedValue)
    } else {
      setPhoneNumber(formattedValue.slice(0, 5) + " " + formattedValue.slice(5))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const cleanedNumber = phoneNumber.replace(/\D/g, "")

      if (!cleanedNumber || cleanedNumber.length < 10) {
        toast({
          title: "Invalid Number",
          description: "Please enter a valid 10-digit phone number",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const fullNumber = `+91${cleanedNumber}`

      // Use environment variables from your config
      const crm_url = process.env.NEXT_PUBLIC_CRM_URL || ""
      const campaignId = process.env.NEXT_PUBLIC_CAMPAIGN_ID || ""

      if (!crm_url || !campaignId) {
        toast({
          title: "Configuration Error",
          description: "Missing environment variables",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const response = await fetch(`${crm_url}/public/test-outbound-call/${campaignId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentNumber: fullNumber,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to initiate call")
      }

      toast({
        title: "Call Initiated",
        description: "Our AI will call you shortly. Please be ready!",
      })
      setPhoneNumber("")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send call request",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          {/* Country Code Selector */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-300 shadow-sm flex-shrink-0"
          >
            <span className="text-xl">🇮🇳</span>
            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">+91</span>
          </motion.div>

          {/* Phone Number Input */}
          <motion.input
            type="tel"
            placeholder="98765 43210"
            value={phoneNumber}
            onChange={handlePhoneChange}
            disabled={isLoading}
            whileFocus={{ scale: 1.02 }}
            className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 shadow-sm text-sm"
          />

          {/* Try Now Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={isLoading || phoneNumber.replace(/\D/g, "").length < 10}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg px-4 py-2.5 whitespace-nowrap transition-all disabled:opacity-50 shadow-md text-sm"
            >
              {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
            </Button>
          </motion.div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          We'll call you on this number to demo the AI agent instantly
        </p>
      </form>
    </motion.div>
  )
}
