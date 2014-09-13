(function () {
    'use strict';

    var extensions = [
        '.md',
        '.markdown'
    ];

    var through = require('through');
    var marked = require('marked');
    var path = require('path');
    var pygmentize = require('pygmentize-bundled');

    /* Set up syntax highlighting: */
    marked.setOptions({
        highlight: function (code, lang, callback) {
            pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
                callback(err, result.toString());
            });
        },
        gfm: true
    });

    function transform(file) {
        /* Check that we're supposed to modify this extension: */
        if (!fileIsMarkdown(file)) {
            return through();
        }

        var data = '';

        function write(buf) {
            data += buf;
        }

        function end() {
            /* Convert the data to markdown: */
            var self = this;
            data = marked(data, function callback(err, result) {
                if (err) {
                    throw err;
                }

                self.queue(stringify(result));
                self.queue(null);
            });
        }

        return through(write, end);
    }

    /* From the npm package stringify: */
    function stringify(contents) {
        return 'module.exports = ' + JSON.stringify(contents) + ';';
    }

    function fileIsMarkdown(filename) {
        var ext = path.extname(filename);
        return extensions.indexOf(ext) > -1;
    }

    module.exports = transform;
}());
