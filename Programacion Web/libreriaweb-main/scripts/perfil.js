document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("idUsuario");

    // Cargar los datos del usuario
    fetch(`${apiUrl}/api/usuarios/${userId}`)
        .then(response => response.json())
        .then(usuario => {
            document.getElementById("username").textContent = usuario.username;
            document.getElementById("correo").textContent = usuario.correo;

            // Cargar el historial de compras
            fetch(`${apiUrl}/api/usuarios/${userId}/compras`)
                .then(response => response.json())
                .then(compras => {
                    const historial = document.getElementById("compras-lista");
                    compras.forEach(compra => {
                        const tarjeta = document.createElement("li");
                        tarjeta.classList.add("compra-card");
                        tarjeta.innerHTML = `
                            <p><strong>ID Compra:</strong> ${compra.idcompra}</p>
                            <p><strong>Fecha:</strong> ${new Date(compra.fecha).toLocaleDateString()}</p>
                            <p><strong>Libros comprados:</strong></p>
                            <ul>
                                ${compra.libros.map(libro => `<li>${libro.titulo}</li>`).join("")}
                            </ul>
                        `;
                        historial.appendChild(tarjeta);
                    });
                })
                .catch(error => console.error("Error al cargar el historial de compras:", error));
        })
        .catch(error => console.error("Error al cargar los datos del usuario:", error));

    // Manejo de modales
    function showModal(modalId) {
        document.getElementById(modalId).classList.add("show");
    }

    function closeModal(modalId) {
        document.getElementById(modalId).classList.remove("show");
    }

    // Modificar Username
    document.getElementById("modificar-username").addEventListener("click", () => showModal("modal-username"));
    document.getElementById("guardar-username").addEventListener("click", () => {
        const newUsername = document.getElementById("nuevo-username").value;
        fetch(`${apiUrl}/api/usuarios/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername })
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("username").textContent = data.username;
                closeModal("modal-username");
            })
            .catch(error => console.error("Error al modificar el Username:", error));
    });

    // Modificar Contraseña
    document.getElementById("modificar-password").addEventListener("click", () => showModal("modal-password"));
    document.getElementById("guardar-password").addEventListener("click", () => {
        const newPassword = document.getElementById("nueva-password").value;
        fetch(`${apiUrl}/api/usuarios/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: newPassword })
        })
            .then(() => {
                alert("Contraseña actualizada.");
                closeModal("modal-password");
            })
            .catch(error => console.error("Error al modificar la contraseña:", error));
    });

    // Eliminar cuenta
    document.getElementById("eliminar-cuenta").addEventListener("click", () => showModal("modal-eliminar"));
    document.getElementById("confirmar-eliminar").addEventListener("click", () => {
        fetch(`${apiUrl}/api/usuarios/${userId}`, { method: "DELETE" })
            .then(() => {
                localStorage.removeItem("idUsuario");
                alert("Cuenta eliminada.");
                window.location.href = "/login.html";
            })
            .catch(error => console.error("Error al eliminar la cuenta:", error));
    });
    document.getElementById("cancelar-eliminar").addEventListener("click", () => closeModal("modal-eliminar"));
    document.querySelectorAll(".modal-content button:last-child").forEach(button => {
        button.addEventListener("click", () => closeModal(button.closest(".modal").id));
    });
});
