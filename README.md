# 活動個人網站
以 Vue 3 打造的邀請單頁應用程式，包含倒數計時、故事時間線、場地資訊及線上出席回覆功能。

---

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | [Vue 3](https://vuejs.org/) (Composition API / `<script setup>`) |
| 建置工具 | [Vite 5](https://vite.dev/) |
| CSS | [Tailwind CSS 3](https://tailwindcss.com/) |
| 動畫 | [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) |
| 圖示 | [@heroicons/vue](https://heroicons.com/) |
| Email | [EmailJS](https://www.emailjs.com/) |

---

## 功能頁面

| 區塊 |  說明 |
|------|-------|
| **NavBar** | 固定導覽列，捲動時切換透明／白色背景，支援行動版漢堡選單 |
| **Hero** | 全螢幕背景圖、日期倒數計時器 |
| **About** | 介紹關於時間線 |
| **Map** | 場地資訊卡片、Google Maps 嵌入、交通指引 |
| **RSVP** | 線上出席回覆表單（EmailJS 寄送），含飲食需求選項 |
| **Footer** | 結語、快速導覽連結、回覆截止提醒 |

---

## 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開發伺服器預設在 `http://localhost:5173`。

### 建置正式版

```bash
npm run build
```

產出檔案位於 `dist/` 目錄。

### 預覽正式版

```bash
npm run preview
```
---

## 專案結構

```
wedding/
├── public/                 # 靜態資源（直接輸出）
├── src/
│   ├── assets/
│   │   └── images/         # 圖片資源
│   ├── components/
│   │   ├── NavBar.vue      # 導覽列
│   │   ├── HeroSection.vue # 首頁區塊與倒數計時
│   │   ├── AboutSection.vue# 故事時間線
│   │   ├── MapSection.vue  # 場地與交通資訊
│   │   ├── RsvpSection.vue # 出席回覆表單
│   │   ├── FooterSection.vue
│   │   └── ScrollToTop.vue
│   ├── App.vue             # 根元件
│   ├── main.js             # 應用程式進入點
│   └── style.css           # 全域樣式與 Tailwind 指令
├── tailwind.config.js      # 客製化主題色（sage green / champagne gold）
├── vite.config.js
└── index.html
```

---

## 主題配色

| 色彩變數 | Hex | 用途 |
|----------|-----|------|
| `primary` | `#B1C97A` | 主色（鼠尾草綠） |
| `primary-deep` | `#6E8F3C` | 按鈕、標題 |
| `primary-dark` | `#4A6B28` | Hover 狀態 |
| `warm` | `#D4B87A` | 裝飾線條（香檳金） |
| `shell` | `#F5EFE6` | 區塊背景（象牙色） |
| `mist` | `#B8CDD6` | 輔助色（天空藍灰） |

---

## 開發環境建議

- **編輯器**：[VS Code](https://code.visualstudio.com/)
- **推薦擴充套件**：[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（Vue 語言支援）

---

## License

本專案僅供個人使用。
