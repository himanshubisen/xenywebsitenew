"use client"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"

interface VoiceAgentProps {
  onClose: () => void
}

export default function VoiceAgent({ onClose }: VoiceAgentProps) {
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    // Simulate connection delay
    setTimeout(() => {
      setIsActive(true)
      setIsLoading(false)
      // Simulate speaking after connection
      setTimeout(() => {
        setIsSpeaking(true)
        setTimeout(() => {
          setIsSpeaking(false)
        }, 3000)
      }, 500)
    }, 1500)
  }

  const handleDisconnect = () => {
    setIsActive(false)
    setIsSpeaking(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl w-full max-w-md overflow-hidden border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">AI Voice Agent</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Status Text */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">AI Voice Agent Ready</h3>
              <p className="text-sm text-slate-400">
                {isLoading ? "Connecting..." : isActive ? "Connected - Ready to talk" : "Click to start conversation"}
              </p>
            </div>

            {/* Animated Voice Visualization */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Outer glow ring with pulsate effect */}
              <div
                className={`absolute inset-0 rounded-full border-2 border-cyan-400/30 ${
                  isActive ? "animate-pulse" : ""
                }`}
                style={{
                  animation: isActive ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
                }}
              />

              {/* Middle ring with gradient */}
              <div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-400/50"
                style={{
                  animation: isActive ? "scale-pulse 1.5s ease-in-out infinite" : "none",
                }}
              />

              {/* Dot pattern ring */}
              <div
                className="absolute inset-12 rounded-full border-4 border-transparent"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(139, 92, 246, 0.6) 2px, transparent 2px)`,
                  backgroundSize: "12px 12px",
                  animation: isSpeaking ? "rotate 3s linear infinite" : "none",
                }}
              />

              {/* Sound wave animation left */}
              {isSpeaking && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`left-${i}`}
                      className="h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"
                      style={{
                        width: `${20 + i * 15}px`,
                        animation: `wave-left 0.8s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Sound wave animation right */}
              {isSpeaking && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`right-${i}`}
                      className="h-1 bg-gradient-to-l from-purple-500 to-transparent rounded-full"
                      style={{
                        width: `${20 + i * 15}px`,
                        animation: `wave-right 0.8s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Center microphone icon with gradient circle */}
              <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-purple-500/50 z-10">
                {isLoading ? (
                  <Loader2 className="text-white animate-spin" size={32} />
                ) : (
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.5 14.47 16 12 16s-4.52-1.5-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1.01 1.14.9 5.09 5.05 8.86 10.92 8.86s10.02-3.77 10.92-8.86c.08-.6-.4-1.14-1.01-1.14z" />
                  </svg>
                )}
              </div>

              {/* Sparkle decorations */}
              <div className="absolute top-4 right-8 text-2xl animate-bounce" style={{ animationDuration: "2s" }}>
                ✨
              </div>
              <div
                className="absolute bottom-8 left-4 text-2xl"
                style={{
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                ✨
              </div>
            </div>

            {/* Control Button */}
            <button
              onClick={isActive ? handleDisconnect : handleConnect}
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30"
                  : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Connecting..." : isActive ? "Disconnect" : "Start Conversation"}
            </button>

            {/* Info text */}
            <p className="text-xs text-slate-500 text-center">Your conversation is secure and private</p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes scale-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes wave-left {
          0%,
          100% {
            width: 20px;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes wave-right {
          0%,
          100% {
            width: 20px;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}
