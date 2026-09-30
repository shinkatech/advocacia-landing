import { useEffect, useState } from 'react'

/** Digita e apaga as palavras em sequência. */
export default function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let delay = deleting ? 40 : 85
    if (!deleting && text === word) delay = 1800
    if (deleting && text === '') delay = 300

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words])

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse bg-gold-400" />
    </span>
  )
}
