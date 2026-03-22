
  const user = "rezaxonesassist";
  const domain = "gmail.com";
  const email = user + "@" + domain;
  const container = document.getElementById("My_Email");
  container.innerHTML = `<div><h2 class='incenter' style="font-size:20px;">Get In Touch With Our Team!</h2><br /><a href="mailto:${email}" style="color: #dfdbdbff;"><i class="fa-solid fa-envelope"></i>${email}</a></div>`;