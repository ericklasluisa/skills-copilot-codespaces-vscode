// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const comments = require('./comments');

// Create server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/api/comments') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(comments.getComments()));
            res.end();
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                comments.addComment(JSON.parse(body).comment);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(comments.getComments()));
                res.end();
            });
        }
    }
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});