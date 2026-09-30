/** Malhete (martelo do juiz) batendo na base, com ondas de impacto e faíscas. */
export default function Gavel({ className }: { className?: string }) {
  const sparks = [
    { dx: '-38px', dy: '-26px' },
    { dx: '40px', dy: '-30px' },
    { dx: '-52px', dy: '-6px' },
    { dx: '56px', dy: '-8px' },
    { dx: '0px', dy: '-44px' },
  ]
  return (
    <svg viewBox="0 0 300 250" className={className} role="img" aria-label="Martelo do juiz">
      <defs>
        <linearGradient id="gavel-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a5a33" />
          <stop offset="50%" stopColor="#5e3a1f" />
          <stop offset="100%" stopColor="#3b2412" />
        </linearGradient>
        <linearGradient id="gavel-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3e7c6" />
          <stop offset="60%" stopColor="#c9a45c" />
          <stop offset="100%" stopColor="#86672d" />
        </linearGradient>
      </defs>

      {/* ondas de impacto */}
      {['', 'r2', 'r3'].map((r) => (
        <ellipse
          key={r || 'r1'}
          className={`gavel-ring ${r}`}
          cx="206"
          cy="196"
          rx="46"
          ry="12"
          fill="none"
          stroke="#dcc083"
          strokeWidth="2"
        />
      ))}

      {/* faíscas */}
      {sparks.map((s, i) => (
        <circle
          key={i}
          className="gavel-spark"
          cx="206"
          cy="188"
          r="3"
          fill="#f3e7c6"
          style={{ ['--dx' as string]: s.dx, ['--dy' as string]: s.dy }}
        />
      ))}

      {/* base de madeira */}
      <g className="gavel-block">
        <ellipse cx="206" cy="228" rx="74" ry="12" fill="#2a1a0d" />
        <rect x="136" y="200" width="140" height="28" rx="6" fill="url(#gavel-wood)" />
        <rect x="136" y="198" width="140" height="6" rx="3" fill="url(#gavel-gold)" />
      </g>

      {/* braço do martelo */}
      <g className="gavel-arm">
        <rect x="36" y="144" width="160" height="12" rx="6" fill="url(#gavel-wood)" />
        <circle cx="42" cy="150" r="9" fill="url(#gavel-gold)" />
        <rect x="178" y="104" width="56" height="94" rx="12" fill="url(#gavel-wood)" />
        <rect x="178" y="116" width="56" height="8" fill="url(#gavel-gold)" />
        <rect x="178" y="178" width="56" height="8" fill="url(#gavel-gold)" />
        <rect x="184" y="108" width="6" height="86" rx="3" fill="#ffffff" opacity="0.12" />
      </g>
    </svg>
  )
}
