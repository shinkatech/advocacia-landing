import { motion } from 'framer-motion'
import { areas, firm, nav } from '../data/site'
import Logo from './ui/Logo'
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from './svg/SocialIcons'
import { whatsappLink } from '../data/site'

export default function Footer() {
  const socials = [
    { href: firm.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: firm.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: whatsappLink(), label: 'WhatsApp', Icon: WhatsAppIcon },
  ]
  return (
    <footer className="relative bg-navy-950 pt-16 text-ivory/60">
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Advocacia ética, estratégica e humana. Atendimento presencial em São Paulo e online em todo o Brasil.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4, rotate: 8 }}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/30 text-gold-400 transition-colors hover:bg-gold-500 hover:text-navy-950"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-serif text-lg text-ivory">Navegação</h4>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="inline-block transition-all hover:translate-x-1 hover:text-gold-300">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-serif text-lg text-ivory">Áreas</h4>
          <ul className="space-y-2 text-sm">
            {areas.slice(0, 6).map((a) => (
              <li key={a.title}>
                <a href="#areas" className="inline-block transition-all hover:translate-x-1 hover:text-gold-300">
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-2 pt-6" aria-hidden="true">
        <motion.div
          className="flex select-none justify-center font-serif text-[16vw] font-bold leading-none tracking-tight"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {'JUSTIÇA'.split('').map((l, i) => (
            <motion.span
              key={i}
              className="text-gold-gradient inline-block px-[0.03em] pb-[0.32em] pt-[0.08em]"
              variants={{
                hidden: { y: '45%', rotate: 8, opacity: 0 },
                show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: '-8%', transition: { type: 'spring', stiffness: 400, damping: 10 } }}
            >
              {l}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <div className="border-t border-gold-500/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {firm.name} {firm.suffix} · {firm.oab}
          </p>
          <p className="text-ivory/40">Conteúdo informativo, em conformidade com o Provimento 205/2021 da OAB.</p>
        </div>
      </div>
    </footer>
  )
}
