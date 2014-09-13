markdownify
===========
Render markdown to HTML and require it in your front-end JavaScript.

Features
--------
- easy integration into build systems
- markdown rendering with [marked](https://github.com/chjj/marked)
- syntax highlighting using [pygmentize](https://github.com/rvagg/node-pygmentize-bundled)
- uses GitHub Flavoured Markdown

Using
-----
In your front-end code:
```js
var blogPost = require('./markdown/post');

$('#content').html(blogpost);
```

In your build system:
```js
/* Require browserify-markdown */
var markdownify = require('markdownify');

/* Configure Browserify to require markdown documents: */
var bify = browserify({
    extensions: [ '.md', '.markdown' ]
});

/* Set the transform for markdown documents: */
bify.transform(markdownify);

/* Add the entry point for Browserify. */
bify.add('./src/main.js');
```
