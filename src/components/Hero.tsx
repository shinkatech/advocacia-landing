import { motion, useMotionValue, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, BookOpen, Clock, FileText, Gavel, Landmark, Scale, ShieldCheck, Globe } from 'lucide-react'
import { useRef, type MouseEvent } from 'react'
import { firm, heroWords, whatsappLink } from '../data/site'
import GoldParticles from './ui/GoldParticles'
import MagneticButton from './ui/MagneticButton'
import Typewriter from './ui/Typewriter'
import ScalesOfJustice from './svg/ScalesOfJustice'
import { WhatsAppIcon } from './svg/SocialIcons'

const orbitIcons = [Gavel, BookOpen, Landmark, FileText, ShieldCheck, Scale]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 180])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 90])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const onMove = (e: MouseEvent) => {
    mx.set((e.clientX / window.innerWidth - 0.5) * 30)
    my.set((e.clientY / window.innerHeight - 0.5) * 30)
  }

  const title = ['Seus', 'direitos', 'defendidos', 'com', 'ética', 'e', 'excelência.']
  const highlight = new Set(['ética', 'excelência.'])

  return (
    <section
      id="inicio"
      ref={ref}
      onMouseMove={onMove}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-20 pt-28"
    >
      {/* fundo */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <motion.div
        className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-gold-600/15 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-navy-600/40 blur-[140px]"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 11, repeat: Infinity }}
      />
      {/* feixes de luz, como a luz entrando em um tribunal */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[
          { left: '12%', r: 18, w: 120, d: 0 },
          { left: '30%', r: 10, w: 80, d: 1.5 },
          { left: '52%', r: -6, w: 160, d: 0.8 },
          { left: '72%', r: -14, w: 100, d: 2.2 },
          { left: '88%', r: -22, w: 70, d: 3 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute -top-[15%] h-[130%] origin-top bg-gradient-to-b from-gold-300/20 via-gold-400/[0.06] to-transparent blur-2xl"
            style={{ left: b.left, width: b.w }}
            initial={{ rotate: b.r, opacity: 0 }}
            animate={ready ? { rotate: [b.r - 4, b.r + 4, b.r - 4], opacity: [0.35, 0.9, 0.35] } : {}}
            transition={{ duration: 9 + i, repeat: Infinity, ease: 'easeInOut', delay: b.d }}
          />
        ))}
      </div>
      <GoldParticles />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* texto */}
        <motion.div style={{ y: yText, opacity: fade }} variants={container} initial="hidden" animate={ready ? 'show' : 'hidden'}>
          <motion.div
            variants={item}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            Advocacia desde {firm.founded}
          </motion.div>

          <h1 className="relative font-serif text-[2.6rem] font-semibold leading-[1.08] text-ivory sm:text-6xl lg:text-[4.4rem]">
            {title.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className={`inline-block ${highlight.has(w) ? 'text-gold-gradient italic' : ''}`}
                  initial={{ y: '110%' }}
                  animate={ready ? { y: 0 } : { y: '110%' }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p variants={item} className="mt-6 text-lg text-ivory/70 sm:text-xl">
            Especialistas em <Typewriter words={heroWords} className="font-semibold text-gold-300" />
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl leading-relaxed text-ivory/60">
            Orientação jurídica clara, estratégica e humana para pessoas e empresas. Atendimento presencial e online
            em todo o Brasil.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href={whatsappLink()} external>
              <WhatsAppIcon className="h-5 w-5" />
              Falar com um advogado
            </MagneticButton>
            <MagneticButton href="#areas" variant="outline">
              Áreas de atuação
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </motion.div>

          <motion.ul variants={item} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/60">
            {[
              { icon: ShieldCheck, t: 'Sigilo garantido' },
              { icon: Globe, t: 'Atendimento online' },
              { icon: Clock, t: 'Retorno em até 24h' },
            ].map(({ icon: I, t }) => (
              <li key={t} className="flex items-center gap-2">
                <I className="h-4 w-4 text-gold-500" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* arte: balança em órbita */}
        <motion.div
          style={{ y: yArt }}
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[520px]"
        >
          <motion.div style={{ x: mx, y: my }} className="absolute inset-0">
            {/* anéis */}
            <div className="absolute inset-0 rounded-full border border-gold-500/20" />
            <div className="absolute inset-[8%] animate-spin-slower rounded-full border border-dashed border-gold-500/30" />
            <div className="absolute inset-[18%] rounded-full border border-gold-500/10 bg-gradient-to-b from-navy-800/60 to-transparent" />
            <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="49.5" fill="none" stroke="url(#arc)" strokeWidth="0.6" strokeDasharray="40 271" strokeLinecap="round" />
              <defs>
                <linearGradient id="arc">
                  <stop offset="0%" stopColor="#c9a45c" stopOpacity="0" />
                  <stop offset="100%" stopColor="#f3e7c6" />
                </linearGradient>
              </defs>
            </svg>

            {/* ícones orbitando */}
            <div className="absolute inset-[8%] animate-spin-slower">
              {orbitIcons.map((Icon, i) => {
                const angle = (i / orbitIcons.length) * Math.PI * 2
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
                  >
                    <div className="-translate-x-1/2 -translate-y-1/2">
                      <div className="animate-spin-slower [animation-direction:reverse]">
                        <motion.div
                          className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/40 bg-navy-900/90 text-gold-400 shadow-[0_0_25px_-5px_rgba(201,164,92,0.6)] backdrop-blur sm:h-14 sm:w-14"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* balança */}
            <div className="absolute inset-[16%] animate-float">
              {ready && <ScalesOfJustice className="h-full w-full drop-shadow-[0_0_35px_rgba(201,164,92,0.35)]" idPrefix="hero" />}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* indicador de rolagem */}
      <motion.a
        href="#sobre"
        aria-label="Rolar para baixo"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold-400/70 md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        Role
        <span className="flex h-10 w-6 justify-center rounded-full border border-gold-500/40 pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-gold-400"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  )
}
