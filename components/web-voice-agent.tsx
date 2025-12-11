"use client"

import { useState, useRef, useEffect } from "react"
import { X, Loader2, Mic, MicOff } from "lucide-react"
import { motion } from "framer-motion"

interface WebVoiceAgentProps {
  onClose: () => void
}

export default function WebVoiceAgent({ onClose }: WebVoiceAgentProps) {
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [status, setStatus] = useState("AI Voice Agent Ready")

  const wsRef = useRef<WebSocket | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)

  const wsServerUrl = "wss://devweb.xeny.ai"
  const environment = "wsprod"
  const voiceAgentId = "690ef1d4f5605ac44e4c233f"
  const serverUrl = `${wsServerUrl}/${environment}/${voiceAgentId}`

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext

      const source = audioContext.createMediaStreamSource(stream)
      sourceRef.current = source

      const processor = audioContext.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor

      source.connect(processor)
      processor.connect(audioContext.destination)

      processor.onaudioprocess = (e) => {
        if (!isActive || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return

        const inputData = e.inputBuffer.getChannelData(0)
        const buffer = new ArrayBuffer(inputData.length * 2)
        const view = new DataView(buffer)
        let offset = 0
        for (let i = 0; i < inputData.length; i++, offset += 2) {
          const sample = Math.max(-1, Math.min(1, inputData[i]))
          view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
        }
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(buffer)
        }
      }

      setStatus("Listening...")
    } catch (err) {
      console.error("Mic access denied", err)
      setStatus("Microphone access denied")
      setIsLoading(false)
    }
  }

  const stopMicrophone = () => {
    if (processorRef.current) {
      processorRef.current.disconnect()
      processorRef.current = null
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect()
      sourceRef.current = null
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
  }

  const handleConnect = async () => {
    if (isActive) {
      // STOP
      setIsLoading(true)
      setStatus("Stopping...")

      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }

      stopMicrophone()

      setIsActive(false)
      setIsSpeaking(false)
      setStatus("AI Voice Agent Ready")
      setIsLoading(false)
    } else {
      // START
      setIsLoading(true)
      setStatus("Connecting...")

      try {
        const ws = new WebSocket(serverUrl)

        ws.onopen = () => {
          console.log("WebSocket Connected")
          setIsActive(true)
          setIsLoading(false)
          setStatus("Listening...")
          startMicrophone()
        }

        ws.onmessage = (event) => {
          if (event.data instanceof Blob) {
            setIsSpeaking(true)
            const fileReader = new FileReader()
            fileReader.onload = () => {
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
              audioContext.decodeAudioData(fileReader.result as ArrayBuffer, (buffer) => {
                const source = audioContext.createBufferSource()
                source.buffer = buffer
                source.connect(audioContext.destination)
                source.start(0)
                source.onended = () => setIsSpeaking(false)
              }, (error) => {
                console.error("Audio decode error:", error)
                setIsSpeaking(false)
              })
            }
            fileReader.onerror = (error) => {
              console.error("FileReader error:", error)
              setIsSpeaking(false)
            }
            fileReader.readAsArrayBuffer(event.data)
          }
        }

        ws.onerror = (err) => {
          console.error("WebSocket error:", err)
          setStatus("Connection error")
        }

        ws.onclose = () => {
          console.log("WebSocket closed")
          setIsActive(false)
          setIsSpeaking(false)
          setStatus("AI Voice Agent Ready")
          stopMicrophone()
        }

        wsRef.current = ws
      } catch (error) {
        console.error("Connection failed:", error)
        setStatus("Failed to connect")
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close()
      stopMicrophone()
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