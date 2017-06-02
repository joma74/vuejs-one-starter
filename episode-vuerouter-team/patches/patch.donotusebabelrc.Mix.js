--- node_modules/laravel-mix/src/Mix.js	2017-06-02 23:38:51.474965250 +0200
+++ node_modules/laravel-mix/src/donotusebabelrc.Mix.js	2017-06-02 23:38:00.094967399 +0200
@@ -94,14 +94,15 @@
      * Fetch the appropriate Babel config for babel-loader.
      */
     babelConfig() {
-        if (File.exists(Paths.root('.babelrc'))) return '?cacheDirectory';
+        // if (File.exists(Paths.root('.babelrc'))) return '?cacheDirectory';
 
         // If the user doesn't have a .babelrc, we'll use our config.
         if (this.react) {
             options.babel.presets.push('react');
         }
-        
-        return '?' + JSON.stringify(options.babel);
+        let optionsBabel = JSON.stringify(options.babel);
+        // console.log(optionsBabel);
+        return '?' + optionsBabel;
     }
 
     /**
