import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuData } from '../utils/data'
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations'

const tabs = [
  { key: 'food', label: 'À La Carte' },
  { key: 'drinks', label: 'Beverages' },
  { key: 'desserts', label: 'Desserts' },
]

function MenuCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group glass rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-2"
      style={{ borderColor: 'rgba(212,175,55,0.1)' }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />

        {/* Tag */}
        {item.tag && (
          <span className="absolute top-3 right-3 bg-gold-500/90 text-dark-900 text-[10px] font-sans font-medium uppercase tracking-widest px-2.5 py-1 rounded-full">
            {item.tag}
          </span>
        )}

        {/* Price on hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(10,8,4,0.5)' }}
        >
          <span className="font-display text-4xl font-bold gold-text">{item.price}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg text-white leading-tight">{item.name}</h3>
          <span className="font-display text-gold-500 text-lg font-semibold shrink-0">{item.price}</span>
        </div>
        <p className="font-body text-white/45 text-sm leading-relaxed">{item.description}</p>

        {/* Add to inquiry line */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <button className="font-sans text-[10px] text-gold-500/60 hover:text-gold-500 uppercase tracking-widest transition-colors flex items-center gap-2">
            Add to Reservation
            <span className="text-lg leading-none">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('food')

  return (
    <section id="menu" className="relative bg-dark-800 py-32 lg:py-48 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-3 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line w-12" />
            <span className="section-label">Culinary Journey</span>
            <div className="gold-line w-12" />
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display text-5xl lg:text-7xl font-bold text-white mb-4">
            Our <span className="gold-text italic">Menu</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="font-body text-white/40 text-lg max-w-xl mx-auto">
            Crafted with passion, sourced with integrity, presented with artistry
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex justify-center mb-12"
        >
          <div className="glass rounded-full p-1.5 flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-8 py-3 rounded-full font-sans text-sm tracking-wider transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'text-gold-500 bg-gold-500/10 border border-gold-500/30'
                    : 'text-white/40 hover:text-white/70 border border-transparent'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-full bg-gold-500/10 border border-gold-500/30"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {menuData[activeTab].map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Full menu CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mt-16"
        >
          <div className="gold-line w-48 mx-auto mb-8" />
          <p className="font-body text-white/30 italic mb-6">Seasonal tasting menu available — 7 & 10 courses</p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline px-10 py-4 rounded-full"
          >
            Request Full Menu PDF
          </button>
        </motion.div>
      </div>
    </section>
  )
}