document.getElementById('signInForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('https://singapore.api.hollawgostar.uno/sign_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const clone = res.clone();
    let data;

    try {
      data = await res.json();
    } catch {
      const html = await clone.text();
      document.open();
      document.write(html);
      document.close();
      return;
    }

    if (res.ok && data.token) {
      try {
        localStorage.setItem('token', data.token);
        alert("Đã đăng nhập thành công");
      } catch (error) {
        alert("Đăng nhập không thành công hoặc Lỗi phía server");
      }
    } else {
      alert(data.error || 'Đăng nhập thất bại');
    }

    document.open();
    document.write(data.html);
    document.close();

  } catch (err) {
    alert('Lỗi kết nối database: ' + err.message);
  }
});

document.getElementById("togglePass2").addEventListener("click", () => {
  const pass = document.getElementById("password");
  const icon = document.querySelector("#togglePass2 i");

  if (pass.type === "password") {
    pass.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    pass.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
});
