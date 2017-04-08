var beautify_html = require('js-beautify').html;
var jsdom = require("jsdom").jsdom;
var serializeDocument = require("jsdom").serializeDocument;
var fs = require("fs");

const dist_path = "dist/";

var htmlSource = fs.readFileSync("bin/index.o.html", "utf8");
var doc = jsdom(htmlSource, {
    features: {
        FetchExternalResources: false,
        ProcessExternalResources: false,
        SkipExternalResources: true
    }
});
//
fs.writeFileSync(dist_path + "index.html",
    beautify_html(serializeDocument(doc), {
        extra_liners: [],
        indent_inner_html: true,
        indent_size: 4,
        preserve_newlines: false
    })
);
