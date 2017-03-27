var sinon = require("sinon");

var fakeServer = sinon.fakeServer.create();
fakeServer.respondImmediately = true;
var response = {
    projects: [{
        key: "12345",
        name: "Hey there",
        description: "I am",
        lastModifiedOn: "24.03.2017"
    }]
}
var onGET = function(xhr, id) {
    xhr.respond(200, {
            "Content-Type": "application/json"
        },
        JSON.stringify(response))
};
fakeServer.respondWith(
    onGET
);
