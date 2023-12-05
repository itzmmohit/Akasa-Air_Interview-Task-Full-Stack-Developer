const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12667936',
    password: 'Lvru2RkZHe',
    database: 'sql12667936',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('MySQL connected');
});

module.exports = connection;
