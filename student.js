const Datastore = require('nedb');
const path = require('path');
const fs = require('fs');

// Create database file in current directory
const dbPath = path.join(__dirname, 'students.db');

// Create file if it doesn't exist
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
}

const db = new Datastore({ filename: dbPath });

module.exports = db;