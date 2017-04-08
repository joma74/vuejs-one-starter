var QUOTED_PROJECT_URI = '/api/projects';


/**
 * The RegExp object keeps track of the lastIndex where a match occurred, so on
 * subsequent matches it will start from the last used index, instead of 0.
 * @type {RegExp}
 */
var daRegex = new RegExp(QUOTED_PROJECT_URI);
console.log(daRegex.toString());
var daRegex2 = new RegExp(QUOTED_PROJECT_URI + "\/(\\d+)");
console.log(daRegex2.toString());

console.log("A) tests to " + daRegex.test("http://localhost:8080/api/projects/123"));
console.log("B) tests to " + daRegex.test("http://localhost:8080/ap/proj"));
console.log("C) tests to " + daRegex.test("/api/projects/123"));
console.log("D1) tests to " + daRegex.test("/api/projects"));
var d2NMatches = "api/projects".match(daRegex);
console.log("D2N) does match " + d2NMatches);
var d2YMatches = "/api/projects".match(daRegex);
console.log("D2Y) does match " + d2YMatches);
var d3YMatches = "/api/projects/123".match(daRegex);
console.log("D3Y) does match " + d3YMatches);
var d3YMatches = "/api/projects/123".match(daRegex2);
console.log("D3Y) does match " + d3YMatches);
console.log("E) tests to " + daRegex.test("api/projects"));
