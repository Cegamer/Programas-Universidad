document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const vueloId = urlParams.get('id');

    if (vueloId) {
        cargarInformacionVuelo(vueloId);
        mostrarAsientos();
    }

    document.getElementById("pago-form").addEventListener("submit", realizarCompra);
});

// Variables globales para simular el número de asientos
let asientosBusiness = 8; // Total de asientos Business
let asientosPreferencial = 12; // Total de asientos Preferencial
let asientosEstandar = 20; // Total de asientos Estandar
let ocupadosBusiness = 3; // Asientos ocupados en Business
let ocupadosPreferencial = 5; // Asientos ocupados en Preferencial
let ocupadosEstandar = 10; // Asientos ocupados en Estandar

// Cargar información del vuelo
function cargarInformacionVuelo(id) {
    // Simular carga de información del vuelo desde la API
    document.getElementById("info-vuelo").innerHTML = `
        <p><strong>ID Vuelo:</strong> ${id}</p>
        <p><strong>Origen:</strong> Ciudad A</p>
        <p><strong>Destino:</strong> Ciudad B</p>
        <p><strong>Fecha de Salida:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Hora de Salida:</strong> 10:00 AM</p>
    `;
}

// Mostrar asientos disponibles
function mostrarAsientos() {
    const asientosContainer = document.getElementById("asientos-container");
    asientosContainer.innerHTML = "";

    // Crear filas de asientos
    for (let fila = 0; fila < 4; fila++) {
        const filaDiv = document.createElement("div");
        filaDiv.classList.add("fila-asientos");

        // Lado izquierdo (2 asientos)
        for (let i = 0; i < 2; i++) {
            const asiento = document.createElement("div");
            asiento.classList.add("asiento");

            // Comprobamos la categoría correspondiente
            if (fila < Math.ceil(ocupadosBusiness / 2) && ocupadosBusiness > 0 && i === 0) {
                asiento.classList.add("ocupado");
                asiento.innerText = "B"; // Asiento Business ocupado
                ocupadosBusiness--;
            } else if (fila < Math.ceil(ocupadosPreferencial / 2) && ocupadosPreferencial > 0 && i === 1) {
                asiento.classList.add("ocupado");
                asiento.innerText = "P"; // Asiento Preferencial ocupado
                ocupadosPreferencial--;
            } else if (fila < Math.ceil(ocupadosEstandar / 2) && ocupadosEstandar > 0) {
                asiento.classList.add("ocupado");
                asiento.innerText = "E"; // Asiento Estándar ocupado
                ocupadosEstandar--;
            } else {
                asiento.classList.add("disponible");
                asiento.innerText = fila < 2 ? "B" : (fila < 3 ? "P" : "E"); // Asiento disponible
                asiento.addEventListener("click", () => seleccionarAsiento(fila < 2 ? 1 : (fila < 3 ? 2 : 3)));
            }

            filaDiv.appendChild(asiento);
        }

        // Pasillo
        const pasilloDiv = document.createElement("div");
        pasilloDiv.classList.add("pasillo");
        filaDiv.appendChild(pasilloDiv);

        // Lado derecho (2 asientos)
        for (let i = 0; i < 2; i++) {
            const asiento = document.createElement("div");
            asiento.classList.add("asiento");

            // Comprobamos la categoría correspondiente
            if (fila < Math.ceil(ocupadosBusiness / 2) && ocupadosBusiness > 0 && i === 0) {
                asiento.classList.add("ocupado");
                asiento.innerText = "B"; // Asiento Business ocupado
                ocupadosBusiness--;
            } else if (fila < Math.ceil(ocupadosPreferencial / 2) && ocupadosPreferencial > 0 && i === 1) {
                asiento.classList.add("ocupado");
                asiento.innerText = "P"; // Asiento Preferencial ocupado
                ocupadosPreferencial--;
            } else if (fila < Math.ceil(ocupadosEstandar / 2) && ocupadosEstandar > 0) {
                asiento.classList.add("ocupado");
                asiento.innerText = "E"; // Asiento Estándar ocupado
                ocupadosEstandar--;
            } else {
                asiento.classList.add("disponible");
                asiento.innerText = fila < 2 ? "B" : (fila < 3 ? "P" : "E"); // Asiento disponible
                asiento.addEventListener("click", () => seleccionarAsiento(fila < 2 ? 1 : (fila < 3 ? 2 : 3)));
            }

            filaDiv.appendChild(asiento);
        }

        asientosContainer.appendChild(filaDiv);
    }
}

// Función para seleccionar un asiento
function seleccionarAsiento(tipoAsiento) {
    document.getElementById("formulario-pago").style.display = "block";
    // Guardar tipo de asiento seleccionado
    window.tipoAsientoSeleccionado = tipoAsiento;
}

// Realizar la compra
function realizarCompra(event) {
    event.preventDefault();

    const reservaData = {
        idReservasVuelo: 0, // Valor a definir por la API
        idVuelo: parseInt(new URLSearchParams(window.location.search).get('id')),
        idUsuario: localStorage.getItem("idUsuario"),
        tipoAsiento: window.tipoAsientoSeleccionado
    };

    console.log(reservaData)

    fetch(apiUrl + "ReservasVuelo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservaData)
    })
    .then(response => {
        if (response.ok) {
            alert("Reserva realizada con éxito");
            window.location.href = "perfil.html"; // Redirigir después de la compra
        } else {
            alert("Error al realizar la reserva");
        }
    })
    .catch(error => console.error("Error al realizar la compra:", error));
}
