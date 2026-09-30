import { animate, motion, useInView } from 'framer-motion'
import { FileCheck2, MessagesSquare, PenLine, Video } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { whatsappLink } from '../data/site'
import MagneticButton from './ui/MagneticButton'
import { Reveal } from './ui/Reveal'
import SectionTitle from './ui/SectionTitle'
import { WhatsAppIcon } from './svg/SocialIcons'

const SIGNATURE =
  'M72 392 C 80 356, 100 350, 100 372 C 100 394, 84 404, 94 382 C 104 360, 120 350, 126 372 C 130 390, 140 392, 148 370 C 154 352, 168 356, 164 378 C 160 394, 178 390, 188 366 C 194 352, 208 356, 206 376 C 204 392, 224 388, 238 366 C 246 354, 258 360, 264 380 L 304 368'

const CYCLE_MS = 8200
const SIGN_DELAY = 2.1
const SIGN_TIME = 1.8
const STAMP_DELAY = 4.3

/** Assinatura escrita pela caneta, desenhada ponto a ponto. */
function Signature() {
  const path = useRef<SVGPathElement>(null)
  const pen = useRef<SVGGElement>(null)

  useLayoutEffect(() => {
    const p = path.current
    const g = pen.current
    if (!p || !g) return
    const len = p.getTotalLength()
    p.style.strokeDasharray = `${len}`
    p.style.strokeDashoffset = `${len}`
    const start = p.getPointAtLength(0)
    g.setAttribute('transform', `translate(${start.x} ${start.y - 60})`)

    const intro = animate(0, 1, {
      delay: SIGN_DELAY - 0.5,
      duration: 0.5,
      onUpdate: (v) => {
        g.style.opacity = `${v}`
        g.setAttribute('transform', `translate(${start.x} ${start.y - 60 * (1 - v)})`)
      },
    })
    const write = animate(0, 1, {
      delay: SIGN_DELAY,
      duration: SIGN_TIME,
      ease: 'easeInOut',
      onUpdate: (v) => {
        const pt = p.getPointAtLength(len * v)
        p.style.strokeDashoffset = `${len * (1 - v)}`
        g.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
      },
      onComplete: () => {
        animate(1, 0, { delay: 0.3, duration: 0.5, onUpdate: (v) => (g.style.opacity = `${v}`) })
      },
    })
    return () => {
      intro.stop()
      write.stop()
    }
  }, [])

  return (
    <>
      <path ref={path} d={SIGNATURE} fill="none" stroke="#0b1426" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <g ref={pen} style={{ opacity: 0 }}>
        <g transform="rotate(35)">
          <path d="M0 0 L-5 -16 L5 -16 Z" fill="#c9a45c" />
          <path d="M0 -3 L0 -14" stroke="#86672d" strokeWidth="1" />
          <rect x="-6.5" y="-92" width="13" height="78" rx="6" fill="#0b1426" />
          <rect x="-6.5" y="-44" width="13" height="5" fill="#c9a45c" />
          <rect x="-2" y="-88" width="3" height="40" rx="1.5" fill="#ffffff" opacity="0.25" />
          <rect x="6.5" y="-86" width="3" height="30" rx="1.5" fill="#c9a45c" />
        </g>
      </g>
    </>
  )
}

