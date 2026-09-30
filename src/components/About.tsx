import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { firm, stats } from '../data/site'
import Column from './svg/Column'
import FloatingSymbols from './ui/FloatingSymbols'
import Counter from './ui/Counter'
import { Reveal } from './ui/Reveal'
import SectionTitle from './ui/SectionTitle'

function OpenBook() {
  const lines = (n: number) =>
    Array.from({ length: n }, (_, i) => (
      <span key={i} className="block h-[3px] rounded-full bg-navy-900/15" style={{ width: `${70 + ((i * 37) % 30)}%` }} />
    ))
  return (
    <div className="book relative mx-auto h-28 w-full max-w-[17rem] sm:h-40">
      <div className="absolute inset-y-0 left-0 w-1/2 space-y-1.5 overflow-hidden rounded-l-md border border-gold-600/30 bg-ivory p-2.5 shadow-xl sm:space-y-2 sm:p-4">
        <span className="block font-serif text-[10px] font-bold text-gold-700">Art. 5º</span>
        {lines(7)}
      </div>
      <div className="absolute inset-y-0 right-0 w-1/2 space-y-1.5 overflow-hidden rounded-r-md border border-gold-600/30 bg-ivory p-2.5 shadow-xl sm:space-y-2 sm:p-4">
        {lines(8)}
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="book-page absolute inset-y-0 right-0 w-1/2 space-y-1.5 overflow-hidden rounded-r-md border border-gold-600/20 bg-[#fbf8f1] p-2.5 shadow-md sm:space-y-2 sm:p-4"
        >
          {lines(8)}
        </div>
      ))}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gold-700/40" />
      <div className="absolute -bottom-2 left-1/2 h-2 w-[104%] -translate-x-1/2 rounded-b-lg bg-gold-700/60" />
    </div>
  )
}

function Pediment() {
  const draw = (d: string, delay: number, w = 3) => (
    <motion.path
      d={d}
      fill="none"
      stroke="#c9a45c"
      strokeWidth={w}
      strokeLinejoin="round"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: 'easeInOut' }}
    />
  )
  return (
    <svg viewBox="0 0 400 100" className="relative w-full" aria-hidden="true">
      {draw('M8 88 L200 12 L392 88 Z', 0)}
      {draw('M40 80 L200 26 L360 80 Z', 0.3, 1.5)}
      {draw('M0 96 H400', 0.5)}
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 180 }}
        style={{ transformOrigin: '200px 58px' }}
      >
        <g fill="none" stroke="#dcc083" strokeWidth="2" strokeLinecap="round">
          <path d="M200 42 V72 M184 48 H216 M192 72 H208" />
          <path d="M184 48 l-6 12 h12 z M216 48 l-6 12 h12 z" />
        </g>
      </motion.g>
    </svg>
  )
}

function Steps() {
  return (
    <div className="relative mt-2 space-y-1.5">
      {[92, 96, 100].map((w, i) => (
        <motion.div
          key={w}
          className="mx-auto h-2 rounded-sm bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700"
          style={{ width: `${w}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 + i * 0.15 }}
        />
      ))}
    </div>
  )
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yBadge = useTransform(scrollYProgress, [0, 1], [60, -60])

  const points = [
    'Atendimento personalizado do início ao fim',
    'Estratégia jurídica explicada em linguagem simples',
    'Atuação preventiva e contenciosa',
    'Acompanhamento transparente do processo',
  ]

  return (
    <section id="sobre" ref={ref} className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <FloatingSymbols />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        {/* composição: fachada de tribunal */}
        <Reveal dir="left" className="relative min-w-0">
          <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] bg-gradient-to-b from-navy-900 to-navy-950 px-5 pb-8 pt-8 shadow-2xl sm:px-8">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <Pediment />
            <div className="relative -mt-1 flex items-end justify-between gap-2">
              <Column className="h-40 w-auto shrink-0 text-gold-500 sm:h-60" />
              <div className="mb-4 min-w-0 flex-1">
                <motion.div
                  className="mx-auto mb-5 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
                <OpenBook />
              </div>
              <Column className="h-40 w-auto shrink-0 text-gold-500 sm:h-60" delay={0.4} />
            </div>
            <Steps />
          </div>

          <motion.div
            style={{ y: yBadge }}
            className="absolute -bottom-8 right-2 rounded-2xl border border-gold-500/30 bg-white p-5 shadow-2xl sm:right-4"
          >
            <p className="font-serif text-4xl font-bold text-navy-900">
              <Counter to={new Date().getFullYear() - firm.founded} suffix="+" />
            </p>
            <p className="text-xs uppercase tracking-widest text-gold-700">anos de história</p>
          </motion.div>
        </Reveal>

        {/* texto */}
        <div className="min-w-0">
          <SectionTitle
            kicker="O Escritório"
            title="Tradição, ética e estratégia a serviço de você"
            center={false}
          />
          <Reveal delay={0.1}>
            <p className="-mt-6 leading-relaxed text-ink/75">
              Fundado em {firm.founded}, o {firm.name} nasceu com um propósito simples: oferecer advocacia de alto
              nível com proximidade real com o cliente. Cada caso é estudado com profundidade e conduzido com
              transparência, para que você saiba exatamente onde está pisando.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {points.map((p, i) => (
              <motion.li
                key={p}
                className="flex items-start gap-3 text-ink/85"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              >
                <motion.span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-400"
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 260 }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.span>
                {p}
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} dir="zoom">
                <div className="group rounded-2xl border border-navy-900/10 bg-white/70 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-lg">
                  <p className="font-serif text-3xl font-bold text-navy-900 transition-colors group-hover:text-gold-700">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs leading-tight text-ink/60">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
