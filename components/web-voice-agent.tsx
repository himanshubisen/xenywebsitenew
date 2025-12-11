"use client"

import { useState, useRef, useEffect } from "react"
import { X, Loader2, Mic, MicOff } from "lucide-react"
import { motion } from "framer-motion"
import VoiceAgentClient from "@/lib/voice-agent-client"
import AudioProcessor from "@/lib/audio-processor"

interface WebVoiceAgentProps {
  onClose: () => void
}

export default function WebVoiceAgent({ onClose }: WebVoiceAgentProps) {
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [status, setStatus] = useState("AI Voice Agent Ready")

  const voiceClientRef = useRef<VoiceAgentClient | null>(null)
  const audioProcessorRef = useRef<AudioProcessor | null>(null)

  // Use environment variables for WebSocket configuration
  const wsServerUrl = process.env.NEXT_WEBSOCKET_SERVER_URL || "wss://devweb.xeny.ai"
  const environment = process.env.NEXT_ENVIRONMENT || "wsprod"
  const voiceAgentId = process.env.NEXT_VOICE_AGENT_ID || "690ef1d4f5605ac44e4c233f"
  const serverUrl = `${wsServerUrl}/${environment}/${voiceAgentId}`

  const handleConnect = async () => {
    if (isActive) {
      // STOP
      setIsLoading(true)
      setStatus("Stopping...")

      try {
        // Disconnect voice client
        if (voiceClientRef.current) {
          voiceClientRef.current.disconnect()
          voiceClientRef.current = null
        }

        // Cleanup audio processor
        if (audioProcessorRef.current) {
          audioProcessorRef.current.cleanup()
          audioProcessorRef.current = null
        }

        setIsActive(false)
        setIsSpeaking(false)
        setStatus("AI Voice Agent Ready")
      } catch (error) {
        console.error("Error stopping voice agent:", error)
        setStatus("Error stopping")
      } finally {
        setIsLoading(false)
      }
    } else {
      // START
      setIsLoading(true)
      setStatus("Connecting...")

      try {
        console.log(`Connecting to WebSocket: ${serverUrl}`)
        setStatus(`Connecting to ${serverUrl}...`)

        // Create voice client
        const voiceClient = new VoiceAgentClient(serverUrl)
        voiceClientRef.current = voiceClient

        // Create audio processor
        const audioProcessor = new AudioProcessor(voiceClient)
        audioProcessorRef.current = audioProcessor

        // Set up event handlers
        voiceClient.on('connected', () => {
          console.log("WebSocket Connected successfully")
          setStatus("Connected! Initializing audio...")
        })

        voiceClient.on('session_ready', () => {
          console.log("Session ready")
          setStatus("Session ready! Starting microphone...")
          startAudioProcessing()
        })

        voiceClient.on('audio_start', () => {
          console.log("Agent started speaking")
          setIsSpeaking(true)
        })

        voiceClient.on('audio_done', () => {
          console.log("Agent finished speaking")
          setIsSpeaking(false)
        })

        voiceClient.on('transcript', (transcript: string) => {
          console.log("User transcript:", transcript)
          setStatus(`You: ${transcript}`)
        })

        voiceClient.on('response_text', (text: string) => {
          console.log("Agent response:", text)
          setStatus(`Agent: ${text}`)
        })

        voiceClient.on('error', (error: string) => {
          console.error("Voice client error:", error)
          setStatus(`Error: ${error}`)
        })

        voiceClient.on('disconnected', () => {
          console.log("Disconnected")
          setIsActive(false)
          setIsSpeaking(false)
          setStatus("Disconnected")
        })

        // Connect to WebSocket
        await voiceClient.connect()

        setIsActive(true)
        setIsLoading(false)
        setStatus("Connected! Waiting for session...")

      } catch (error) {
        console.error("Connection failed:", error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setStatus(`Failed to connect: ${errorMessage}`)
        setIsLoading(false)

        // Cleanup on error
        if (voiceClientRef.current) {
          voiceClientRef.current.disconnect()
          voiceClientRef.current = null
        }
        if (audioProcessorRef.current) {
          audioProcessorRef.current.cleanup()
          audioProcessorRef.current = null
        }
      }
    }
  }

  const startAudioProcessing = async () => {
    try {
      if (!audioProcessorRef.current) {
        throw new Error("Audio processor not initialized")
      }

      // Initialize audio
      await audioProcessorRef.current.initialize()

      // Start recording
      await audioProcessorRef.current.startRecording()

      setStatus("Listening... Speak now!")
      console.log("Audio processing started")
    } catch (error) {
      console.error("Failed to start audio processing:", error)
      setStatus(`Audio error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (voiceClientRef.current) {
        voiceClientRef.current.disconnect()
        voiceClientRef.current = null
      }
      if (audioProcessorRef.current) {
        audioProcessorRef.current.cleanup()
        audioProcessorRef.current = null
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-900 via-black to-blue-900 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-transparent to-blue-600/20 blur-3xl" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between mb-10">
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Agent
            </h1>
            <button onClick={onClose} className="text-white/60 hover:text-white p-2">
              <X size={32} />
            </button>
          </div>

          {/* Voice Card */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
              {/* Sparkle */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400/50" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl">Sparkles</span>
                </motion.div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400/50" />
              </div>

              <div className="text-center pt-20 pb-8">
                <p className="text-white/90 text-lg font-medium tracking-wider">
                  AI Voice Agent Ready
                </p>
                <p className="text-purple-300 text-sm mt-2">{status}</p>
              </div>

              {/* Visualization */}
              <div className="relative flex justify-center py-12">
                {/* Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"
                    animate={{
                      y: [0, -50, 0],
                      x: [0, Math.sin(i) * 80, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}

                {/* Dotted Ring */}
                <div className="absolute w-64 h-64 rounded-full border-2 border-dotted border-purple-400/60 animate-spin-slow" />

                {/* Glow Rings */}
                <motion.div
                  animate={isActive ? { scale: [1, 1.8], opacity: [0.7, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-56 h-56 rounded-full bg-purple-500/30 blur-xl"
                />
                <motion.div
                  animate={isActive ? { scale: [1, 1.6], opacity: [0.6, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  className="absolute w-48 h-48 rounded-full bg-blue-500/40 blur-xl"
                />

                {/* Sound Waves */}
                {isSpeaking && (
                  <>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-32 h-40 bg-gradient-to-r from-purple-400/40 to-transparent rounded-l-full blur-lg"
                    />
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-40 bg-gradient-to-l from-blue-400/40 to-transparent rounded-r-full blur-lg"
                    />
                  </>
                )}

                {/* Center Mic */}
                <div className="relative z-10 w-32 h-32 rounded-full bg-black/60 backdrop-blur-xl border-4 border-purple-500/50 shadow-2xl flex items-center justify-center">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isLoading ? (
                      <Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
                    ) : isActive ? (
                      <Mic className="w-16 h-16 text-purple-400" />
                    ) : (
                      <MicOff className="w-16 h-16 text-white/50" />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Button */}
              <div className="p-8">
                <motion.button
                  onClick={handleConnect}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${
                    isActive
                      ? "bg-red-500/20 border-2 border-red-500 text-red-400"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-600/50"
                  } disabled:opacity-50`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {isActive ? "Stopping..." : "Connecting..."}
                    </span>
                  ) : isActive ? (
                    "End Conversation"
                  ) : (
                    "Start Conversation"
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}