function Contract() {
  const today = new Date().toLocaleDateString('pt-BR')
  const lines = [250, 280, 210, 270, 240, 285, 190, 260]

  return (
    <motion.g initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {/* papel (treme com a batida do carimbo) */}
      <motion.g animate={{ x: [0, 0, -4, 4, -2, 0] }} transition={{ delay: STAMP_DELAY + 0.25, duration: 0.4, times: [0, 0.01, 0.3, 0.6, 0.8, 1] }}>
        <rect x="46" y="36" width="310" height="424" rx="6" fill="#000" opacity="0.35" transform="translate(8 10)" />
        <rect x="40" y="30" width="320" height="430" rx="6" fill="#fbf8f1" />
        <rect x="40" y="30" width="320" height="8" rx="3" fill="#c9a45c" />
        <text x="200" y="74" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontSize="15" fontWeight="700" fill="#0b1426">
          CONTRATO DE PRESTAÇÃO
        </text>
        <text x="200" y="92" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontSize="12" fill="#86672d">
          de serviços advocatícios
        </text>

        {lines.map((w, i) => (
          <motion.rect
            key={i}
            x="64"
            y={120 + i * 22}
            height="5"
            rx="2.5"
            fill="#0b1426"
            opacity="0.18"
            initial={{ width: 0 }}
            animate={{ width: w }}
            transition={{ delay: 0.6 + i * 0.14, duration: 0.35, ease: 'easeOut' }}
          />
        ))}

        <line x1="64" y1="404" x2="324" y2="404" stroke="#0b1426" strokeOpacity="0.35" strokeDasharray="4 4" />
        <text x="64" y="424" fontFamily="Inter, sans-serif" fontSize="10" fill="#0b1426" opacity="0.55">
          Contratante · {today}
        </text>

        <Signature />
      </motion.g>

      {/* carimbo */}
      <motion.g
        initial={{ scale: 2.6, opacity: 0, rotate: 12 }}
        animate={{ scale: 1, opacity: 0.92, rotate: -14 }}
        transition={{ delay: STAMP_DELAY, duration: 0.28, ease: [0.7, 0, 0.9, 0.5] }}
      >
        <circle cx="284" cy="312" r="54" fill="none" stroke="#a3262a" strokeWidth="4" />
        <circle cx="284" cy="312" r="45" fill="none" stroke="#a3262a" strokeWidth="1.5" />
        <text x="284" y="308" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="800" letterSpacing="1.5" fill="#a3262a">
          ASSINADO
        </text>
        <text x="284" y="326" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1" fill="#a3262a">
          VÁLIDO ✓ {today}
        </text>
      </motion.g>

      {/* ondas do impacto */}
      {[0, 0.1, 0.2].map((d) => (
        <motion.circle
          key={d}
          cx="284"
          cy="312"
          r="54"
          fill="none"
          stroke="#c9a45c"
          strokeWidth="2"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 1, 2.2], opacity: [0, 0.9, 0] }}
          transition={{ delay: STAMP_DELAY + 0.28 + d, duration: 0.9, times: [0, 0.05, 1] }}
        />
      ))}
    </motion.g>
  )
}

/** Seção de atendimento online com um contrato sendo assinado e carimbado em loop. */
export default function OnlineSign() {
  const box = useRef<HTMLDivElement>(null)
  const inView = useInView(box, { amount: 0.35 })
  const [cycle, setCycle] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView) return
    setStarted(true)
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS)
    return () => clearInterval(id)
  }, [inView])

  const features = [
    { icon: Video, t: 'Reuniões por videochamada', d: 'Converse com o advogado de onde estiver.' },
    { icon: MessagesSquare, t: 'Documentos pelo WhatsApp', d: 'Envie fotos e arquivos com segurança.' },
    { icon: PenLine, t: 'Assinatura eletrônica', d: 'Contratos e procurações assinados pelo celular.' },
    { icon: FileCheck2, t: 'Acompanhamento em tempo real', d: 'Avisos a cada movimentação do processo.' },
  ]

  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div className="min-w-0">
          <SectionTitle kicker="Atendimento Online" title="Resolva tudo sem sair de casa" center={false} />
          <div className="-mt-4 grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.1} dir="up">
                <div className="group h-full rounded-2xl border border-navy-900/10 bg-white/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl">
                  <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-navy-900 text-gold-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-navy-900">{f.t}</h3>
                  <p className="mt-1 text-sm text-ink/65">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="mt-8">
            <MagneticButton href={whatsappLink('Olá! Gostaria de uma consulta online.')} external>
              <WhatsAppIcon className="h-5 w-5" />
              Agendar consulta online
            </MagneticButton>
          </Reveal>
        </div>

        <div ref={box} className="relative mx-auto w-full max-w-md">
          <motion.div
            className="absolute inset-8 rounded-full bg-gold-500/30 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <svg viewBox="0 0 400 490" className="relative w-full" role="img" aria-label="Contrato sendo assinado e carimbado">
            {started && <Contract key={cycle} />}
          </svg>
        </div>
      </div>
    </section>
  )
}
