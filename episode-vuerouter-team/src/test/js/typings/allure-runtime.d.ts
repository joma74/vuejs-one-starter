/** Declaration file generated by dts-gen 
 * dts-gen --expression-file "/home/joerg/entwicklung/nodews/vuejs-one-starter-vscode/vuejs-one-starter/episode-vuerouter-team/node_modules/allure-js-commons/runtime.js"
**/

/// <reference types="node" />

export = AllureRuntime;

declare namespace AllureRuntime {

    const SEVERITY: {
        BLOCKER: string;
        CRITICAL: string;
        MINOR: string;
        NORMAL: string;
        TRIVIAL: string;
    };

    const TYPES: {
        TEXT: string,
        HTML: string,
        MARKDOWN: string
    };

    function addArgument(name: String, value: String): void;

    function addEnvironment(name: String, value: String): void;

    function addLabel(name: String, value: any): void;

    function createAttachment(name: String, content: (Buffer | Function | String) , mimeType?: String): void;

    function createStep(name: String, stepFunc: Function): Function;

    function description(description: String, type?: AllureRuntime.TYPES): void;

    function feature(feature: String): void;

    function isPromise(obj: any): boolean;

    function severity(severity: AllureRuntime.SEVERITY): void;

    function story(story: String): void;

}

declare global {
    const allure: typeof AllureRuntime;
}