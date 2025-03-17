// Elementos del DOM
const toggleBtn = document.getElementById("toggle-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const formTitle = document.getElementById("form-title");

// Alternar entre formularios de inicio de sesión y registro
toggleBtn.addEventListener("click", () => {
  const isLogin = !loginForm.classList.contains("hidden");

  formTitle.textContent = isLogin ? "Regístrate" : "Inicia Sesión";
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");
  toggleBtn.textContent = isLogin
    ? "¿Ya tienes cuenta? Inicia Sesión"
    : "¿No tienes cuenta? Regístrate";
});

// Función genérica para manejar peticiones a la API
async function apiRequest(url, method, data) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la solicitud.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la API:", error);
    alert(error.message);
    return null;
  }
}

// Función para manejar el registro
async function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("reg-password").value;

  const userData = {
    idUsuario: 0,
    username: username,
    password: password,
    tipoUsuario: 0,
    correo: email,
  };

  const user = await apiRequest(apiUrl+ "/api/Usuarios", "POST", userData);

  if (user) {
    // Registro exitoso, iniciar sesión automáticamente
    localStorage.setItem(
      "usuarioActual",
      JSON.stringify({
        idUsuario: user.idUsuario,
        username: user.username,
        correo: user.correo,
        tipoUsuario: user.tipoUsuario,
      })
    );

    window.location.href = "catalogo.html";
  }
}

// Función para manejar el inicio de sesión
async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const loginData = { username, password };

  const user = await apiRequest(apiUrl+ "/api/Usuarios/Login", "POST", loginData);

  if (user) {
    // Inicio de sesión exitoso
    localStorage.setItem(
      "usuarioActual",
      JSON.stringify({
        idUsuario: user.idUsuario,
        username: user.username,
        correo: user.correo,
        tipoUsuario: user.tipoUsuario,
      })
    );

    window.location.href = "catalogo.html";
  }
}

// Asociar eventos a los formularios
loginForm.addEventListener("submit", handleLogin);
registerForm.addEventListener("submit", handleRegister);
