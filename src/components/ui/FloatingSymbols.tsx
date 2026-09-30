import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { BookOpen, Gavel, Landmark, Scale, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'

type Item = { glyph?: string; Icon?: LucideIcon; left: string; top: string; size: number; speed: number; rot: number }

const defaults: Item[] = [
  { glyph: '§', left: '4%', top: '12%', size: 90, speed: 160, rot: 25 },
  { Icon: Scale, left: '88%', top: '8%', size: 64, speed: 220, rot: -30 },
  { glyph: '¶', left: '92%', top: '62%', size: 80, speed: 120, rot: 20 },
  { Icon: Gavel, left: '8%', top: '72%', size: 56, speed: 260, rot: 40 },
  { Icon: BookOpen, left: '48%', top: '90%', size: 48, speed: 180, rot: -18 },
  { glyph: '§', left: '70%', top: '35%', size: 54, speed: 300, rot: -45 },
  { Icon: Landmark, left: '28%', top: '4%', size: 44, speed: 140, rot: 15 },
]

function Symbol({ it, progress, color }: { it: Item; progress: MotionValue<number>; color: string }) {
  const y = useTransform(progress, [0, 1], [it.speed, -it.speed])
  const rotate = useTransform(progress, [0, 1], [-it.rot, it.rot])
  return (
    <motion.div className={`absolute ${color}`} style={{ left: it.left, top: it.top, y, rotate }}>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5 + it.size / 30, repeat: Infinity, ease: 'easeInOut' }}>
        {it.Icon ? (
          <it.Icon style={{ width: it.size, height: it.size }} strokeWidth={1} />
        ) : (
          <span className="font-serif leading-none" style={{ fontSize: it.size }}>
            {it.glyph}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}

/** Símbolos jurídicos (§, ¶, balança, martelo...) flutuando com parallax no fundo da seção. */
export default function FloatingSymbols({ dark = false, items = defaults }: { dark?: boolean; items?: Item[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const color = dark ? 'text-gold-400/[0.09]' : 'text-gold-700/[0.13]'
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <Symbol key={i} it={it} progress={scrollYProgress} color={color} />
      ))}
    </div>
  )
}
