"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap, faTruckLoading, faCoins, faMagnet, faPhoneAlt, faUserPlus, faFileInvoiceDollar, faMicrophoneAlt, faClock, faCalendarCheck, faGlobe, faFilter, faPaperPlane, faCalendarAlt, faSearch, faCheckCircle, faHistory, faCreditCard, faChartBar, faRoute, faBoxOpen, faClipboardCheck, faChartPie, faRocket, faPhoneVolume, faHeadset, faChartLine, faBolt, faRobot, faBrain, faSearch as faSearchIcon, faPlay, faChevronDown, faLock, faCheck, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { faAmazon, faGoogle, faSpotify, faAirbnb, faUber, faStripe, faMicrosoft, faSalesforce, faHubspot, faWhatsapp, faSlack } from "@fortawesome/free-brands-svg-icons"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileCallInput from "@/components/mobile-call-input"
import FloatingBotIcon from "@/components/floating-bot-icon"
import VoiceAgent from "@/components/voice-agent"
import WebVoiceAgent from "@/components/web-voice-agent"

export default function Home() {
  const [showVoiceAgent, setShowVoiceAgent] = useState(false)
  const [showWebBot, setShowWebBot] = useState(false)

  // Calculator state
  const [callVolume, setCallVolume] = useState(5000)
  const [agentCost, setAgentCost] = useState(20)
  const [callDuration, setCallDuration] = useState(5)

  // Active tab states
  const [activeUseCaseTab, setActiveUseCaseTab] = useState('growth')
  const [activeServiceTab, setActiveServiceTab] = useState('edu')

  // Calculate savings
  const calculateSavings = () => {
    // Calculate manual cost: (callVolume * callDuration / 60) * agentCost
    const manualCost = (callVolume * callDuration / 60) * agentCost
    // AI cost is 10% of manual cost
    const aiCost = manualCost * 0.1
    const savings = manualCost - aiCost

    return {
      manualCost: manualCost.toFixed(2),
      aiCost: aiCost.toFixed(2),
      savings: savings.toFixed(2),
      aiBarWidth: (aiCost / manualCost * 100).toFixed(2) + '%'
    }
  }

  const { manualCost, aiCost, savings, aiBarWidth } = calculateSavings()

  // Text reveal animation
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setRevealedSections(prev => new Set(prev).add(entry.target.id))
        }
      })
    }, { threshold: 0.2, rootMargin: "0px 0px -100px 0px" })

    document.querySelectorAll('[data-reveal]').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Three.js hero animation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('three').then(THREE => {
        const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement
        if (!canvas) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
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
        }
      })
    }
  }, [])

  // Lenis smooth scroll
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/lib/lenis').then(Lenis => {
        const lenis = new Lenis.default({
          lerp: 0.1
        })

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
          lenis.destroy()
        }
      })
    }
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50"
    >
      {/* HERO BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas id="hero-canvas"></canvas>
      </div>

      {/* NAVBAR */}
      <Header onDemoClick={() => setShowVoiceAgent(true)} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm mb-8 animate-float mx-auto">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Built for High Volume</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-slate-900">
            AI Agents That <br />
            <span className="bg-gradient-to-r from-indigo-600 via-pink-500 to-violet-500 bg-clip-text text-transparent bg-[length:300%_auto] animate-gradient-flow">
              Accelerate Business
            </span>
          </h1>

          <p className="text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
            Seamlessly automate customer conversations with multilingual, human-like AI agents that engage instantly, qualify with precision, and resolve routine conversations at scale.
          </p>

          {/* DIRECT HERO INPUT */}
          <div className="w-full max-w-md bg-white p-3 rounded-[24px] shadow-lg border border-slate-200 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col gap-2">
              <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                <div className="flex items-center gap-2 border-r border-slate-300 pr-3 mr-3 cursor-pointer">
                  <span className="fi fi-in rounded-sm text-lg shadow-sm"></span>
                  <span className="text-slate-800 font-bold text-sm">+91</span>
                  <FontAwesomeIcon icon={faChevronDown} className="text-[10px] text-slate-400" />
                </div>
                <input type="tel" placeholder="98765 43210" className="bg-transparent w-full outline-none text-slate-900 font-bold placeholder-slate-400 text-lg h-full" />
              </div>

              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3 text-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Receive AI Call Now
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faLock} /> Free demo • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <div className="bg-white border-y border-slate-100 py-10 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex animate-scroll w-[200%] gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <FontAwesomeIcon icon={faAmazon} className="text-4xl hover:text-[#FF9900] transition-colors" />
          <FontAwesomeIcon icon={faGoogle} className="text-3xl hover:text-[#4285F4] transition-colors" />
          <FontAwesomeIcon icon={faSpotify} className="text-4xl hover:text-[#1DB954] transition-colors" />
          <FontAwesomeIcon icon={faAirbnb} className="text-4xl hover:text-[#FF5A5F] transition-colors" />
          <FontAwesomeIcon icon={faUber} className="text-4xl hover:text-black transition-colors" />
          <FontAwesomeIcon icon={faStripe} className="text-5xl hover:text-[#635BFF] transition-colors" />
          <FontAwesomeIcon icon={faMicrosoft} className="text-3xl hover:text-[#F25022] transition-colors" />
          <FontAwesomeIcon icon={faAmazon} className="text-4xl hover:text-[#FF9900] transition-colors" />
          <FontAwesomeIcon icon={faGoogle} className="text-3xl hover:text-[#4285F4] transition-colors" />
        </div>
      </div>

      {/* 2. FAST TRACK SUCCESS (KPIs) */}
      <section id="stats" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Fast-Track Business Success</h2>
            <p className="text-slate-500">Real impact on your bottom line.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            <div className="group"><div className="text-4xl font-bold text-indigo-600 mb-2">90%</div><p className="text-xs font-bold uppercase text-slate-400">Call Automation</p></div>
            <div className="group"><div className="text-4xl font-bold text-green-500 mb-2">90%</div><p className="text-xs font-bold uppercase text-slate-400">Lower Manpower</p></div>
            <div className="group"><div className="text-4xl font-bold text-blue-500 mb-2">50%</div><p className="text-xs font-bold uppercase text-slate-400">Fewer Errors</p></div>
            <div className="group"><div className="text-4xl font-bold text-orange-500 mb-2">60%</div><p className="text-xs font-bold uppercase text-slate-400">Cost Reduction</p></div>
            <div className="group"><div className="text-4xl font-bold text-purple-500 mb-2">60%</div><p className="text-xs font-bold uppercase text-slate-400">More SQLs</p></div>
            <div className="group"><div className="text-4xl font-bold text-pink-500 mb-2">10X</div><p className="text-xs font-bold uppercase text-slate-400">Jump in Conversions</p></div>
          </div>
        </div>
      </section>

      {/* NEW: CALCULATOR SECTION */}
      <section id="calculator" className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Calculate Your Savings</h2>
            <p className="text-slate-500">See how much you save by switching to AI voice agents.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Monthly Call Volume</label>
                    <span className="text-sm font-bold text-indigo-600">{callVolume.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={callVolume}
                    onChange={(e) => setCallVolume(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Agent Hourly Cost ($)</label>
                    <span className="text-sm font-bold text-indigo-600">${agentCost}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={agentCost}
                    onChange={(e) => setAgentCost(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Avg Call Duration (Mins)</label>
                    <span className="text-sm font-bold text-indigo-600">{callDuration}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={callDuration}
                    onChange={(e) => setCallDuration(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 px-4 py-1 rounded-bl-2xl text-xs font-bold text-white uppercase">Live Estimate</div>
              <div className="mb-8">
                <p className="text-slate-400 text-sm font-medium mb-1">Estimated Monthly Savings</p>
                <div className="text-5xl font-bold text-green-400">${savings}</div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Manual Cost</span>
                    <span className="font-bold text-red-400">${manualCost}</span>
                  </div>
                  <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{width: "100%"}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">AI Cost</span>
                    <span className="font-bold text-blue-400">${aiCost}</span>
                  </div>
                  <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{width: aiBarWidth}}></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-white">10X</p>
                  <p className="text-xs text-slate-400">ROI Multiplier</p>
                </div>
                <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors">Start Saving</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT POWERS EVERY CALL (Features) */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Powers Every Call</h2>
            <p className="text-slate-500">The technology stack behind the voice.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">01</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Multilingual AI Agent</h3>
              <p className="text-sm text-slate-600">Speaks naturally, handles interruptions, and switches languages mid-call - no IVR, no robotic pauses.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">02</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">LLM-Powered Understanding</h3>
              <p className="text-sm text-slate-600">Understands meaning, tone, and context to respond, clarify, and adjust the flow in real time.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">03</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smooth Handoff</h3>
              <p className="text-sm text-slate-600">When a lead shows intent, AI hands off instantly with full context—no repeats, no friction.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">04</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Post-Call Actions</h3>
              <p className="text-sm text-slate-600">Sends confirmations, reminders, messages, quotes, or summaries automatically right after the call.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
              <div className="text-4xl font-bold text-slate-200 mb-4 group-hover:text-indigo-600 transition-colors">05</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Interruption Handling</h3>
              <p className="text-sm text-slate-600">Stays on track through noise, overlap, or sudden questions and adapts without breaking the flow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES (Service Tabs) */}
      <section id="industries" className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Network. <br /> Your Growth.</h2>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                    className={`px-8 py-3 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${
              activeServiceTab === 'edu'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
                    onClick={() => setActiveServiceTab('edu')}
                >
                    <FontAwesomeIcon icon={faGraduationCap} /> Education
                </button>
                <button
                    className={`px-8 py-3 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${
              activeServiceTab === 'logistics'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
                    onClick={() => setActiveServiceTab('logistics')}
                >
                    <FontAwesomeIcon icon={faTruckLoading} /> Logistics
                </button>
                <button
                    className={`px-8 py-3 rounded-full text-sm font-bold border flex items-center gap-2 transition-all ${
              activeServiceTab === 'finance_serv'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
                    onClick={() => setActiveServiceTab('finance_serv')}
                >
                    <FontAwesomeIcon icon={faCoins} /> Financial Services
                </button>
            </div>
          </div>

          {/* SERVICE CONTENT: EDUCATION */}
          {activeServiceTab === 'edu' && (
            <div className="max-w-4xl mx-auto grid gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                    <FontAwesomeIcon icon={faChartBar} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">1M+</h3>
                    <p className="text-slate-500 leading-snug">leads qualified across universities</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 text-xl">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">7x</h3>
                    <p className="text-slate-500 leading-snug">more outreach in half the time</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-xl">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">78%</h3>
                    <p className="text-slate-500 leading-snug">inquiries resolved autonomously</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
                    <i className="fas fa-history"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">99.8%</h3>
                    <p className="text-slate-500 leading-snug">uptime during peak admission</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICE CONTENT: LOGISTICS */}
          {activeServiceTab === 'logistics' && (
            <div className="max-w-4xl mx-auto grid gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">8M+</h3>
                    <p className="text-slate-500 leading-snug">deliveries coordinated</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 text-xl">
                    <i className="fas fa-route"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">46%</h3>
                    <p className="text-slate-500 leading-snug">reduction in last mile costs</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-xl">
                    <i className="fas fa-box-open"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">92%</h3>
                    <p className="text-slate-500 leading-snug">queries handled without humans</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
                    <i className="fas fa-clipboard-check"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">99.9%</h3>
                    <p className="text-slate-500 leading-snug">uptime during peak shipping</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICE CONTENT: FINANCE */}
          {activeServiceTab === 'finance_serv' && (
            <div className="max-w-4xl mx-auto grid gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-xl">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">5.2M+</h3>
                    <p className="text-slate-500 leading-snug">financial conversations handled</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 text-xl">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">8x</h3>
                    <p className="text-slate-500 leading-snug">more productive than outbound</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-xl">
                    <i className="fas fa-phone-volume"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">83%</h3>
                    <p className="text-slate-500 leading-snug">queries resolved autonomously</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">99.9%</h3>
                    <p className="text-slate-500 leading-snug">uptime during tax seasons</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. USE CASE TABS (With Pointers) */}
      <section id="use-cases" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Callers AI Use Cases</h2>
            <p className="text-lg text-slate-500">Automated workflows that ease workload.</p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
                  activeUseCaseTab === 'growth'
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => setActiveUseCaseTab('growth')}
              >
                Growth & Sales
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
                  activeUseCaseTab === 'ops'
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => setActiveUseCaseTab('ops')}
              >
                HR & Logistics
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
                  activeUseCaseTab === 'finance'
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => setActiveUseCaseTab('finance')}
              >
                Finance & Support
              </button>
            </div>
          </div>

          {/* TAB CONTENT: GROWTH */}
          {activeUseCaseTab === 'growth' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl mb-6">
                  <FontAwesomeIcon icon={faMagnet} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Lead Generation</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                      <i className="fas fa-filter"></i>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Screen prospects</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                      <i className="fas fa-paper-plane"></i>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Automate outreach</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">3M+</div>
                    <div className="text-xs text-slate-400">Calls done</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">5</div>
                    <div className="text-xs text-slate-400">Projects</div>
                  </div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  <i className="fas fa-play text-xs mr-2"></i> Live Call
                </button>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl mb-6">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Appointments</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Real-time booking</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Reschedule logic</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">180K+</div>
                    <div className="text-xs text-slate-400">Processed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">15</div>
                    <div className="text-xs text-slate-400">Clients</div>
                  </div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  <i className="fas fa-play text-xs mr-2"></i> Live Call
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT: OPS */}
          {activeUseCaseTab === 'ops' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-2xl mb-6">
                  <i className="fas fa-user-plus"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Recruitment</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                      <i className="fas fa-search"></i>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Screen candidates</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Qualify skills</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">120K+</div>
                    <div className="text-xs text-slate-400">Calls</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">10</div>
                    <div className="text-xs text-slate-400">Active</div>
                  </div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  <i className="fas fa-play text-xs mr-2"></i> Live Call
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT: FINANCE */}
          {activeUseCaseTab === 'finance' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl mb-6">
                  <i className="fas fa-file-invoice-dollar"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Collections</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                      <i className="fas fa-history"></i>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Identify overdue</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600">
                      <i className="fas fa-credit-card"></i>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Secure payments</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">150K+</div>
                    <div className="text-xs text-slate-400">Calls</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">12</div>
                    <div className="text-xs text-slate-400">Campaigns</div>
                  </div>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  <i className="fas fa-play text-xs mr-2"></i> Live Call
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* NEW: INSIGHTS SECTION (90M+ Calls) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">What we learned from <br /> 90M+ completed calls</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">
                  <i className="fas fa-microphone-alt"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900">73% of Customers Prefer Voice!</h3>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">Most customers love voice, so you connect better and win more trust. <strong>Get the edge.</strong></p>

              <div className="relative h-48 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 p-6 flex items-center justify-center overflow-hidden">
                <div className="absolute right-0 top-0 opacity-20">
                  <i className="fas fa-chart-pie text-9xl text-white"></i>
                </div>
                <div className="relative z-10 flex gap-8 items-center text-white">
                  <div className="w-24 h-24 rounded-full border-8 border-white/30 border-t-white flex items-center justify-center text-xl font-bold">73%</div>
                  <div>
                    <p className="text-2xl font-bold">Voice</p>
                    <p className="text-sm opacity-80">Preferred Channel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-all flex gap-4 items-start">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Speed to Lead</h4>
                  <p className="text-sm text-slate-500">Contacting a lead within 1 minute increases conversion by 391%.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-all flex gap-4 items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Follow-up Frequency</h4>
                  <p className="text-sm text-slate-500">6+ follow-up attempts are needed to reach 90% of leads.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-all flex gap-4 items-start">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
                  <i className="fas fa-globe"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Local Presence</h4>
                  <p className="text-sm text-slate-500">Local caller IDs increase pickup rates by 400%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: UP AND RUNNING IN 3 DAYS */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-16">Up and Running In 3 Days</h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] w-[68%] h-0.5 bg-slate-200 -z-10"></div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 border-4 border-white">1</div>
              <h4 className="font-bold text-lg mb-2">Connect</h4>
              <p className="text-sm text-slate-500">Sync your CRM and upload leads.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 border-4 border-white">2</div>
              <h4 className="font-bold text-lg mb-2">Configure</h4>
              <p className="text-sm text-slate-500">Choose agent voice and script.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 border-4 border-white">3</div>
              <h4 className="font-bold text-lg mb-2">Launch</h4>
              <p className="text-sm text-slate-500">Start calling and scaling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: SEAMLESS INTEGRATIONS (Hub style) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">Seamless Integrations, <br /> Seamless Actions</h2>

          <div className="relative max-w-3xl mx-auto h-[400px] flex items-center justify-center">
            {/* Center Hub */}
            <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center z-10 relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                <i className="fas fa-bolt"></i>
              </div>
            </div>

            {/* Orbiting Logos */}
            <div className="absolute inset-0 animate-spin" style={{animationDuration: '40s'}}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-blue-600">
                <FontAwesomeIcon icon={faSalesforce} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-orange-500">
                <FontAwesomeIcon icon={faHubspot} />
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-green-500">
                <FontAwesomeIcon icon={faWhatsapp} />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-purple-500">
                <FontAwesomeIcon icon={faSlack} />
              </div>
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 0}}>
              <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </section>

      {/* NEW: ASK THE AI SECTION */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Still not sure if Callers is right for you?</h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto text-lg">Let ChatGPT, Claude, or Perplexity do the thinking for you. Click a button and see what your favorite AI says about Callers.</p>

          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
            <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#4129F9] hover:bg-[#3520D0] text-white py-5 px-8 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
              <i className="fas fa-robot text-xl"></i> Ask ChatGPT
            </a>
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#D97757] hover:bg-[#C56545] text-white py-5 px-8 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
              <i className="fas fa-brain text-xl"></i> Ask Claude
            </a>
            <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#1A7F85] hover:bg-[#14686D] text-white py-5 px-8 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
              <i className="fas fa-search text-xl"></i> Ask Perplexity
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 flex justify-center">
          <div className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100 max-w-lg w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">C'mon, Make That Call!</h3>
              <p className="text-slate-500 text-sm">Try Callers – Meet Paul / Cassie</p>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer group">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
                  alt="Cassie"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 transition-all duration-300"
                />
                <div className="absolute bottom-3 left-3 text-white font-bold drop-shadow-md">Cassie</div>
              </div>
              <div className="flex-1 relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer ring-4 ring-indigo-600 shadow-lg transform scale-105">
                <div className="absolute top-3 left-3 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md z-10">
                  <i className="fas fa-check"></i>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
                  alt="Paul"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="font-bold text-lg">Paul</div>
                  <div className="text-[10px] opacity-90">(Male AI Agent)</div>
                </div>
              </div>
            </div>

            <div className="flex items-center border border-slate-200 rounded-2xl px-4 py-3 mb-4 bg-slate-50 shadow-inner">
              <div className="flex items-center gap-2 border-r border-slate-300 pr-3 mr-3 cursor-pointer">
                <span className="fi fi-in rounded-sm text-xl shadow-sm"></span>
                <span className="text-slate-800 font-bold text-sm">+91</span>
                <i className="fas fa-chevron-down text-[10px] text-slate-400"></i>
              </div>
              <input type="tel" placeholder="081234 56789" className="bg-transparent w-full outline-none text-slate-900 font-bold placeholder-slate-400 text-lg" />
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 text-lg">
              <FontAwesomeIcon icon={faPhoneVolume} /> Receive AI Call
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* MODALS */}
      <MobileCallInput />
      <FloatingBotIcon onOpen={() => setShowWebBot(true)} />

      {showVoiceAgent && <VoiceAgent onClose={() => setShowVoiceAgent(false)} />}
      {showWebBot && <WebVoiceAgent onClose={() => setShowWebBot(false)} />}
    </motion.main>
  )
}
