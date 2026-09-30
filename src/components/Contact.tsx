import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { areas, firm, whatsappLink } from '../data/site'
import ScalesOfJustice from './svg/ScalesOfJustice'
import { Reveal } from './ui/Reveal'
import SectionTitle from './ui/SectionTitle'

function Field({
  label,
  name,
  type = 'text',
  textarea,
  required,
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
  required?: boolean
}) {
  const base =
    'peer w-full rounded-xl border border-gold-500/25 bg-navy-900/60 px-4 pb-2.5 pt-6 text-ivory outline-none transition-all duration-300 placeholder-transparent focus:border-gold-400 focus:bg-navy-900 focus:shadow-[0_0_0_4px_rgba(201,164,92,0.15)]'
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={4} placeholder={label} required={required} className={`${base} resize-none`} />
      ) : (
        <input name={name} type={type} placeholder={label} required={required} className={base} />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-[11px] uppercase tracking-wider text-gold-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ivory/50 peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-gold-400">
        {label}
      </span>
    </label>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const msg = `Olá! Meu nome é ${d.get('nome')}.
Telefone: ${d.get('telefone')}
Área: ${d.get('area')}

${d.get('mensagem')}`
    window.open(whatsappLink(msg), '_blank', 'noopener')
    setSent(true)
    e.currentTarget.reset()
    setTimeout(() => setSent(false), 5000)
  }

  const info = [
    { icon: Phone, label: 'Telefone / WhatsApp', value: firm.phoneDisplay },
    { icon: Mail, label: 'E-mail', value: firm.email },
    { icon: MapPin, label: 'Endereço', value: firm.address },
    { icon: Clock, label: 'Horário', value: firm.hours },
  ]

  return (
    <section id="contato" className="noise relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <ScalesOfJustice
        className="pointer-events-none absolute -left-32 bottom-0 h-[520px] w-[520px] opacity-[0.06]"
        idPrefix="contact"
        draw={false}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          dark
          kicker="Contato"
          title="Conte o seu caso. Nós ouvimos com atenção."
          subtitle="Preencha o formulário e sua mensagem chega direto no nosso WhatsApp. Retornamos em até 24 horas úteis."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {info.map((it, i) => (
              <Reveal key={it.label} dir="left" delay={i * 0.1}>
                <div className="group flex items-start gap-4 rounded-2xl border border-gold-500/15 bg-navy-900/50 p-5 transition-all duration-500 hover:translate-x-2 hover:border-gold-500/50">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-500/10 text-gold-400 transition-transform duration-500 group-hover:rotate-[360deg]">
                    <it.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold-500">{it.label}</p>
                    <p className="mt-1 text-ivory/85">{it.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal dir="right">
            <form
              onSubmit={onSubmit}
              className="relative space-y-4 overflow-hidden rounded-3xl border border-gold-500/25 bg-gradient-to-b from-navy-800/70 to-navy-900/70 p-6 backdrop-blur sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Seu nome" name="nome" required />
                <Field label="Telefone" name="telefone" type="tel" required />
              </div>
              <label className="block">
                <span className="sr-only">Área do seu caso</span>
                <select
                  name="area"
                  className="w-full rounded-xl border border-gold-500/25 bg-navy-900/60 px-4 py-4 text-ivory outline-none transition-all focus:border-gold-400"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Área do seu caso
                  </option>
                  {areas.map((a) => (
                    <option key={a.title} value={a.title} className="bg-navy-900">
                      {a.title}
                    </option>
                  ))}
                  <option value="Outro" className="bg-navy-900">
                    Outro / não sei
                  </option>
                </select>
              </label>
              <Field label="Descreva brevemente a sua situação" name="mensagem" textarea required />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 py-4 font-semibold text-navy-950"
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <Send className="h-4 w-4" />
                Enviar pelo WhatsApp
              </motion.button>
              <p className="text-center text-xs text-ivory/40">Suas informações são protegidas pelo sigilo profissional.</p>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    className="absolute inset-0 grid place-items-center bg-navy-900/95 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                        <CheckCircle2 className="mx-auto h-16 w-16 text-gold-400" />
                      </motion.div>
                      <p className="mt-4 font-serif text-2xl text-ivory">Mensagem preparada!</p>
                      <p className="mt-1 text-sm text-ivory/60">Finalize o envio na janela do WhatsApp.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
