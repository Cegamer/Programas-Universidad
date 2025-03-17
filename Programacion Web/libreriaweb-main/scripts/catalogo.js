document.addEventListener("DOMContentLoaded", () => {
    const autorFilter = document.getElementById("autor-filter");
    const categoriaFilter = document.getElementById("categoria-filter");
    const fechaFilterMin = document.getElementById("fecha-filter-min");
    const fechaFilterMax = document.getElementById("fecha-filter-max");
    const precioFilter = document.getElementById("precio-filter");
    const precioValue = document.getElementById("precio-value");
    const booksList = document.getElementById("books-list");
    const cartItems = document.getElementById("cart-items");
  
    let books = [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Cargar categorías y autores
    const loadCategoriesAndAuthors = async () => {
      try {
        const [categoriesRes, authorsRes] = await Promise.all([
          fetch(apiUrl + "/api/Categorias"),
          fetch(apiUrl + "/api/Autores")
        ]);
  
        const categories = await categoriesRes.json();
        const authors = await authorsRes.json();
  
        // Poblar el filtro de categorías
        categories.forEach(category => {
          const option = document.createElement("option");
          option.value = category.idCategoria;
          option.textContent = category.nombreCategoria;
          categoriaFilter.appendChild(option);
        });
  
        // Poblar el filtro de autores
        authors.forEach(author => {
          const option = document.createElement("option");
          option.value = author.idAutor;
          option.textContent = author.nombreAutor;
          autorFilter.appendChild(option);
        });
      } catch (error) {
        console.error("Error al cargar categorías o autores:", error);
      }
    };
  
    // Cargar libros
    const loadBooks = async () => {
      try {
        const response = await fetch(apiUrl + "/api/Libros");
        books = await response.json();
        displayBooks(books);
        updateCart(); // Actualiza el carrito después de cargar los libros
      } catch (error) {
        console.error("Error al cargar los libros:", error);
      }
    };
  
    // Mostrar los libros en la página
    const displayBooks = (booksToDisplay) => {
      booksList.innerHTML = "";
      booksToDisplay.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-item");
        bookElement.innerHTML = `
          <div class="image-container"> 
            <img src="../resources/images/${book.portada}" alt="${book.titulo}">
          </div>
          <div class="info-container">
            <h4>${book.titulo}</h4>
            <p><strong>Autor:</strong> ${book.nombreAutor}</p>
            <p><strong>Categoría:</strong> ${book.nombreCategoria}</p>
            <p><strong>Precio:</strong> $${book.precio}</p>
            <button onclick="addToCart(${book.idLibro})">Agregar al carrito</button>
            <button class="details-button" onclick="viewDetails(${book.idLibro})">Ver detalles</button>
          </div>
        `;
        booksList.appendChild(bookElement);
      });
    };
  
    // Agregar al carrito
    window.addToCart = (bookId) => {
      if (!cart.includes(bookId)) {
        cart.push(bookId);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
      }
    };
  
    // Redirigir a la página de detalles
    window.viewDetails = (bookId) => {
      window.location.href = `detallesLibro.html?id=${bookId}`;
    };
  
    // Mostrar los elementos del carrito
    const updateCart = () => {
      cartItems.innerHTML = "";
  
      if (cart.length === 0) {
        cartItems.innerHTML = "<li>El carrito está vacío</li>";
        return;
      }
  
      cart.forEach(bookId => {
        const book = books.find(b => b.idLibro === bookId);
        if (book) {
          const cartItem = document.createElement("li");
          cartItem.textContent = `${book.titulo} - $${book.precio}`;
          cartItems.appendChild(cartItem);
        }
      });
    };
  
    // Aplicar filtros
    const applyFilters = () => {
      let filteredBooks = books;
  
      // Filtro por autor
      const autorValue = autorFilter.value;
      if (autorValue) {
        filteredBooks = filteredBooks.filter(book => book.idAutor == autorValue);
      }
  
      // Filtro por categoría
      const categoriaValue = categoriaFilter.value;
      if (categoriaValue) {
        filteredBooks = filteredBooks.filter(book => book.idCategoria == categoriaValue);
      }
  
      // Filtro por fecha
      const fechaMinValue = fechaFilterMin.value;
      const fechaMaxValue = fechaFilterMax.value;
      if (fechaMinValue) {
        filteredBooks = filteredBooks.filter(book => new Date(book.fechaPublicacion) >= new Date(fechaMinValue));
      }
      if (fechaMaxValue) {
        filteredBooks = filteredBooks.filter(book => new Date(book.fechaPublicacion) <= new Date(fechaMaxValue));
      }
  
      // Filtro por precio
      const precioValueInt = parseInt(precioFilter.value);
      if (precioValueInt) {
        filteredBooks = filteredBooks.filter(book => book.precio <= precioValueInt);
      }
  
      displayBooks(filteredBooks);
    };
  
    // Evento para actualizar el precio máximo
    precioFilter.addEventListener("input", (event) => {
      precioValue.textContent = event.target.value;
      applyFilters();
    });
  
    // Eventos para filtros
    autorFilter.addEventListener("change", applyFilters);
    categoriaFilter.addEventListener("change", applyFilters);
    fechaFilterMin.addEventListener("change", applyFilters);
    fechaFilterMax.addEventListener("change", applyFilters);
  
    loadCategoriesAndAuthors();
    loadBooks();
  });
  