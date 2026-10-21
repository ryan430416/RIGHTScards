import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import type { Character } from '../data/characters'
import type { CaseStory } from '../data/cases'
import { getMissionPath, getMissionUrl } from '../lib/mission'
import './MissionTicket.css'

interface MissionTicketProps {
  character: Character
  caseStory: CaseStory
  onReselect: () => void
}

export function MissionTicket({
  character,
  caseStory,
  onReselect,
}: MissionTicketProps) {
  const [bodyOpen, setBodyOpen] = useState(false)
  const missionUrl = getMissionUrl(caseStory.id)
  const missionPath = getMissionPath(caseStory.id)

  return (
    <section
      id="mission-ticket"
      className="mission-ticket"
      aria-labelledby="mission-ticket-heading"
    >
      <div className="section-heading">
        <h2 id="mission-ticket-heading">你的任務憑證</h2>
        <p>第一關任務已確認</p>
      </div>

      <div className="mission-ticket__card">
        <p className="mission-ticket__meta">
          <span>角色｜{character.name}</span>
          <span>案件｜{caseStory.code}</span>
        </p>
        <h3 className="mission-ticket__title">{caseStory.title}</h3>

        <div className="mission-ticket__body-block">
          <button
            type="button"
            className="mission-ticket__toggle"
            aria-expanded={bodyOpen}
            onClick={() => setBodyOpen((open) => !open)}
          >
            {bodyOpen ? '收合案件內容' : '展開完整案件內容'}
          </button>
          {bodyOpen ? (
            <p className="mission-ticket__body">{caseStory.body}</p>
          ) : null}
        </div>

        <div className="mission-ticket__qr-wrap">
          <div className="mission-ticket__qr">
            <QRCodeSVG
              value={missionUrl}
              size={240}
              level="M"
              marginSize={4}
              bgColor="#FFFFFF"
              fgColor="#060c18"
              title={`${caseStory.code} 案件 QR Code`}
            />
          </div>
          <p className="mission-ticket__qr-caption">
            <span className="mission-ticket__qr-code">{caseStory.code}</span>
            <span className="mission-ticket__qr-title">{caseStory.title}</span>
          </p>
        </div>

        <p className="mission-ticket__hint">
          請向下一關關主出示此 QR Code，由關主掃描查看你的案件。
        </p>

        <div className="mission-ticket__actions">
          <Link className="btn btn--primary" to={missionPath}>
            開啟案件頁
          </Link>
          <button type="button" className="btn btn--ghost" onClick={onReselect}>
            重新選擇案件
          </button>
        </div>
      </div>
    </section>
  )
}
