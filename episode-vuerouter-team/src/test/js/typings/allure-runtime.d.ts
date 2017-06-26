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

/**
 * This module is a module that exposes the global variable 'allure'.
 * @See 
 * {code}
 *  global.allure = new Runtime(allureReporter); 
 * {code}
 */
export as namespace MochaAllureReporter;

/**
 * Module surface of allure-js-commons 1.3.0
 * @See 
 * {code}
 *  var Runtime = require("allure-js-commons/runtime");
 *  global.allure = new Runtime(allureReporter); 
 * {code}
 */
export module Runtime {

    type SEVERITY = 'BLOCKER' | 'CRITICAL' | 'MINOR' | 'NORMAL' | 'TRIVIAL';

    class TYPE {

        public static readonly TEXT = "text";
        public static readonly HTML = "html";
        public static readonly MARKDOWN = "markdown";
    };

    function addArgument(name: string, value: string): void;

    function addEnvironment(name: string, value: string): void;

    function addLabel(name: string, value: any): void;

    function createAttachment(name: string, content: (Buffer | Function | string), mimeType?: string): void;

    function createStep(name: string, stepFunc: Function): Function;

    function description(description: string, type?: TYPE): void;

    function feature(feature: string): void;

    function isPromise(obj: any): boolean;

    function severity(severity: SEVERITY): void;

    function story(story: string): void;
}

/**
 * Declare things that go in the global namespace
 */
declare global {
    /**
     * global variable of allure-js-commons 1.3.0's Runtime
     * @See 
     * {code}
     *  global.allure = new Runtime(allureReporter); 
     * {code}
     */
    const allure: typeof MochaAllureReporter.Runtime;
}
