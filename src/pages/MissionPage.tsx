import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCaseById, getCasesByCharacter, type CaseId } from '../data/cases'
import { getCharacter } from '../data/characters'
import { parseCaseIdParam } from '../lib/mission'
import { AmbientDecor } from '../components/AmbientDecor'
import { CaseSelectModal } from '../components/CaseSelectModal'
import { CaseStoryBody } from '../components/CaseStoryBody'
import { CharacterProfile } from '../components/CharacterProfile'
import './MissionPage.css'

/** 關主掃描後的案件展示頁；只依網址讀取共用案件資料。 */
export function MissionPage() {
  const { caseId: rawCaseId } = useParams()
  const caseId = parseCaseIdParam(rawCaseId)
  const caseStory = caseId ? getCaseById(caseId) : undefined
  const character = caseStory ? getCharacter(caseStory.characterId) : null
  const siblingCases = character
    ? getCasesByCharacter(character.id)
    : []

  const [browseOpen, setBrowseOpen] = useState(false)
  const [previewCaseId, setPreviewCaseId] = useState<CaseId | null>(null)

  useEffect(() => {
    if (caseStory) {
      document.title = `${caseStory.code} ${caseStory.title}｜權流・溯源`
    } else {
      document.title = '找不到此案件｜權流・溯源'
    }
  }, [caseStory])

  if (!caseStory || !character) {
    return (
      <div className="mission-page-shell">
        <AmbientDecor />
        <main className="mission-page mission-page--missing">
          <p className="mission-page__brand">權流・溯源</p>
          <h1 className="mission-page__title">找不到此案件</h1>
          <p className="mission-page__lead">
            案件編號無效或不存在。請確認 QR Code 或網址是否正確。
          </p>
          <Link className="btn btn--primary" to="/characters">
            返回角色頁
          </Link>
        </main>
      </div>
    )
  }

  const themeStyle = {
    '--char-accent': character.theme.accent,
    '--char-accent-soft': character.theme.accentSoft,
    '--char-glow': character.theme.glow,
  } as CSSProperties

  const openBrowse = () => {
    setPreviewCaseId(null)
    setBrowseOpen(true)
  }

  const closeBrowse = () => {
    setBrowseOpen(false)
    setPreviewCaseId(null)
  }

  return (
    <div className="mission-page-shell" style={themeStyle}>
      <AmbientDecor />
      <main className="mission-page">
        <header className="mission-page__top">
          <p className="mission-page__brand">權流・溯源</p>
          <a className="btn btn--ghost mission-page__jump" href="#selected-case">
            直接看案件
          </a>
        </header>

        <section
          className="mission-page__profile"
          aria-labelledby="mission-character-heading"
        >
          <h2 id="mission-character-heading" className="visually-hidden">
            角色介紹
          </h2>
          <CharacterProfile character={character} />
        </section>

        <section
          id="selected-case"
          className="mission-page__case"
          aria-labelledby="selected-case-heading"
        >
          <p className="mission-page__case-label">本次選擇的案件</p>
          <h2 id="selected-case-heading" className="mission-page__case-title">
            <span className="mission-page__case-code">{caseStory.code}</span>
            {caseStory.title}
          </h2>
          <CaseStoryBody
            paragraphs={caseStory.body}
            className="mission-page__case-body"
          />
        </section>

        <div className="mission-page__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={openBrowse}
          >
            查看這位角色的其他故事
          </button>
        </div>
      </main>

      <CaseSelectModal
        open={browseOpen}
        mode="browse"
        character={character}
        cases={siblingCases}
        lockedCaseId={caseStory.id}
        previewCaseId={previewCaseId}
        onSelectCase={setPreviewCaseId}
        onBackToGrid={() => setPreviewCaseId(null)}
        onClose={closeBrowse}
      />
    </div>
  )
}
