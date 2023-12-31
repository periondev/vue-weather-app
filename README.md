# 天氣預報

天氣預報 App 網頁提供台灣各城市和鄉鎮的一週天氣預報，資訊皆來自中央氣象署的[氣象資料開放平臺](https://opendata.cwa.gov.tw/index)。憑藉直觀的界面和實時更新，使用者可以隨時了解所在地區的最新天氣狀況，也能儲存自訂地區以便日後快速查看。

## 功能

- 下拉式選單設計，使用者可以快速選取地區。
- 本地自動儲存查詢紀錄，使用者可以讀取、新增、刪除地區紀錄，並可直接點擊地區紀錄查看最新天氣預報。
- 網頁顯示天氣預報因子包含天氣現象、相對濕度、每 12 小時降雨機率、平均溫度等重要天氣資訊。
- 響應式網頁設計。

## Demo

Live Demo: [天氣預報](https://periondev.github.io/vue-weather-app/)

<img alt="screenshot" src="Preview-Images/vue-weather-app_(wide).webp" width="640px" />

## 參考文件

- [中央氣象署開放資料平臺之資料擷取 API
  ](https://opendata.cwa.gov.tw/dist/opendata-swagger.html)
- [氣象產品目錄總集](https://www.cwa.gov.tw/V8/C/D/Data_catalog_Detail.html?cls=1&pubtype_02=0)
- [中央氣象署產品說明文件
  預報-精緻化天氣預報-一週天氣預報](https://www.cwa.gov.tw/Data/data_catalog/1-1-5.pdf)
- [預報因子中英文對照及天氣描述代碼對應文件](https://opendata.cwa.gov.tw/opendatadoc/MFC/A0012-001.pdf)

## Tech Stack

This is a Vue 3 project bootstrapped with [create-vue](https://github.com/vuejs/create-vue) based on [Vite](https://v3.vitejs.dev/).

- Language: TypeScript
- Framework: Vue.js (Vue 3)
- Styling: Tailwind CSS
- Deployment: GitHub Pages
