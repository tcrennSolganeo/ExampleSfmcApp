const { Client } = require('pg');
const config = require('../config/default.json');

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
    }


    checkIfTableExist() {
        this.client.connect();
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
            this.client.end();
        });
        return false;
    }
}

module.exports = DataBase;