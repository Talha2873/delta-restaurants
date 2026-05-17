import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { RESTAURANT } from '../config'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ restaurantName }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'glass-dark shadow-2xl shadow-black/50' : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => scrollTo('#hero')} className="flex flex-col items-start gap-0.5">
              <span className="font-display text-xl font-bold text-white tracking-wide leading-none">
                {restaurantName || RESTAURANT.name}
              </span>
              <span className="section-label text-[9px]">{RESTAURANT.subtitle}</span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-sans text-sm text-white/60 hover:text-gold-500 transition-colors duration-300 tracking-wider uppercase text-[11px]"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a href={`tel:${RESTAURANT.phone}`} className="flex items-center gap-2 text-gold-500/70 hover:text-gold-500 transition-colors">
                <Phone size={14} />
                <span className="font-sans text-[11px] tracking-wider">{RESTAURANT.phone}</span>
              </a>
              <button
                onClick={() => scrollTo('#reservation')}
                className="btn-gold px-6 py-3 rounded-full text-[11px]"
              >
                <span>Reserve a Table</span>
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close */}
            <button className="absolute top-6 right-6 text-white/60" onClick={() => setMobileOpen(false)}>
              <X size={28} />
            </button>

            <div className="font-display text-3xl font-bold gold-text mb-4">{restaurantName || RESTAURANT.name}</div>
            <div className="gold-line w-24" />

            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="font-display text-3xl text-white/80 hover:text-gold-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => scrollTo('#reservation')}
              className="btn-gold px-10 py-4 rounded-full mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>Reserve a Table</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}