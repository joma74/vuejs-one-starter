

joma@kopernikus-u:~/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team$ yarn run hot
yarn run v0.22.0
$ cross-env NODE_ENV=development webpack-dev-server --hot --https --content-base $npm_package_config_content_base
{"historyApiFallback":true,
"noInfo":true,
"compress":true,
"quiet":true,
"https":true,
"port":8080,
"host":"localhost",
"publicPath":"https://localhost:8080/",
"filename":"[name].js",
"hot":true,
"hotOnly":false,"clientLogLevel":"info","contentBase":"/home/jo
ma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/target","stats":{"cached":false,"cachedAssets":false,"colors":{"level":2,"hasBasic":true,"has256":true,"has16m":false}}}
Project is running at https://localhost:8080/
webpack output is served from https://localhost:8080/
Content not from webpack is served from /home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/target
404s will fallback to /index.html


{"historyApiFallback":true,
"noInfo":true,
"compress":true,
"quiet":true,
"https":true,
"port":8080,
host
publicPath
filename
"hot":false
hotOnly k
contentBase
"stats":{"cached":false,"cachedAssets":false,"colors":{"level":2,"hasBasic":true,"has256":true,"has16m":false}}}
}

{
   "context":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team",
   "entry":{
      "main/js/app":[
         "/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/src/main/js/app.js"
      ],
      "main/js/vendor":[
         "vue",
         "vuex",
         "vue-router",
         "axios",
         "
vue-inject"
      ]
   },
   "output":{
      "path":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/target",
      "filename":"[name].js",
      "chunkFilename":"main/js/[name].js",
      "publicPath":"",
      "library":"",
      "hotUpdateFunction":"webpackHotUpdate",
      "jsonpFunction
":"webpackJsonp",
      "libraryTarget":"var",
      "sourceMapFilename":"[file].map[query]",
      "hotUpdateChunkFilename":"[id].[hash].hot-update.js",
      "hotUpdateMainFilename":"[hash].hot-update.json",
      "crossOriginLoading":false,
      "hashFunction":"md5",
      "hashDigest":"hex",
      "h
ashDigestLength":20,
      "devtoolLineToLine":false,
      "strictModuleExceptionHandling":false
   },
   "module":{
      "rules":[
         {
            "test":{

            },
            "loader":"vue-loader",
            "options":{
               "loaders":{
                  "js":"babel-loader?cacheDirectory",
                  "scss":"vue-style-loader!css-loader!sass-loader",
                  "sass":"vue-style-loader!css-loader!sass-loader?indentedSyntax",
                  "less":"vue-style-loader!css-loader!less-loader",
                  "stylus":"vue-style-loader!css-loader!stylus-loader?paths[]=node_modules"
               },
               "postcss":[
                  null
               ],
               "preLoaders":{

               },
               "postLoaders":{

               }
            }
         },
         {
            "test":{

            },
            "exclu
de":{

            },
            "loader":"babel-loader?cacheDirectory"
         },
         {
            "test":{

            },
            "loaders":[
               "style-loader",
               "css-loader"
            ]
         },
         {
            "test":{

            },
            "loaders":[
               "html-loader"
            ]
         },
         {
            "test":{

            },
            "loaders":[
               {
                  "loader":"file-loader",
                  "options":{
                     "publicPath":"/"
                  }
               },
               "img-loader"
            ]
         },
         {
            "test":{

            },
            "loader":"f

ile-loader",
            "options":{
               "publicPath":"/"
            }
         },
         {
            "test":{

            },
            "loader":"file-loader",
            "options":{
               "name":"[name].[ext]?[hash]",
               "publicPath":"/"
            }
         },
         {
            "test":{

            },
            "loaders":[
               "style-loader",
               "css-loader",
               "sass-loader"
            ]
         }
      ],
      "unknownContextRequest":".",
      "unknownContextRegEx
p":false,
      "unknownContextRecursive":true,
      "unknownContextCritical":true,
      "exprContextRequest":".",
      "exprContextRegExp":false,
      "exprContextRecursive":true,
      "exprContextCritical":true,
      "wrappedContextRegExp":{

      },
      "wrappedContextRecursive":true,
      "wrappedContextCr
itical":false,
      "strictExportPresence":false,
      "unsafeCache":true
   },
   "resolve":{
      "extensions":[
         "*",
         ".js",
         ".jsx",
         ".vue"
      ],
      "alias":{
         "vue$":"vue/dist/vue.common.js"
      },
      "unsafeCache":true,
      "modules":[
         "node_modules"
      ],
      "aliasFields":[
         "browser"
      ],
      "mainFields":[
         "browser",
         "module",
         "main"
      ]
   },
   "stats":{
      "hash":false,
      "version":false,
      "timings":false,
      "children":false,
      "errors":false
   },
   "performance":{
      "hints":false,
      "maxAssetSize":250000,
      "maxEntrypointSize":250000
   },
   "devtool":"#inline-source-map",
   "devServer":{
      "historyApiFallback":true,
      "noInfo":true,
      "compress":true,
      "quiet":true,
      "https":true,
      "port":8080,
      "hot":false
   },
   "plugins":[
      {
         "definitions":{

         }
      },
      {
         "opts":{
            "filename":"mix-manifest.json",
            "fields":[
               "assetsByChunkName"
            ]
         }
      },
      {
         "options":{
            "minimize":false,
            "options":{
               "postcss":[
                  null
               ],
               "con
text":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team",
               "output":{
                  "path":"./"
               },
               "__vueOptions__":{
                  "loaders":{
                     "js":"babel-loader?cacheDirectory",
                     "scss":"vue-style-loader!css-loader!sass-loader",
                     "sass":"vue-style-loader!css-loader!s
ass-loader?indentedSyntax",
                     "less":"vue-style-loader!css-loader!less-loader",
                     "stylus":"vue-style-loader!css-loader!stylus-loader?paths[]=node_modules"
                  },
                  "postcss":[
                     null
                  ],
                  "preLoaders":{

                  },
                  "postLoaders":{

                  }
               }
            },
            "test":{

            }
         }
      },
      {
         "chunkNames":[
            "main/js/vendor",
            "ma
in/js/manifest"
         ],
         "minChunks":null,
         "ident":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/node_modules/webpack/lib/optimize/CommonsChunkPlugin.js0"
      },
      {
         "definitions":{
            "process.env":{
               "NODE_ENV":"\"test\""
            }
         }
      },
      {

      },
      {
         "options":{
            "templat
e":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/node_modules/html-webpack-plugin/lib/loader.js!/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/src/main/html/index.html",
            "filename":"index.html",
            "hash":fals
e,
            "inject":true,
            "compile":true,
            "favicon":false,
            "minify":{
               "collapseWhitespace":true,
               "html5":true,
               "includeAutoGeneratedTags":true,
               "ignoreCustomComments":[
                  {

                  }
               ],
               "ignoreCustomFragments":[
                  {

                  },
                  {

                  }
               ]
            },
            "cache":true,
            "showErrors":true,
            "chunks":"all",
            "excludeChunks":[

            ],
            "title":"Webpack App",
            "xhtml":false
         },
         "childCompilerHash":"fb31930848158fb39f0b6c8079f32507",
         "childCompilationOutputName":"index.html",
         "assetJson":"[\"main/js/app.js\",\"main/js/manifest.js\",\"main/js/vendor.js\"]"
      }
   ],
   "cache":true,
   "target":"web",
   "
