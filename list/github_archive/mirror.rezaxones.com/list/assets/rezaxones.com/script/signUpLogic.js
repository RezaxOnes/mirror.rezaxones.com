  document.getElementById('signUpForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('your-user').value;
  const password = document.getElementById('your-pass').value;
  const language = document.getElementById('your-FavourLang').value;

  try {
    const res = await fetch('https://singapore.api.hollawgostar.uno/sign_up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, language }),
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

    try {
    if (res.ok) {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
     alert("Đã đăng ký thành công");
  } else {
    throw new Error();
  }
  }
  catch {
  alert(data?.error || 'Đăng ký thất bại');
}
    if(data?.html)
    {
    document.open();
    document.write(data.html);
    document.close();
    }
  } catch (err) {
    alert('Lỗi kết nối database: ' + err.message);
  }
});

document.getElementById("togglePass").addEventListener("click", () => {
  const pass = document.getElementById("your-pass");
  const icon = document.querySelector("#togglePass i");

  if (pass.type === "password") {
    pass.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    pass.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
});
