// Type definitions for mocha-allure-reporter 1.3.1 
// Project: mocha-allure-reporter<https://github.com/allure-framework/allure-mocha>
// Definitions by: joma74<dev-mails@gmx.net>

/**
 * This d.ts file aims at giving code-completion/intellisense for mocha-allure-reporter within a mocha test. 
 * Pinning it, it is built around the surface of the code lines of mocha-allure-reporter/index.js
 * {code}
 *  var Runtime = require("allure-js-commons/runtime");
 *  global.allure = new Runtime(allureReporter); 
 * {code}
 * With this global allure instance a mocha test writer can drive the mocha-allure-reporter at runtime by adding a 
 * description or creating test steps.
 * 
 */

/// <reference types="node" />

export as namespace MochaAllureReporter;

export module Runtime {

    type SEVERITY = 'BLOCKER' | 'CRITICAL' | 'MINOR' | 'NORMAL' | 'TRIVIAL';

    class TYPE {

        public static readonly TEXT = "text";
        public static readonly HTML = "html";
        public static readonly MARKDOWN = "markdown";
    };

    function addArgument(name: String, value: String): void;

    function addEnvironment(name: String, value: String): void;

    function addLabel(name: String, value: any): void;

    function createAttachment(name: String, content: (Buffer | Function | String), mimeType?: string): void;

    function createStep(name: String, stepFunc: Function): Function;

    function description(description: String, type?: TYPE): void;

    function feature(feature: String): void;

    function isPromise(obj: any): boolean;

    function severity(severity: SEVERITY): void;

    function story(story: String): void;

}

declare global {

    const allure: typeof MochaAllureReporter.Runtime;
}
