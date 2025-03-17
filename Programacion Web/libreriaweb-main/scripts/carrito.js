document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const virtualBtn = document.getElementById("virtual");
    const physicalBtn = document.getElementById("physical");
    const cardInfo = document.getElementById("card-info");
    const shippingAddress = document.getElementById("shipping-address");
    const paymentConfirmation = document.getElementById("payment-confirmation");
    const addressForm = document.getElementById("address-form");
    const cardForm = document.getElementById("card-form");
    const finishPurchaseBtn = document.getElementById("finish-purchase");
    const selectType = document.getElementById("select-type");
    const cartPhase = document.getElementById("cart-phase"); // Fase del carrito
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let books = [];  // Aquí se cargarán los libros
    let productType = "";  // Variable para almacenar el tipo de producto seleccionado (virtual o físico)
  
    // Cargar los libros del carrito
    const loadCartItems = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/libros`);
        books = await response.json();
        updateCart();
      } catch (error) {
        console.error("Error al cargar los libros del carrito:", error);
      }
    };
  
    // Actualizar los elementos del carrito con tarjetas
    const updateCart = () => {
      cartItems.innerHTML = "";
      cart.forEach((bookId) => {
        const book = books.find((b) => b.idLibro === bookId);
        if (book) {
          const bookCard = document.createElement("div");
          bookCard.classList.add("book-card");
  
          bookCard.innerHTML = `
            <div class="image-container">
              <img src="../resources/images/${book.portada}" alt="${book.titulo}">
            </div>
            <div class="info-container">
              <h4>${book.titulo}</h4>
              <p><strong>Autor:</strong> ${book.nombreAutor}</p>
              <p><strong>Categoría:</strong> ${book.nombreCategoria}</p>
              <p><strong>Precio:</strong> $${book.precio}</p>
              <button onclick="removeFromCart(${book.idLibro})">Eliminar</button>
            </div>
          `;
          cartItems.appendChild(bookCard);
        }
      });
    };
  
    // Fase de selección de tipo de producto
    virtualBtn.addEventListener("click", () => {
      productType = "virtual"; // Guardar el tipo de producto como virtual
      cartPhase.style.display = "none"; // Ocultar la fase del carrito
      selectType.style.display = "none"; // Ocultar la fase de selección
      cardInfo.style.display = "block"; // Mostrar fase de tarjeta
      shippingAddress.style.display = "none"; // Asegurarse de que la fase de dirección no se muestre
      paymentConfirmation.style.display = "none"; // Mostrar confirmación de pago
    });
  
    physicalBtn.addEventListener("click", () => {
      productType = "fisico"; // Guardar el tipo de producto como físico
      cartPhase.style.display = "none"; // Ocultar la fase del carrito
      selectType.style.display = "none"; // Ocultar la fase de selección
      cardInfo.style.display = "block"; // Mostrar fase de tarjeta
      shippingAddress.style.display = "none"; // Asegurarse de que la fase de dirección no se muestre
      paymentConfirmation.style.display = "none"; // No mostrar confirmación de pago en productos físicos
    });
  
    // Fase de ingresar datos de tarjeta
    cardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      cardInfo.style.display = "none";
      if (productType === "fisico") {
        shippingAddress.style.display = "block"; // Si es físico, mostrar dirección de envío
        paymentConfirmation.style.display = "none"; // Ocultar confirmación de pago
      } else {
        shippingAddress.style.display = "none"; // No mostrar dirección de envío si es virtual
        paymentConfirmation.style.display = "block"; // Mostrar confirmación de pago si es virtual
      }
    });
  
    // Fase de agregar dirección de envío
    addressForm.addEventListener("submit", (e) => {
      e.preventDefault();
      shippingAddress.style.display = "none";
      paymentConfirmation.style.display = "block"; // Mostrar la confirmación de pago al terminar con la dirección
    });
  
    // Finalizar compra
    finishPurchaseBtn.addEventListener("click", () => {
      alert("¡Gracias por tu compra!");
      localStorage.removeItem("cart");  // Limpiar el carrito
      window.location.href = "../index.html";  // Redirigir a la página de inicio
    });
  
    // Eliminar libro del carrito
    const removeFromCart = (bookId) => {
      cart = cart.filter((id) => id !== bookId);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    };
  
    loadCartItems();
  });
  