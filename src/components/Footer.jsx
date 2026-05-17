import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { RESTAURANT } from '../config'
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations'

export default function Footer({ restaurantName }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer id="contact" className="footer-gradient relative overflow-hidden">
      {/* Decorative top */}
      <div className="gold-line w-full opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-1"
          >
            <motion.div variants={fadeUp}>
              <div className="font-display text-3xl font-bold gold-text mb-1">
                {restaurantName || RESTAURANT.name}
              </div>
              <div className="section-label text-[9px] mb-6">{RESTAURANT.subtitle}</div>
              <div className="gold-line w-16 mb-6" />
              <p className="font-body text-white/35 text-sm leading-relaxed mb-8">
                An experience that transcends dining. A journey into artistry, flavor, and memory.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, href: RESTAURANT.socials.instagram },
                  { Icon: Facebook, href: RESTAURANT.socials.facebook },
                  { Icon: Twitter, href: RESTAURANT.socials.twitter },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-gold-500 hover:border-gold-500/30 transition-all"
                    style={{ border: '1px solid rgba(212,175,55,0.15)' }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeUp} className="section-label mb-6">Contact</motion.div>
            <div className="space-y-4">
              {[
                { Icon: MapPin, text: RESTAURANT.address },
                { Icon: Phone, text: RESTAURANT.phone },
                { Icon: Mail, text: RESTAURANT.email },
              ].map(({ Icon, text }, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-3 items-start">
                  <Icon size={14} className="text-gold-500/50 mt-0.5 shrink-0" />
                  <span className="font-body text-white/40 text-sm">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeUp} className="section-label mb-6">Opening Hours</motion.div>
            <div className="space-y-3">
              {[
                { days: 'Monday – Friday', time: '12PM – 10PM' },
                { days: 'Saturday', time: '10AM – 11PM' },
                { days: 'Sunday', time: '10AM – 11PM' },
                { days: 'Bar & Lounge', time: 'Until 1AM' },
              ].map((h, i) => (
                <motion.div key={i} variants={fadeUp} className="flex justify-between gap-4">
                  <span className="font-body text-white/35 text-sm">{h.days}</span>
                  <span className="font-sans text-gold-500/60 text-xs tracking-wider whitespace-nowrap">{h.time}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-6 glass rounded-xl p-4" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Clock size={12} className="text-gold-500" />
                <span className="section-label text-[9px]">Last seating</span>
              </div>
              <span className="font-body text-white/50 text-sm">Kitchen closes 30 min before closing</span>
            </motion.div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeUp} className="section-label mb-6">Newsletter</motion.div>
            <motion.p variants={fadeUp} className="font-body text-white/35 text-sm mb-6 leading-relaxed">
              Receive seasonal menus, exclusive events & private dining invitations.
            </motion.p>
            {!subscribed ? (
              <motion.form variants={fadeUp} onSubmit={handleNewsletter}>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="elegant-input flex-1 px-4 py-3 rounded-xl text-sm"
                  />
                  <button type="submit" className="btn-gold px-4 py-3 rounded-xl shrink-0">
                    <span><Send size={14} /></span>
                  </button>
                </div>
                <p className="font-sans text-white/20 text-[10px] mt-3">No spam. Unsubscribe anytime.</p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-4 border-gold-500/20 text-center"
                style={{ border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <div className="font-display text-gold-500 text-sm">Welcome to the table.</div>
                <div className="font-body text-white/35 text-xs mt-1">You're now on the guest list.</div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="gold-line opacity-20 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-white/20 text-xs">
            © {new Date().getFullYear()} {restaurantName || RESTAURANT.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(link => (
              <a key={link} href="#" className="font-sans text-white/20 hover:text-gold-500/60 text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="font-sans text-white/10 text-xs">
            Crafted with excellence
          </p>
        </div>
      </div>
    </footer>
  )
}