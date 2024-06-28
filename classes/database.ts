const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});
export class DataBase {
    checkIfTableExist: typeof checkIfTableExist;
}

export function checkIfTableExist() {
    client.connect();
    client.query(`SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'SchemaName'
        AND    table_name = 'TableName'
   );`, (err, res) => {
        if (err) throw err;
        if(res.rows.length > 0) {
            return true;
        }
        client.end();
    });
    return false;
}