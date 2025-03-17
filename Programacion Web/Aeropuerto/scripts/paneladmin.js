const idUsuario = localStorage.getItem("idUsuario");

if (!idUsuario) {
    // Si no hay idUsuario, redirigir a la página de inicio de sesión
    window.location.href = "login.html";
} else {
    verificarTipoUsuario(idUsuario);
}
document.getElementById("btn-home").addEventListener("click", function() {
    // Redirigir al index.html
    window.location.href = "index.html";
});

document.getElementById("btn-logout").addEventListener("click", function() {
    // Vaciar el localStorage y redirigir al index.html
    localStorage.clear();
    window.location.href = "index.html";
});


function verificarTipoUsuario(id) {
    fetch(apiUrl + "Usuarios/" + id)
        .then(response => response.json())
        .then(data => {
            if (data.idTipoUsuario !== 2) {
                // Redirigir si no es admin
                window.location.href = "index.html";
            } else {
                cargarDatos();
            }
        })
        .catch(error => console.error("Error al verificar tipo de usuario:", error));
}

function cargarDatos() {
    cargarReservas();
    cargarVuelos();
    cargarUsuarios();
}

function cargarReservas() {
    fetch(apiUrl + "ReservasVuelo")
        .then(response => response.json())
        .then(reservas => {
            const cuerpoTablaReservas = document.getElementById("cuerpo-tabla-reservas");
            reservas.forEach(reserva => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${reserva.idReservasVuelo}</td>
                    <td>${reserva.idVuelo}</td>
                    <td>${reserva.idUsuario}</td>
                    <td>${reserva.tipoAsiento}</td>
                `;
                cuerpoTablaReservas.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar reservas:", error));
}

function cargarVuelos() {
    fetch(apiUrl + "Vuelos")
        .then(response => response.json())
        .then(vuelos => {
            const cuerpoTablaVuelos = document.getElementById("cuerpo-tabla-vuelos");
            vuelos.forEach(vuelo => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${vuelo.idVuelos}</td>
                    <td>${vuelo.origen}</td>
                    <td>${vuelo.destino}</td>
                    <td>${vuelo.horaSalida}</td>
                    <td>${vuelo.horaLlegada}</td>
                `;
                cuerpoTablaVuelos.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar vuelos:", error));
}

function cargarUsuarios() {
    fetch(apiUrl + "Usuarios")
        .then(response => response.json())
        .then(usuarios => {
            const cuerpoTablaUsuarios = document.getElementById("cuerpo-tabla-usuarios");
            usuarios.forEach(usuario => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${usuario.idUsuarios}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.tipoUsuario}</td>
                `;
                cuerpoTablaUsuarios.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar usuarios:", error));
}
