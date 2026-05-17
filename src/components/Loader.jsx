import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RESTAURANT } from '../config'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); return 100 }
        return p + Math.random() * 15 + 5
      })
    }, 120)

    const hideTimer = setTimeout(() => setVisible(false), 2200)
    return () => { clearInterval(timer); clearTimeout(hideTimer) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99997] flex flex-col items-center justify-center bg-dark-900"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[500px] h-[500px] rounded-full border border-gold-500/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full border border-gold-500/8"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="section-label mb-4 opacity-60">Welcome to</div>
            <h1 className="font-display text-5xl font-bold gold-text tracking-wide">
              {RESTAURANT.name}
            </h1>
            <div className="gold-line w-32 mx-auto mt-6" />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-64"
          >
            <div className="flex justify-between mb-2">
              <span className="section-label text-[9px] opacity-40">Loading experience</span>
              <span className="font-sans text-[11px] text-gold-500/60">{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <div className="h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-700 via-gold-500 to-gold-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}