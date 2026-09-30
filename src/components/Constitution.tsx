import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { constitutionQuote } from '../data/site'
import GoldParticles from './ui/GoldParticles'

const highlight = ['iguais', 'vida', 'liberdade', 'igualdade', 'segurança', 'propriedade']

/** Cada palavra lê a variável CSS --p (progresso da rolagem) e acende na sua vez. */
function Word({ word, at, step }: { word: string; at: number; step: number }) {
  const gold = highlight.some((h) => word.toLowerCase().startsWith(h))
  return (
    <span
      style={{ ['--a' as string]: at, ['--s' as string]: step }}
      className={`scroll-word mr-[0.28em] inline-block ${gold ? 'font-semibold italic text-gold-700' : ''}`}
    >
      {word}
    </span>
  )
}

/** Pergaminho da Constituição que se desenrola e acende palavra por palavra conforme a rolagem. */
export default function Constitution() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const clip = useTransform(scrollYProgress, [0.02, 0.2], [47, 0])
  const clipPath = useMotionTemplate`inset(${clip}% 0% ${clip}% 0%)`
  const rodTop = useTransform(clip, (c) => `${c}%`)
  const rodBottom = useTransform(clip, (c) => `${c}%`)
  const seal = useTransform(scrollYProgress, [0.85, 0.95], [0, 1])
  const sealRotate = useTransform(scrollYProgress, [0.85, 0.95], [-120, -12])

  const textRef = useRef<HTMLParagraphElement>(null)
  useMotionValueEvent(scrollYProgress, 'change', (v) => textRef.current?.style.setProperty('--p', String(v)))

  const words = constitutionQuote.split(' ')
  const start = 0.22
  const end = 0.84
  const step = (end - start) / words.length

  return (
    <section ref={ref} className="relative h-[260vh] bg-navy-950">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <GoldParticles density={35} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,164,92,0.12),transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-8">
          {/* rolos do pergaminho */}
          {[rodTop, rodBottom].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute inset-x-1 z-10 h-5 ${i === 0 ? '-translate-y-1/2' : 'translate-y-1/2'} rounded-full bg-gradient-to-b from-gold-300 via-gold-600 to-gold-700 shadow-[0_6px_20px_rgba(0,0,0,0.5)] sm:inset-x-3`}
              style={i === 0 ? { top: pos } : { bottom: pos }}
            >
              <span className="absolute -left-3 top-1/2 h-8 w-4 -translate-y-1/2 rounded-full bg-gradient-to-b from-gold-300 to-gold-700" />
              <span className="absolute -right-3 top-1/2 h-8 w-4 -translate-y-1/2 rounded-full bg-gradient-to-b from-gold-300 to-gold-700" />
            </motion.div>
          ))}

          {/* papel */}
          <motion.div
            style={{ clipPath }}
            className="relative mx-2 rounded-sm bg-[#f4ecd8] px-6 pb-24 pt-10 shadow-2xl sm:mx-6 sm:px-14 sm:pb-28 sm:pt-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(134,103,45,0.25))]" />
            <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-700">
              Constituição da República Federativa do Brasil · 1988
            </p>
            <p className="mb-4 text-center font-serif text-xl font-bold text-navy-900 sm:text-2xl">Art. 5º</p>
            <p
              ref={textRef}
              style={{ ['--p' as string]: 0 }}
              className="text-center font-serif text-xl leading-relaxed text-navy-900 sm:text-3xl sm:leading-snug"
            >
              {words.map((w, i) => (
                <Word key={i} word={w} at={start + i * step} step={step} />
              ))}
            </p>

            {/* selo de cera */}
            <motion.div
              style={{ scale: seal, opacity: seal, rotate: sealRotate }}
              className="absolute bottom-3 right-3 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#a3262a] to-[#5e1216] text-center font-serif text-[10px] font-bold uppercase leading-tight text-[#f4ecd8] shadow-xl ring-4 ring-[#7d1a1e]/40 sm:right-10 sm:h-24 sm:w-24"
            >
              <span>
                Estado
                <br />
                de Direito
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
