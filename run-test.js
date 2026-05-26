const http = require('http');
const data = JSON.stringify({ name: "John Doe", age: 21, email: "john@test.com", course: "JavaScript" });

const req = http.request({ hostname: 'localhost', port: 5000, path: '/api/students', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': data.length } }, res => {
    let r = '';
    res.on('data', c => r += c);
    res.on('end', () => console.log(res.statusCode === 201 ? 'SUCCESS! Student Added!' : r));
});

req.on('error', e => console.log('Error: Server not running!'));
req.write(data);
req.end();