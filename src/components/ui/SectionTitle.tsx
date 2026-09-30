import { motion } from 'framer-motion'
import { WordsReveal } from './Reveal'

export default function SectionTitle({
  kicker,
  title,
  subtitle,
  dark = false,
  center = true,
}: {
  kicker: string
  title: string
  subtitle?: string
  dark?: boolean
  center?: boolean
}) {
  return (
    <div className={`mb-14 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <motion.div
        className={`mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${dark ? 'text-gold-400' : 'text-gold-700'}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="h-px w-10 bg-current"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ originX: 1 }}
        />
        {kicker}
        {center && (
          <motion.span
            className="h-px w-10 bg-current"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originX: 0 }}
          />
        )}
      </motion.div>
      <h2
        className={`font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl ${dark ? 'text-ivory' : 'text-navy-900'}`}
      >
        <WordsReveal text={title} />
      </h2>
      {subtitle && (
        <motion.p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-ivory/70' : 'text-ink/70'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
