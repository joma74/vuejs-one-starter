var beautify_html = require('js-beautify').html;
var jsdom = require("jsdom").jsdom;
var serializeDocument = require("jsdom").serializeDocument;
var fs = require("fs-extra");

const dist_path = "dist/";
const myapp_path = "myapp/";
const dist_mayapp_path = dist_path + myapp_path;

var htmlSource = fs.readFileSync("bin/index.o.html", "utf8");
var doc = jsdom(htmlSource, {
    features: {
        FetchExternalResources: false,
        ProcessExternalResources: false,
        SkipExternalResources: true
    }
});
var fstScriptEl = doc.body.querySelector("script");
//
fs.ensureDirSync(dist_mayapp_path); //like mkdir -p
fs.copySync("node_modules/sinon/pkg/sinon-no-sourcemaps.js", dist_mayapp_path + "sinon-no-sourcemaps.js");
var newScriptEl = doc.createElement("script");
newScriptEl.src = myapp_path + "sinon-no-sourcemaps.js";
doc.body.insertBefore(newScriptEl, fstScriptEl);
//
newScriptEl = doc.createElement("script");
var setupSinonFakeServerSource = fs.readFileSync("bin/setupSinonFakeServer.js", "utf8");
setupSinonFakeServerSource = setupSinonFakeServerSource.split('\n').slice(1).join('\n');
newScriptEl.textContent = setupSinonFakeServerSource;
doc.body.insertBefore(newScriptEl, fstScriptEl);
//
fs.writeFileSync(dist_path + "index.html",
    beautify_html(serializeDocument(doc), {
        extra_liners: [],
        indent_inner_html: true,
        indent_size: 4,
        preserve_newlines: false
    })
);
