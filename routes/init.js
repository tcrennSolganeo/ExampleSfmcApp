const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
/*const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});*/

router.get('/', (req, res) => {
    res.send("<h1>LUL</h1>");
    /*fs.readFile(path.join(__dirname, '../views', 'init.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Failed to read the HTML file', err);
            res.status(500).send('An error occurred while reading the HTML file.');
        } else {
            res.send(html);
        }
    });*/
});