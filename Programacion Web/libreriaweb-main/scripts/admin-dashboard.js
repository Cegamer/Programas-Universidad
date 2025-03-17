// Cargar el URL de la API desde common.js

// Variables globales para manejar el modal
const modalLibro = document.getElementById("modal-libro");
const modalTitulo = document.getElementById("modal-titulo");
const formLibro = document.getElementById("form-libro");
const libroIdInput = document.getElementById("libro-id");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const categoriaInput = document.getElementById("categoria");
const precioInput = document.getElementById("precio");
const disponibleDigitalInput = document.getElementById("disponibleDigital");
const disponibleFisicoInput = document.getElementById("disponibleFisico");
const librocolInput = document.getElementById("librocol");
const portadaInput = document.getElementById("portada");
const fechaPublicacionInput = document.getElementById("fechaPublicacion");
const sinopsisInput = document.getElementById("sinopsis");

// Cargar lista de libros y llenar la tabla
async function cargarLibros() {
    try {
        const response = await fetch(`${apiUrl}/api/libros`);
        const libros = await response.json();

        const tablaLibros = document.getElementById("tabla-libros").getElementsByTagName("tbody")[0];
        tablaLibros.innerHTML = "";  // Limpiar la tabla antes de llenarla

        libros.forEach(libro => {
            const row = tablaLibros.insertRow();
            row.innerHTML = `
                <td>${libro.idLibro}</td>
                <td>${libro.titulo}</td>
                <td>${libro.nombreAutor}</td>
                <td>${libro.nombreCategoria}</td>
                <td>$${libro.precio}</td>
                <td>
                    <button class="accion-btn" onclick="editarLibro(${libro.idLibro})">Editar</button>
                    <button class="accion-btn" onclick="eliminarLibro(${libro.idLibro})">Eliminar</button>
                </td>
            `;
        });
    } catch (error) {
        console.error("Error al cargar los libros:", error);
    }
}

// Cargar categorías y autores
async function cargarCategoriasAutores() {
    try {
        const [categoriasRes, autoresRes] = await Promise.all([
            fetch(`${apiUrl}/api/categorias`),
            fetch(`${apiUrl}/api/autores`)
        ]);

        const categorias = await categoriasRes.json();
        const autores = await autoresRes.json();

        // Llenar los selectores de categorías y autores
        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.idCategoria;
            option.textContent = categoria.nombreCategoria;
            categoriaInput.appendChild(option);
        });

        autores.forEach(autor => {
            const option = document.createElement("option");
            option.value = autor.idAutor;
            option.textContent = autor.nombreAutor;
            autorInput.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar categorías o autores:", error);
    }
}

// Mostrar el modal para agregar un nuevo libro
document.getElementById("btn-agregar-libro").addEventListener("click", () => {
    modalTitulo.textContent = "Agregar Libro";
    formLibro.reset();
    libroIdInput.value = "";
    modalLibro.style.display = "flex";
});

// Función para editar un libro
async function editarLibro(id) {
    try {
        const response = await fetch(`${apiUrl}/api/libros/${id}`);
        const libro = await response.json();

        modalTitulo.textContent = "Editar Libro";
        libroIdInput.value = libro.idLibro;
        tituloInput.value = libro.titulo;
        autorInput.value = libro.idAutor;
        categoriaInput.value = libro.idCategoria;
        precioInput.value = libro.precio;
        disponibleDigitalInput.checked = libro.disponibleDigital;
        disponibleFisicoInput.checked = libro.disponibleFisico;
        portadaInput.value = libro.portada;
        fechaPublicacionInput.value = libro.fechaPublicacion;
        sinopsisInput.value = libro.sinopsis;

        modalLibro.style.display = "flex";
    } catch (error) {
        console.error("Error al obtener el libro:", error);
    }
}

// Función para guardar un libro (agregar o editar)
formLibro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const libro = {
        idlibro: libroIdInput.value ? parseInt(libroIdInput.value) : 0,
        titulo: tituloInput.value,
        idAutor: autorInput.value,
        categoria: categoriaInput.value,
        precio: parseFloat(precioInput.value),
        disponibleDigital: disponibleDigitalInput.checked ? 1 : 0,
        disponibleFisico: disponibleFisicoInput.checked ? 1 : 0,
        librocol: "",  // Siempre vacío
        portada: portadaInput.value,
        fechaPublicacion: fechaPublicacionInput.value,
        sinopsis: sinopsisInput.value
    };

    console.log( JSON.stringify(libro))

    try {
        const method = libro.idlibro ? "PUT" : "POST";
        const url = libro.idlibro ? `${apiUrl}/api/libros/${libro.idlibro}` : `${apiUrl}/api/libros`;

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(libro)
        });

        if (response.ok) {
            modalLibro.style.display = "none";
            cargarLibros();
        } else {
            console.error("Error al guardar el libro");
        }
    } catch (error) {
        console.error("Error al guardar el libro:", error);
    }
});

