const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const os = require("os");
const { exec } = require("child_process");
const https = require("https");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// LAN_IP = Local Area Network IP
// Index_1 = card wifi -> lo, wlp3s0,...
// Index_2 = Index_2 => Reading IP, localhost = true; LAN, WAN == false
function LAN_IP() 
{
  const result = [];
  const IP = os.networkInterfaces();
  const obj = Object.keys(IP);
  // O(n^2)
  for (let index_1 = 0; index_1 < obj.length; index_1++) {
     const card_wifi = obj[index_1]; // biến card wifi lấy tên từng card wifi khả dụng
     const card_wifi_array = IP[card_wifi]; // Mảng truy cập tuần từ theo { } => Name card_wifi => card_wifi[ ]
    for (let index_2 = 0; index_2 < card_wifi_array.length; index_2++) {
      const obj_card_wifi = card_wifi_array[index_2];
      if ((obj_card_wifi.family === "IPv4" || obj_card_wifi.family === 4) && obj_card_wifi.internal == false) {
        result.push({
          interface: card_wifi,
          address: obj_card_wifi.address
        });
      }
    }
  }

  return result;
}

// Public_IP = Public IP / WAN = World Area Network
function Public_IP(callback) {
  https.get("https://api.ipify.org?format=json", (res) => {
    let data = "";

    res.on("data", chunk => data += chunk);

    res.on("end", () => {
      try {
        const ip = JSON.parse(data).ip;
        callback(false, ip);   
      } catch {
        callback(true, null);
      }
    });

  }).on("error", () => {
    callback(true, null);
  });
}



function FinalAnswer(callback) {
  exec("who", (err, stdout) => {
    const connect = stdout && stdout.includes("pts");
    // Nếu hàm Public_IP đã lấy được IP rồi thì trả kết quả vào biến callback_2, sau khi callback đủ rồi thì trả result cho hàm
    Public_IP((isResultError, CallBack_PublicIP) => {
    if (err) {
     console.log("Exec error but ignore because nodejs is single thread + message: ", err.message);
  }
      let tempPublicIP;
      let tempLANIP;
      const LAN_IP_Func = LAN_IP();
      if(isResultError === true || !CallBack_PublicIP)
     {
        tempPublicIP = "Khong Kha Dung";
     }
     else {
        tempPublicIP = CallBack_PublicIP;
     }
     if(LAN_IP_Func.length === 0)
     {
        tempLANIP = "Khong Kha Dung";
     }
     else {
        tempLANIP = LAN_IP_Func;
     }
      callback({
        localhost: "127.0.0.1",
        LAN_IP: tempLANIP,
        Public_IP: tempPublicIP,
        SSH_Port: "22",
        isConnected: connect
      });
    });
  });
}

wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    FinalAnswer((data) => {
      ws.send(JSON.stringify(data));
    });
  }, 10000); // Độ trễ: 10000ms, 1s = 1000ms

  ws.on("close", () => clearInterval(interval));
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server chạy ở LAN port 3000"); // Port 3000, nào xong trả tao data
});
