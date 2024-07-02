/*const config = require('config');
const { Client } = require('pg');

class DataBase {
    constructor() {
        this.schema = config.get('db.schema');
        this.table = config.get('db.table');
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false
            }
        });
        this.client.connect();
    }

    checkIfTableExist() {
        //this.client.connect();
        this.client.query(`SELECT EXISTS (
            SELECT 1
            FROM   information_schema.tables 
            WHERE  table_schema = '${this.schema}'
            AND    table_name = '${this.table}'
        );`, (err, res) => {
            if (err) throw err;
            if(res.rows.length > 0) {
                return true;
            }
            //this.client.end();
        });
        return false;
    }

    createSchemaAndTable() {
        //this.client.connect();
        this.client.query(`CREATE TABLE "${this.table}" (
            "id" int PRIMARY KEY,
            "name" varchar,
            "email" varchar UNIQUE,
            "hash" varchar,
            "picture" varchar,
            "createdAt" timestamp,
            "updatedAt" timestamp
        );`, (err, res) => {
            if (err) throw err;
            console.log('Create Table result', res);
            if(res.rows.length > 0) {
                return true;
            }
            //this.client.end();
        });
    }
}

module.exports = DataBase;*/