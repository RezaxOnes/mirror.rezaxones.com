const token = localStorage.getItem("token");

if (token) {
  fetch("https://singapore.api.hollawgostar.uno/profile", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(res => {
    if (!res.ok) throw new Error("Không thể lấy profile");
    return res.json();
  })
  .then(data => {
    document.getElementById("username").innerText = data.USERNAME || "Guest";
    document.getElementById("language").innerText = data.LANGUAGE || "N/A";
  })
  .catch(err => {
    document.getElementById("username").innerText = "Guest";
    document.getElementById("language").innerText = "N/A";
  });
} else {
  document.getElementById("username").innerText = "Guest";
  document.getElementById("language").innerText = "N/A";
}
