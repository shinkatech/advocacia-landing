import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { faq } from '../data/site'
import { Reveal } from './ui/Reveal'
import FloatingSymbols from './ui/FloatingSymbols'
import SectionTitle from './ui/SectionTitle'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <FloatingSymbols />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle kicker="Dúvidas Frequentes" title="Perguntas que recebemos todos os dias" />
        <div className="space-y-4">
          {faq.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
                    isOpen ? 'border-gold-500/60 bg-white shadow-lg' : 'border-navy-900/10 bg-white/60'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg font-semibold text-navy-900">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? '#c9a45c' : '#0b1426' }}
                      transition={{ duration: 0.4 }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ivory"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 leading-relaxed text-ink/70">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
