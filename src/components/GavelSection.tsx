import { motion } from 'framer-motion'
import { Hourglass } from 'lucide-react'
import { whatsappLink } from '../data/site'
import Gavel from './svg/Gavel'
import MagneticButton from './ui/MagneticButton'
import { Reveal, WordsReveal } from './ui/Reveal'
import { WhatsAppIcon } from './svg/SocialIcons'

/** Faixa de destaque com o martelo batendo. */
export default function GavelSection() {
  const papers = [
    { left: '6%', top: '20%', r: -12, d: 0 },
    { left: '88%', top: '14%', r: 14, d: 1.2 },
    { left: '78%', top: '72%', r: -8, d: 2.1 },
    { left: '12%', top: '78%', r: 10, d: 0.6 },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 py-24 sm:py-28">
      {/* folhas de processo flutuando */}
      {papers.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute hidden h-24 w-20 space-y-1.5 rounded-md border border-gold-500/20 bg-ivory/5 p-3 backdrop-blur md:block"
          style={{ left: p.left, top: p.top, rotate: p.r }}
          animate={{ y: [0, -18, 0], rotate: [p.r, p.r + 6, p.r] }}
          transition={{ duration: 6, repeat: Infinity, delay: p.d, ease: 'easeInOut' }}
        >
          {[80, 100, 60, 90, 70].map((w, j) => (
            <span key={j} className="block h-[3px] rounded-full bg-gold-400/30" style={{ width: `${w}%` }} />
          ))}
        </motion.div>
      ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <Reveal dir="zoom" className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-x-10 bottom-4 h-10 rounded-full bg-gold-500/30 blur-2xl" />
          <Gavel className="relative w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
        </Reveal>

        <div className="text-center md:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              <Hourglass className="h-3.5 w-3.5 animate-spin-slow" />
              Atenção aos prazos
            </span>
          </Reveal>
          <h2 className="impact-shake mt-6 font-serif text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
            <WordsReveal text="O seu direito tem prazo." />
            <br />
            <span className="text-gold-gradient italic">
              <WordsReveal text="Não deixe para depois." delay={0.3} />
            </span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-6 leading-relaxed text-ivory/65">
              Muitas ações judiciais precisam ser propostas dentro de um prazo legal. Uma orientação no momento certo
              pode fazer toda a diferença para proteger você, sua família ou sua empresa.
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-8">
            <MagneticButton href={whatsappLink('Olá! Quero saber se ainda estou dentro do prazo para o meu caso.')} external>
              <WhatsAppIcon className="h-5 w-5" />
              Quero uma análise do meu caso
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
