import { motion } from 'framer-motion'
import { values } from '../data/site'
import RotatingSeal from './svg/RotatingSeal'
import GoldParticles from './ui/GoldParticles'
import SectionTitle from './ui/SectionTitle'

export default function Values() {
  const left = values.slice(0, 2)
  const right = values.slice(2)

  const Card = ({ v, i, side }: { v: (typeof values)[number]; i: number; side: 'l' | 'r' }) => (
    <motion.div
      initial={{ opacity: 0, x: side === 'l' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
      className={`group flex gap-4 rounded-3xl border border-gold-500/15 bg-navy-900/60 p-6 backdrop-blur ${side === 'l' ? 'lg:flex-row-reverse lg:text-right' : ''}`}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-500/15 text-gold-400 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-navy-950">
        <v.icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
      </span>
      <div>
        <h3 className="font-serif text-xl font-semibold text-ivory">{v.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ivory/60">{v.text}</p>
      </div>
    </motion.div>
  )

  return (
    <section className="noise relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <GoldParticles density={40} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          dark
          kicker="Nossos Valores"
          title="Por que confiar o seu caso a nós"
          subtitle="Princípios que orientam cada atendimento, cada petição e cada conversa."
        />
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-6">
            {left.map((v, i) => (
              <Card key={v.title} v={v} i={i} side="l" />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-first mx-auto lg:order-none"
          >
            <RotatingSeal className="h-64 w-64 sm:h-72 sm:w-72" />
          </motion.div>
          <div className="space-y-6">
            {right.map((v, i) => (
              <Card key={v.title} v={v} i={i} side="r" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
