const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //Capturar todos los datos
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
}

  // Chequear que email no esté en la base de datos
  // Si en LS tiene usuarios guardalo en users sino asignamos un array vacio
  const Users = JSON.parse(localStorage.getItem("users")) || [];
  // Buscar un usuario que tenga el mismo mail que se ingresa en el formulario
  const isUserRegistered = Users.find((user) => user.email === email);
  // Si tiene un valor valido significa que está registrado
  if (isUserRegistered) {
    return alert("El usuario ya está registrado");
  }
  // Sino lo guardamos en nuestra base de datos
  Users.push({ name: name, email: email, password: password });
  // Guardamos en el LS
  localStorage.setItem("users", JSON.stringify(Users));
  alert("Registro exitoso");
  // Redireccion al login
  window.location.href = "login.html"
});
