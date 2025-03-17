document.addEventListener("DOMContentLoaded", () => {
    const subscribeButton = document.getElementById("subscribeButton");
    const subscriptionForm = document.getElementById("subscription-form");
    const receiptContainer = document.getElementById("receipt");
    const receiptDetails = document.getElementById("receiptDetails");

    subscriptionForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar que se recargue la página

        // Obtener los valores del formulario
        const subscriptionType = document.getElementById("subscriptionType").value;
        const cardNumber = document.getElementById("cardNumber").value;
        const expirationDate = document.getElementById("expirationDate").value;
        const cvv = document.getElementById("cvv").value;

        // Validar los detalles de pago (aquí puedes agregar validaciones más estrictas si lo deseas)
        if (!subscriptionType || !cardNumber || !expirationDate || !cvv) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Crear el recibo
        const subscriptionPlans = {
            basico: "$9.99/mes",
            premium: "$19.99/mes",
            ultimate: "$29.99/mes"
        };
        const subscriptionCost = subscriptionPlans[subscriptionType];
        const receiptText = `Plan: ${subscriptionType.charAt(0).toUpperCase() + subscriptionType.slice(1)}\nCosto: ${subscriptionCost}\nNúmero de Tarjeta: ${cardNumber}\nFecha de Expiración: ${expirationDate}\nCVV: ${cvv}`;
        
        // Mostrar el recibo
        receiptDetails.textContent = receiptText;
        receiptContainer.style.display = "block";

        // Actualizar datos del usuario en localStorage
        const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
        if (usuarioActual) {
            usuarioActual.subscription = subscriptionType.charAt(0).toUpperCase() + subscriptionType.slice(1);
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
        } else {
            console.error("No hay datos de usuario en localStorage.");
        }
    });
});
