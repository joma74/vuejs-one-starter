var sinon = require("sinon");

var fakeServer = sinon.fakeServer.create();
fakeServer.respondImmediately = true;
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
var onDELETE = function(xhr, id) {
    xhr.respond(200)
};
var onPUT = function(xhr) {
    xhr.respond(200);
    fake_response.projects.push({
        key: fake_response.projects.length,
        name: "Helga",
        description: "Oma",
        lastModifiedOn: "23.03.2017"
    });
};
fakeServer.respondWith(
    "GET",
    /.*\/api\/projects/,
    onGET
);
fakeServer.respondWith(
    "DELETE",
    /.*\/api\/projects\/(\d+)/,
    onDELETE
);
fakeServer.respondWith(
    "PUT",
    /.*\/api\/projects/,
    onPUT
);
