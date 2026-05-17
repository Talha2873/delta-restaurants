import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { RESTAURANT } from '../config'

const tickerItems = [
  "Fine Dining", "Michelin Starred", "Private Events", "Wine Cellar",
  "Chef's Table", "Tasting Menu", "Curated Experience", "Award Winning",
]

export default function Hero({ restaurantName }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] flex flex-col overflow-hidden">
      {/* Video background */}
      <video poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        src="https://cdn.coverr.co/videos/coverr-a-chef-cooking-in-a-restaurant-kitchen-1580/1080p.mp4"
      />

      {/* Multi-layer overlay for cinematic look */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/40 to-dark-900/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 via-transparent to-dark-900/40" />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,8,4,0.7) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="gold-line w-12" />
          <span className="section-label">Est. 2006 · New York</span>
          <div className="gold-line w-12" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-2"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {restaurantName || RESTAURANT.name}
        </motion.h1>

        {/* Gold accent line */}
        <motion.div
          className="gold-line w-64 my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 3.0, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Tagline */}
        <motion.p
          className="font-body text-2xl md:text-3xl text-gold-400 italic mb-4 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.1 }}
        >
          {RESTAURANT.tagline}
        </motion.p>

        <motion.p
          className="font-sans text-white/50 text-sm max-w-md leading-relaxed mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          {RESTAURANT.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.3 }}
        >
          <button
            onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-10 py-4 rounded-full text-sm"
          >
            <span>Reserve Your Table</span>
          </button>
          <button
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline px-10 py-4 rounded-full"
          >
            Explore Menu
          </button>
        </motion.div>
      </div>

      {/* Ticker */}
      <motion.div
        className="relative z-10 ticker-wrap py-4 border-t border-gold-500/10 bg-dark-900/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.5 }}
      >
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-4 text-white/30 font-sans text-[11px] uppercase tracking-[0.3em]">
              {item}
              <span className="text-gold-500 text-lg">·</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-24 right-8 z-10 flex flex-col items-center gap-2 text-white/30 hover:text-gold-500 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
      >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}