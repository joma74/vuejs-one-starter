--- node_modules/xunit-file/lib/xunit-file.js	2016-06-11 08:42:02.000000000 +0200
+++ node_modules/xunit-file/lib/relativeconfig.xunit-file.js	2017-04-14 08:26:48.137011417 +0200
@@ -1,3 +1,7 @@
+const user_config = 'xunit-file.config.json';
+const default_config = '../config.json';
+const default_encoding = 'utf8';
+
 /**
  * Module dependencies.
  */
@@ -6,8 +10,8 @@
   , Base = mocha.reporters.Base
   , utils = mocha.utils
   , escape = utils.escape
-  , config = require("../config.json")
   , fs = require("fs")
+  , config = JSON.parse(readConfig())
   , path = require("path")
   , mkdirp = require("mkdirp")
   , dateFormat = require('dateformat')
@@ -32,6 +36,20 @@
 exports = module.exports = XUnitFile;
 
 /**
+ * Read the config file 'xunit-file.config.json' from the working deirectory,
+ * if exists. Else read the default config file from this distribution.
+ * @method readConfig
+ * @return {string}  content of the config file
+ */
+function readConfig(){
+  try {
+      return fs.readFileSync(user_config, default_encoding);
+  } catch (err) {
+      return fs.readFileSync(default_config, default_encoding);
+  }
+}
+
+/**
  * Initialize a new `XUnitFile` reporter.
  *
  * @param {Runner} runner
@@ -89,7 +107,7 @@
     if( process.env.XUNIT_LOG_ENV) {
       logProperties(fd);
     }
-  
+
     tests.forEach(function(test){
       writeTest(fd, test);
     });
@@ -106,7 +124,7 @@
 XUnitFile.prototype.__proto__ = Base.prototype;
 
 /**
- * Writes a list of process and environment variables to the <properties> section in the XML. 
+ * Writes a list of process and environment variables to the <properties> section in the XML.
  */
 function logProperties(fd) {
   var attrs = new Object();
@@ -131,7 +149,7 @@
 }
 
 /**
- * Formats a single property value. 
+ * Formats a single property value.
  */
 
 function logProperty( name, value) {
@@ -139,7 +157,7 @@
 }
 
 /**
- * Simple utility to convert a flat Object to a readable string. 
+ * Simple utility to convert a flat Object to a readable string.
  */
 
 function objectToString( obj) {
