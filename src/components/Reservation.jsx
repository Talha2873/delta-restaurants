import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, CalendarDays, Clock, Users, User, Mail, Phone, FileText } from 'lucide-react'
import { RESTAURANT } from '../config'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportConfig } from '../utils/animations'

const times = ['12:00 PM','1:00 PM','2:00 PM','6:00 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM']

function InputField({ icon: Icon, label, type = 'text', name, value, onChange, placeholder, required }) {
  return (
    <div className="group">
      <label className="section-label text-[9px] block mb-2 text-gold-500/60">{label}</label>
      <div className="relative">
        <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/40 group-focus-within:text-gold-500 transition-colors" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="elegant-input w-full pl-10 pr-4 py-4 rounded-xl text-sm"
        />
      </div>
    </div>
  )
}

export default function Reservation() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="reservation" className="relative bg-dark-800 py-32 lg:py-48 overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="gold-line w-12" />
              <span className="section-label">Book Your Experience</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Reserve Your <span className="gold-text italic">Table</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="font-body text-white/40 text-lg leading-relaxed mb-12">
              Every reservation is a promise — of impeccable service, extraordinary cuisine,
              and an evening you will speak of for years.
            </motion.p>

            {/* Info cards */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {[
                { icon: CalendarDays, label: 'Opening Hours', lines: [RESTAURANT.hours.weekdays, RESTAURANT.hours.weekends] },
                { icon: Phone, label: 'Reservations', lines: [RESTAURANT.phone, RESTAURANT.email] },
                { icon: Users, label: 'Private Dining', lines: ['Available for groups 8+', 'Full buyout available'] },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeLeft}
                  className="glass rounded-2xl p-5 flex gap-4 hover:border-gold-500/25 transition-colors"
                  style={{ borderColor: 'rgba(212,175,55,0.1)' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <div className="section-label text-[9px] mb-1">{item.label}</div>
                    {item.lines.map((line, j) => (
                      <div key={j} className="font-body text-white/60 text-sm">{line}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="glass rounded-3xl p-8 lg:p-10" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField icon={User} label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                    <InputField icon={Mail} label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField icon={Phone} label="Phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (000) 000-000" />
                    <div>
                      <label className="section-label text-[9px] block mb-2 text-gold-500/60">Guests</label>
                      <div className="relative">
                        <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/40" />
                        <select name="guests" value={form.guests} onChange={handleChange}
                          className="elegant-input w-full pl-10 pr-4 py-4 rounded-xl text-sm appearance-none">
                          {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField icon={CalendarDays} label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />
                    <div>
                      <label className="section-label text-[9px] block mb-2 text-gold-500/60">Time</label>
                      <div className="relative">
                        <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/40" />
                        <select name="time" value={form.time} onChange={handleChange}
                          className="elegant-input w-full pl-10 pr-4 py-4 rounded-xl text-sm appearance-none">
                          <option value="">Select time</option>
                          {times.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="section-label text-[9px] block mb-2 text-gold-500/60">Special Requests</label>
                    <div className="relative">
                      <FileText size={14} className="absolute left-4 top-4 text-gold-500/40" />
                      <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Dietary requirements, special occasions, preferences..."
                        className="elegant-input w-full pl-10 pr-4 py-4 rounded-xl text-sm resize-none" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full py-4 rounded-xl text-sm flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>Confirming...</span>
                      </>
                    ) : (
                      <span>Confirm Reservation</span>
                    )}
                  </button>

                  <p className="font-sans text-white/20 text-[11px] text-center">
                    You will receive a confirmation email within 24 hours
                  </p>
                </form>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <Check size={36} className="text-gold-500" />
                  </motion.div>
                  <h3 className="font-display text-3xl text-white mb-3">Reservation Confirmed</h3>
                  <div className="gold-line w-24 mx-auto mb-4" />
                  <p className="font-body text-white/40 text-base mb-2">
                    Thank you, {form.name}. We look forward to hosting you.
                  </p>
                  <p className="font-sans text-white/25 text-sm">
                    A confirmation has been sent to {form.email}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',date:'',time:'',guests:'2',notes:'' }) }}
                    className="btn-outline mt-8 px-8 py-3 rounded-full text-sm"
                  >
                    Make Another Reservation
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}