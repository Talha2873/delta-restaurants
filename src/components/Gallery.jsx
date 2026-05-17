import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { galleryImages } from '../utils/data'
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations'

function Lightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(5,3,2,0.96)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <img src={image.src} alt={image.alt} className="max-h-[85vh] max-w-full object-contain" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-900/80 to-transparent">
              <p className="font-body text-white/60 text-sm italic">{image.alt}</p>
            </div>
          </motion.div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-gold-500 transition-colors glass rounded-full p-3"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Gallery() {
  const [lightboxImg, setLightboxImg] = useState(null)

  return (
    <section id="gallery" className="relative bg-dark-900 py-32 lg:py-48 overflow-hidden">
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
            <span className="section-label">Visual Journey</span>
            <div className="gold-line w-12" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-5xl lg:text-7xl font-bold text-white">
            <span className="gold-text italic">Gallery</span>
          </motion.h2>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          className="masonry"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="masonry-item group relative rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              onClick={() => setLightboxImg(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: img.span === 'tall' ? '3/4' : '4/3' }}
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="glass rounded-full p-4 border-gold-500/30"
                >
                  <ZoomIn size={24} className="text-gold-500" />
                </motion.div>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/30 rounded-xl transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </section>
  )
}