node":{
      "console":false,
      "process":true,
      "global":true,
      "Buffer":true,
      "setImmediate":true,
      "__filename":"mock",
      "__dirname":"mock"
   },
   "resolveLoader":{
      "unsafeCache":true,
      "mainFields":[
         "loader",
         "main"
      ],
      "extensions":[
         ".js",
         ".json"
      ]
   }
}

{"context":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team","entry":{"main/js/app":["/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/src/main/js/app.js"],"main/js/vendor":["vue","vuex","vue-router","axios","
vue-inject"]},"output":{"path":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/target","filename":"[name].js","chunkFilename":"main/js/[name].js","publicPath":"","library":"","hotUpdateFunction":"webpackHotUpdate","jsonpFunction
":"webpackJsonp","libraryTarget":"var","sourceMapFilename":"[file].map[query]","hotUpdateChunkFilename":"[id].[hash].hot-update.js","hotUpdateMainFilename":"[hash].hot-update.json","crossOriginLoading":false,"hashFunction":"md5","hashDigest":"hex","h
ashDigestLength":20,"devtoolLineToLine":false,"strictModuleExceptionHandling":false},"module":{"rules":[{"test":{},"loader":"vue-loader","options":{"loaders":{"js":"babel-loader?cacheDirectory","scss":"vue-style-loader!css-loader!sass-loader","sass":
"vue-style-loader!css-loader!sass-loader?indentedSyntax","less":"vue-style-loader!css-loader!less-loader","stylus":"vue-style-loader!css-loader!stylus-loader?paths[]=node_modules"},"postcss":[null],"preLoaders":{},"postLoaders":{}}},{"test":{},"exclu
de":{},"loader":"babel-loader?cacheDirectory"},{"test":{},"loaders":["style-loader","css-loader"]},{"test":{},"loaders":["html-loader"]},{"test":{},"loaders":[{"loader":"file-loader","options":{"publicPath":"/"}},"img-loader"]},{"test":{},"loader":"f

ile-loader","options":{"publicPath":"/"}},{"test":{},"loader":"file-loader","options":{"name":"[name].[ext]?[hash]","publicPath":"/"}},{"test":{},"loaders":["style-loader","css-loader","sass-loader"]}],"unknownContextRequest":".","unknownContextRegEx
p":false,"unknownContextRecursive":true,"unknownContextCritical":true,"exprContextRequest":".","exprContextRegExp":false,"exprContextRecursive":true,"exprContextCritical":true,"wrappedContextRegExp":{},"wrappedContextRecursive":true,"wrappedContextCr
itical":false,"strictExportPresence":false,"unsafeCache":true},"resolve":{"extensions":["*",".js",".jsx",".vue"],"alias":{"vue$":"vue/dist/vue.common.js"},"unsafeCache":true,"modules":["node_modules"],"aliasFields":["browser"],"mainFields":["browser"
,"module","main"]},"stats":{"hash":false,"version":false,"timings":false,"children":false,"errors":false},"performance":{"hints":false,"maxAssetSize":250000,"maxEntrypointSize":250000},"devtool":"#inline-source-map","devServer":{"historyApiFallback":
true,"noInfo":true,"compress":true,"quiet":true,"https":true,"port":8080,"hot":false},"plugins":[{"definitions":{}},{"opts":{"filename":"mix-manifest.json","fields":["assetsByChunkName"]}},{"options":{"minimize":false,"options":{"postcss":[null],"con
text":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team","output":{"path":"./"},"__vueOptions__":{"loaders":{"js":"babel-loader?cacheDirectory","scss":"vue-style-loader!css-loader!sass-loader","sass":"vue-style-loader!css-loader!s
ass-loader?indentedSyntax","less":"vue-style-loader!css-loader!less-loader","stylus":"vue-style-loader!css-loader!stylus-loader?paths[]=node_modules"},"postcss":[null],"preLoaders":{},"postLoaders":{}}},"test":{}}},{"chunkNames":["main/js/vendor","ma
in/js/manifest"],"minChunks":null,"ident":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/node_modules/webpack/lib/optimize/CommonsChunkPlugin.js0"},{"definitions":{"process.env":{"NODE_ENV":"\"test\""}}},{},{"options":{"templat
e":"/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/node_modules/html-webpack-plugin/lib/loader.js!/home/joma/entwicklung/nodews/vuejs-laracasts/episode-vuerouter-team/src/main/html/index.html","filename":"index.html","hash":fals
e,"inject":true,"compile":true,"favicon":false,"minify":{"collapseWhitespace":true,"html5":true,"includeAutoGeneratedTags":true,"ignoreCustomComments":[{}],"ignoreCustomFragments":[{},{}]},"cache":true,"showErrors":true,"chunks":"all","excludeChunks"
:[],"title":"Webpack App","xhtml":false},"childCompilerHash":"fb31930848158fb39f0b6c8079f32507","childCompilationOutputName":"index.html","assetJson":"[\"main/js/app.js\",\"main/js/manifest.js\",\"main/js/vendor.js\"]"}],"cache":true,"target":"web","
node":{"console":false,"process":true,"global":true,"Buffer":true,"setImmediate":true,"__filename":"mock","__dirname":"mock"},"resolveLoader":{"unsafeCache":true,"mainFields":["loader","main"],"extensions":[".js",".json"]}}
