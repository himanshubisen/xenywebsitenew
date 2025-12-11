"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })

    // Set renderer size and pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create globe with earth-like appearance
    const globeGeometry = new THREE.SphereGeometry(3, 64, 64)
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a5fb4,
      specular: 0x111111,
      shininess: 30,
      transparent: true,
      opacity: 0.8
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)

    // Add subtle clouds
    const cloudGeometry = new THREE.SphereGeometry(3.1, 64, 64)
    const cloudMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3
    })
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial)
    scene.add(clouds)

    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Position camera
    camera.position.z = 8

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Slow rotation
      globe.rotation.y += 0.001
      clouds.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}