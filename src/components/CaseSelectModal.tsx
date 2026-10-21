import { useEffect, useId, useRef } from 'react'
import type { Character } from '../data/characters'
import type { CaseId, CaseStory } from '../data/cases'
import './CaseSelectModal.css'

interface CaseSelectModalProps {
  open: boolean
  character: Character
  cases: CaseStory[]
  previewCaseId: CaseId | null
  onSelectCase: (id: CaseId) => void
  onBackToGrid: () => void
  onConfirm: () => void
  onClose: () => void
}

export function CaseSelectModal({
  open,
  character,
  cases,
  previewCaseId,
  onSelectCase,
  onBackToGrid,
  onConfirm,
  onClose,
}: CaseSelectModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const previewCase =
    cases.find((item) => item.id === previewCaseId) ?? null

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus()
    }, 0)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="case-modal" role="presentation">
      <button
        type="button"
        className="case-modal__backdrop"
        aria-label="關閉案件選擇"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="case-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="case-modal__header">
          <div className="case-modal__heading">
            <p className="case-modal__character">{character.name}</p>
            <h2 id={titleId} className="case-modal__title">
              選擇你的案件
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="case-modal__close"
            onClick={onClose}
          >
            關閉
          </button>
        </header>

        <div className="case-modal__body">
          {previewCase ? (
            <div className="case-modal__preview">
              <p className="case-modal__preview-code">{previewCase.code}</p>
              <h3 className="case-modal__preview-title">{previewCase.title}</h3>
              <p className="case-modal__preview-body">{previewCase.body}</p>
              <div className="case-modal__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={onBackToGrid}
                >
                  返回四個案件
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={onConfirm}
                >
                  確認此案件
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="case-modal__hint">
                每一道疑問，都是追尋源頭的開始。選擇一件案件，閱讀你的任務。
              </p>
              <div className="case-modal__grid">
                {cases.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="case-modal__card"
                    onClick={() => onSelectCase(item.id)}
                  >
                    <span className="case-modal__card-code">{item.code}</span>
                    <span className="case-modal__card-title">{item.title}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
