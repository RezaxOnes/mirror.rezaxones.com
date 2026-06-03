/* const express = require("express");
const bodyParser = require("body-parser");
const mariadb = require('mysql2');
const bcrypt = require("bcrypt");  
const jwt = require("jsonwebtoken"); 
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const allowDomain = [
  
];

app.use(cors({
  origin: allowDomain,
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const connection = mariadb.createPool({
  host: ,
  user: ,
  password: ,
  database: ,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Đăng kí
app.post("/sign_up", async (req, res) => {
  let inCompleteSignUp=`<!DOCTYPE html>
    <html lang="vi">
    <head>
    <title>Thiếu thông tin đăng ký</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://rezaxones.com/storage/rezaxones_icon.png" rel="icon" type="image/png" />
    <!--Open Graph-->
    <meta property="og:url" content="https://rezaxones.com" />
    <meta property="og:title" content="RezaxOnes" />
    <meta property="og:description" content="Trang chủ của website rezaxones.com" />
    <meta property="og:image" content="https://rezaxones.com/storage/rezaxones_image.png" />
    <!---->
    <!--API-->
    <link href="https://rezaxones.com/style/error.css" rel="stylesheet"/>
    <!---->
    </head>
    <body>
    <div class='result'>
        <p style='color:red;'>❌ Thiếu thông tin đăng kí!</p>
    </div>
    <br>
        <i class="fa-solid fa-arrow-left"></i>
        <button type="button" onclick="window.location.href='https://rezaxones.com/sign-up.html'">
        Quay lại
        </button>
    </body>   
    </html>`;
    let exitsUser=`<!DOCTYPE html>
    <html lang="vi">
    <head>
    <title>Tên người dùng tồn tại</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://rezaxones.com/storage/rezaxones_icon.png" rel="icon" type="image/png" />
    <!--Open Graph-->
    <meta property="og:url" content="https://rezaxones.com" />
    <meta property="og:title" content="RezaxOnes" />
    <meta property="og:description" content="Trang chủ của website rezaxones.com" />
    <meta property="og:image" content="https://rezaxones.com/storage/rezaxones_image.png" />
    <!---->
    <!--API-->
    <link href="https://rezaxones.com/style/error.css" rel="stylesheet"/>
    <!---->
    </head>
    <body>
    <div class='result'>
        <p style='color:red;'>❌ Tên người dùng nãy đã tồn tại vui lòng tạo tên khác!</p>
    </div>
    <br>
        <i class="fa-solid fa-arrow-left"></i>
        <button type="button" onclick="window.location.href='https://rezaxones.com/sign-up.html'">
        Quay lại
        </button>
    </body>   
    </html>`;
    let serverError=`<!DOCTYPE html>
    <html lang="vi">
    <head>
    <title>Có sự cố</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://rezaxones.com/storage/rezaxones_icon.png" rel="icon" type="image/png" />
    <!--Open Graph-->
    <meta property="og:url" content="https://rezaxones.com" />
    <meta property="og:title" content="RezaxOnes" />
    <meta property="og:description" content="Trang chủ của website rezaxones.com" />
    <meta property="og:image" content="https://rezaxones.com/storage/rezaxones_image.png" />
    <!---->
    <!--API-->
    <link href="https://rezaxones.com/style/error.css" rel="stylesheet"/>
    <!---->
    </head>
    <body>
    <div class='result'>
        <p style='color:red;'>❌ Server hiện tại không hoạt động hoặc đang gặp sự cố mong bạn thông cảm!</p>
    </div>
    <br>
        <i class="fa-solid fa-arrow-left"></i>
        <button type="button" onclick="window.location.href='https://rezaxones.com/index.html'">
        Quay lại
        </button>
    </body>   
    </html>`;
  const { username, password, language } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Thiếu thông tin đăng ký", html: inCompleteSignUp});
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await connection.query("INSERT INTO users (`USERNAME`, `PASSWORD`, `LANGUAGE`) VALUES (?, ?, ?)", [username, hashedPassword, language]);
     let successSignUp=`<!DOCTYPE html>
    <html lang="vi">
    <head>
    <title>Đăng kí thành công!</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://rezaxones.com/storage/rezaxones_icon.png" rel="icon" type="image/png" />
    <!--Open Graph-->
    <meta property="og:url" content="https://rezaxones.com" />
    <meta property="og:title" content="RezaxOnes" />
    <meta property="og:description" content="Trang chủ của website rezaxones.com" />
    <meta property="og:image" content="https://rezaxones.com/storage/rezaxones_image.png" />
    <!---->
    <!--API-->
    <link href="https://rezaxones.com/style/error.css" rel="stylesheet"/>
    <!---->
    </head>
    <body>
    <div class='result'>
        <p style='color:rgb(101, 216, 72);'>✅ Đăng ký thành công! </p>
        <p style='color:rgb(37, 41, 48);'>Thông tin đăng ký: </p>
        <p style='color:rgb(37, 41, 48);'>Số thứ tự: ${rows.insertId}</p>
         <p style='color:rgb(37, 41, 48);'>Tên: ${username}</p>
    </div>
    <br>
        <i class="fa-solid fa-arrow-left"></i>
        <button type="button" onclick="window.location.href='https://rezaxones.com/index.html'">
        Quay lại
        </button>
    </body>   
    </html>`;
    res.json({ message: "Đăng ký thành công!", userId: rows.insertId, html: successSignUp });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Tên người dùng đã tồn tại!", html: exitsUser });

    }
       return res.status(500).json({ error: "Lỗi server", detail: err.message, html: serverError });
      }
    
});

// Đăng nhập
app.post("/sign_in", async (req, res) => {
  let errorPassOrAcc=`<!DOCTYPE html>
    <html lang="vi">
    <head>
    <title>Không hợp lệ</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://rezaxones.com/storage/rezaxones_icon.png" rel="icon" type="image/png" />
    <!--Open Graph-->
    <meta property="og:url" content="https://rezaxones.com" />
    <meta property="og:title" content="RezaxOnes" />
    <meta property="og:description" content="Trang chủ của website rezaxones.com" />
    <meta property="og:image" content="https://rezaxones.com/storage/rezaxones_image.png" />
    <!---->
    <!--API-->
    <link href="https://rezaxones.com/style/error.css" rel="stylesheet"/>
    <!---->
    </head>
    <body>
    <div class='result'>
        <p style='color:red;'>❌ Sai tài khoản hoặc mật khẩu!</p>
    </div>
    <br>
        <i class="fa-solid fa-arrow-left"></i>
        <button type="button" onclick="window.location.href='https://rezaxones.com/sign-in.html'">
        Quay lại
        </button>
    </body>   
    </html>`;
    let fillInComplete=`<!DOCTYPE html>
    <html lang="vi">
    <head>
    <title>Thiếu thông tin</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://rezaxones.com/storage/rezaxones_icon.png" rel="icon" type="image/png" />
    <!--Open Graph-->
    <meta property="og:url" content="https://rezaxones.com" />
    <meta property="og:title" content="RezaxOnes" />
    <meta property="og:description" content="Trang chủ của website rezaxones.com" />
    <meta property="og:image" content="https://rezaxones.com/storage/rezaxones_image.png" />
    <!---->
    <!--API-->
    <link href="https://rezaxones.com/style/error.css" rel="stylesheet"/>
    <!---->
    </head>
    <body>
    <div class='result'>
        <p style='color:red;'>❌ Chưa điền đầy đủ tên hoặc mật khẩu!</p>
    </div>
    <br>
        <i class="fa-solid fa-arrow-left"></i>
        <button type="button" onclick="window.location.href='https://rezaxones.com/sign-in.html'">
        Quay lại
        </button>
    </body>   
    </html>`;
  const { username, password} = req.body;
  if (!username || !password) return res.status(400).json({ error: "Chưa điền đầy đủ tên hoặc mật khẩu", html: fillInComplete});
    const [rows] = await connection.query("SELECT * FROM `users` WHERE `USERNAME` = ?", [username]);
    if (rows.length === 0) return res.status(400).json({ error: "Sai tài khoản hoặc mật khẩu!", html: errorPassOrAcc});
    const user = rows[0];
    const match = await bcrypt.compare(password, user.PASSWORD);
    if (!match) return res.status(400).json({ error: "Sai tài khoản hoặc mật khẩu!", html: errorPassOrAcc});
    const token = jwt.sign({ userCookie: user.STT, username: user.USERNAME }, process.env.JWT_SECRET, { expiresIn: "24h" });
        let successLogIn=`<!DOCTYPE html>
    <html lang="vi">
    <head>
    <title>Đăng nhập thành công</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://rezaxones.com/storage/rezaxones_icon.png" rel="icon" type="image/png" />
    <!--Open Graph-->
    <meta property="og:url" content="https://rezaxones.com" />
    <meta property="og:title" content="RezaxOnes" />
    <meta property="og:description" content="Trang chủ của website rezaxones.com" />
    <meta property="og:image" content="https://rezaxones.com/storage/rezaxones_image.png" />
    <!---->
    <!--API-->
    <link href="https://rezaxones.com/style/error.css" rel="stylesheet"/>
    <!---->
    </head>
    <body>
    <div class='result'>
        <p style='color:rgb(101, 216, 72);'>✅ Đăng nhập thành công! </p>
            <p style='color:rgb(37, 41, 48);'>Token phiên hiện tại: ${token.slice(0, 8)} ...</p>
    </div>
    <br>
        <i class="fa-solid fa-arrow-left"></i>
        <button type="button" onclick="window.location.href='https://rezaxones.com/index.html'">
        Quay lại
        </button>
    </body>   
    </html>`;
     res.json({ message: "Đăng nhập thành công!", token, html: successLogIn });
});

// Profile
app.get("/profile", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Chưa đăng nhập" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token không hợp lệ" });
    try {
      const [rows] = await connection.query("SELECT `USERNAME`, `LANGUAGE` FROM `users` WHERE `STT` = ?", [decoded.userCookie]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      res.json(rows[0]);
    } catch (queryError) {
      console.error(queryError);
      return res.status(500).json({ error: "Lỗi khi truy vấn dữ liệu" });
    }
  });
});

// Localhost:9999 //

app.listen(9999, '0.0.0.0', () => {
  console.log('Server chạy ở http://localhost:9999');
});
*/
