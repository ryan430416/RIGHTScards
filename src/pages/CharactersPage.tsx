import { useId, useState, type CSSProperties } from 'react'
import {
  characters,
  defaultCharacterId,
  getCharacter,
  type CharacterId,
} from '../data/characters'
import { getCaseById, getCasesByCharacter, type CaseId } from '../data/cases'
import {
  clearConfirmedMission,
  getConfirmedMission,
  getDrawnCharacterId,
  setConfirmedMission,
} from '../lib/mission'
import { AmbientDecor } from '../components/AmbientDecor'
import { CaseDossier } from '../components/CaseDossier'
import './CharactersPage.css'

export function CharactersPage() {
  const drawnCharacterId = getDrawnCharacterId()
  const initialBrowseId = drawnCharacterId ?? defaultCharacterId

  const [activeId, setActiveId] = useState<CharacterId>(initialBrowseId)
  const [expandedCaseId, setExpandedCaseId] = useState<CaseId | null>(null)
  const [confirmed, setConfirmed] = useState(() => getConfirmedMission())

  const character = getCharacter(activeId)
  const characterCases = getCasesByCharacter(activeId)
  const panelId = useId()

  const taskLocked =
    Boolean(drawnCharacterId) && drawnCharacterId !== activeId

  const confirmedCase = confirmed ? getCaseById(confirmed.caseId) ?? null : null
  const confirmedCharacter = confirmed
    ? getCharacter(confirmed.characterId)
    : null

  const selectCharacter = (id: CharacterId) => {
    setActiveId(id)
    // 切換角色時清除尚未確認的案件選取
    setExpandedCaseId(null)
  }

  const handleExpandCase = (id: CaseId) => {
    if (taskLocked) return
    setExpandedCaseId(id)
    requestAnimationFrame(() => {
      document.getElementById(`case-detail-${id}`)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'nearest',
      })
    })
  }

  const handleConfirmCase = () => {
    if (!expandedCaseId || taskLocked) return
    const story = getCaseById(expandedCaseId)
    if (!story || story.characterId !== activeId) return

    const mission = setConfirmedMission(activeId, expandedCaseId)
    setConfirmed(mission)
    setExpandedCaseId(null)

    requestAnimationFrame(() => {
      document.getElementById('cases')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      })
    })
  }

  const handleReselect = () => {
    clearConfirmedMission()
    setConfirmed(null)
    setExpandedCaseId(null)

    if (drawnCharacterId) {
      setActiveId(drawnCharacterId)
    }

    requestAnimationFrame(() => {
      document.getElementById('cases')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      })
    })
  }

  const themeStyle = {
    '--char-accent': character.theme.accent,
    '--char-accent-soft': character.theme.accentSoft,
    '--char-glow': character.theme.glow,
  } as CSSProperties

  return (
    <div className="characters-page" style={themeStyle}>
      <AmbientDecor />

      <main className="characters-page__main">
        <section className="opening" aria-labelledby="opening-title">
          <p className="opening__eyebrow">學生權益週</p>
          <h1 id="opening-title" className="opening__title">
            權流・溯源
          </h1>
          <p className="opening__tagline">溯其源・知其權</p>
          <p className="opening__english">TRACE THE SOURCE. KNOW YOUR RIGHTS.</p>
          <p className="opening__lead">
            四張卡牌，四種追尋答案的方式。循著光流，認識與你同行的獵鷹。
          </p>
          <a className="btn btn--primary" href="#codex">
            認識四位角色
          </a>
        </section>

        <section id="codex" className="codex" aria-labelledby="codex-heading">
          <div className="section-heading">
            <h2 id="codex-heading">角色介紹</h2>
            <p>循著光流，認識與你同行的獵鷹</p>
          </div>

          {drawnCharacterId ? (
            <p className="codex__drawn-note" role="status">
              抽卡角色：{getCharacter(drawnCharacterId).name}
              （瀏覽其他角色介紹不會改動抽卡結果）
            </p>
          ) : null}

          <div className="codex__tabs" role="tablist" aria-label="選擇角色">
            {characters.map((item) => {
              const selected = item.id === activeId
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className={`codex__tab${selected ? ' is-active' : ''}`}
                  onClick={() => selectCharacter(item.id)}
                  onKeyDown={(event) => {
                    const order = characters.map((c) => c.id)
                    const index = order.indexOf(item.id)
                    if (
                      event.key === 'ArrowRight' ||
                      event.key === 'ArrowDown'
                    ) {
                      event.preventDefault()
                      const next = order[(index + 1) % order.length]
                      selectCharacter(next)
                      document.getElementById(`tab-${next}`)?.focus()
                    }
                    if (
                      event.key === 'ArrowLeft' ||
                      event.key === 'ArrowUp'
                    ) {
                      event.preventDefault()
                      const prev =
                        order[(index - 1 + order.length) % order.length]
                      selectCharacter(prev)
                      document.getElementById(`tab-${prev}`)?.focus()
                    }
                    if (event.key === 'Home') {
                      event.preventDefault()
                      selectCharacter(order[0])
                      document.getElementById(`tab-${order[0]}`)?.focus()
                    }
                    if (event.key === 'End') {
                      event.preventDefault()
                      const last = order[order.length - 1]
                      selectCharacter(last)
                      document.getElementById(`tab-${last}`)?.focus()
                    }
                  }}
                >
                  <span className="codex__tab-role">{item.role}</span>
                  <span className="codex__tab-name">{item.name}</span>
                </button>
              )
            })}
          </div>

          <div
            className="codex__stage"
            role="tabpanel"
            id={panelId}
            aria-labelledby={`tab-${character.id}`}
            key={character.id}
          >
            <div className="codex__portrait">
              <div className="codex__frame">
                <img
                  src={character.image}
                  alt={character.imageAlt}
                  className="codex__image"
                  width={720}
                  height={1080}
                  decoding="async"
                />
              </div>
            </div>

            <div className="codex__story">
              <p className="codex__role">{character.role}</p>
              <h3 className="codex__name">{character.name}</h3>
              <p className="codex__tagline">{character.tagline}</p>

              <div className="codex__body">
                {character.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="codex__quote">
                <p>{character.quote}</p>
              </blockquote>

              {!confirmed && !taskLocked ? (
                <a className="btn btn--ghost codex__to-cases" href="#cases">
                  選擇案件
                </a>
              ) : null}
            </div>
          </div>

          <div className="codex__thumbs" aria-label="角色縮圖">
            {characters.map((item) => {
              const selected = item.id === activeId
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`codex__thumb${selected ? ' is-active' : ''}`}
                  aria-pressed={selected}
                  aria-label={`檢視${item.name}`}
                  onClick={() => selectCharacter(item.id)}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="codex__thumb-image"
                    width={160}
                    height={240}
                    decoding="async"
                  />
                  <span className="codex__thumb-label">{item.name}</span>
                </button>
              )
            })}
          </div>
        </section>

        <CaseDossier
          character={character}
          cases={characterCases}
          taskLocked={taskLocked && !confirmed}
          lockedCharacterName={
            drawnCharacterId
              ? getCharacter(drawnCharacterId).name
              : undefined
          }
          expandedCaseId={expandedCaseId}
          confirmedCase={confirmedCase}
          confirmedCharacter={confirmedCharacter}
          onExpandCase={handleExpandCase}
          onConfirmCase={handleConfirmCase}
          onReselect={handleReselect}
          onJumpToLockedCharacter={
            drawnCharacterId
              ? () => selectCharacter(drawnCharacterId)
              : undefined
          }
        />

        <section className="closing" aria-labelledby="closing-heading">
          <div className="closing__ornament" aria-hidden="true" />
          <h2 id="closing-heading" className="visually-hidden">
            結語
          </h2>
          <p className="closing__text">
            每一個疑問，都值得被好好理解。
            <br />
            這一次，與你的獵鷹一起，溯其源，知其權。
          </p>
          <a className="btn btn--ghost" href="#codex">
            回到角色圖鑑
          </a>
        </section>
      </main>
    </div>
  )
}
