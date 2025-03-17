const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');
const editableFields = document.querySelectorAll('.editable');
const textFields = document.querySelectorAll('span');

// Cargar información del usuario desde localStorage
const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
const compras = JSON.parse(localStorage.getItem('compras'));

// Obtener el email del usuario actual
const usuarioActualEmail = usuarioActual.email; // Asumiendo que solo hay un usuario actual

// Cargar información del usuario
if (usuarioActual) {
    document.getElementById('nombre-text').textContent = usuarioActual.name;
    document.getElementById('email-text').textContent = usuarioActual.email;
    document.getElementById('suscripcion-text').textContent = usuarioActual.subscription;
}
async function cargarHistorialCompras() {
    try {
        // Cargar ownedGames desde el archivo JSON
        const ownedGamesResponse = await fetch('ownedGames.json');
        const ownedGames = await ownedGamesResponse.json();

        // Verificar si el usuario tiene compras
        const juegosCompradosIds = ownedGames[usuarioActualEmail] || [];

        // Cargar los juegos desde games.json
        const gamesResponse = await fetch('games.json');
        const juegosDisponibles = await gamesResponse.json();

        // Obtener los juegos comprados usando sus IDs
        const juegosComprados = juegosDisponibles.filter(juego => juegosCompradosIds.includes(juego.id));

        // Cargar las compras desde el localStorage
        const comprasStorage = JSON.parse(localStorage.getItem('compras')) || {};
        const comprasUsuario = comprasStorage[usuarioActualEmail] || [];

        const juegosCompradosDesdeStorage = juegosDisponibles.filter(juego => comprasUsuario.includes(juego.id));

        // Combinar el historial de compras
        const historialCompleto = [...juegosComprados, ...juegosCompradosDesdeStorage];


        // Actualizar la tabla con el historial de compras
        const tbody = document.querySelector('.purchase-history tbody');
        tbody.innerHTML = ''; // Limpiar el contenido actual

        // Agregar filas al historial de compras
        historialCompleto.forEach(juego => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date().toLocaleDateString()}</td>
                <td>${juego.title || juego.nombre}</td>
                <td>${juego.price || juego.precio}</td>
                <td>Completado</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar ownedGames:', error);
    }
}

// Función para obtener información del juego por ID desde el JSON de juegos
async function obtenerJuegoPorId(id) {
    try {
        const response = await fetch('./data/games.json'); // Asegúrate de que la ruta sea correcta
        const juegos = await response.json();
        const juegoEncontrado = juegos.find(juego => juego.id === id);
        
        // Retornar el juego encontrado o un valor por defecto
        return juegoEncontrado || { nombre: 'Juego desconocido', precio: 0 };
    } catch (error) {
        console.error('Error al cargar juegos:', error);
        return { nombre: 'Juego desconocido', precio: 0 };
    }
}

// Cargar el historial de compras al iniciar
cargarHistorialCompras();

// Manejo de eventos para editar y guardar información del perfil
editBtn.addEventListener('click', () => {
    textFields.forEach((text, index) => {
        text.style.display = 'none';
        editableFields[index].style.display = 'block';
    });

    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';
});

saveBtn.addEventListener('click', () => {
    editableFields.forEach((input, index) => {
        textFields[index].textContent = input.value;
        input.style.display = 'none';
        textFields[index].style.display = 'block';
    });

    saveBtn.style.display = 'none';
    editBtn.style.display = 'block';
});
