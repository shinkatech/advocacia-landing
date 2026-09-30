import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'gold' | 'outline'
  className?: string
  external?: boolean
}

/** Botão que é "atraído" pelo mouse, com reflexo de luz passando. */
export default function MagneticButton({ href, children, variant = 'gold', className = '', external }: Props) {
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const styles =
    variant === 'gold'
      ? 'bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 bg-[length:200%_100%] text-navy-950 shadow-[0_10px_40px_-10px_rgba(201,164,92,0.7)] hover:bg-right'
      : 'border border-gold-500/60 text-gold-300 hover:bg-gold-500/10'

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[background-position,background-color] duration-500 ${styles} ${className}`}
    >
      {variant === 'gold' && (
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.a>
  )
}
