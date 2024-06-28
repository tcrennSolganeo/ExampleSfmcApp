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

const subdomain = process.env.subdomain;

router.get('/', async (req, res) => {
    console.log('Accessing / route');
    console.log('Session ID:', req.sessionID);

    /* Check if schema and table is created in the database */
    let tableExist = false;
    client.connect();
    client.query(`SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'SchemaName'
        AND    table_name = 'TableName'
   );`, (err, res) => {
        if (err) throw err;
        if(res.rows.length > 0) {
            tableExist = true;
        }
        client.end();
    });
    if(!tableExist) {
        console.log('Table doesn\'t exits in database');
        return res.redirect('/init');
    }

    const accessToken = req.session.accessToken;

    if (!accessToken) {
        console.log('No access token found, redirecting to /login');
        return res.redirect('/login');
    }

    try {
        const response = await axios.get(`https://${subdomain}.rest.marketingcloudapis.com/messaging/v1/email/definitions`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        fs.readFile(path.join(__dirname, '../views', 'index.html'), 'utf8', (err, html) => {
            if (err) {
                console.error('Failed to read the HTML file', err);
                res.status(500).send('An error occurred while reading the HTML file.');
            } else {

                /*client.connect();
                client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
                    if (err) throw err;
                    for (let row of res.rows) {
                        console.log(JSON.stringify(row));
                    }
                    client.end();
                });*/

                const updatedHtml = html.replace('<pre id="response"></pre>', `<pre id="response">${JSON.stringify(response.data, null, 2)}</pre>`);
                res.send(updatedHtml);
            }
        });
    } catch (error) {
        console.error('Failed to call the SFMC API', error);
        res.status(500).send('Failed to call the SFMC API');
    }
});

module.exports = router;