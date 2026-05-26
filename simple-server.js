const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const DB = path.join(__dirname, 'students.json');

if (!fs.existsSync(DB)) fs.writeFileSync(DB, '[]');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/' && req.method === 'GET') {
        res.end(JSON.stringify({ message: 'API Working!', endpoints: ['/api/students'] }));
    } else if (req.url === '/api/students' && req.method === 'GET') {
        res.end(fs.readFileSync(DB));
    } else if (req.url === '/api/students' && req.method === 'POST') {
        let data = '';
        req.on('data', c => data += c);
        req.on('end', () => {
            const s = JSON.parse(data);
            s._id = Date.now().toString();
            s.createdAt = new Date().toISOString();
            const all = JSON.parse(fs.readFileSync(DB));
            all.push(s);
            fs.writeFileSync(DB, JSON.stringify(all, null, 2));
            res.statusCode = 201;
            res.end(JSON.stringify({ message: 'Created', student: s }));
        });
    } else { res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found' })); }
});

server.listen(PORT, () => console.log('Server running on port ' + PORT));