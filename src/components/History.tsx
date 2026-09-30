import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Scale } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { firm, history, type Milestone } from '../data/site'
import GoldParticles from './ui/GoldParticles'

function MilestoneCard({ m, i }: { m: Milestone; i: number }) {
  return (
    <motion.article
      className={`group relative flex w-[78vw] shrink-0 flex-col justify-end sm:w-[420px] ${i % 2 ? 'sm:translate-y-10' : 'sm:-translate-y-6'}`}
      initial={{ opacity: 0.3, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.6 }}
      transition={{ duration: 0.6 }}
    >
      {/* ano gigante: contorno + preenchimento dourado que sobe */}
      <div className="relative select-none font-serif text-[6.5rem] font-bold leading-none sm:text-[9rem]">
        <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(201,164,92,0.55)]">{m.year}</span>
        <motion.span
          className="text-gold-gradient absolute inset-0"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ amount: 0.8 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {m.year}
        </motion.span>
      </div>

      <div className="relative -mt-4 overflow-hidden rounded-3xl border border-gold-500/20 bg-navy-900/80 p-7 backdrop-blur transition-colors duration-500 group-hover:border-gold-500/60">
        <motion.span
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ amount: 0.8 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.span
          className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gold-500/15 text-gold-400"
          initial={{ rotate: -180, scale: 0 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ amount: 0.8 }}
          transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.3 }}
        >
          <m.icon className="h-6 w-6" />
        </motion.span>
        <h3 className="font-serif text-2xl font-semibold text-ivory">{m.title}</h3>
        <p className="mt-2 leading-relaxed text-ivory/60">{m.text}</p>
      </div>
    </motion.article>
  )
}

/** Linha do tempo que anda na horizontal enquanto a página rola para baixo. */
export default function History() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, (v) => -v * dist)
  const bgX = useTransform(smooth, [0, 1], ['0%', '-35%'])
  const travel = useTransform(smooth, (v) => `${v * 100}%`)
  const spin = useTransform(smooth, [0, 1], [0, 720])

  return (
    <section id="historia" ref={section} className="relative bg-navy-950" style={{ height: `calc(${dist}px + 100svh)` }}>
      <div className="noise sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <GoldParticles density={30} />
        <motion.span
          aria-hidden="true"
          style={{ x: bgX }}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-serif text-[30vh] font-bold italic leading-none text-ivory/[0.025]"
        >
          Tradição · Ética · Confiança · Tradição · Ética
        </motion.span>

        <motion.div ref={track} style={{ x }} className="relative flex w-max items-center gap-10 px-[6vw] sm:gap-16">
          {/* painel de abertura */}
          <div className="w-[80vw] shrink-0 sm:w-[460px]">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
              <span className="h-px w-10 bg-current" /> Nossa História
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-ivory sm:text-6xl">
              Mais de {new Date().getFullYear() - firm.founded} anos construindo <span className="text-gold-gradient italic">confiança</span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ivory/60">
              Continue rolando para percorrer a nossa trajetória, do primeiro cliente até hoje.
            </p>
            <motion.div
              className="mt-8 inline-flex items-center gap-3 text-sm text-gold-300"
              animate={{ x: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              Role para ver <span className="text-xl">→</span>
            </motion.div>
          </div>

          {history.map((m, i) => (
            <MilestoneCard key={m.year} m={m} i={i} />
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>

        {/* trilho de progresso com a balança viajando */}
        <div className="absolute inset-x-[6vw] bottom-10 h-px bg-gold-500/20 sm:bottom-14">
          <motion.div className="h-full origin-left bg-gradient-to-r from-gold-700 via-gold-400 to-gold-300" style={{ scaleX: smooth }} />
          <motion.div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: travel }}>
            <motion.div
              style={{ rotate: spin }}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold-400 bg-navy-900 text-gold-300 shadow-[0_0_25px_rgba(201,164,92,0.6)]"
            >
              <Scale className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
