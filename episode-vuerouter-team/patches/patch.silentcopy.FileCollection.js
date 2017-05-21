--- node_modules/laravel-mix/src/FileCollection.js	2017-04-20 22:43:19.000000000 +0200
+++ node_modules/laravel-mix/src/silentcopy.FileCollection.js	2017-05-19 21:43:20.132409039 +0200
@@ -37,7 +37,6 @@
         src = new File(src).parsePath();
         let output = this.outputPath(src);
 
-        console.log('Copying ' + src.path + ' to ' + output);
         fs.copySync(src.path, output);
 
         return this;
