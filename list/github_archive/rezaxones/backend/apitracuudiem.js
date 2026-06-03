/* const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mysql2');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
*/

//Uncomment this

/*
  var Host = "Your host";
  var User = "Your user";
  var myPassword = "myPassword";
  var dataBase = "Your name database";
*/

/* const connection = mariadb.createConnection({
  host: Host,  //var Host = "Your host";
  user: User,  //var User = "Your user";
  password: myPassword, //var myPassword = "myPassword";
  database: dataBase //var dataBase = "Your name database";
}); */

// use with POST - /sobaodanh - database ... - table Hoc_Sinh
// Hoc-Sinh sbd, row will display table head in database just using AI
/* app.post('/sobaodanh', (req, res) => {
const { sbd } = req.body;
  connection.query("SELECT * FROM Hoc_Sinh WHERE sbd = ?", [sbd], (error, rows) => {
    if (error !== null && error !== undefined && error !== false && error !== 0) {
      return res.send("Lỗi do database không truy vấn được dữ liệu");
    }

    if (rows.length === 0) {
      let htmlNone = `     
`
      return res.send(htmlNone);
    }

    //use results for display mark
    // Example: ${results.sbd} it will display your table head name sbd if you had create it
    const results = rows[0];

    let html = `
   
      `;

    res.send(html);
  });
});

// Localhost:3000 //

app.listen(3000, '0.0.0.0', () => {
  console.log('Server chạy ở http://localhost:3000');
}); */