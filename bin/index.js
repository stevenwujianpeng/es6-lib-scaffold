#! /usr/bin/env node

var Git = require("nodegit");

Git.Clone("https://github.com/stevenwujianpeng/js-min-template.git", "js-min-template").then(function(repository) {
    // Work with the repository object here.
});
