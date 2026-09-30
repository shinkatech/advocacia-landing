import { motion } from 'framer-motion'

type Props = { className?: string; draw?: boolean; idPrefix?: string }

/** Balança da justiça em SVG: o travessão balança e os pratos acompanham. */
export default function ScalesOfJustice({ className, draw = true, idPrefix = 'soj' }: Props) {
  const g = `${idPrefix}-gold`
  const glow = `${idPrefix}-glow`
  const path = (d: string, delay: number, width = 4) => (
    <motion.path
      d={d}
      fill="none"
      stroke={`url(#${g})`}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={draw ? { pathLength: 0, opacity: 0 } : false}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }}
    />
  )

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Balança da justiça">
      <defs>
        <linearGradient id={g} gradientUnits="userSpaceOnUse" x1="60" y1="60" x2="340" y2="360">
          <stop offset="0%" stopColor="#f3e7c6" />
          <stop offset="45%" stopColor="#c9a45c" />
          <stop offset="100%" stopColor="#86672d" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a45c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c9a45c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="190" fill={`url(#${glow})`} />

      {/* base e coluna */}
      {path('M130 352 H270', 0.1, 6)}
      {path('M150 352 Q200 318 250 352', 0.2)}
      {path('M200 332 V96', 0.3, 6)}
      {path('M184 332 H216', 0.35)}

      {/* ornamento no topo */}
      <motion.circle
        cx="200"
        cy="78"
        r="12"
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="4"
        initial={draw ? { scale: 0, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
        style={{ transformOrigin: '200px 78px' }}
      />
      <motion.circle
        cx="200"
        cy="78"
        r="4"
        fill="#f3e7c6"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />

      {/* travessão + pratos (animação em CSS: .scale-beam) */}
      <g className="scale-beam">
        {path('M72 104 H328', 0.6, 5)}
        <circle cx="72" cy="104" r="5" fill="#dcc083" />
        <circle cx="328" cy="104" r="5" fill="#dcc083" />
        <circle cx="200" cy="104" r="8" fill="#c9a45c" />

        <g className="scale-pan-left">
          {path('M72 104 L34 214 M72 104 L110 214', 1.0, 2)}
          {path('M26 214 Q72 262 118 214 Z', 1.2, 4)}
        </g>
        <g className="scale-pan-right">
          {path('M328 104 L290 214 M328 104 L366 214', 1.0, 2)}
          {path('M282 214 Q328 262 374 214 Z', 1.2, 4)}
        </g>
      </g>
    </svg>
  )
}
