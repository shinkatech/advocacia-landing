import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useRef } from 'react'
import { marqueeItems } from '../data/site'

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/** Faixa que acelera, inverte e inclina conforme a velocidade da rolagem. */
function VelocityRow({ baseVelocity, outline = false }: { baseVelocity: number; outline?: boolean }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const skewX = useTransform(smooth, [-2500, 2500], [12, -12])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })

  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="flex overflow-hidden">
      <motion.div className="flex shrink-0 items-center gap-8 pr-8" style={{ x, skewX }}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span
              className={`font-serif text-3xl font-semibold italic sm:text-5xl ${
                outline ? 'text-transparent [-webkit-text-stroke:1px_rgba(201,164,92,0.6)]' : 'text-ivory'
              }`}
            >
              {t}
            </span>
            <motion.span
              className="inline-block text-2xl text-gold-500 sm:text-3xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              §
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section aria-hidden="true" className="relative overflow-hidden bg-navy-950 py-6">
      <div className="-mx-8 -rotate-2 space-y-4 border-y border-gold-500/30 bg-navy-900 py-8 shadow-[0_0_60px_rgba(201,164,92,0.15)]">
        <VelocityRow baseVelocity={-2.5} />
        <VelocityRow baseVelocity={2.5} outline />
      </div>
    </section>
  )
}
