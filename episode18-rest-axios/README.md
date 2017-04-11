# episode18-rest-axios

> A Vue.js project

> Built with webpack2 broken down by laravel-mix

> Uses xhr fake for front end testing

## Build Setup

``` bash
# run clean-install and test production build with fake data
npm run run-install

# cleans the directory set by npm config 'content_base'
npm run clean-install

# generate an index.html version with included fakeServer, plus run in browser
# with webpack hmr | dev | production settings.
# @hmr run webpack-http-server in hmr mode with webpack dev settings
# - fake-trans version of index.html
# - build artefacts from hot in-memory served via webpack-http-server
# - on localhost:8080
# @dev run http-server with webpack dev settings
# - fake-trans version of index.html
# - build artefacts from npm config 'content_base'
# - on localhost:8089
# @build run http-server with webpack production settings
# - fake-trans version of index.html
# - build artefacts from npm config 'content_base'
# - on localhost:8089
npm run hot-fake-test
| npm run dev-fake-test
| npm run build-fake-test

# same as npm run *-fake-test, but without a fakeServer. Generate an index.html
# version as in production(without fakeServer), plus run in browser
# with webpack hmr | production settings.
npm run hot-test
| npm run build-test

# output webpack stats aka dependency tree under dist
npm run build-profile

```
## NOTES
fakeServer is a component of a js  module called [Sinon.JS](http://sinonjs.org/).
> (Fake XHR and server) Provides a fake implementation of XMLHttpRequest and provides several interfaces for manipulating objects created by it.
>
http://sinonjs.org/releases/v2.0.0/fake-xhr-and-server/

This is my first step for getting frontend tests which will be independent of a backend REST server. The fakeServer component fakes the backend REST service api's XHR responses and does some minor CRUD operation. Just enough to trigger the behaviour changes of the web GUI.

It does so by responding to certain combinations of regexd URLs with REST action verbs while it let's pass through all other requests._That pass through was the key to get around the ```[WDS] Disconnect``` error of the installed [w]ebpack [d]ev [s]erver in hot mode._

The fakeServer configuration and it's data are provided by a generated version of index.html. There are two npm scripts for that. Either use ```npm run fake-trans``` to generate an index.html version with the sinon fakeServer. Or ```npm run orig-trans``` for a index.html version without a fakeServer. Both originate from the checked in version of index.o.html.

## Current dependencies

```
joma@kopernikus-u:~/entwicklung/nodews/vuejs-laracasts/episode18-rest-axios$ npm run dep-list-installed-0

> episode18-rest-axios@1.0.0 dep-list-installed-0 /home/joma/entwicklung/nodews/vuejs-laracasts/episode18-rest-axios
> npm list --depth=0 2>/dev/null | tee installed-dependencies.log

episode18-rest-axios@1.0.0 /home/joma/entwicklung/nodews/vuejs-laracasts/episode18-rest-axios
├── @3846masa/axios-cookiejar-support@0.0.4
├── animate.css@3.5.2
├── axios@0.16.0
├── babel-core@6.24.1
├── babel-loader@6.4.1
├── babel-preset-es2015@6.24.1
├── babel-preset-stage-3@6.24.1
├── bulma@0.3.1
├── cross-env@4.0.0
├── css-loader@0.28.0
├── file-loader@0.11.1
├── fs-extra@2.1.2
├── http-server@0.9.0
├── js-beautify@1.6.12
├── jsdom@9.12.0
├── laravel-mix@0.10.0
├── purifycss-webpack@0.6.0
├── replace-in-file@2.5.0
├── rimraf@2.6.1
├── sinon@2.1.0
├── vue@2.2.6
├── vue-inject@1.0.0
├── vue-loader@11.3.4
├── vue-template-compiler@2.2.6
├── vue-toastr@2.0.5
└── vuex@2.2.1
```
## Patches

### copy-webpack-plugin in hmr mode fails

As of webpack 2 the [`copy-webpack-plugin`](https://github.com/kevlened/copy-webpack-plugin)
uses an invalid property which makes webpack fail for hot reloading in hmr mode. The in-browser console warns and then WDS disconnects.
```
[copy-webpack-plugin] Using older versions of webpack-dev-server, devServer.outputPath must be defined to write to absolute paths
```
Additionally that message  is very misleading. It should be :speak_no_evil:
```
[copy-webpack-plugin] Using outdated versions of copy-webpack-plugin, devServer.outputPath is defined to write to absolute paths. Will break and disconnect you shortly.
```
:Sarkasm-off:

The offending code is
```js
    // copy-webpack-plugin/dist/index.js
    if (globalRef.output === '/' && compiler.options.devServer && compiler.options.devServer.outputPath) {
                globalRef.output = compiler.options.devServer.outputPath;
    }
```
Which may be patched with `contentBase` instead of `outputPath`.
```js
    // copy-webpack-plugin/dist/index.js
    if (globalRef.output === '/' && compiler.options.devServer && compiler.options.devServer.contentBase) {
                globalRef.output = compiler.options.devServer.contentBase;
    }
```
Joy. Again.
```
 DONE  Compiled successfully in 8774ms
```

A diff was created by
```bash
diff -uN node_modules/copy-webpack-plugin/dist/index.js node_modules/copy-webpack-plugin/dist/index.js.hmrworksagain > docs/patch.hmrwork
sagain.copywebpackplugin-dist-index.js
```
Which can be applied as patch by
```bash
npm run apply-patches
```

#### Score and Status
- #1 patch is not compatible with webpack devServer 1.?.? anymore
- #2 patch has non-explicit implementation
- #3 patch works-for-me, for others needs triage
  - feeling not in the field to propose that as pull request
  - ask laravel-mix maintainers about triage, as of common interest. See
    - https://github.com/JeffreyWay/laravel-mix/issues/313
    - https://github.com/JeffreyWay/laravel-mix/issues/63
    - https://github.com/JeffreyWay/laravel-mix/pull/239
  - share the maybe unknown fact that `copy-webpack-plugin` - starting as of
    Version 3.0.0 - in hmr mode does NOT write physical files any more. See this [note](https://github.com/kevlened/copy-webpack-plugin#this-doesnt-copy-my-files-with-webpack-dev-server)
    on their git page.
- #4 evaluate why the then failing error in `copy-webpack-plugin` does not
    display an error detail message in the node console. Only ERROR and some
    empty lines.
- #5 share back pending - triage, issue and pull request in planning

## Build result

### uglify with default (baseline)

Non-functional because call of `formatZeroPadded()` from `<template>` to my Mixin 'UtilsMixin' **was** getting mis-mangeled. See [Template to Mixin Call gets mis-mangled  (#5238)](https://github.com/vuejs/vue/issues/5238#issuecomment-287951935).

``` js
uglify: {
}
```

``` bash
DONE  Compiled successfully in 18202ms

           Asset       Size  Chunks                    Chunk Names
  dist/vendor.js     299 kB    0, 2  [emitted]  [big]  dist/vendor
    dist/main.js    22.9 kB    1, 2  [emitted]         dist/main
dist/manifest.js    1.36 kB       2  [emitted]         dist/manifest
    dist/app.css     170 kB    1, 2  [emitted]         dist/main
mix-manifest.json  158 bytes          [emitted]
                   ________
                   ~ 493 kB      
```

### uglify with vue-cli

_From <https://github.com/vuejs/vue-cli/blob/master/bin/vue-build>_

``` js
uglify: {
    sourceMap: true,
    compressor: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
    },
    output: {
        comments: false
    }
}
```

``` bash
 DONE  Compiled successfully in 13962ms

            Asset       Size  Chunks                    Chunk Names
   dist/vendor.js     299 kB    0, 2  [emitted]  [big]  dist/vendor
     dist/main.js    22.9 kB    1, 2  [emitted]         dist/main
 dist/manifest.js    1.37 kB       2  [emitted]         dist/manifest
     dist/app.css     170 kB    1, 2  [emitted]         dist/main
mix-manifest.json  158 bytes          [emitted]
                    ________
                    ~ 493 kB   
```

### uglify with compress-and-mangle keep_fnames (+ 6%)

Functional, but is a minimum + 6% code size

``` js
uglify: {
    sourceMap: true,
    compressor: {
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false,
      keep_fnames: true
    },
    mangle: {
        keep_fnames: true
    }
}
```

``` bash
DONE  Compiled successfully in 14685ms

           Asset       Size  Chunks                    Chunk Names
  dist/vendor.js     328 kB    0, 2  [emitted]  [big]  dist/vendor
    dist/main.js    24.2 kB    1, 2  [emitted]         dist/main
dist/manifest.js     1.8 kB       2  [emitted]         dist/manifest
    dist/app.css     170 kB    1, 2  [emitted]         dist/main
mix-manifest.json  158 bytes          [emitted]
                   ________
                    ~ 524 kB      
```

### uglify with mangle except (+ 2%)

Functional, + 2% code size is tolerable, but tweak is too specific

``` js
uglify: {
    sourceMap: true,
    compressor: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
    },
    mangle: {
        // Skip mangling these
        except: ['formatZeroPadded']
    }
}
```

``` bash
DONE  Compiled successfully in 13862ms

           Asset       Size  Chunks                    Chunk Names
  dist/vendor.js     309 kB    0, 2  [emitted]  [big]  dist/vendor
    dist/main.js    22.9 kB    1, 2  [emitted]         dist/main
dist/manifest.js    1.37 kB       2  [emitted]         dist/manifest
    dist/app.css     170 kB    1, 2  [emitted]         dist/main
mix-manifest.json  158 bytes          [emitted]    
                   ________
                    ~ 503 kB      
```
### uglify with purifyCss (- 13%)
```js
purifyCss: true
```
```bash
DONE  Compiled successfully in 15012ms11:24:32 PM

                                Asset       Size  Chunks                    Chunk Names
 myapp/vendor.718b867f8f32fc1a578a.js     305 kB       0  [emitted]  [big]  myapp/vendor
   myapp/main.40a19e42ea0531f8a834.js      46 kB       1  [emitted]         myapp/main
myapp/manifest.d41d8cd98f00b204e980.js    1.46 kB       2  [emitted]         myapp/manifest
  /myapp/app.68776a10934531d189df.css    73.7 kB       1  [emitted]         myapp/main
                    mix-manifest.json  250 bytes          [emitted]         
                       myapp/logo.png    6.85 kB          [emitted]
                                        ________
                                        ~ 429 kB
```
