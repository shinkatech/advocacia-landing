import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { steps } from '../data/site'
import FloatingSymbols from './ui/FloatingSymbols'
import SectionTitle from './ui/SectionTitle'

/** Linha do tempo que se preenche conforme a rolagem. */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <FloatingSymbols />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle
          kicker="Como Funciona"
          title="Do primeiro contato à solução, você acompanha tudo"
          subtitle="Um processo simples e transparente, pensado para que você se sinta seguro em cada etapa."
        />

        <div ref={ref} className="relative">
          {/* trilho */}
          <div className="absolute bottom-0 left-6 top-0 w-[2px] bg-navy-900/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            className="absolute bottom-0 left-6 top-0 w-[2px] origin-top bg-gradient-to-b from-gold-400 via-gold-500 to-gold-700 md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: fill }}
          />

          <div className="space-y-14">
            {steps.map((s, i) => {
              const right = i % 2 === 1
              return (
                <div key={s.title} className="relative grid items-center md:grid-cols-2 md:gap-16">
                  {/* marcador */}
                  <motion.div
                    className="absolute left-6 top-0 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border-4 border-ivory bg-navy-900 text-gold-400 shadow-lg md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  >
                    <s.icon className="h-5 w-5" />
                    <span className="absolute inset-0 animate-ping-slow rounded-full border border-gold-500/60" />
                  </motion.div>

                  <motion.div
                    className={`ml-16 md:ml-0 ${right ? 'md:col-start-2' : 'md:text-right'}`}
                    initial={{ opacity: 0, x: right ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="group rounded-3xl border border-navy-900/10 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-xl">
                      <span className="font-serif text-sm font-semibold italic text-gold-700">Etapa {i + 1}</span>
                      <h3 className="mt-1 font-serif text-2xl font-semibold text-navy-900">{s.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink/70">{s.text}</p>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
