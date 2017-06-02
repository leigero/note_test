// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;

var mysql = require('mysql');


function db_connect(){
    var con = mysql.createConnection({
      host: "localhost",
      user: "leigero",
      password: "pass",
      database: "cookinggizmo"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    return con;
}

app.post('/api', function(req, res) {
    var connection = db_connect();
    var queryString = 'SELECT * FROM USER WHERE USERNAME = \"testuser\"';
 
    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
    
        for (var i in rows) {
            console.log('User: ', rows[i].username, rows[i].lname, rows[i].fname);
        }
    });
    connection.end();
});
app.listen(port, () => {
  console.log('We are live on ' + port);
});