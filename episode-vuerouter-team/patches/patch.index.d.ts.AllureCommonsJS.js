Common subdirectories: node_modules/allure-js-commons.patched/beans and node_modules/allure-js-commons/beans
diff -uN node_modules/allure-js-commons.patched/index.d.ts node_modules/allure-js-commons/index.d.ts
--- node_modules/allure-js-commons.patched/index.d.ts	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/allure-js-commons/index.d.ts	2017-06-27 23:25:55.243000000 +0200
@@ -0,0 +1,52 @@
+// Type definitions for allure-js-commons 1.3.1 
+// Project: allure-js-commons<https://github.com/allure-framework/allure-mocha>
+// Definitions by: joma74<dev-mails@gmx.net>
+
+/// <reference types="node" />
+
+declare namespace Runtime {
+
+    export type SEVERITYTYPE = 'blocker' | 'critical' | 'minor' | 'normal' | 'trivial';
+
+    export interface SEVERITIES {
+        BLOCKER: SEVERITYTYPE,
+        CRITICAL: SEVERITYTYPE,
+        MINOR: SEVERITYTYPE,
+        NORMAL: SEVERITYTYPE,
+        TRIVIAL: SEVERITYTYPE
+    }
+
+    export const SEVERITY: SEVERITIES;
+    
+    export type DESCRIPTIONTYPE = "text" | "html" | "markdown" | string;
+}
+
+declare class Runtime {
+
+    constructor(someParam?: any);
+}
+
+declare module Runtime {
+
+    function addArgument(name: string, value: string): void;
+
+    function addEnvironment(name: string, value: string): void;
+
+    function addLabel(name: string, value: any): void;
+
+    function createAttachment(name: string, content: (Buffer | Function | string), mimeType?: string): void;
+
+    function createStep(name: string, stepFunc: Function): Function;
+
+    function description(description: string, type?: Runtime.DESCRIPTIONTYPE): void;
+
+    function feature(feature: string): void;
+
+    function isPromise(obj: any): boolean;
+
+    function severity(severity: Runtime.SEVERITYTYPE): void;
+
+    function story(story: string): void;
+}
+
+export = Runtime;
\ No newline at end of file
diff -uN node_modules/allure-js-commons.patched/index.d.ts.Runtime node_modules/allure-js-commons/index.d.ts.Runtime
--- node_modules/allure-js-commons.patched/index.d.ts.Runtime	1970-01-01 01:00:00.000000000 +0100
+++ node_modules/allure-js-commons/index.d.ts.Runtime	2017-06-27 23:03:43.179756000 +0200
@@ -0,0 +1,52 @@
+// Type definitions for allure-js-commons 1.3.1 
+// Project: allure-js-commons<https://github.com/allure-framework/allure-mocha>
+// Definitions by: joma74<dev-mails@gmx.net>
+
+/// <reference types="node" />
+
+declare namespace Runtime {
+
+    export type SEVERITYTYPE = 'blocker' | 'critical' | 'minor' | 'normal' | 'trivial';
+
+    export interface SEVERITIES {
+        BLOCKER: SEVERITYTYPE,
+        CRITICAL: SEVERITYTYPE,
+        MINOR: SEVERITYTYPE,
+        NORMAL: SEVERITYTYPE,
+        TRIVIAL: SEVERITYTYPE
+    }
+
+    export const SEVERITY: SEVERITIES;
+    
+    export type DESCRIPTIONTYPE = "text" | "html" | "markdown" | string;
+}
+
+declare class Runtime {
+
+    constructor(someParam?: any);
+}
+
+declare module Runtime {
+
+    function addArgument(name: string, value: string): void;
+
+    function addEnvironment(name: string, value: string): void;
+
+    function addLabel(name: string, value: any): void;
+
+    function createAttachment(name: string, content: (Buffer | Function | string), mimeType?: string): void;
+
+    function createStep(name: string, stepFunc: Function): Function;
+
+    function description(description: string, type?: Runtime.DESCRIPTIONTYPE): void;
+
+    function feature(feature: string): void;
+
+    function isPromise(obj: any): boolean;
+
+    function severity(severity: Runtime.SEVERITYTYPE): void;
+
+    function story(story: string): void;
+}
+
+export = Runtime;
\ No newline at end of file
Common subdirectories: node_modules/allure-js-commons.patched/node_modules and node_modules/allure-js-commons/node_modules
Common subdirectories: node_modules/allure-js-commons.patched/test and node_modules/allure-js-commons/test
