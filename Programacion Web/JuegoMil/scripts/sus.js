document.addEventListener("DOMContentLoaded", function () {
    const subscribeButton = document.getElementById('subscribeButton');


    subscribeButton.addEventListener('click', function () {
        window.location.href = 'comprasuscripcion.html';

    });

    // Agregar lógica para gestionar la suscripción y ver el historial de pagos si es necesario
    document.getElementById('manageSubscriptionButton').addEventListener('click', function () {
        window.location.href = 'perfil.html';

    });

    document.getElementById('paymentHistoryButton').addEventListener('click', function () {
        // Aquí puedes redirigir a una página de historial de pagos
        window.location.href = 'perfil.html';
    });
});
