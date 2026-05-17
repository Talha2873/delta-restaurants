import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { RESTAURANT } from '../config'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportConfig } from '../utils/animations'

function Counter({ value, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    let current = 0
    const increment = value / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, stepTime)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center group">
      <div className="counter-num gold-text">
        {count}{suffix}
      </div>
      <div className="gold-line w-12 mx-auto my-3 opacity-60" />
      <div className="font-sans text-white/50 text-xs uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="about" ref={sectionRef} className="relative bg-dark-900 py-32 lg:py-48 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex items-center gap-4 mb-16"
        >
          <div className="gold-line w-12" />
          <span className="section-label">Our Story</span>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          {/* Left: Parallax image collage */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Main image */}
              <div className="parallax-wrap absolute inset-0 rounded-2xl overflow-hidden">
                <motion.img
                  style={{ y: imageY }}
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
                  alt="Restaurant interior"
                  className="w-full h-[120%] object-cover"
                />
              </div>

              {/* Floating card */}
              <motion.div
                className="glass absolute -bottom-8 -right-8 p-6 rounded-2xl w-52"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="font-display text-4xl font-bold gold-text">18+</div>
                <div className="font-sans text-white/50 text-xs mt-1 tracking-wide">Years crafting exceptional experiences</div>
              </motion.div>

              {/* Accent box */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-gold-500/20 rounded-xl" />
            </div>

            {/* Second image */}
            <div className="absolute top-8 -right-12 w-44 h-56 rounded-xl overflow-hidden hidden lg:block border-2 border-dark-900">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80"
                alt="Chef"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              A Tradition of <span className="gold-text italic">Excellence</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="gold-line w-24 mb-8" />

            <motion.p variants={fadeUp} className="font-body text-white/60 text-lg leading-relaxed mb-6">
              Born from a passion for the finest ingredients and a reverence for classical technique,
              {' '}{RESTAURANT.name} has been a cornerstone of fine dining since 2006. Our philosophy
              is simple: source the extraordinary, treat it with respect, and present it with artistry.
            </motion.p>

            <motion.p variants={fadeUp} className="font-body text-white/40 text-base leading-relaxed mb-10">
              Every dish tells a story — of provenance, of craftsmanship, of the hands that cultivated
              and prepared it. Our team of world-class chefs travel the globe to discover techniques
              and ingredients that inspire our ever-evolving tasting menus.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-6">
              <button
                onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold px-8 py-4 rounded-full"
              >
                <span>Book a Table</span>
              </button>
              <button
                onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline px-8 py-4 rounded-full"
              >
                Our Menu
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="glass rounded-3xl p-12 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {RESTAURANT.stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}