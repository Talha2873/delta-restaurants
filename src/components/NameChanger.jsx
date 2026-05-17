import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, X, Check, RefreshCw } from 'lucide-react'

const presets = [
  "The Grand Table",
  "Bella Napoli",
  "Azure Bistro",
  "Sakura Fine Dining",
  "Casa Moreno",
  "Le Petit Maison",
  "The Golden Fork",
]

export default function NameChanger({ name, onChangeName }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState(name)

  const apply = (val) => {
    const trimmed = (val || input).trim()
    if (trimmed) { onChangeName(trimmed); setInput(trimmed); setOpen(false) }
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 glass-dark px-5 py-3 rounded-full shadow-2xl"
        style={{ border: '1px solid rgba(212,175,55,0.3)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        title="Change restaurant name for demo"
      >
        <Settings size={14} className="text-gold-500" />
        <span className="font-sans text-gold-500 text-xs tracking-wider uppercase">Demo</span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-8 z-50 glass-dark rounded-2xl p-6 w-72 shadow-2xl"
            style={{ border: '1px solid rgba(212,175,55,0.25)' }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-display text-white text-sm font-semibold">Demo Mode</div>
                <div className="font-sans text-white/30 text-[10px] mt-0.5 tracking-wider uppercase">Change restaurant name</div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="gold-line mb-4 opacity-30" />

            {/* Custom input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && apply()}
                placeholder="Restaurant name..."
                className="elegant-input flex-1 px-3 py-2.5 rounded-lg text-sm"
              />
              <button
                onClick={() => apply()}
                className="btn-gold px-3 py-2.5 rounded-lg"
              >
                <span><Check size={14} /></span>
              </button>
            </div>

            {/* Presets */}
            <div className="section-label text-[9px] mb-3 opacity-50">Quick presets</div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {presets.map(preset => (
                <button
                  key={preset}
                  onClick={() => { setInput(preset); apply(preset) }}
                  className={`w-full text-left px-3 py-2 rounded-lg font-sans text-xs transition-all ${
                    name === preset
                      ? 'bg-gold-500/15 text-gold-500 border border-gold-500/30'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}