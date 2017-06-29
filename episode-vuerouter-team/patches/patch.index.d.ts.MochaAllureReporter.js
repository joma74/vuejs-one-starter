diff -uN node_modules/mocha-allure-reporter.patched/index.d.ts node_modules/mocha-allure-reporter/index.d.ts
--- node_modules/mocha-allure-reporter.patched/index.d.ts	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/mocha-allure-reporter/index.d.ts	2017-06-27 23:27:41.093000000 +0200
@@ -0,0 +1,27 @@
+// Type definitions for mocha-allure-reporter 1.3.1 
+// Project: mocha-allure-reporter<https://github.com/allure-framework/allure-mocha>
+// Definitions by: joma74<dev-mails@gmx.net>
+
+import { Runtime } from "allure-js-commons/runtime";
+
+declare namespace MochaAllureReporter {
+
+    export { SEVERITYTYPE, SEVERITIES, DESCRIPTIONTYPE } from "allure-js-commons/runtime";
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
+    const allure: Runtime;
+}
\ No newline at end of file
Common subdirectories: node_modules/mocha-allure-reporter.patched/node_modules and node_modules/mocha-allure-reporter/node_modules
Common subdirectories: node_modules/mocha-allure-reporter.patched/test and node_modules/mocha-allure-reporter/test
