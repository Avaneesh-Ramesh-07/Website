import { useEffect, useState } from 'react'

export default function Cursor() {
  const [pos, setPos]       = useState({ x: -300, y: -300 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const hide = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', hide)
    }
  }, [])

  return (
    <div
      className="cursor-glow"
      aria-hidden="true"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
      }}
    />
  )
}
