import { useEffect, useRef } from 'react'

/** Poeira dourada subindo lentamente, com linhas finas ligando partículas próximas. */
export default function GoldParticles({ density = 70, className = '' }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; t: number }
    let ps: P[] = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((density * w) / 1400) + 20
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vy: Math.random() * 0.35 + 0.08,
        vx: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.6 + 0.2,
        t: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        p.y -= p.vy
        p.x += p.vx + Math.sin(p.t) * 0.12
        p.t += 0.015
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.t * 2))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220,192,131,${alpha})`
        ctx.shadowColor = 'rgba(201,164,92,0.9)'
        ctx.shadowBlur = 8
        ctx.fill()

        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = dx * dx + dy * dy
          if (d < 9000) {
            ctx.shadowBlur = 0
            ctx.strokeStyle = `rgba(201,164,92,${0.12 * (1 - d / 9000)})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [density])

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
