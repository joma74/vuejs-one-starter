let mix = require('laravel-mix');
let manifestVersionHandler = require('./bin/manifestversionhandler');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
    .setPublicPath('dist/') // public path required by Mix.js hot detection
    .js('src/main/js/main.js', 'myapp') // but single dist despite publicPath
    .sass('src/main/js/assets/app.sass', 'dist/myapp') // double dist from publicPath
    .copy('src/main/js/assets/logo.png', 'dist/myapp')
    .sourceMaps()
    .extract(['vue', 'vuex', 'vue-inject', 'axios', 'vue-toastr', '@3846masa/axios-cookiejar-support', 'tough-cookie']);
if (mix.config.inProduction) {
    mix
        .version() // only do for production filename: `[name]${isDev ? '' : '[chunkhash:8]'}.js`// https://github.com/webpack/webpack-dev-server/issues/377
        .then(function() {
            // only enacted for "production" builds - that is everything except hot. Because versioning is only there supported
            manifestVersionHandler.doReplace("./dist/index.html", "./dist/mix-manifest.json");
        })
}
mix
    .webpackConfig({
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }
    })
    .options({
        processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
        uglify: {
            sourceMap: false,
            compress: {
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
            comments: false,
            sourceMapInline: false
        },
        purifyCss: true
    });

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
