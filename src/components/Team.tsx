import { motion } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import { useState } from 'react'
import { team, type Member } from '../data/site'
import { staggerChild, staggerParent } from './ui/Reveal'
import FloatingSymbols from './ui/FloatingSymbols'
import SectionTitle from './ui/SectionTitle'

function FlipCard({ m }: { m: Member }) {
  // O mouse é detectado no bloco externo (que não gira). Assim o card não
  // "perde" o mouse no meio do giro e não entra em loop.
  const [hover, setHover] = useState(false)
  const [tapped, setTapped] = useState(false)
  const flipped = hover || tapped
  return (
    <motion.div
      variants={staggerChild}
      className="h-[420px] [perspective:1400px]"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
    >
      <motion.button
        type="button"
        onClick={() => {
          if (!window.matchMedia('(hover: hover)').matches) setTapped((t) => !t)
        }}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full text-left [transform-style:preserve-3d]"
        aria-label={`Ver detalhes de ${m.name}`}
      >
        {/* frente */}
        <div className="absolute inset-0 flex flex-col items-center justify-end overflow-hidden rounded-3xl bg-gradient-to-b from-navy-800 to-navy-950 p-8 [backface-visibility:hidden]">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute left-1/2 top-12 -translate-x-1/2">
            <div className="relative grid h-40 w-40 place-items-center">
              <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#c9a45c" strokeWidth="0.8" strokeDasharray="6 4" />
              </svg>
              <div className="grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 font-serif text-4xl font-bold text-navy-950 shadow-[0_0_50px_-10px_rgba(201,164,92,0.8)]">
                {m.initials}
              </div>
            </div>
          </div>
          <div className="relative text-center">
            <h3 className="font-serif text-2xl font-semibold text-ivory">{m.name}</h3>
            <p className="mt-1 text-sm uppercase tracking-widest text-gold-400">{m.role}</p>
            <p className="mt-1 text-xs text-ivory/50">{m.oab}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs text-ivory/40">
              <RotateCw className="h-3 w-3" /> passe o mouse ou toque
            </span>
          </div>
        </div>

        {/* verso */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-gold-500/40 bg-gradient-to-br from-gold-200 via-ivory to-gold-300 p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-serif text-6xl leading-none text-gold-600">“</span>
          <p className="font-serif text-lg leading-relaxed text-navy-900">{m.bio}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {m.areas.map((a) => (
              <span key={a} className="rounded-full bg-navy-900 px-3 py-1 text-xs text-gold-300">
                {a}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold text-navy-900">{m.name}</p>
          <p className="text-xs text-ink/60">{m.oab}</p>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default function Team() {
  return (
    <section id="equipe" className="relative overflow-hidden bg-ivory pb-24 pt-8 sm:pb-32">
      <FloatingSymbols />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          kicker="Nossa Equipe"
          title="Advogados que conhecem o seu problema de perto"
          subtitle="Profissionais experientes, dedicados e comprometidos com a ética da advocacia."
        />
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {team.map((m) => (
            <FlipCard key={m.name} m={m} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
