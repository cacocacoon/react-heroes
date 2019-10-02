# Go Hero!

## 1. 開發環境
```
Node: 10.16.2
OS: macOS 10.15 Beta
```
***

## 2. 指令
```
# install dependencies
npm install

# serve with at localhost:8008
npm run dev

# build for production with minification and ugilification
npm run build

# unit and functional test
npm run test
```
***
## 3. 架構
### 資料夾結構
分為 components、hooks、reducers、store 四個資料夾

#### components
裡面以不同的元件名稱來取名資料夾，內部分別放置 jsx、scss、test，這樣的設計開發上比較好管理，又不至於混亂

#### hooks
共用的狀態邏輯可以放在 hooks，可以將過去的 container，以 hooks 取代

#### reducers
以 [ducks pattern](https://github.com/erikras/ducks-modular-redux) 的方式來分類 reducer 程式碼，也就是說功能相關的 action type、action creator、reducer 會放在同個檔案內，減少寫很多 import，比較好管理

運行方式主要是以 redux 為基礎，畫面相關的共用狀態、hero 資料放在 store，dispatch action 到 reducer 來修改 state。
使用 redux-thunk 處理非同步邏輯，部分元件有內部狀態，避免過度使用 redux
***

## 4. 使用的 library
### **dependencies**
### react
可以用宣告式的語法構建 UI 介面，能夠用來開發功能更複雜的應用程式，是一套追求數學層面邏輯一致的函式庫

### antd
是一套以 React 為基礎的 UI framework，提供彈性且美觀的元件幫助開發者有效開發，應用場景主要是後台管理網站，並且有設計原則給開發者參考

### rc-queue-anim
與 antd 同樣的組織開發，提供簡單易用的漸入漸出效果

### react-router-dom
用來作 router 的好用 lib

### redux
用來做狀態管理，同時也是一種設計模式，對於複雜的應用程式，此套可以使得開發人員依循同樣的模式來設計程式，同時他是以 functional programming 的方法撰寫，測試上比較容易，狀態變化亦能預測

### redux-thunk
redux middleware，可處理非同步程式邏輯，對於非同步需求不多的應用程式，這是很適當的選擇

### core-js
可以利用 `.babelrc` 設定，針對要支援的瀏覽器做自動化的 polyfill

### **devDependencies**

### ESlint
通常對這個工具的認知是檢查 code style，但其實更重要的是可以協助預防 bug，開發時期即能提早發現問題

### babel
相對於 core-js，babel 可將未來、或是瀏覽器未支援的語法編譯，轉成開發者想要支援的瀏覽器版本

### webpack
程式碼打包工具，但功能遠遠不止打包，可以使用各種 loaders、plugins 來整合各種開發工具，例如：`sass`、`postcss` 等等
***

## 5. 寫註解的情境
如有一段程式自認為寫得不是很好，但又不得不這麼寫時，就會寫註解提示它的含義
***

## 6. 遇到的困難、問題，以及解決的方法
1. 這次開發嘗試用了我喜歡的 library，但開發中途發現 bundle 檔案很大，於是利用[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)分析哪裡有問題，發現使用 antd 這套時，他的 code splitting 做得不夠好，使用一個 icon 就把全部的 icons 打包，使得 bundle size 大大增加，所以就上網研究了該如何減少體積，然後就用 [webpack-ant-icon-loader](https://github.com/Beven91/webpack-ant-icon-loader) 把 icons 改成動態載入，因此我認為在未來如果要考慮一套 UI library 是否使用時，code splitting 是一個很重要的因素

2. 我一直不太喜歡使用 UI Library 的 Grid System，雖然很快地就能製作出一個 RWD 頁面，但是非常難調教到喜歡的樣子，這次再開發的時候我還是跳進去使用，在 hero lists 的部分。但後來實在覺得不美觀，所以就把它改掉成橫向捲軸的方式處理小螢幕裝置上的顯示
