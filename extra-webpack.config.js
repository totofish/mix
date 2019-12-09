const { VueLoaderPlugin } = require('vue-loader');

module.exports = (config, options) => {
  // 省略擴展名
  config.resolve.extensions.push('.vue');

  // 尋找 ng cli 的 postcss-loader 設定
  const postcssLoader = config.module.rules.reduce((result, rule) => {
    if (rule.exclude && rule.test.test('.scss')) {
      result = rule.use.filter(loader => loader.loader === 'postcss-loader')[0];
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
    // style - 使用 'v-' prefix 是獨立處理轉換避免跟 ng 的 style 處理衝突
    {
      test: /\.v-(css|s[ac]ss)$/,
      use: [
        'vue-style-loader',
        'css-loader',
        postcssLoader,
        'sass-loader'
      ]
    }
  );
  config.plugins.push(
    new VueLoaderPlugin()
  );

  return config;
};
