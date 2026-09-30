import { motion } from 'framer-motion'

/** Coluna grega que se desenha quando entra na tela. */
export default function Column({ className, delay = 0 }: { className?: string; delay?: number }) {
  const lines = [
    'M20 30 H180', // cornija
    'M30 44 H170',
    'M40 44 Q40 58 30 58 H170 Q160 58 160 44', // capitel
    'M48 70 H152',
    'M56 70 V370',
    'M144 70 V370',
    'M78 78 V362',
    'M100 78 V362',
    'M122 78 V362',
    'M48 370 H152',
    'M36 384 H164',
    'M24 398 H176',
  ]
  return (
    <svg viewBox="0 0 200 410" className={className} aria-hidden="true">
      {lines.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={i > 5 && i < 9 ? 1.5 : 3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: delay + i * 0.09, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}
