--- node_modules/copy-webpack-plugin/dist/index.js	2016-11-14 02:10:25.000000000 +0100
+++ node_modules/copy-webpack-plugin/dist/index.js.hmrworksagain	2017-04-09 01:40:54.160484192 +0200
@@ -86,8 +86,8 @@
                 concurrency: options.concurrency
             };
 
-            if (globalRef.output === '/' && compiler.options.devServer && compiler.options.devServer.outputPath) {
-                globalRef.output = compiler.options.devServer.outputPath;
+            if (globalRef.output === '/' && compiler.options.devServer && compiler.options.devServer.contentBase) {
+                globalRef.output = compiler.options.devServer.contentBase;
             }
 
             _bluebird2.default.each(patterns, function (pattern) {
@@ -138,4 +138,4 @@
 }
 
 CopyWebpackPlugin['default'] = CopyWebpackPlugin;
-module.exports = CopyWebpackPlugin;
\ No newline at end of file
+module.exports = CopyWebpackPlugin;
