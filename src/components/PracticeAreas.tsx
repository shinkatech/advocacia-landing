import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { areas, whatsappLink } from '../data/site'
import { staggerChild, staggerParent } from './ui/Reveal'
import SectionTitle from './ui/SectionTitle'
import TiltCard from './ui/TiltCard'

export default function PracticeAreas() {
  return (
    <section id="areas" className="noise relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <motion.div
        className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          dark
          kicker="Áreas de Atuação"
          title="Soluções jurídicas para cada momento da sua vida"
          subtitle="Atuamos de forma consultiva e contenciosa, com equipe dedicada a cada especialidade."
        />

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {areas.map((a, i) => (
            <motion.div key={a.title} variants={staggerChild}>
              <TiltCard className="border-beam h-full rounded-3xl">
                <a
                  href={whatsappLink(`Olá! Gostaria de falar sobre ${a.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold-500/15 bg-gradient-to-b from-navy-800/80 to-navy-900/80 p-7 backdrop-blur transition-colors duration-500 hover:border-transparent"
                >
                  <span className="absolute right-6 top-5 font-serif text-5xl font-bold text-gold-500/10 transition-colors duration-500 group-hover:text-gold-500/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative mb-6 h-14 w-14">
                    <span className="absolute inset-0 rounded-2xl bg-gold-500/15 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
                    <span className="absolute inset-0 grid place-items-center text-gold-400 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                      <a.icon className="h-7 w-7" strokeWidth={1.6} />
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-ivory">{a.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/60">{a.text}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {a.tags.map((t) => (
                      <span key={t} className="rounded-full border border-gold-500/20 px-3 py-1 text-[11px] text-gold-300/80">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-gold-400">
                    Falar sobre o meu caso
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  </span>

                  <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700 transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
