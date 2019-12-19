const { VueLoaderPlugin } = require('vue-loader');

module.exports = config => {
  // 省略擴展名
  config.resolve.extensions.push('.vue');


  // 尋找 postcss-loader 設定與修改與 css 相關之 rules
  const postcssLoader = config.module.rules.reduce((result, rule) => {
    // 找出 postcss-loader 設定，目的是使用 ng cli 相同的設定
    if (rule.exclude && rule.test.test('.scss')) {
      result = rule.use.filter(loader => loader.loader === 'postcss-loader')[0];
    }
    // 排除所有針對來源 .vue 的處理
    if (rule.exclude) {
      if (rule.test.test('.css') || rule.test.test('.scss')) {
        rule.exclude = [
          ...rule.exclude,
          /\.vue.(css|s[ac]ss)$/,
          /\.module\.(css|s[ac]ss)$/i
        ];
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
      test: /\.vue.(css|s[ac]ss)$/,
      use: [
        'vue-style-loader',
        'css-loader',
        postcssLoader,
        'sass-loader'
      ]
    }, {
      test: /\.vue.styl(us)?$/,
      use: [
        'vue-style-loader',
        'css-loader',
        postcssLoader,
        'stylus-loader'
      ]
    }, {
      test: /\.vue.less$/,
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


  // 加入處理 React CSS Modules rule
  config.module.rules.push({
    test: /\.module\.(css|s[ac]ss)$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]-[hash:base64:5]',
          }
        }
      },
      postcssLoader,
      'sass-loader'
    ],
  });


  return config;
};
