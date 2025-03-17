document.addEventListener("DOMContentLoaded", async () => {
  const bookId = parseInt(new URLSearchParams(window.location.search).get("id"));

  const cartItems = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Elementos de detalles del libro
  const bookCover = document.getElementById("book-cover");
  const bookTitle = document.getElementById("book-title");
  const bookAuthor = document.getElementById("book-author");
  const bookCategory = document.getElementById("book-category");
  const bookPrice = document.getElementById("book-price");
  const bookDate = document.getElementById("book-date");
  const authorPhoto = document.getElementById("author-photo");
  const authorDescription = document.getElementById("author-description");
  const addToCartBtn = document.getElementById("add-to-cart");

  const reviewsList = document.getElementById("reviews-list");
  const reviewText = document.getElementById("review-text");
  const submitReviewBtn = document.getElementById("submit-review");

  let books = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Cargar idUsuario desde localStorage
  const userId = JSON.parse(localStorage.getItem("usuarioActual"))?.idUsuario || 1; // Por defecto, si no está, usar un idUsuario de ejemplo

  // Función para cargar un libro por ID
  const fetchBookById = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/libros/${id}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Error al obtener el libro");
      }
    } catch (error) {
      console.error(`Error al cargar el libro con ID ${id}:`, error);
      return null;
    }
  };

  // Función para cargar reseñas del libro
  const fetchReviews = async (bookId) => {
    try {
      const response = await fetch(`${apiUrl}/api/Libros/resenas/${bookId}`);
      if (response.ok) {
        const reviews = await response.json();
        renderReviews(reviews);
      } else {
        throw new Error("Error al obtener las reseñas");
      }
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    }
  };

  // Función para renderizar las reseñas
  const renderReviews = (reviews) => {
    reviewsList.innerHTML = "";
    reviews.forEach(review => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review");
      reviewElement.innerHTML = `
        <p><strong>Reseña:</strong> ${review.textoResena}</p>
        <p><small>Fecha: ${new Date(review.fecha).toLocaleDateString()}</small></p>
      `;
      reviewsList.appendChild(reviewElement);
    });
  };

  // Función para agregar una nueva reseña
  const submitReview = async () => {
    const reviewTextValue = reviewText.value.trim();
    if (reviewTextValue) {
      const newReview = {
        idResena: 0,
        idLibro: bookId,
        textoResena: reviewTextValue,
        idUsuario: userId, // Usar el idUsuario cargado desde localStorage
        fecha: new Date().toISOString(),
      };

      console.log(JSON.stringify(newReview));
      try {
        const response = await fetch(`${apiUrl}/api/Libros/resenas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        });

        if (response.ok) {
          reviewText.value = ""; // Limpiar el campo de reseña
          fetchReviews(bookId); // Recargar las reseñas
        } else {
          alert("Error al enviar la reseña.");
        }
      } catch (error) {
        console.error("Error al enviar la reseña:", error);
      }
    }
  };

  // Cargar detalles del libro y las reseñas
  const loadBookDetails = async (id) => {
    const book = await fetchBookById(id);
    if (book) {
      bookCover.src = `../resources/images/${book.portada}`;
      bookTitle.textContent = book.titulo;
      bookAuthor.textContent = book.nombreAutor;
      bookCategory.textContent = book.nombreCategoria;
      bookPrice.textContent = book.precio;
      bookDate.textContent = new Date(book.fechaPublicacion).toLocaleDateString();
      authorPhoto.src = `../resources/images/${book.fotoAutor}`;
      authorDescription.textContent = book.descripcionAutor;
      document.getElementById("book-synopsis").textContent = book.sinopsis;

      books.push(book);
    }
  };

  // Cargar los libros del carrito
  const loadCartBooks = async () => {
    for (const id of cart) {
      if (!books.find((b) => b.idLibro === id)) {
        const book = await fetchBookById(id);
        if (book) books.push(book);
      }
    }
  };

  // Actualizar el carrito en la interfaz
  const updateCart = () => {
    cartItems.innerHTML = "";
    cart.forEach((bookId) => {
      const book = books.find((b) => b.idLibro === bookId);
      if (book) {
        const li = document.createElement("li");
        li.textContent = `${book.titulo} - $${book.precio}`;
        cartItems.appendChild(li);
      }
    });
  };

  // Agregar el libro actual al carrito
  addToCartBtn.addEventListener("click", () => {
    if (!cart.includes(bookId)) {
      cart.push(bookId);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    }
  });

  // Enviar reseña
  submitReviewBtn.addEventListener("click", submitReview);

  // Inicializar la página
  await loadBookDetails(bookId);
  await loadCartBooks();
  updateCart();
  fetchReviews(bookId); // Cargar reseñas al iniciar
});
