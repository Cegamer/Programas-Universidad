document.getElementById("toggle-btn").addEventListener("click", function() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const formTitle = document.getElementById("form-title");
    const toggleBtn = document.getElementById("toggle-btn");
    const leftImage = document.querySelector(".left-image");

    // Intercambia entre login y registro
    if (registerForm.classList.contains("d-none")) {
        loginForm.classList.add("d-none");
        registerForm.classList.remove("d-none");
        registerForm.classList.add("fade-in");
        formTitle.textContent = "Registrarse";
        toggleBtn.textContent = "¿Ya tienes cuenta? Inicia sesión";

        // Cambiar imagen al lado izquierdo
        leftImage.src = "../resources/aeropuerto2.jpeg";  // Cambiar la imagen para el registro
    } else {
        registerForm.classList.add("d-none");
        loginForm.classList.remove("d-none");
        loginForm.classList.add("fade-in");
        formTitle.textContent = "Iniciar Sesión";
        toggleBtn.textContent = "¿No tienes cuenta? Regístrate";

        // Cambiar imagen al lado izquierdo
        leftImage.src = "../resources/aeropuerto3.jpg";  // Imagen original para el login
    }
});


document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Obtener valores del formulario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Crear el objeto JSON que se enviará al API
    const loginData = {
        email: email,
        password: password
    };

    // Realizar la consulta POST al API
    fetch(apiUrl+'Usuarios/Login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parsear la respuesta como JSON
        } else {
            throw new Error("Error en el inicio de sesión");
        }
    })
    .then(data => {
        // Guardar el id del usuario en localStorage
        localStorage.setItem("idUsuario", data.idUsuarios);

        // Redireccionar a la página de consulta de vuelos
        window.location.href = "consultavuelos.html";
    })
    .catch(error => {
        console.error("Hubo un problema con la solicitud:", error);
        alert("Error en el inicio de sesión. Por favor, intenta de nuevo.");
    });
});

// Evento de submit para el formulario de registro
document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Obtener valores del formulario
    const nombre = document.getElementById("name").value;
    const correo = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    // Crear el objeto JSON que se enviará al API
    const registerData = {
        idUsuarios: 0, // Esto normalmente sería manejado por el servidor
        correo: correo,
        password: password,
        idTipoUsuario: 1, // Establecer según el tipo de usuario (puede ser variable)
        nombre: nombre
    };

    // Realizar la consulta POST al API
    fetch(apiUrl+"Usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parsear la respuesta como JSON
        } else {
            throw new Error("Error en el registro");
        }
    })
    .then(id => {
        // Guardar el id del usuario registrado en localStorage
        localStorage.setItem("idUsuario", id);
        window.location.href = "consultavuelos.html"; // Descomentar si deseas redirigir
    })
    .catch(error => {
        console.error("Hubo un problema con la solicitud:", error);
        alert("Error en el registro. Por favor, intenta de nuevo.");
    });
});