let mix = require('laravel-mix');

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
    .js('src/main.js', 'dist/')
    .sass('src/assets/app.sass', 'dist/')
    .sourceMaps()
    .extract(['vue', 'vuex', 'vue-inject', 'axios', 'vue-toastr','@3846masa/axios-cookiejar-support','tough-cookie'])
    .webpackConfig({
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }
    })
    .options({
        processCssUrls: true // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
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
//   processCssUrls: true // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
// });
