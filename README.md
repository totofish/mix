# Mix Project

測試修改使用 Angular CLI 產生的專案來同時支持 angular 以及 vue 在同一時間的編譯。先聲明此作法不應該用於實際專案上，畢竟一個網頁同時需要載入 angular、vue 兩套 framework 實在是肥啊！如果真有此需求是不是應該回頭檢視一下為啥把網站搞成這樣...

## 如何於 Angular CLI 專案中設置支持 vue

- 首先使用 ng cli 創建自己適合的新專案。
- 安裝 **@angular-builders/custom-webpack**，並且依照[官方文件](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack)修改 **angular.json** 設定，目的是能自訂 webpack 配置。

```sh
yarn add @angular-builders/custom-webpack -D
```

- 安裝 vue 所需的相關 package，**vue-loader**、**vue-template-compiler**、**css-loader**、**vue**、**vue-router**。

```sh
yarn add vue-loader vue-template-compiler css-loader -D
yarn add vue vue-router
```

- 創建 [extra-webpack.config.js](extra-webpack.config.js) 並設定所需配置。最重要的步驟是將 ng 處理 css 的 rule 加入排除處理所有 `.vue` 的樣式，轉交由自定義 rule 來處理。
```js
// 尋找 postcss-loader 設定與修改與 css 相關之 rules
const postcssLoader = config.module.rules.reduce((result, rule) => {
  // 找出 postcss-loader 設定，目的是使用 ng cli 相同的設定
  if (rule.exclude && rule.test.test('.scss')) {
    result = rule.use.filter(loader => loader.loader === 'postcss-loader')[0];
  }
  // 排除所有針對來源 .vue 的處理
  if (rule.exclude) {
    if (rule.test.test('.css') || rule.test.test('.scss')) {
      rule.exclude = [ ...rule.exclude, /\.vue.(css|s[ac]ss)$/ ];
    }
    if (rule.test.test('.less')) {
      rule.exclude = [ ...rule.exclude, /\.vue.less$/ ];
    }
    if (rule.test.test('.styl')) {
      rule.exclude = [ ...rule.exclude, /\.vue.styl(us)?$/ ];
    }
  };

  return result;
}, 'postcss-loader');


// 加入處理 vue rules
config.module.rules.push(
  // vue-loader
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  // 只針對 .vue 來源之 style 處理
  {
    test: /\.(css|s[ac]ss)$/,
    include: [ /\.vue.(css|s[ac]ss)$/ ],
    use: [
      'vue-style-loader',
      'css-loader',
      postcssLoader,
      'sass-loader'
    ]
  }, {
    test: /\.styl(us)?$/,
    include: [ /\.vue.styl(us)?$/ ],
    use: [
      'vue-style-loader',
      'css-loader',
      postcssLoader,
      'stylus-loader'
    ]
  }, {
    test: /\.less$/,
    include: [ /\.vue.less$/ ],
    use: [
      'vue-style-loader',
      'css-loader',
      postcssLoader,
      'less-loader'
    ]
  }
);
config.plugins.push(
  new VueLoaderPlugin()
);
```

- 於 vue 檔案夾下創建 [vue-shim.d.ts](projects/app/src/vue/vue-shim.d.ts)，讓 .ts 能識別 .vue 的文件類型

```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

- 完成，直接執行就能於專案中使用 2 種 framework

```sh
yarn start
```
