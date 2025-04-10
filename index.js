const http = require('http');
const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

const { sleep } = require('./modules');

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

    if (req.url == "/uploadimg" && req.method === "POST") {
        const busboy = Busboy({ headers: req.headers });

        busboy.on('file', function(fieldname, file, filename) {
            file.pipe(fs.createWriteStream('image.png'));
        });

        busboy.on('finish', function () {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File uploaded successfully.');
            console.log();
        });

        req.pipe(busboy);
        return;
    }

    if (fs.existsSync('./image.png')) {
        fs.readFile('./image.png', function(err, data) {
            if (err) { 
                res.writeHead(400);
                res.end(); 
                return; 
            }
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(data);
            return;
        });
    } else {
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
    }
}).listen(61021);