"use client"

import { useEffect, useRef } from "react"

interface Node {
  id: number
  x: number
  y: number
  vx: number
  vy: number
}

export default function AnimatedNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Initialize nodes
    const nodeCount = 30
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))

    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Draw node
        ctx.fillStyle = "#3b82f6"
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)"
      ctx.lineWidth = 1
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const node1 = nodesRef.current[i]
          const node2 = nodesRef.current[j]
          const distance = Math.hypot(node2.x - node1.x, node2.y - node1.y)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node1.x, node1.y)
            ctx.lineTo(node2.x, node2.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ filter: "blur(0.5px)" }} />
}
