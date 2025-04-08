const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer(function(req, res) {
    if (!(req.url == "/favicon.ico")) console.log("req");
    fs.readFile('./index.html', function(err, data) {
        if (err) { 
            res.writeHead(400);
            res.end(); 
            return; 
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
}).listen(61021);