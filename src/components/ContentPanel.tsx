import { useRef, type ReactNode, type MouseEvent } from 'react'

interface Props {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

export default function ContentPanel({ visible, onClose, children }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      className={`panel-overlay${visible ? ' panel-visible' : ''}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="panel-inner">
        <button
          className="panel-back"
          onClick={onClose}
          aria-label="Back to studio"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className="panel-content">
          {children}
        </div>
      </div>
    </div>
  )
}
