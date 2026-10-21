import type { CharacterId } from '../data/characters'
import { characters } from '../data/characters'
import type { CaseId } from '../data/cases'
import { getCaseById } from '../data/cases'

const DRAWN_KEY = 'rightscards.drawnCharacter'
const MISSION_KEY = 'rightscards.confirmedMission'

export interface ConfirmedMission {
  characterId: CharacterId
  caseId: CaseId
  confirmedAt: string
}

function isCharacterId(value: unknown): value is CharacterId {
  return (
    typeof value === 'string' &&
    characters.some((character) => character.id === value)
  )
}

function isCaseId(value: unknown): value is CaseId {
  return typeof value === 'string' && Boolean(getCaseById(value as CaseId))
}

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

/** 抽卡指定的角色；自由瀏覽人物介紹不會改寫此值。 */
export function getDrawnCharacterId(): CharacterId | null {
  try {
    const value = localStorage.getItem(DRAWN_KEY)
    return isCharacterId(value) ? value : null
  } catch {
    return null
  }
}

/** 供抽卡流程寫入；角色圖鑑頁只讀取。 */
export function setDrawnCharacterId(id: CharacterId): void {
  localStorage.setItem(DRAWN_KEY, id)
}

export function clearDrawnCharacterId(): void {
  localStorage.removeItem(DRAWN_KEY)
}

export function getConfirmedMission(): ConfirmedMission | null {
  const value = readJson<ConfirmedMission>(MISSION_KEY)
  if (!value) return null
  if (!isCharacterId(value.characterId) || !isCaseId(value.caseId)) return null

  const story = getCaseById(value.caseId)
  if (!story || story.characterId !== value.characterId) return null

  return value
}

export function setConfirmedMission(
  characterId: CharacterId,
  caseId: CaseId,
): ConfirmedMission {
  const story = getCaseById(caseId)
  if (!story || story.characterId !== characterId) {
    throw new Error('案件與角色不相符')
  }

  const mission: ConfirmedMission = {
    characterId,
    caseId,
    confirmedAt: new Date().toISOString(),
  }
  localStorage.setItem(MISSION_KEY, JSON.stringify(mission))
  return mission
}

export function clearConfirmedMission(): void {
  localStorage.removeItem(MISSION_KEY)
}

/** 案件展示路徑，供路由與 QR 共用。 */
export function getMissionPath(caseId: CaseId): string {
  return `/mission/${caseId}`
}

/** 以目前網站 origin 組成完整案件網址，不寫死網域。 */
export function getMissionUrl(caseId: CaseId): string {
  if (typeof window === 'undefined') {
    return getMissionPath(caseId)
  }
  return new URL(getMissionPath(caseId), window.location.origin).href
}

export function parseCaseIdParam(value: string | undefined): CaseId | null {
  if (!value) return null
  return isCaseId(value) ? value : null
}
