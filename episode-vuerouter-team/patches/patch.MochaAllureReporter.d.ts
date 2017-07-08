diff -uN node_modules/mocha-allure-reporter.orig/index.d.ts node_modules/mocha-allure-reporter/index.d.ts
--- node_modules/mocha-allure-reporter.orig/index.d.ts	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/mocha-allure-reporter/index.d.ts	2017-07-08 23:33:44.399770621 +0200
@@ -0,0 +1,29 @@
+// Type definitions for mocha-allure-reporter 1.3.1 
+// Project: mocha-allure-reporter<https://github.com/allure-framework/allure-mocha>
+// Definitions by: joma74<dev-mails@gmx.net>
+
+import { Runtime } from "allure-js-commons/runtime";
+
+import { Allure } from "allure-js-commons";
+
+import { IRunner } from "mocha";
+
+export interface AllureReporterOptions {
+    open?: string;
+    complete?: string;
+    incomplete?: string;
+    close?: string;
+}
+
+export declare module AllureReporter {
+
+    function AllureReporter(runner: IRunner, options?: AllureReporterOptions): Allure;
+}
+
+declare global {
+    /**
+     * global variable of allure-js-commons 1.3.0's Runtime
+     * @See 'global.allure = new Runtime(allureReporter); '
+     */
+    const allure: Runtime;
+}
\ No newline at end of file
Common subdirectories: node_modules/mocha-allure-reporter.orig/node_modules and node_modules/mocha-allure-reporter/node_modules
