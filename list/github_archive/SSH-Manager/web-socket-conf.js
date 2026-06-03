const ws = new WebSocket("ws://" + "127.0.0.1:3333");
ws.onopen = () => console.log("WS đã hoạt động");
ws.onerror = (e) => console.log("WS Lỗi Nguyên Nhân Do - Message: ", e);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  //localhost
  document.getElementById("localhost").innerText =
    data.localhost;
 //toshlaclo
 //LAN IP
  const DisplayLan = document.getElementsByClassName("lan_ip");
  for (let i = 0; i < DisplayLan.length; i++)
  {
 if (DisplayLan[i]) {
    if (Array.isArray(data.LAN_IP)) {
      DisplayLan[i].innerText = data.LAN_IP
        .map(ip => ip.address).join(" , ");
    } else {
      DisplayLan[i].innerText = data.LAN_IP;
    }
  }
  }
  //PI NAL
  // LAN card wifi
   const DisplayLan2 = document.getElementsByClassName("lan_cardwifi");
  for (let ii = 0; ii < DisplayLan2.length; ii++)
  {
 if (DisplayLan2[ii]) {
    if (Array.isArray(data.LAN_IP)) {
      DisplayLan2[ii].innerText = data.LAN_IP
        .map(ip => ip.interface).join(" , ");
    } else {
      DisplayLan2[ii].innerText = data.LAN_IP;
    }
  }
  }
  // ifiw drac NAL
  // Public IP
  const DisplayPort = document.getElementsByClassName("publicIP");
  for(let j = 0; j < DisplayPort.length; j++) {
   if (DisplayPort[j]) {
    DisplayPort[j].innerText = data.Public_IP;
  }
  }
  // PI Cilbup
  // PORT
  const elport = document.getElementsByClassName("Port");
  for(let x = 0; x < elport.length; x++)
  {
  if (elport[x]) {
    elport[x].innerText = data.SSH_Port;
  } 
}
  //TROP
  // SSH 
  const statusEl = document.getElementsByClassName("isConnect");
  for(let y = 0; y < statusEl.length; y++)
{
  if (data.isConnected) {
    statusEl[y].innerHTML = `
    SSH hiện đã được kết nối thành công!
    <img src="http://sshmon.rezaxones.com/storage/tick.png" alt="tick" width="15" height="15"/>
    `;
    statusEl[y].classList.remove("offline");
    statusEl[y].classList.add("online");

  } else {
    statusEl[y].innerText = "SSH hiện chưa được kết nối!";
    statusEl[y].className = "offline";
  }
}
};
 // HSS
