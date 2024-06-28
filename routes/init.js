const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../views', 'init.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Failed to read the HTML file', err);
            res.status(500).send('An error occurred while reading the HTML file.');
        } else {

            client.connect();
            client.query('SELECT table_schema,table_name FROM information_schema.tables WHERE  table_schema = "AppSchema" AND  table_name   = "AppTable"', (err, res) => {
                if (err) throw err;
                for (let row of res.rows) {
                    console.log(JSON.stringify(row));
                }
                client.end();
            });

            res.send(html);
        }
    });
});