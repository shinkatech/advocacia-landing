import { Scale } from 'lucide-react'

/** Selo circular com texto girando ao redor e a balança no centro. */
export default function RotatingSeal({
  text = 'ÉTICA • SIGILO • COMPROMISSO • EXCELÊNCIA • JUSTIÇA • ',
  className = '',
}: {
  text?: string
  className?: string
}) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="#c9a45c" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="#c9a45c" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 5" />
        <text fill="#dcc083" fontSize="13" letterSpacing="3.2" fontFamily="Inter, sans-serif" fontWeight="600">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <div className="relative grid h-[52%] w-[52%] place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-700 shadow-[0_0_60px_-10px_rgba(201,164,92,0.8)]">
        <Scale className="h-1/2 w-1/2 text-navy-950 animate-float" strokeWidth={1.6} />
      </div>
    </div>
  )
}
