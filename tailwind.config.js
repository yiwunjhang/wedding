/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 主色票（依主視覺照片重新配色）
        primary: {
          DEFAULT: '#B1C97A',  // 主色：花園草葉嫩綠
          deep:    '#6E8F3C',  // 深色：按鈕、標題（自然林綠）
          dark:    '#4A6B28',  // 最深：hover
        },
        mist:   '#B8CDD6',     // 天空藍灰：cool 點綴（取自照片天空）
        sage:   '#C3C9A6',     // 暖灰綠：tag 背景（偏暖）
        warm:   '#D4B87A',     // 香檳金：裝飾線、✦（取自新郎西裝）
        shell:  '#F5EFE6',     // 象牙奶油：section 背景（取自小屋牆壁）
        ivory:  '#FDFAF4',     // 極淡暖白：交替 section 底色
        // Tailwind component aliases
        pink: {
          wedding: '#B1C97A',
          light:   '#C3C9A6',
          dark:    '#6E8F3C',
        },
        gold: {
          wedding: '#D4B87A',
          light:   '#EDE0C4',
          dark:    '#B8944E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
