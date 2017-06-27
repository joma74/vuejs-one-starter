diff -uN node_modules/mocha-allure-reporter.patched/index.d.ts node_modules/mocha-allure-reporter/index.d.ts
--- node_modules/mocha-allure-reporter.patched/index.d.ts	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/mocha-allure-reporter/index.d.ts	2017-06-27 23:27:41.093000000 +0200
@@ -0,0 +1,34 @@
+// Type definitions for mocha-allure-reporter 1.3.1 
+// Project: mocha-allure-reporter<https://github.com/allure-framework/allure-mocha>
+// Definitions by: joma74<dev-mails@gmx.net>
+
+/// <reference path="../allure-js-commons/index.d.ts" />
+
+import * as Runtime from "allure-js-commons";
+
+declare namespace MochaAllureReporter {
+
+    export namespace Runtime {
+
+        import * as Runtime from "allure-js-commons";
+
+        export = Runtime;
+    };
+}
+
+declare module MochaAllureReporter {
+    
+    function startTest(nodeName: string): string;
+}
+
+export = MochaAllureReporter;
+
+export as namespace MochaAllureReporter;
+
+declare global {
+    /**
+     * global variable of allure-js-commons 1.3.0's Runtime
+     * @See 'global.allure = new Runtime(allureReporter); '
+     */
+    const allure: typeof Runtime;
+}
\ No newline at end of file
Common subdirectories: node_modules/mocha-allure-reporter.patched/node_modules and node_modules/mocha-allure-reporter/node_modules
Common subdirectories: node_modules/mocha-allure-reporter.patched/test and node_modules/mocha-allure-reporter/test