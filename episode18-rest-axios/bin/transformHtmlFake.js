var beautify_html = require('js-beautify').html;
var jsdom = require("jsdom").jsdom;
var serializeDocument = require("jsdom").serializeDocument;
var fs = require("fs");

var htmlSource = fs.readFileSync("index.o.html", "utf8");
var doc = jsdom(htmlSource, {
    features: {
        FetchExternalResources: false,
        ProcessExternalResources: false,
        SkipExternalResources: true
    }
});
var fstScriptEl = doc.body.querySelector("script");
///
var newScriptEl = doc.createElement("script");
newScriptEl.src = "node_modules/sinon/pkg/sinon.js";
doc.body.insertBefore(newScriptEl, fstScriptEl);
//
newScriptEl = doc.createElement("script");
var setupSinonFakeServerSource = fs.readFileSync("bin/setupSinonFakeServer.js", "utf8");
setupSinonFakeServerSource = setupSinonFakeServerSource.split('\n').slice(1).join('\n');
newScriptEl.textContent = setupSinonFakeServerSource;
doc.body.insertBefore(newScriptEl, fstScriptEl);
//
fs.writeFileSync("./dist/index.html",
    beautify_html(serializeDocument(doc), {
        extra_liners: [],
        indent_inner_html: true,
        indent_size: 4,
        preserve_newlines: false
    })
);
