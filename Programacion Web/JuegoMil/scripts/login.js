// Obtener los elementos
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const forgotTab = document.getElementById('forgot-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotForm = document.getElementById('forgot-form');
const forgotPasswordBtn = document.getElementById('forgot-password-btn');

// Cambiar entre pestañas
loginTab.addEventListener('click', () => {
    showForm('login');
});

registerTab.addEventListener('click', () => {
    showForm('register');
});

forgotTab.addEventListener('click', () => {
    showForm('forgot');
});

forgotPasswordBtn.addEventListener('click', () => {
    showForm('forgot');
});

function showForm(form) {
    if (form === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        forgotForm.classList.remove('active');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        forgotTab.classList.remove('active');
    } else if (form === 'register') {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        forgotForm.classList.remove('active');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        forgotTab.classList.remove('active');
    } else if (form === 'forgot') {
        forgotForm.classList.add('active');
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
        forgotTab.classList.add('active');
        loginTab.classList.remove('active');
        registerTab.classList.remove('active');
    }
}


// Botones
const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn');

// Función de inicio de sesión
loginButton.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el envío del formulario
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Cargar archivo JSON de usuarios
    fetch('usuarios.json')
        .then(response => response.json())
        .then(users => {
            const userFound = users.find(user => user.email === email && user.password === password);

            if (userFound) {
                // Guardar datos en LocalStorage
                localStorage.setItem('usuarioActual', JSON.stringify(userFound));
                alert('Inicio de sesión exitoso');
                window.location.href = 'perfil.html'; // Redirigir al perfil
            } else {
                alert('Correo o contraseña incorrectos');
            }
        })
        .catch(err => {
            console.error('Error al cargar usuarios:', err);
        });
});

// Función de registro
registerButton.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el envío del formulario
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Aquí definimos el tipo de suscripción, por defecto "Gratis"
    const subscriptionType = "Gratis"; 

    const newUser = {
        name: name,
        email: email,
        password: password,
        subscription: subscriptionType // Nueva propiedad
    };

    // Cargar usuarios existentes del LocalStorage
    let registeredUsers = JSON.parse(localStorage.getItem('UsuariosRegistrados')) || [];

    // Verificar si el correo ya está registrado
    const emailExists = registeredUsers.some(user => user.email === email);

    if (emailExists) {
        alert('El correo electrónico ya está registrado');
    } else {
        // Agregar el nuevo usuario al array y guardar en LocalStorage
        registeredUsers.push(newUser);
        localStorage.setItem('UsuariosRegistrados', JSON.stringify(registeredUsers));

        alert('Registro exitoso');
    }
});
