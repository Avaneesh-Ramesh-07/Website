import { useRef, type ReactNode, type MouseEvent } from 'react'

interface Props { children: ReactNode }

export default function TiltCard({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5
    const y = (e.clientY - top)  / height - 0.5
    el.style.setProperty('--rx', `${-y * 14}deg`)
    el.style.setProperty('--ry', `${x  * 14}deg`)
    el.style.setProperty('--shine-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--shine-y', `${(y + 0.5) * 100}%`)
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      className="card card-3d"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="card-shine" aria-hidden="true" />
      {children}
    </div>
  )
}
