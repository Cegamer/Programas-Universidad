
// Cargar estacionamientos disponibles
fetch(apiUrl + "Estacionamiento")
    .then(response => response.json())
    .then(estacionamientos => {
        const selector = document.getElementById("estacionamiento-selector");
        estacionamientos.forEach(estacionamiento => {
            const option = document.createElement("option");
            option.value = estacionamiento.idEstacionamiento;
            option.textContent = `${estacionamiento.nombreEstacionamiento} (Disponibles: ${estacionamiento.disponibilidadTotal})`;
            selector.appendChild(option);
        });
    })
    .catch(error => console.error("Error al cargar estacionamientos:", error));

// Botón de reserva
document.getElementById("btn-reservar").addEventListener("click", function() {
    const idUsuario = localStorage.getItem("idUsuario");
    const idEstacionamiento = document.getElementById("estacionamiento-selector").value;
    const horaEntrada = document.getElementById("hora-entrada").value;
    const horaSalida = document.getElementById("hora-salida").value;
    const fecha = document.getElementById("fecha").value;

    const reserva = {
        idReservasEstacionamiento: 0, // Asignar 0 o manejarlo según la lógica del API
        idUsuario: idUsuario,
        idEstacionamiento: idEstacionamiento,
        horaEntrada: horaEntrada,
        horaSalida: horaSalida,
        fecha: `${fecha}T00:00:00`
    };

    // Enviar la reserva al API
    fetch(apiUrl + "ReservasEstacionamiento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reserva)
    })
    .then(response => {
        if (response.ok) {
            alert("Reserva realizada con éxito!");
            window.location.href = "perfil.html"; // Descomentar si deseas redirigir
        } else {
            alert("Error al realizar la reserva.");
        }
    })
    .catch(error => console.error("Error al enviar la reserva:", error));
});
