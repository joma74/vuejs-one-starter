Common subdirectories: node_modules/allure-js-commons.patched/beans and node_modules/allure-js-commons/beans
diff -uN node_modules/allure-js-commons.patched/index.d.ts node_modules/allure-js-commons/index.d.ts
--- node_modules/allure-js-commons.patched/runtime.d.ts	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/allure-js-commons/runtime.d.ts	2017-06-27 23:25:55.243000000 +0200
@@ -0,0 +1,44 @@
+// Type definitions for allure-js-commons 1.3.1 
+// Project: allure-js-commons<https://github.com/allure-framework/allure-mocha>
+// Definitions by: joma74<dev-mails@gmx.net>
+
+/// <reference types="node" />
+
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
+export declare class Runtime {
+
+    constructor(someParam?: any);
+
+    const SEVERITY: SEVERITIES;    
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
+    description(description: string, type?: DESCRIPTIONTYPE): void;
+
+    feature(feature: string): void;
+
+    isPromise(obj: any): boolean;
+
+    severity(severity: SEVERITYTYPE): void;
+
+    story(story: string): void;
+}
\ No newline at end of file
Common subdirectories: node_modules/allure-js-commons.patched/node_modules and node_modules/allure-js-commons/node_modules
Common subdirectories: node_modules/allure-js-commons.patched/test and node_modules/allure-js-commons/test
