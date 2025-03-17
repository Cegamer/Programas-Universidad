const idUsuario = localStorage.getItem("idUsuario");

if (!idUsuario) {
    // Si no hay idUsuario, redirigir a la página de inicio de sesión
    window.location.href = "login.html";
} else {
    // Obtener información del usuario
    obtenerInformacionUsuario(idUsuario);
    cargarReservas(idUsuario);
}

document.getElementById("btn-nueva-reserva").addEventListener("click", function() {
    window.location.href = "reservarestacionamiento.html";
});

document.getElementById("btn-comprar-vuelo").addEventListener("click", function() {
    window.location.href = "consultavuelos.html";
});

document.getElementById("btn-panel-admin").addEventListener("click", function() {
    window.location.href = "panelAdmin.html";
});

// Función para obtener la información del perfil del usuario
function obtenerInformacionUsuario(id) {
    fetch(apiUrl + "Usuarios/" + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById("nombre-usuario").textContent = data.nombre;
            document.getElementById("correo-usuario").textContent = data.correo;
            if(data.idTipoUsuario == 2){
                document.getElementById("btn-panel-admin").className = "btn btn-outline-primary";
            }
        })
        .catch(error => console.error("Error al obtener la información del usuario:", error));
}

// Función para cargar las reservas del usuario
function cargarReservas(id) {
    // Cargar reservas de estacionamiento
    fetch(apiUrl + "ReservasEstacionamiento/Usuario/" + id)
        .then(response => response.json())
        .then(reservas => {
            const listaEstacionamiento = document.getElementById("reservas-estacionamiento");
            reservas.forEach(reserva => {
                // Crear una tarjeta para cada reserva de estacionamiento
                const card = document.createElement("div");
                card.classList.add("card", "mb-3");

                // Formatear la fecha y horas
                const fecha = new Date(reserva.fecha).toLocaleDateString();
                const horaEntrada = reserva.horaEntrada.slice(0, 5); // Obtener solo horas y minutos
                const horaSalida = reserva.horaSalida.slice(0, 5);

                // Obtener el nombre del estacionamiento
                fetch(apiUrl + "Estacionamiento/" + reserva.idEstacionamiento)
                    .then(response => response.json())
                    .then(estacionamiento => {
                        // Contenido de la tarjeta
                        card.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title">Estacionamiento reservado: ${estacionamiento.nombreEstacionamiento}</h5>
                                <p class="card-text"><strong>Fecha:</strong> ${fecha}</p>
                                <p class="card-text"><strong>Hora de Entrada:</strong> ${horaEntrada}</p>
                                <p class="card-text"><strong>Hora de Salida:</strong> ${horaSalida}</p>
                                <button class="btn btn-danger" onclick="cancelarReserva(${reserva.idReservasEstacionamiento})">Cancelar Reserva</button>
                            </div>
                        `;

                        // Agregar la tarjeta a la lista de reservas de estacionamiento
                        listaEstacionamiento.appendChild(card);
                    })
                    .catch(error => console.error("Error al obtener el estacionamiento:", error));
            });
        })
        .catch(error => console.error("Error al cargar las reservas de estacionamiento:", error));

    // Cargar reservas de vuelos
    fetch(apiUrl + "ReservasVuelo/Usuario/" + id)
        .then(response => response.json())
        .then(reservas => {
            const listaVuelos = document.getElementById("reservas-vuelos");
            reservas.forEach(reserva => {
                // Crear una tarjeta para cada reserva de vuelo
                const card = document.createElement("div");
                card.classList.add("card", "mb-3");

                // Contenido de la tarjeta
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">Vuelo reservado</h5>
                        <p class="card-text"><strong>Origen:</strong> ${reserva.ciudadOrigen}</p>
                        <p class="card-text"><strong>Destino:</strong> ${reserva.ciudadDestino}</p>
                        <p class="card-text"><strong>Hora de Salida:</strong> ${reserva.horaSalida}</p>
                        <p class="card-text"><strong>Hora de Llegada:</strong> ${reserva.horaLlegada}</p>
                        <p class="card-text"><strong>Tipo de Asiento:</strong> ${reserva.tipoAsiento === 1 ? 'Business' : reserva.tipoAsiento === 2 ? 'Preferencial' : 'Estandar'}</p>
                    </div>
                `;

                // Agregar la tarjeta a la lista de reservas de vuelos
                listaVuelos.appendChild(card);
            });
        })
        .catch(error => console.error("Error al cargar las reservas de vuelos:", error));
}

// Función para cancelar una reserva
function cancelarReserva(idReserva) {
    const confirmacion = confirm("¿Estás seguro de que deseas cancelar esta reserva?");
    if (confirmacion) {
        fetch(apiUrl + "ReservasEstacionamiento/" + idReserva, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert("Reserva cancelada exitosamente.");
                // Recargar las reservas para actualizar la lista
                cargarReservas(idUsuario);
            } else {
                alert("Error al cancelar la reserva.");
            }
        })
        .catch(error => console.error("Error al cancelar la reserva:", error));
    }
}
