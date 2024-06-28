const { Client } = require('pg');

class DataBase {
    constructor() {
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
            WHERE  table_schema = 'SchemaName'
            AND    table_name = 'TableName'
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