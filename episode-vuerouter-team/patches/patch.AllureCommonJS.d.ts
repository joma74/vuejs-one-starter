Common subdirectories: node_modules/allure-js-commons.orig/beans and node_modules/allure-js-commons/beans
diff -uN node_modules/allure-js-commons.orig/index.d.ts node_modules/allure-js-commons/index.d.ts
--- node_modules/allure-js-commons.orig/index.d.ts	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/allure-js-commons/index.d.ts	2017-07-09 01:43:46.647526719 +0200
@@ -0,0 +1,30 @@
+import { DESCRIPTIONTYPE } from "allure-js-commons/runtime";
+
+export declare class Allure {
+
+    constructor();  
+
+    setOptions(options: any): void;
+
+    getCurrentSuite(): string;
+
+    getCurrentTest(): string;
+
+    startSuite(suiteName: string, timestamp: number): void
+
+    endSuite(suiteName: string, timestamp: number): void
+
+    startCase(testName : string, timestamp: number)
+
+    endCase(testName : string, err: Error, timestamp: number)
+
+    startStep(stepName : string, timestamp: number)
+
+    endStep(status : string, timestamp: number)
+
+    setDescription(description : string, type: DESCRIPTIONTYPE)
+
+    addAttachment(attachmentName: string, content: (Buffer | Function | string), type?: string)
+
+    pendingCase(testName : string, timestamp: number);
+}
\ No newline at end of file
Common subdirectories: node_modules/allure-js-commons.orig/node_modules and node_modules/allure-js-commons/node_modules
diff -uN node_modules/allure-js-commons.orig/runtime.d.ts node_modules/allure-js-commons/runtime.d.ts
--- node_modules/allure-js-commons.orig/runtime.d.ts	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/allure-js-commons/runtime.d.ts	2017-07-09 01:51:37.283512472 +0200
@@ -0,0 +1,33 @@
+// Type definitions for allure-js-commons 1.3.1 
+// Project: allure-js-commons<https://github.com/allure-framework/allure-mocha>
+// Definitions by: joma74<dev-mails@gmx.net>
+
+/// <reference path="runtimetypes.d.ts" /> 
+/// <reference types="node" />
+
+export declare class Runtime {
+
+    constructor(someParam?: any);
+
+    readonly SEVERITY: Runtime.SEVERITIES;
+
+    addArgument(name: string, value: string): void;
+
+    addEnvironment(name: string, value: string): void;
+
+    addLabel(name: string, value: any): void;
+
+    createAttachment(name: string, content: (Buffer | Function | string), mimeType?: string): void;
+
+    createStep(name: string, stepFunc: Function): Function;
+
+    description(description: string, type?: Runtime.DESCRIPTIONTYPE): void;
+
+    feature(feature: string): void;
+
+    isPromise(obj: any): boolean;
+
+    severity(severity: Runtime.SEVERITYTYPE): void;
+
+    story(story: string): void;
+}
\ No newline at end of file
diff -uN node_modules/allure-js-commons.orig/runtimetypes.d.ts node_modules/allure-js-commons/runtimetypes.d.ts
--- node_modules/allure-js-commons.orig/runtimetypes.d.ts	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/allure-js-commons/runtimetypes.d.ts	2017-07-09 01:51:11.811513243 +0200
@@ -0,0 +1,13 @@
+export declare type SEVERITYTYPE = 'blocker' | 'critical' | 'minor' | 'normal' | 'trivial';
+
+export declare interface SEVERITIES {
+    BLOCKER: SEVERITYTYPE,
+    CRITICAL: SEVERITYTYPE,
+    MINOR: SEVERITYTYPE,
+    NORMAL: SEVERITYTYPE,
+    TRIVIAL: SEVERITYTYPE
+}
+
+export declare type DESCRIPTIONTYPE = "text" | "html" | "markdown" | string;
+
+export as namespace Runtime;
\ No newline at end of file
