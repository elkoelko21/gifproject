const http = require('http');
const path = require('path');
const fs = require('fs');

const { sleep } = require('./modules');

fs.readdirSync('../../').forEach(file => {
    console.log(file);
});

http.createServer(function(req, res) {
    if (req.url == "/favicon.ico") {
        fs.readFile('./kj.png', function(err, data) {
            if (err) { 
                res.writeHead(400);
                res.end(); 
                return; 
            }
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(data);
            return;
        });
        return;
    } else console.log("req");

    if (req.url == "/upload") {
        fs.readFile('./upload.html', function(err, data) {
            if (err) { 
                res.writeHead(400);
                res.end(); 
                return; 
            }
    
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
            return;
        });
        return;
    }

    
    fs.readFile('./kj.png', function(err, data) {
        if (err) { 
            res.writeHead(400);
            res.end(); 
            return; 
        }
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(data);
        return;
    });
}).listen(61021);