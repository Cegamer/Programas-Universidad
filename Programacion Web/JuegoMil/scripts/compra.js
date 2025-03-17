document.addEventListener('DOMContentLoaded', () => {
    const gameId = localStorage.getItem('selectedGameId');
    if (!gameId) {
        alert('No se ha seleccionado ningún juego.');
        window.location.href = 'index.html'; // Redirigir si no hay un juego seleccionado
        return;
    }

    // Cargar el archivo JSON con los juegos
    fetch('games.json')
        .then(response => response.json())
        .then(games => {
            const selectedGame = games.find(game => game.id == gameId);
            if (!selectedGame) {
                alert('Juego no encontrado.');
                window.location.href = 'index.html';
                return;
            }

            // Mostrar los detalles del juego seleccionado
            const gameDetailsDiv = document.getElementById('game-details');
            gameDetailsDiv.innerHTML = `
                <h2>${selectedGame.title}</h2>
                <img src="/assets/${selectedGame.image}" alt="${selectedGame.title}">
                <p>${selectedGame.description}</p>
                <p><strong>Precio:</strong> $${selectedGame.price}</p>
            `;
        });
});

// Manejar la compra del juego
document.getElementById('comprar-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del botón
    const gameId = localStorage.getItem('selectedGameId');

    // Obtener datos del localStorage
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const email = usuarioActual.email; // Asumimos que 'email' está en 'usuarioActual'

    // Cargar datos de compras
    let compras = JSON.parse(localStorage.getItem('compras')) || {};

    // Si el usuario no tiene un registro en compras, inicializarlo
    if (!compras[email]) {
        compras[email] = [];
    }

    // Agregar el ID del juego a la lista de compras del usuario
    compras[email].push(parseInt(gameId));

    // Almacenar de nuevo en localStorage
    localStorage.setItem('compras', JSON.stringify(compras));

    // Redirigir al perfil
    window.location.href = 'perfil.html';
});


