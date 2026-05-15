# Leyin & Risa 婚禮網站

以 Vue 3 打造的婚禮邀請網站，包含故事時間線、照片集、場地交通資訊及線上出席回覆功能。

---

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | [Vue 3](https://vuejs.org/) (Composition API / `<script setup>`) |
| 路由 | [Vue Router 4](https://router.vuejs.org/) |
| 建置工具 | [Vite 5](https://vite.dev/) |
| CSS | [Tailwind CSS 3](https://tailwindcss.com/) |
| 動畫 | [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) |
| 圖示 | [@heroicons/vue](https://heroicons.com/) |
| Email | [EmailJS](https://www.emailjs.com/) |

---

## 環境需求

| 工具 | 版本 |
|------|------|
| Node.js | v20.11.0 |
| npm | 10.2.4 |

---

## 功能頁面

### 首頁 `/`

| 區塊 | 說明 |
|------|------|
| **NavBar** | 固定導覽列，捲動時切換透明／白色背景，支援行動版漢堡選單，含 LINE 連結 |
| **Hero** | 全螢幕背景圖、日期倒數計時器 |
| **About** | 新郎新娘介紹、故事時間線 |
| **相處時刻** | 三分類照片輪播（登記 / 婚紗 / 蜜月），每 Tab 最多顯示 6 張 |
| **Map** | 場地資訊卡片、Google Maps 嵌入、交通指引（含 YouBike 及停車場連結） |
| **RSVP** | 線上出席回覆表單（EmailJS 寄送），含飲食需求選項 |
| **Footer** | 結語、LINE QR Code、快速導覽連結、回覆截止提醒 |

### 照片集 `/gallery`

- 三分類 Tab（登記 / 婚紗 / 蜜月）
- 分頁瀏覽（每頁 6 張），附翻頁動畫
- 點擊照片開啟 Lightbox 放大檢視
- 照片自動從 `src/assets/images/` 子資料夾載入，無需手動 import

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
├── public/
│   ├── 404.html               # GitHub Pages SPA 路由重導
│   └── IStudio_icon.png
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── RegisteringMarriage/  # 登記照片
│   │       ├── Prewedding/           # 婚紗照片
│   │       └── Honeymoon/            # 蜜月照片
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── PhotoCarousel.vue  # 相處時刻輪播
│   │   ├── MapSection.vue
│   │   ├── RsvpSection.vue
│   │   ├── FooterSection.vue
│   │   ├── BackgroundMusic.vue
│   │   ├── ScrollToTop.vue
│   │   └── SectionProgress.vue
│   ├── data/
│   │   └── photos.js          # 照片自動掃描（import.meta.glob）
│   ├── views/
│   │   ├── HomeView.vue       # 首頁
│   │   └── GalleryPage.vue    # 照片集頁
│   ├── router.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── vite.config.js
└── tailwind.config.js
```

---

## 新增照片

將圖片放入對應資料夾，重啟 dev server 後自動載入，**無需修改程式碼**：

```
src/assets/images/
  RegisteringMarriage/   ← 登記
  Prewedding/            ← 婚紗
  Honeymoon/             ← 蜜月
```

支援格式：`png`、`jpg`、`jpeg`、`webp`（大小寫均可）。
檔名即為照片說明文字（會自動去除開頭的數字編號）。

### 壓縮照片

新增照片後，在**專案根目錄**執行以下指令，將圖片縮放並壓縮（橫式寬 800px、直式高 800px，比例不變）：

```bash
npm run compress
```

已達標的圖片會自動略過，不會重複處理。

---

## 主題配色

| 色彩 | Hex | 用途 |
|------|-----|------|
| `primary` | `#B1C97A` | 主色（鼠尾草綠） |
| `primary-deep` | `#6E8F3C` | 按鈕、標題 |
| `primary-dark` | `#4A6B28` | Hover 狀態 |
| `warm` | `#D4B87A` | 裝飾線條（香檳金） |
| `shell` | `#F5EFE6` | 區塊背景（象牙色） |

---

## 部署

透過 GitHub Actions 自動部署至 GitHub Pages，Push 至 `main` 分支即觸發。

```
https://yiwunjhang.github.io/wedding/
```

---

## 開發環境建議

- **編輯器**：[VS Code](https://code.visualstudio.com/)
- **推薦擴充套件**：[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

---

## License

本專案僅供個人使用。
