import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCaseById } from '../data/cases'
import { getCharacter } from '../data/characters'
import { parseCaseIdParam } from '../lib/mission'
import { AmbientDecor } from '../components/AmbientDecor'
import './MissionPage.css'

/** 關主掃描後的案件展示頁；只依網址讀取共用案件資料。 */
export function MissionPage() {
  const { caseId: rawCaseId } = useParams()
  const caseId = parseCaseIdParam(rawCaseId)
  const caseStory = caseId ? getCaseById(caseId) : undefined
  const character = caseStory ? getCharacter(caseStory.characterId) : null

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
          <p className="mission-page__brand">權流・溯源｜案件任務</p>
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

  return (
    <div className="mission-page-shell">
      <AmbientDecor />
      <main className="mission-page">
        <p className="mission-page__brand">權流・溯源｜案件任務</p>
        <p className="mission-page__character">{character.name}</p>
        <p className="mission-page__code">{caseStory.code}</p>
        <h1 className="mission-page__title">{caseStory.title}</h1>
        <p className="mission-page__body">{caseStory.body}</p>
      </main>
    </div>
  )
}
