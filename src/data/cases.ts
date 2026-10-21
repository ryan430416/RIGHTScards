import type { CharacterId } from './characters'

export type CaseId =
  | 'A-01'
  | 'A-02'
  | 'A-03'
  | 'A-04'
  | 'B-01'
  | 'B-02'
  | 'B-03'
  | 'B-04'
  | 'C-01'
  | 'C-02'
  | 'C-03'
  | 'C-04'
  | 'D-01'
  | 'D-02'
  | 'D-03'
  | 'D-04'

/**
 * 參加者可見的案件資料。
 * 僅保存角色對應、編號、標題與敘事；第一關不附解答欄位。
 */
export interface CaseStory {
  id: CaseId
  characterId: CharacterId
  code: CaseId
  title: string
  /** 自原文整理的短摘要，供案件按鈕使用 */
  summary: string
  /** 完整第二人稱敘事原文 */
  body: string
}

export const cases: CaseStory[] = [
  {
    id: 'A-01',
    characterId: 'mage',
    code: 'A-01',
    title: '消失的期末成績',
    summary: '系統上的成績和你原本知道的成績不一樣。',
    body: '期末成績公布後，你發現系統上的成績和你原本知道的成績不一樣，不知道是哪個環節出了問題。',
  },
  {
    id: 'A-02',
    characterId: 'mage',
    code: 'A-02',
    title: '突然改變的評分方式',
    summary: '老師宣布的評分方式和一開始說明的內容不同。',
    body: '學期進行到一半，老師宣布評分方式和一開始說明的內容不同，你開始擔心新的評分方式會影響自己的成績。',
  },
  {
    id: 'A-03',
    characterId: 'mage',
    code: 'A-03',
    title: '與原先說明不同的課程',
    summary: '實際上課內容和選課時了解的內容有很大差異。',
    body: '你原本選了一門課，實際上課後卻發現課程內容和當初選課時了解的內容有很大的差異。',
  },
  {
    id: 'A-04',
    characterId: 'mage',
    code: 'A-04',
    title: '我的畢業學分去哪了？',
    summary: '確認畢業資格時，發現學分似乎不足。',
    body: '準備確認畢業資格時，你發現自己的學分似乎不足，但不知道是哪一類學分不足，也不知道應該找誰確認。',
  },
  {
    id: 'B-01',
    characterId: 'knight',
    code: 'B-01',
    title: '停車場有人吸菸',
    summary: '停車區附近有人吸菸，煙味影響周圍環境。',
    body: '你在校內停車場停車時，發現有人在停車區附近吸菸，煙味飄到周圍，影響其他學生使用停車場的環境。',
  },
  {
    id: 'B-02',
    characterId: 'knight',
    code: 'B-02',
    title: '宿舍住宿問題',
    summary: '宿舍遇到住宿問題，不清楚規定與反映管道。',
    body: '你住在學校宿舍，最近遇到住宿相關問題，但不清楚住宿規定，也不知道應該向哪個單位反映。',
  },
  {
    id: 'B-03',
    characterId: 'knight',
    code: 'B-03',
    title: '宿舍生活規範問題',
    summary: '對宿舍新生活管理規定的內容與實施方式有疑問。',
    body: '宿舍公布了一項新的生活管理規定，你看完後有疑問，不知道規定內容、實施方式以及自己可以向誰詢問。',
  },
  {
    id: 'B-04',
    characterId: 'knight',
    code: 'B-04',
    title: '校園失物招領爭議',
    summary: '失物送至招領處後已被領走，不清楚認領規定。',
    body: '你不小心在校園內遺失了隨身物品，後來得知有人已將物品送至學校失物招領處，但前往領取時，卻發現物品已被領走。你不清楚學校的失物認領及保管規定，也不知道應該如何反映及尋求協助。',
  },
  {
    id: 'C-01',
    characterId: 'ranger',
    code: 'C-01',
    title: '冷氣壞掉第27天',
    summary: '教室冷氣故障一段時間，炎熱影響上課。',
    body: '上課教室的冷氣已故障一段時間，炎熱的環境開始影響你和其他同學的上課狀況。',
  },
  {
    id: 'C-02',
    characterId: 'ranger',
    code: 'C-02',
    title: '晚上看不清楚的路',
    summary: '校園某處照明不足，擔心夜間通行安全。',
    body: '晚上經過校園某處時，你發現照明不足，走路不方便，也開始擔心夜間通行安全。',
  },
  {
    id: 'C-03',
    characterId: 'ranger',
    code: 'C-03',
    title: '壞掉的公共設備',
    summary: '校園公共設備損壞一段時間，不知該向哪反映。',
    body: '你發現校園某項公共設備已經損壞一段時間，但不知道應向哪個單位反映。',
  },
  {
    id: 'C-04',
    characterId: 'ranger',
    code: 'C-04',
    title: '廁所設備故障',
    summary: '廁所固定設備故障，已影響正常使用。',
    body: '你使用校內廁所時，發現馬桶、水龍頭或其他固定設備故障，已經影響學生正常使用。',
  },
  {
    id: 'D-01',
    characterId: 'rogue',
    code: 'D-01',
    title: '我的資料被公開了',
    summary: '個人資料出現在不應該公開的地方。',
    body: '你發現自己的個人資料出現在一個不應該公開的地方，開始擔心自己的隱私受到影響。',
  },
  {
    id: 'D-02',
    characterId: 'rogue',
    code: 'D-02',
    title: '校園申請規定不一致',
    summary: '相同申請在不同窗口得到不一樣的規定與答覆。',
    body: '你和同學因為相同的事情，分別向學校不同窗口辦理申請，卻得到不一樣的規定與答覆。由於學校沒有明確公告統一的辦理標準，讓你不知道應該依照哪一個說法辦理，也擔心自己的申請權益受到影響。',
  },
  {
    id: 'D-03',
    characterId: 'rogue',
    code: 'D-03',
    title: '網站系統讓我損失權益',
    summary: '系統錯誤或通知未顯示，導致錯過重要期限。',
    body: '你使用學校網站或線上系統時，發現系統錯誤、資訊沒有更新，或重要通知沒有正常顯示，導致你錯過申請、選擇或其他重要期限，可能影響自己的學生權益。',
  },
  {
    id: 'D-04',
    characterId: 'rogue',
    code: 'D-04',
    title: '申請期限突然提前',
    summary: '申請系統提前關閉，但沒有清楚通知所有學生。',
    body: '你原本打算依照學校公告的期限提出申請，卻在截止前發現申請系統已經關閉。經詢問才知道，學校已提前調整截止時間，但沒有清楚通知所有學生，導致部分學生錯過申請機會。',
  },
]

export function getCasesByCharacter(characterId: CharacterId): CaseStory[] {
  return cases.filter((item) => item.characterId === characterId)
}

export function getCaseById(id: CaseId): CaseStory | undefined {
  return cases.find((item) => item.id === id)
}
