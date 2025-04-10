const http = require('http');
const path = require('path');
const fs = require('fs');

const { sleep } = require('./modules');

let contentmatchcheck = false;
    
(async () => {
    console.log("Starting...");
    
    await sleep(1000);
    
    const filename = './special.txt'
    const dataToWrite = 'test';
    
    fs.writeFileSync(filename, dataToWrite);
    
    const dataRead = fs.readFileSync(filename, 'utf8');
    
    if (dataRead === dataToWrite) {
      console.log('Success: Content matches!');
      contentmatchcheck = true;
    } else {
      console.error('Error: Content does not match.');
      contentmatchcheck = false;
    }
    
    fs.unlinkSync(filename);
})();

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
    if (req.url == "/check") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        if (contentmatchcheck) res.end('true');
        else res.end('false');

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