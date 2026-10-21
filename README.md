# 權流・溯源｜RIGHTScards

學生權益週「權流・溯源」角色介紹網頁（Vite + React + TypeScript）。

## 開發

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
npm run preview
```

## 路由

- `/` — 首頁入口
- `/characters` — 角色圖鑑與案件選擇（彈窗）
- `/mission/:caseId` — 關主掃描用案件展示頁（例：`/mission/A-01`）

部署於 Vercel 時，`vercel.json` 已設定 SPA rewrite，支援直接開啟案件網址。

## 角色圖片

請將四張角色卡圖放在：

```
public/characters/
  mage.jpg      # 知識法師
  knight.jpg    # 守護騎士
  ranger.png    # 巡境遊俠
  rogue.jpg     # 解謎盜賊
```

## 資料

- 角色：`src/data/characters.ts`
- 案件（16 則，無分類答案）：`src/data/cases.ts`
- 抽卡／已確認任務狀態：`src/lib/mission.ts`
  - 抽卡完成後呼叫 `setDrawnCharacterId(characterId)`
  - 任務模式僅能選擇該角色的四件案件；自由瀏覽介紹不會改寫抽卡結果
