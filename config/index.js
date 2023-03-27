import ComponentsPlugin from 'unplugin-vue-components/webpack'
import { resolve } from 'path';

// 配置NutUI适配器，用于NutUI的自动按需引入
const NutUIResolver = () => {
  return (name) => {
    if (name.startsWith('Nut')) {
      const partialName = name.slice(3)
      return {
        name: partialName,
        from: '@nutui/nutui-taro',
        sideEffects: `@nutui/nutui-taro/dist/packages/${partialName.toLowerCase()}/style`,
      }
    }
  }
}

// Taro的Webpack配置项，参考：https://taro-docs.jd.com/docs/config-detail
const config = {
  projectName: 'taro-template',
  date: '2023-3-23',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    "@": resolve(__dirname, "src/")
  },
  plugins: [
    // Taro TailwindCSS引入插件
    [
      "taro-plugin-tailwind", {
        // 具体参数为 tailwind postcss 配置项，参考：https://github.com/tailwindlabs/tailwindcss/blob/master/types/config.d.ts#L352
        tailwindcss: {},
        autoprefixer: {},
      }
    ],
    // Taro TailwindCSS语法修复插件
    [
      "@dcasia/mini-program-tailwind-webpack-plugin/dist/taro", {
        // 具体参数配置项，参考：https://github.com/dcasia/mini-program-tailwind
      }
    ],
    // Taro HTML插件，用于适配NutUI
    [
      "@tarojs/plugin-html", {
        // 开启taro HTML插件
      }
    ],
    // Taro Pinia插件
    [
      "taro-plugin-pinia", {
        // 具体参数配置项，参考：https://github.com/keyding/taro-plugin-pinia
      }
    ]
  ],
  // 配置NutUI全局 Scss 变量
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
  },
  cache: {
    enable: true // Webpack 持久化缓存配置，建议开启。参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    //Taro webpackChain配置，参考：https://taro-docs.jd.com/docs/config-detail#miniwebpackchain
    webpackChain(chain, webpack) {
      
      //配置unplugin-auto-import插件，用于自动引入vue的api，参考：https://github.com/antfu/unplugin-auto-import
      chain.merge({
        plugin: {
          unpluginAutoImport: {
            plugin: require("unplugin-auto-import/webpack")({
              imports: [
                "vue",
                "@vueuse/head",
                "@vueuse/core",
              ],
              defaultExportByFilename: true,
              eslintrc: {
                enabled: true, // Default `false`
                filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
              },
              dts: "./auto-imports.d.ts",
              vueTemplate: true,
            }),
          },
        },
      });

      //配置NutUI按需引入
      chain.plugin("unplugin-vue-components").use(
        ComponentsPlugin({
          resolvers: [NutUIResolver()],
        })
      );
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
