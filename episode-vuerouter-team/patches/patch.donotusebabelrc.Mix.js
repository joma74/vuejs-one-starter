--- node_modules/laravel-mix/src/Mix.js.orig	2017-06-15 21:21:15.774546742 +0200
+++ node_modules/laravel-mix/src/Mix.js	2017-06-20 22:06:26.313905160 +0200
@@ -94,14 +94,16 @@
      * Fetch the appropriate Babel config for babel-loader.
      */
     babelConfig() {
-        if (File.exists(Paths.root('.babelrc'))) return '?cacheDirectory';
+        // if (File.exists(Paths.root('.babelrc'))) return '?cacheDirectory';
 
         // If the user doesn't have a .babelrc, we'll use our config.
         if (this.react) {
             options.babel.presets.push('react');
         }
 
-        return '?' + JSON.stringify(options.babel);
+        let optionsBabel = JSON.stringify(options.babel);
+        // console.log(optionsBabel);
+        return '?' + optionsBabel;
     }
 
     /**
