import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonials } from '../utils/data'
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'star-filled fill-current' : 'star-empty'} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const timerRef = useRef(null)

  const go = (index) => {
    setDir(index > active ? 1 : -1)
    setActive((index + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => go(active + 1), 5000)
    return () => clearInterval(timerRef.current)
  }, [active])

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ opacity: 0, x: -dir * 40, scale: 0.97, transition: { duration: 0.4 } }),
  }

  const t = testimonials[active]

  return (
    <section id="testimonials" className="relative bg-dark-900 py-32 lg:py-48 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-4 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(-40%, -40%)' }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line w-12" />
            <span className="section-label">Voices</span>
            <div className="gold-line w-12" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-5xl lg:text-7xl font-bold text-white">
            What Guests <span className="gold-text italic">Say</span>
          </motion.h2>
        </motion.div>

        {/* Main testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          className="relative"
        >
          {/* Large quote mark */}
          <div className="absolute -top-8 -left-4 font-display text-[160px] text-gold-500/5 leading-none select-none pointer-events-none">"</div>

          <div className="glass rounded-3xl p-10 lg:p-16 relative" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  <StarRating rating={t.rating} />
                </div>

                {/* Quote */}
                <blockquote className="font-body text-xl lg:text-2xl text-white/75 italic leading-relaxed mb-10 max-w-3xl mx-auto">
                  "{t.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold-500/30"
                  />
                  <div className="text-left">
                    <div className="font-display text-white font-semibold text-lg">{t.name}</div>
                    <div className="font-sans text-gold-500/60 text-xs tracking-wider uppercase">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={() => go(active - 1)}
                className="w-10 h-10 rounded-full glass border-gold-500/20 flex items-center justify-center text-white/50 hover:text-gold-500 hover:border-gold-500/40 transition-all"
                style={{ borderColor: 'rgba(212,175,55,0.2)', border: '1px solid' }}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === active ? 'w-8 h-2 bg-gold-500' : 'w-2 h-2 bg-white/15 hover:bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(active + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-gold-500 transition-all"
                style={{ border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Avatar strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex justify-center mt-10 gap-[-8px]"
        >
          <div className="flex -space-x-3">
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => go(i)}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={`w-10 h-10 rounded-full object-cover border-2 transition-all duration-300 ${
                    i === active ? 'border-gold-500 scale-110' : 'border-dark-900 opacity-50 hover:opacity-80'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="font-sans text-white/30 text-sm ml-4 self-center">
            {testimonials.length}+ happy guests
          </span>
        </motion.div>
      </div>
    </section>
  )
}