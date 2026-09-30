import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

/** Card que inclina em 3D seguindo o mouse, com um brilho dourado. */
export default function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [9, -9]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(x, [0, 1], [-9, 9]), { stiffness: 200, damping: 18 })
  const gx = useTransform(x, (v) => `${v * 100}%`)
  const gy = useTransform(y, (v) => `${v * 100}%`)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(201,164,92,0.18), transparent 45%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  )
}
