import type { Character } from '../data/characters'
import type { CaseId, CaseStory } from '../data/cases'
import './CaseDossier.css'

interface CaseDossierProps {
  character: Character
  cases: CaseStory[]
  /** 抽卡已指定角色時，任務模式僅能選該角色案件 */
  taskLocked: boolean
  lockedCharacterName?: string
  expandedCaseId: CaseId | null
  confirmedCase: CaseStory | null
  confirmedCharacter: Character | null
  onExpandCase: (id: CaseId) => void
  onConfirmCase: () => void
  onReselect: () => void
  onJumpToLockedCharacter?: () => void
}

export function CaseDossier({
  character,
  cases,
  taskLocked,
  lockedCharacterName,
  expandedCaseId,
  confirmedCase,
  confirmedCharacter,
  onExpandCase,
  onConfirmCase,
  onReselect,
  onJumpToLockedCharacter,
}: CaseDossierProps) {
  const expandedCase =
    cases.find((item) => item.id === expandedCaseId) ?? null

  if (confirmedCase && confirmedCharacter) {
    return (
      <section
        id="cases"
        className="dossier"
        aria-labelledby="dossier-confirmed-heading"
      >
        <div className="section-heading">
          <h2 id="dossier-confirmed-heading">你的任務卷宗</h2>
          <p>第一關任務已確認</p>
        </div>

        <div className="dossier__confirmed">
          <p className="dossier__confirmed-meta">
            <span>角色｜{confirmedCharacter.name}</span>
            <span>案件｜{confirmedCase.code}</span>
          </p>
          <h3 className="dossier__confirmed-title">{confirmedCase.title}</h3>
          <p className="dossier__confirmed-body">{confirmedCase.body}</p>
          <p className="dossier__next-hint">
            請記下你的角色與案件編號，帶著這份疑問前往第二關。
          </p>
          <button type="button" className="btn btn--ghost" onClick={onReselect}>
            重新選擇案件
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="cases" className="dossier" aria-labelledby="dossier-heading">
      <div className="section-heading">
        <h2 id="dossier-heading">選擇你的案件</h2>
        <p>每一道疑問，都是追尋源頭的開始。選擇一件案件，閱讀你的任務。</p>
      </div>

      {taskLocked ? (
        <div className="dossier__lock-note" role="status">
          <p>
            任務模式已對應你抽到的角色「{lockedCharacterName}
            」。可自由瀏覽其他角色介紹，但不會改動抽卡結果；請回到該角色選擇案件。
          </p>
          {onJumpToLockedCharacter ? (
            <button
              type="button"
              className="btn btn--primary"
              onClick={onJumpToLockedCharacter}
            >
              回到任務角色
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <p className="dossier__role-note">
            {character.name}的任務卷宗 · 請選擇其中一件
          </p>

          <div className="dossier__grid">
            {cases.map((item) => {
              const selected = item.id === expandedCaseId
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`dossier__card${selected ? ' is-active' : ''}`}
                  aria-expanded={selected}
                  aria-controls={`case-detail-${item.id}`}
                  onClick={() => onExpandCase(item.id)}
                >
                  <span className="dossier__card-code">{item.code}</span>
                  <span className="dossier__card-title">{item.title}</span>
                  <span className="dossier__card-summary">{item.summary}</span>
                </button>
              )
            })}
          </div>

          {expandedCase ? (
            <article
              id={`case-detail-${expandedCase.id}`}
              className="dossier__detail"
              aria-live="polite"
            >
              <header className="dossier__detail-header">
                <p className="dossier__detail-code">{expandedCase.code}</p>
                <h3 className="dossier__detail-title">{expandedCase.title}</h3>
              </header>
              <p className="dossier__detail-body">{expandedCase.body}</p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={onConfirmCase}
              >
                選擇這件案件
              </button>
            </article>
          ) : (
            <p className="dossier__hint">點選上方案件，展開完整任務內容。</p>
          )}
        </>
      )}
    </section>
  )
}
