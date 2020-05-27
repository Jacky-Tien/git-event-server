module.exports = (sql, params = null) => {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'admin123',
        database: 'big-event',
    })
    conn.connect()

    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            err ? reject(err) : resolve(result)
        })
        conn.end()
    }).catch(err => {
        console.log(err.message)
    })

}