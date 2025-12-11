"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const geometry = new THREE.IcosahedronGeometry(2, 2)
    const material = new THREE.MeshNormalMaterial({ wireframe: true, transparent: true, opacity: 0.15 })
    const orb = new THREE.Mesh(geometry, material)
    scene.add(orb)

    camera.position.z = 6

    const animate = () => {
      requestAnimationFrame(animate)
      orb.rotation.y += 0.002
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      id="hero-canvas"
    />
  )
}