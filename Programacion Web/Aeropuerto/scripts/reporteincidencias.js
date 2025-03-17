document.addEventListener("DOMContentLoaded", () => {
    const idUsuario = localStorage.getItem("idUsuario");

    if (!idUsuario) {
        // Si no hay idUsuario, redirigir a la página de inicio de sesión
        window.location.href = "login.html";
    } else {
        // Cargar reportes anteriores
        cargarReportes(idUsuario);

        // Manejar el envío del formulario
        document.getElementById("form-reporte").addEventListener("submit", (e) => {
            e.preventDefault();
            enviarReporte(idUsuario);
        });
    }
});

// Función para cargar los reportes anteriores del usuario
function cargarReportes(idUsuario) {
    fetch(`${apiUrl}ReporteIncidencias/Usuario/${idUsuario}`)
        .then(response => response.json())
        .then(reportes => {
            const listaReportes = document.getElementById("lista-reportes");
            listaReportes.innerHTML=""
            reportes.forEach(reporte => {
                const li = document.createElement("li");
                li.textContent = `Reporte: ${reporte.comentario}`
                listaReportes.appendChild(li);
            });
        })
        .catch(error => console.error("Error al cargar los reportes:", error));
}

// Función para enviar un nuevo reporte
function enviarReporte(idUsuario) {
    const comentario = document.getElementById("comentario").value;

    const nuevoReporte = {
        idreporteIncidencias: 0,
        comentario: comentario,
        idUsuarioReporto: idUsuario,
    };

    console.log(nuevoReporte);

    fetch(apiUrl + "ReporteIncidencias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoReporte),
    })
    .then(response => {
        if (response.ok) {
            alert("Reporte enviado exitosamente.");
            document.getElementById("form-reporte").reset();
            cargarReportes(idUsuario); // Recargar reportes
        } else {
            alert("Error al enviar el reporte.");
        }
    })
    .catch(error => console.error("Error al enviar el reporte:", error));
}
