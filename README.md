# Mix Project

測試修改使用 Angular CLI 來同時支持 angular 以及 vue 在同一時間的編譯。先聲明此作法不應該用於實際專案上，畢竟一個網頁同時需要載入 angular、vue 兩套 framework 實在是肥啊！如果真有此需求是不是應該回頭檢視一下為啥把網站搞成這樣...

## 如何於 Angular CLI 專案中設置支持 vue

- 首先使用 ng cli 創建自己適合的新專案。
- 安裝 **@angular-builders/custom-webpack**，並且依照[官方文件](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack)修改 **angular.json** 設定，目的是能自訂 webpack 配置。

```sh
yarn add @angular-builders/custom-webpack -D
```

- 安裝 vue 所需的相關 package，**vue-loader**、**vue-template-compiler**、**css-loader**

```sh
yarn add vue-loader vue-template-compiler css-loader -D
yarn add vue vue-router
```

- 創建 **extra-webpack.config.js** 並設定所需[配置](extra-webpack.config.js)。

- 於 vue 檔案夾下創建 **vue-shim.d.ts**，讓 .ts 中能識別 .vue 的文件類型

```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

## 問題

由於 angular 定義轉譯 scss 的 webpack 設置無法直接累加上 `vue-style-loader`，目前想到的解法是另外定義 **v-css**、**v-sass**、**v-scss** 類型來與 angular 執行不同的轉譯，缺點就是需要於 `<style>` 中需明確定義 **lang** 設定。

```html
<style lang="v-css"></style>
<style lang="v-scss"></style>
<style lang="v-ssss"></style>
```

另外 IDE 編輯器因此無法辨認 `v-css`、`v-scss`、`v-sass`，統一都會辨識為 css，使用特定 sass 相關寫法都會出現編輯器警告。