// Función para eliminar un libro
async function eliminarLibro(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
        try {
            const response = await fetch(`${apiUrl}/api/libros/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                cargarLibros();
            } else {
                console.error("Error al eliminar el libro");
            }
        } catch (error) {
            console.error("Error al eliminar el libro:", error);
        }
    }
}

// Cerrar el modal
document.getElementById("cerrar-modal").addEventListener("click", () => {
    modalLibro.style.display = "none";
});

// Función para generar informe en PDF
document.getElementById("btn-generar-pdf").addEventListener("click", async () => {
    try {
        const response = await fetch(`${apiUrl}/api/ventas/resumen`);
        const resumenVentas = await response.json();

        // Lógica para generar el informe en PDF con la librería jsPDF o cualquier otra
        console.log(resumenVentas);
        alert("Informe generado");
    } catch (error) {
        console.error("Error al generar el informe:", error);
    }
});

// Inicialización
cargarLibros();
cargarCategoriasAutores();


// Función para obtener estadísticas de ventas y libros más vendidos
async function obtenerEstadisticasDeVentas() {
    try {
        const response = await fetch(`${apiUrl}/api/compras`);
        const compras = await response.json();

        // Total de ventas
        const totalVentas = compras.reduce((total, compra) => {
            // Sumar el precio de todos los libros en la compra
            const totalCompra = compra.libros.reduce((sum, libro) => sum + libro.precio, 0);
            return total + totalCompra;
        }, 0);

        // Libros más vendidos
        const librosVendidos = {};

        compras.forEach(compra => {
            compra.libros.forEach(libro => {
                if (librosVendidos[libro.idlibro]) {
                    librosVendidos[libro.idlibro].cantidad++;
                } else {
                    librosVendidos[libro.idlibro] = { libro, cantidad: 1 };
                }
            });
        });

        // Ordenar los libros más vendidos
        const librosMasVendidos = Object.values(librosVendidos)
            .sort((a, b) => b.cantidad - a.cantidad)
            .slice(0, 5); // Mostrar solo los 5 más vendidos

        // Actualizar la vista con los datos obtenidos
        document.getElementById('total-ventas').textContent = `$${totalVentas.toFixed(2)}`;
        
        const librosMasVendidosList = document.getElementById('libros-mas-vendidos');
        librosMasVendidosList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

        librosMasVendidos.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.libro.titulo} - ${item.cantidad} ventas`;
            librosMasVendidosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener las estadísticas de ventas:', error);
    }
}

// Llamar a la función cuando se carga la página para mostrar las estadísticas
obtenerEstadisticasDeVentas();
// Función para generar el reporte PDF
async function generarReportePDF() {
    try {
        const response = await fetch(`${apiUrl}/api/compras`);
        const compras = await response.json();

        // Crear un nuevo documento PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título del reporte
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Reporte de Ventas Mensuales", 20, 20);

        // Fecha del reporte
        const fecha = new Date();
        const fechaReporte = `Fecha: ${fecha.toLocaleDateString()}`;
        doc.setFontSize(12);
        doc.text(fechaReporte, 20, 30);

        // Total de ventas
        const totalVentas = compras.reduce((total, compra) => {
            const totalCompra = compra.libros.reduce((sum, libro) => sum + libro.precio, 0);
            return total + totalCompra;
        }, 0);

        // Información de ventas
        let yPos = 40;
        doc.text(`Total Ventas: $${totalVentas.toFixed(2)}`, 20, yPos);
        yPos += 10;

        // Libros más vendidos
        const librosVendidos = {};

        compras.forEach(compra => {
            compra.libros.forEach(libro => {
                if (librosVendidos[libro.idlibro]) {
                    librosVendidos[libro.idlibro].cantidad++;
                } else {
                    librosVendidos[libro.idlibro] = { libro, cantidad: 1 };
                }
            });
        });

        // Ordenar los libros más vendidos
        const librosMasVendidos = Object.values(librosVendidos)
            .sort((a, b) => b.cantidad - a.cantidad)
            .slice(0, 5); // Mostrar solo los 5 más vendidos

        // Agregar los libros más vendidos al PDF
        doc.text("Libros Más Vendidos:", 20, yPos);
        yPos += 10;

        librosMasVendidos.forEach((item, index) => {
            const textoLibro = `${index + 1}. ${item.libro.titulo} - ${item.cantidad} ventas`;
            doc.text(textoLibro, 20, yPos);
            yPos += 10;
        });

        // Guardar el archivo PDF
        doc.save("reporte_ventas_mensuales.pdf");

    } catch (error) {
        console.error("Error al generar el reporte en PDF:", error);
    }
}

// Llamar a la función cuando el botón de generar informe sea presionado
document.getElementById("btn-generar-pdf").addEventListener("click", generarReportePDF);
