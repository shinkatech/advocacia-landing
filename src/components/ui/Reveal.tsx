import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Dir = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur'

const offsets: Record<Dir, object> = {
  up: { y: 50 },
  down: { y: -50 },
  left: { x: -60 },
  right: { x: 60 },
  zoom: { scale: 0.85 },
  blur: { filter: 'blur(12px)', y: 20 },
}

/** Faz o conteúdo aparecer suavemente quando entra na tela. */
export function Reveal({
  children,
  dir = 'up',
  delay = 0,
  className,
}: {
  children: ReactNode
  dir?: Dir
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** Texto que surge palavra por palavra.
 *  O gatilho fica no bloco externo (visível), não nas palavras escondidas,
 *  para a animação sempre disparar. */
export function WordsReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', rotate: 6 },
              show: { y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
