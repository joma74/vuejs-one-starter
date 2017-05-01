let mix = require('laravel-mix');
let HtmlWebpackPlugin = require('html-webpack-plugin');

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

let CONTENT_BASE = 'target/';
let MAIN_JS = 'main/js/';
let SRC_BASE = 'src/' + MAIN_JS;
let TARGET_BASE = CONTENT_BASE + MAIN_JS;

mix
  .setPublicPath(CONTENT_BASE)
  .js(SRC_BASE + '/app.js', MAIN_JS)
  .sourceMaps()
  .extract(['vue', 'vuex', 'vue-router', 'axios']);
if (!mix.config.inProduction) {
  mix
    .copy('node_modules/sinon/pkg/sinon-no-sourcemaps.js', TARGET_BASE + 'sinon-no-sourcemaps.js')
    .copy('node_modules/fakerest/dist/FakeRest.min.js', TARGET_BASE + 'FakeRest.min.js')
}
mix.webpackConfig({
  plugins: [
      new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/main/html/index.html',
      minify: {
        collapseWhitespace: true
      }
    })
    ],
  devServer: {
    https: false,
    port: 8080, // othe than that not supported, as Mix.js has this hardcoded
    overlay: true
  }
});

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
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
