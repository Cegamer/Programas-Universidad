// Variables globales
let gamesArray = [];
let filteredGames = [];

// Cargar el archivo JSON y renderizar los productos
document.addEventListener('DOMContentLoaded', () => {
    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            gamesArray = data;
            filteredGames = data; // Inicialmente mostrar todos los juegos
            displayGames(filteredGames);
        });
});

// Filtrar productos según el tipo (juegos, complementos, bundles)
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');
        filterGames(filter);
    });
});

function filterGames(filter) {
    if (filter === 'all') {
        filteredGames = gamesArray; // Mostrar todos los juegos
    } else {
        filteredGames = gamesArray.filter(game => game.category === filter);
    }
    displayGames(filteredGames);
}
// Mostrar los productos filtrados en la página
function displayGames(games) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Limpiar la lista de productos

    games.forEach(game => {
        const gameCard = `
            <div class="col-md-4 product-item ${game.category}">
                <div class="card h-100">
                    <img src="/assets/${game.image}" class="card-img-top" alt="${game.title}">
                    <div class="card-body d-flex flex-column justify-content-between ">
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text">${game.description}</p>
                        <button class="btn btn-success buy-btn" data-id="${game.id}">Comprar</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += gameCard;
    });

    // Agregar evento a los botones de compra
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-id');
            // Almacenar el ID del juego en el LocalStorage
            localStorage.setItem('selectedGameId', gameId);
            // Redirigir a la página de compra
            window.location.href = 'compra.html';
        });
    });
}
