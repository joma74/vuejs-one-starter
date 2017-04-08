var sinon = require("sinon");

var fakeServer = sinon.fakeServer.create();
fakeServer.respondImmediately = true;
fakeServer.xhr.useFilters = true;
// total naughty copy of lodash's escapeRegExp.js
function RegExHelper() {
    this.reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    this.quote = function(string) {
        return string.replace(this.reRegExpChar, '\\$&')
    }
}
var C_PROJECT_URI = "/api/projects";
var QUOTED_PROJECT_URI = new RegExHelper().quote(C_PROJECT_URI);
var daRegex = new RegExp(QUOTED_PROJECT_URI);

fakeServer.xhr.addFilter(function(method, url) {
    //whenever the this returns true the request will not faked
    return !url.match(new RegExp(QUOTED_PROJECT_URI));
});
var fake_response = {
    projects: [{
        key: "1",
        name: "Jörg",
        description: "Papa",
        lastModifiedOn: "20.03.2017"
    }, {
        key: "2",
        name: "Gitti",
        description: "Mama",
        lastModifiedOn: "21.03.2017"
    }, {
        key: "3",
        name: "Clara",
        description: "Putziputz",
        lastModifiedOn: "22.03.2017"
    }]
}
var onGET = function(xhr) {
    xhr.respond(200, {
            "Content-Type": "application/json"
        },
        JSON.stringify(fake_response))
};
var onDELETE = function(xhr, projectKey) {
    xhr.respond(200);
    let index = fake_response.projects.findIndex(project => project.key === projectKey);
    if (index >= 0) {
        fake_response.projects.splice(index, 1);
    } else {
        console.warn(`Project with key ${projectKey} is defunct`);
    }
};
var onPUT = function(xhr) {
    xhr.respond(200);
    fake_response.projects.push({
        key: fake_response.projects.length.toString(),
        name: "Helga",
        description: "Oma",
        lastModifiedOn: "23.03.2017"
    });
};
fakeServer.respondWith(
    "GET",
    new RegExp(QUOTED_PROJECT_URI),
    onGET
);
fakeServer.respondWith(
    "DELETE",
    new RegExp(QUOTED_PROJECT_URI + "\/(\\d+)"),
    onDELETE
);
fakeServer.respondWith(
    "PUT",
    new RegExp(QUOTED_PROJECT_URI),
    onPUT
);
