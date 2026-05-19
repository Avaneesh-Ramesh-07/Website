import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setPct(max > 0 ? (scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="progress-bar"
      aria-hidden="true"
      style={{ width: `${pct}%` }}
    />
  )
}
