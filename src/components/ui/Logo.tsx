import { motion } from 'framer-motion'
import { firm } from '../../data/site'

export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <a href="#inicio" className="group flex items-center gap-3" aria-label={`${firm.name} ${firm.suffix}`}>
      <motion.span
        className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/60 bg-navy-900"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 40 40" className="h-6 w-6" aria-hidden="true">
          <g fill="none" stroke="#c9a45c" strokeWidth="2" strokeLinecap="round">
            <path d="M20 7v26M9 12h22M14 33h12" />
            <path d="M9 12l-4.5 9h9zM31 12l-4.5 9h9z" />
          </g>
        </svg>
      </motion.span>
      <span className="leading-none">
        <span className={`block font-serif text-lg font-semibold ${light ? 'text-ivory' : 'text-navy-900'}`}>
          {firm.name}
        </span>
        <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.4em] text-gold-500">{firm.suffix}</span>
      </span>
    </a>
  )
}
