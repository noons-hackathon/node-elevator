'use strict';

var http = require('http'),
    fs = require('fs');

function getView(file) {
    return fs.readFileSync('views/' + file + '.html');
}

http
    .createServer(function (req, res) {
        console.log('new access', req.url);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(getView('index'));
    })
    .listen(8888);
