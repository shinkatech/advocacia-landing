import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { firm, nav, whatsappLink } from '../data/site'
import Logo from './ui/Logo'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 500 && !open)
  })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'border-b border-gold-500/15 bg-navy-950/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Logo />

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Principal">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative px-3 py-2 text-sm transition-colors ${active === n.id ? 'text-gold-300' : 'text-ivory/75 hover:text-ivory'}`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full border border-gold-500/50 px-5 py-2.5 text-sm font-medium text-gold-300 transition-colors hover:bg-gold-500 hover:text-navy-950 sm:inline-flex"
            >
              <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Agendar consulta
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full text-ivory xl:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-navy-950 px-6 py-6"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/40 text-gold-300"
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-2" aria-label="Menu">
              {nav.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-gold-500/10 py-3 font-serif text-3xl text-ivory"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  <span className="font-sans text-xs text-gold-500">0{i + 1}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mt-auto text-sm text-ivory/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p>{firm.phoneDisplay}</p>
              <p>{firm.email}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
