/* 
const express = require("express");
const bodyParser = require("body-parser");
const mariadb = require('mysql2');
const bcrypt = require("bcrypt");  
const jwt = require("jsonwebtoken"); 
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://rezaxones.com',
  methods: ['GET', 'POST'],
  credentials: true
}));

const connection = mariadb.createPool({
  host: Host,   
  user: User,       
  password: myPassword, 
  database: dataBase,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Đăng kí
app.post("/sign_up", async (req, res) => {
  const { username, password, language } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Thiếu thông tin đăng ký" });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await connection.query("INSERT INTO users (`USERNAME`, `PASSWORD`, `LANGUAGE`) VALUES (?, ?, ?)", [username, hashedPassword, language]);
    res.json({ message: "Đăng ký thành công!", userId: rows.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Tên người dùng đã tồn tại!" });
    }
      return res.status(500).json({ error: "Lỗi server", detail: err.message });
      }
    
});

// Đăng nhập
app.post("/sign_in", async (req, res) => {
  const { username, password} = req.body;
  if (!username || !password) return res.status(400).json({ error: "Chưa điền đầy đủ tên hoặc mật khẩu" });
    const [rows] = await connection.query("SELECT * FROM `users` WHERE `USERNAME` = ?", [username]);
    if (rows.length === 0) return res.status(400).json({ error: "Sai tài khoản hoặc mật khẩu!" });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.PASSWORD);
    if (!match) return res.status(400).json({ error: "Sai tài khoản hoặc mật khẩu!" });
    const token = jwt.sign({ userCookie: user.STT, username: user.USERNAME }, "mySecretKey", { expiresIn: "24h" });
    res.json({ message: "Đăng nhập thành công!", token });
});

// Profile
app.get("/profile", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Chưa đăng nhập" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, "mySecretKey", async (err, decoded) => {
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

// Localhost:8000 //

app.listen(8000, '0.0.0.0', () => {
  console.log('Server chạy ở http://localhost:8000');
}); */
