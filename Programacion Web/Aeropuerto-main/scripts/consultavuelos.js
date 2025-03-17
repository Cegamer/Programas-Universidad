document.addEventListener("DOMContentLoaded", () => {
    const idUsuario = localStorage.getItem("idUsuario");

    if (!idUsuario) {
        // Si no hay idUsuario, redirigir a la página de inicio de sesión
        window.location.href = "login.html";
    } else {
        // Cargar información del usuario
        obtenerInformacionUsuario(idUsuario);
        // Cargar ciudades
        cargarCiudades();
        // Cargar todos los vuelos
        cargarVuelos();
        
        // Manejar el botón de búsqueda
        document.getElementById("btn-buscar").addEventListener("click", filtrarVuelos);
    }
});

// Función para obtener la información del usuario
function obtenerInformacionUsuario(id) {
    fetch(apiUrl + "Usuarios/"+id)
        .then(response => response.json())
        .then(data => {
            document.getElementById("nombre-usuario").textContent = data.nombre;
            document.getElementById("correo-usuario").textContent = data.correo;
        })
        .catch(error => console.error("Error al obtener la información del usuario:", error));
}

// Mapa para almacenar nombres de ciudades por ID
let ciudadMap = {};

// Función para cargar ciudades en los selectores
function cargarCiudades() {
    fetch(apiUrl + "Ciudades")
        .then(response => response.json())
        .then(ciudades => {
            const origenSelect = document.getElementById("selector-origen");
            const destinoSelect = document.getElementById("selector-destino");

            ciudades.forEach(ciudad => {
                const optionOrigen = document.createElement("option");
                optionOrigen.value = ciudad.idCiudad;
                optionOrigen.textContent = ciudad.nombreCiudad;
                origenSelect.appendChild(optionOrigen);

                const optionDestino = document.createElement("option");
                optionDestino.value = ciudad.idCiudad;
                optionDestino.textContent = ciudad.nombreCiudad;
                destinoSelect.appendChild(optionDestino);

                // Guardar el nombre de la ciudad en el mapa
                ciudadMap[ciudad.idCiudad] = ciudad.nombreCiudad;
            });
        })
        .catch(error => console.error("Error al cargar las ciudades:", error));
}

// Función para cargar todos los vuelos
function cargarVuelos() {
    fetch(apiUrl + "Vuelos")
        .then(response => response.json())
        .then(vuelos => {
            mostrarVuelos(vuelos);
        })
        .catch(error => console.error("Error al cargar los vuelos:", error));
}

// Función para mostrar vuelos en tarjetas
function mostrarVuelos(vuelos) {
    const vuelosContainer = document.getElementById("vuelos-list");
    vuelosContainer.innerHTML = ""; // Limpiar contenido anterior

    vuelos.forEach(vuelo => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Array de imágenes aleatorias (puedes agregar más imágenes)
        const imagenes = [
            "../resources/ciudad1.jpeg",
            "../resources/ciudad2.jpeg",
            "../resources/ciudad3.jpeg",


        ];
        const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

        // Obtener nombres de ciudad
        const nombreOrigen = ciudadMap[vuelo.origen];
        const nombreDestino = ciudadMap[vuelo.destino];

        card.innerHTML = `
            
            <img src="${imagenAleatoria}"  alt="Vuelo">
            <h3>${nombreOrigen} a ${nombreDestino}</h3>
            <p><strong>Fecha de Salida:</strong> ${new Date(vuelo.fechaSalida).toLocaleDateString()}</p>
            <p><strong>Hora de Salida:</strong> ${vuelo.horaSalida}</p>
            <p><strong>Hora de Llegada:</strong> ${vuelo.horaLlegada}</p>
            <button class="btn-comprar" data-id="${vuelo.idVuelos}">Comprar Vuelo</button>
        `;

        // Agregar evento al botón de comprar
        card.querySelector(".btn-comprar").addEventListener("click", () => {
            const vueloId = vuelo.idVuelos;
            window.location.href = `comprarvuelo.html?id=${vueloId}`; // Redirigir a la página de compra
        });

        vuelosContainer.appendChild(card);
    });
}
// Función para filtrar vuelos
function filtrarVuelos() {
    const origenId = document.getElementById("selector-origen").value;
    const destinoId = document.getElementById("selector-destino").value;
    const fechaSalida = document.getElementById("fecha-salida").value; // Obtener fecha de salida

    fetch(apiUrl + "Vuelos")
        .then(response => response.json())
        .then(vuelos => {
            const vuelosFiltrados = vuelos.filter(vuelo => {
                // Comprobar que los valores de origen y destino coincidan
                const coincideOrigen = vuelo.origen === origenId;
                const coincideDestino = vuelo.destino === destinoId;
                
                // Comprobar que la fecha de salida coincida si se seleccionó una fecha
                const coincideFecha = !fechaSalida || new Date(vuelo.fechaSalida).toISOString().split('T')[0] === fechaSalida;

                return coincideOrigen && coincideDestino && coincideFecha; // Filtrar por origen, destino y fecha
            });
            mostrarVuelos(vuelosFiltrados);
        })
        .catch(error => console.error("Error al filtrar los vuelos:", error));
}
