const apiUrl = 'https://libreriaweb.somee.com';

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    // Verificar si el usuario es administrador
    let adminMenu = '';
    if (usuarioActual && usuarioActual.tipoUsuario === 1) {
        adminMenu = `<li><a href="admin-dashboard.html">Dashboard Administrador</a></li>`;
    }

    // Verificar si el usuario está iniciado o no
    let authButton = '';
    if (usuarioActual) {
        authButton = `
            <button id="logout-button" class="auth-button">Cerrar Sesión</button>
        `;
    } else {
        authButton = `
            <a href="login.html" class="auth-button">Iniciar Sesión</a>
        `;
    }

    // Contenido del header
    header.innerHTML = `
        <div class="logo">
          <a href="index.html">
            <img src="../resources/images/logo.webp" alt="Logo de la tienda" />
          </a>
        </div>
        <nav>
          <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a href="catalogo.html">Tienda</a></li>
            <li><a href="perfil.html">Mi Perfil</a></li>
            ${adminMenu} <!-- Se agrega el menú de administrador dinámicamente -->
            <li><a href="carrito.html">Carrito</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <div class="cart-icon">
            <a href="carrito.html">
              <img src="../resources/images/cart-icon.png" alt="Carrito de compras" />
              <span id="cart-count">0</span>
            </a>
          </div>
          ${authButton} <!-- Botón de autenticación dinámico -->
        </div>
    `;

    // Actualizar el número de artículos en el carrito
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;

    // Lógica para cerrar sesión
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("usuarioActual");
            window.location.href = "index.html";
        });
    }
});
