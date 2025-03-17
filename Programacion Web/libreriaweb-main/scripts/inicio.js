document.addEventListener('DOMContentLoaded', () => {
    //const userId = JSON.parse(localStorage.getItem('usuarioActual')).idUsuario;

    // Cargar todos los libros desde el catálogo
    fetch(`${apiUrl}/api/libros`)
        .then(response => response.json())
        .then(libros => {
            // Mostrar libros destacados y nuevas publicaciones
            mostrarLibrosAleatorios(libros, 'libros-destacados', 5);
            mostrarLibrosAleatorios(libros, 'nuevos-libros', 5);
            mostrarLibrosAleatorios(libros, 'libros-recomendados', 5);
        });

    /**
     * Función para mostrar libros aleatorios en una sección
     * @param {Array} libros - Lista de libros
     * @param {string} containerId - ID del contenedor donde se mostrarán los libros
     * @param {number} cantidad - Número de libros a mostrar
     */
    function mostrarLibrosAleatorios(libros, containerId, cantidad) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        const librosAleatorios = libros.sort(() => 0.5 - Math.random()).slice(0, cantidad);

        librosAleatorios.forEach(libro => {
            const card = crearTarjetaLibro(libro);
            container.appendChild(card);
        });
    }

    /**
     * Función para crear una tarjeta de libro
     * @param {Object} libro - Información del libro
     * @returns {HTMLElement} - Elemento DOM de la tarjeta
     */
    function crearTarjetaLibro(libro) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="../resources/images/${libro.portada}" alt="${libro.titulo}">
            <h3>${libro.titulo}</h3>
            <p>${libro.nombreAutor}</p>
            <p>$${libro.precio.toFixed(2)}</p>
        `;
        return card;
    }

    // Manejar búsqueda
    const formBusqueda = document.getElementById('form-busqueda');
    formBusqueda.addEventListener('submit', event => {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const categoria = document.getElementById('categoria').value;
        const precioMin = document.getElementById('precio-min').value;
        const precioMax = document.getElementById('precio-max').value;

        const query = new URLSearchParams({
            titulo,
            autor,
            categoria,
            precioMin,
            precioMax
        }).toString();

        fetch(`${apiUrl}/api/libros/buscar?${query}`)
            .then(response => response.json())
            .then(libros => mostrarLibros(libros, 'libros-destacados')); // Reutilizar sección de resultados
    });
});
