# episode18-rest-axios

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload opened at localhost:8080. Run dev first to get the dist
# folder up to date.
npm run hot

# build for development
npm run dev

# build for production with minification
npm run build

# build for production with minification
npm run build

# run http-server with build artefacts on localhost:8089
npm run prod-test
```

## Build result

### uglify with default - Non-Functional (baseline)

Non-functional because call of formatZeroPadded() from <template> to my Mixin 'UtilsMixin' get's *mis-mangeled*

``` js
uglify: {
}
```

``` bash
DONE  Compiled successfully in 14756ms

           Asset       Size  Chunks                    Chunk Names
  dist/vendor.js     310 kB    0, 2  [emitted]  [big]  dist/vendor
    dist/main.js      13 kB    1, 2  [emitted]         dist/main
dist/manifest.js    1.35 kB       2  [emitted]         dist/manifest
    dist/app.css     169 kB    1, 2  [emitted]         dist/main
mix-manifest.json  158 bytes          [emitted]
                   ________
                   ~ 493 kB      
```

### uglify with vue-cli - Non-Functional (+/-0 %)

Non-functional because call of formatZeroPadded() from <template> to my Mixin 'UtilsMixin' get's *mis-mangeled*

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

### uglify with compress-and-mangle keep_fnames - Functional  (+ 6%)

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

### uglify with mangle except  - Functional (+ 2%)

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
