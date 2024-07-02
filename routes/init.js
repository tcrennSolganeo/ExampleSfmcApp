const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DataBase = require('../classes/database');
const database = new DataBase();

router.get('/', (req, res) => {

    /* Check if schema and table is created in the database */
    /*let tableExist = database.checkIfTableExist();
    if(!tableExist) {
        console.log('Table doesn\'t existsSync, lets create it');
        let createTableResult = database.createSchemaAndTable();
        console.log('createTableResult', createTableResult);
    }

    fs.readFile(path.join(__dirname, '../views', 'init.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Failed to read the HTML file', err);
            res.status(500).send('An error occurred while reading the HTML file.');
        } else {
            res.send(html);
        }
    });*/
});

module.exports = router;