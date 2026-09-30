import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { firm, whatsappLink } from '../data/site'
import ScalesOfJustice from './svg/ScalesOfJustice'
import { WhatsAppIcon } from './svg/SocialIcons'

/* ---------- Tela de abertura ---------- */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true)
  const letters = firm.name.split('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setShow(false), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = ''
        onDone()
      }}
    >
      {show && (
        <motion.div className="fixed inset-0 z-[100]" exit={{ pointerEvents: 'none' }} transition={{ duration: 1 }}>
          {/* cortinas */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-navy-950"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-navy-950"
            exit={{ y: '100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35 }}
          >
            <ScalesOfJustice className="h-40 w-40 sm:h-52 sm:w-52" idPrefix="pre" />
            <h1 className="mt-6 flex overflow-hidden font-serif text-2xl font-semibold text-ivory sm:text-3xl">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l === ' ' ? ' ' : l}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="mt-2 text-xs uppercase tracking-[0.5em] text-gold-500"
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={{ opacity: 1, letterSpacing: '0.5em' }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              {firm.suffix}
            </motion.p>
            <div className="mt-8 h-px w-48 overflow-hidden bg-gold-500/20">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Barra de progresso de leitura ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold-700 via-gold-300 to-gold-500"
      style={{ scaleX }}
    />
  )
}

/* ---------- Brilho dourado que segue o mouse ---------- */
export function CursorGlow() {
  const x = useSpring(useMotionValue(-500), { stiffness: 80, damping: 20 })
  const y = useSpring(useMotionValue(-500), { stiffness: 80, damping: 20 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[400px] w-[400px] rounded-full opacity-60 mix-blend-screen"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(201,164,92,0.14) 0%, rgba(201,164,92,0) 65%)',
      }}
    />
  )
}

/* ---------- Cursor personalizado: ponto + anel que cresce nos links ---------- */
export function CursorRing() {
  const dx = useMotionValue(-100)
  const dy = useMotionValue(-100)
  const rx = useSpring(dx, { stiffness: 350, damping: 28, mass: 0.5 })
  const ry = useSpring(dy, { stiffness: 350, damping: 28, mass: 0.5 })
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      dx.set(e.clientX)
      dy.set(e.clientY)
      setVisible(true)
      const t = e.target as Element | null
      setHover(!!t?.closest?.('a, button, input, textarea, select, label, [role="button"]'))
    }
    const press = () => setDown(true)
    const release = () => setDown(false)
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [dx, dy])

  if (!enabled) return null
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full border border-gold-400/80"
        style={{ x: rx, y: ry }}
        animate={{
          scale: down ? 0.7 : hover ? 1.8 : 1,
          opacity: visible ? 1 : 0,
          backgroundColor: hover ? 'rgba(201,164,92,0.12)' : 'rgba(201,164,92,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold-300"
        style={{ x: dx, y: dy }}
        animate={{ opacity: visible && !hover ? 1 : 0 }}
      />
    </>
  )
}

/* ---------- Botão flutuante do WhatsApp ---------- */
export function WhatsAppFloat() {
  const [bubble, setBubble] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setBubble(true), 6000)
    const t2 = setTimeout(() => setBubble(false), 14000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="mb-2 hidden max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm text-ink shadow-2xl sm:block"
          >
            <strong className="block text-navy-900">Precisa de orientação jurídica?</strong>
            Fale agora com um advogado.
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 260, damping: 15 }}
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-[#25D366] opacity-60" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </motion.a>
    </div>
  )
}

/* ---------- Voltar ao topo com anel de progresso ---------- */
export function BackToTop() {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)
  useEffect(() => scrollYProgress.on('change', (v) => setVisible(v > 0.12)), [scrollYProgress])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#inicio"
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ y: -4 }}
          className="fixed bottom-24 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-navy-900/90 text-gold-400 backdrop-blur"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(201,164,92,0.2)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#c9a45c"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="h-5 w-5" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
