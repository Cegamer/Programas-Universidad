let activos = [
    { referencia: "Venta Audífonos", valor: 10000, fecha: "10/10/24" },
    { referencia: "Venta Laptops", valor: 15000, fecha: "10/15/24" },
    { referencia: "Venta Celulares", valor: 8000, fecha: "09/12/24" },
    { referencia: "Venta Tablets", valor: 20000, fecha: "08/18/24" }
];

let pasivos = [
    { referencia: "Deuda Banco", valor: 5000, fecha: "10/05/24" },
    { referencia: "Proveedores", valor: 2000, fecha: "10/06/24" },
    { referencia: "Préstamo Vehículo", valor: 7000, fecha: "09/11/24" },
    { referencia: "Deuda Créditos", valor: 12000, fecha: "08/20/24" }
];

let ingresos = [
    { referencia: "Ingreso Proyecto Web", valor: 12000, fecha: "10/02/24" },
    { referencia: "Ingreso Publicidad", valor: 5000, fecha: "09/01/24" },
    { referencia: "Ingreso Alquiler", valor: 7000, fecha: "08/05/24" }
];

let egresos = [
    { referencia: "Pago Nómina", valor: 8000, fecha: "10/15/24" },
    { referencia: "Pago Servicios", valor: 2000, fecha: "09/10/24" },
    { referencia: "Compra Material", valor: 4000, fecha: "08/25/24" }
];


  let isEditing = false;
  let editingIndex = null;
  let currentGroup = null;  
  
  const modal = document.getElementById("modalActivos");
  const modalTitle = document.getElementById("modal-title");
  const btnClose = document.querySelector(".close");
  const formActivos = document.getElementById("formActivos");
  const referenciaInput = document.getElementById("referencia");
  const valorInput = document.getElementById("valor");
  const fechaInput = document.getElementById("fecha");

  
  function formatearFecha(fecha) {
    const date = new Date(fecha);
    
    const mes = ("0" + (date.getMonth() + 1)).slice(-2); 
    const dia = ("0" + date.getDate()).slice(-2);
    const anio = date.getFullYear().toString().slice(-2); 
  
    return `${mes}/${dia}/${anio}`;
  }
  

  function abrirModal(group, index = null) {
    modal.style.display = "block";
    currentGroup = group;
  
    if (index !== null) {
      isEditing = true;
      editingIndex = index;
      modalTitle.textContent = `Editar ${capitalizeFirstLetter(group)}`;
      const item = getGroupArray(group)[index];
      referenciaInput.value = item.referencia;
      valorInput.value = item.valor;
      fechaInput.value = formatearFecha(item.fecha); // Formatear la fecha
    } else {
      isEditing = false;
      modalTitle.textContent = `Agregar Nuevo ${capitalizeFirstLetter(group)}`;
      formActivos.reset();
    }
  }
  
  
  btnClose.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  formActivos.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const nuevoItem = {
      referencia: referenciaInput.value,
      valor: parseFloat(valorInput.value),
      fecha: formatearFecha(fechaInput.value) // Formatear la fecha
    };
  
    if (isEditing) {
      getGroupArray(currentGroup)[editingIndex] = nuevoItem;
    } else {
      getGroupArray(currentGroup).push(nuevoItem);
    }
  
    actualizarTabla(currentGroup);
    modal.style.display = "none";
  });
  
  function editarItem(group, index) {
    abrirModal(group, index);
  }
  
  function eliminarItem(group, index) {
    getGroupArray(group).splice(index, 1);
    actualizarTabla(group);
  }
  
  function getGroupArray(group) {
    switch (group) {
      case 'activos': return activos;
      case 'pasivos': return pasivos;
      case 'ingresos': return ingresos;
      case 'egresos': return egresos;
    }
  }
  
 
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  