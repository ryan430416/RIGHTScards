export type CharacterId = 'mage' | 'knight' | 'ranger' | 'rogue'

export interface CharacterTheme {
  accent: string
  accentSoft: string
  glow: string
}

export interface Character {
  id: CharacterId
  role: string
  name: string
  tagline: string
  story: string[]
  quote: string
  image: string
  imageAlt: string
  theme: CharacterTheme
}

/**
 * 角色圖鑑資料。
 * 圖片請放在 public/characters/，檔名對應下方 image 路徑。
 */
export const characters: Character[] = [
  {
    id: 'mage',
    role: '法師',
    name: '知識法師',
    tagline: '透過古籍與魔法，理解自身權利。',
    story: [
      '知識法師曾是古城書塔裡最安靜的學徒。他熟記咒語、認真完成每一次試煉，卻在學期結束時，收到一份與原先紀錄不同的評定。',
      '他原本以為是自己記錯，直到發現另一位學徒也有相同的困惑，才重新打開古籍，逐頁比對試煉紀錄與最初公布的規則。當差異被找出，一道金光從書頁間升起，照亮了通往答案的路。',
      '從此，他開始陪伴不敢開口的學徒，把模糊的不安整理成能夠問出口的問題。',
    ],
    quote: '「先別急著把書闔上，我們再往前翻一頁。」',
    image: '/characters/mage.jpg',
    imageAlt: '知識法師角色卡',
    theme: {
      accent: '#9eb6d4',
      accentSoft: 'rgba(158, 182, 212, 0.22)',
      glow: 'rgba(212, 175, 55, 0.28)',
    },
  },
  {
    id: 'knight',
    role: '騎士',
    name: '守護騎士',
    tagline: '挺身守護學生，捍衛公平。',
    story: [
      '守護騎士年幼時，總以為只要盾牌夠大，就能保護所有人。',
      '成為見習騎士後，他每天巡守城門，直到某晚，看見同住的夥伴站在宿舍公告前，想問些什麼，最後又低頭離開。他放下長劍，第一次坐下來，聽完一件沒有怪物、也沒有敵軍的煩惱。',
      '隔天，他陪夥伴確認規定、整理困難，一起走進管理大廳。此後，他巡守時走得慢了一些，開始留意那些欲言又止的身影。',
    ],
    quote: '「你慢慢說，我在這裡聽。」',
    image: '/characters/knight.jpg',
    imageAlt: '守護騎士角色卡',
    theme: {
      accent: '#c5ccd6',
      accentSoft: 'rgba(197, 204, 214, 0.2)',
      glow: 'rgba(212, 175, 55, 0.3)',
    },
  },
  {
    id: 'ranger',
    role: '遊俠',
    name: '巡境遊俠',
    tagline: '探索校園，察覺日常中的問題。',
    story: [
      '巡境遊俠喜歡走小路。他知道哪座石橋能看見晨光，也知道哪條長廊在雨後會長出青苔。',
      '有一天，通往學舍的路燈熄了。他以為很快就會有人修好，便繞路離開。幾天後，他卻看見一隻年幼的獵鷹，在同一處黑暗的階梯踩空。',
      '那晚，他提燈重新走了一遍，記下熄滅的燈柱、鬆動的石階與確切位置，將標記送到負責修繕的人手中。如今，他的地圖上除了風景，還有許多等待改善的小記號。',
    ],
    quote: '「這裡有問題。來，我們把位置記清楚。」',
    image: '/characters/ranger.png',
    imageAlt: '巡境遊俠角色卡',
    theme: {
      accent: '#7a8f72',
      accentSoft: 'rgba(122, 143, 114, 0.22)',
      glow: 'rgba(212, 175, 55, 0.26)',
    },
  },
  {
    id: 'rogue',
    role: '盜賊',
    name: '解謎盜賊',
    tagline: '憑機智破解疑團，找出隱藏線索。',
    story: [
      '解謎盜賊擅長開鎖，也特別不擅長忍住好奇心。別人看完告示便離開，他卻會湊近看看日期旁有沒有新添的墨跡。',
      '一次申請試煉資格時，他依照公告準時抵達，入口卻已關閉。不同窗口給出不同答覆，這一次，開鎖工具幫不上忙。',
      '他找出先前留下的公告，記錄時間與答覆，將線索一一排開，終於找出資訊之間的缺口。從此，他隨身多帶了一本小冊子，保存每個「好像哪裡不對」的瞬間。',
    ],
    quote: '「別急著猜。我們先看看，線索說了什麼。」',
    image: '/characters/rogue.jpg',
    imageAlt: '解謎盜賊角色卡',
    theme: {
      accent: '#8b7399',
      accentSoft: 'rgba(139, 115, 153, 0.24)',
      glow: 'rgba(212, 175, 55, 0.26)',
    },
  },
]

export const defaultCharacterId: CharacterId = 'mage'

export function getCharacter(id: CharacterId): Character {
  return characters.find((c) => c.id === id) ?? characters[0]
}
