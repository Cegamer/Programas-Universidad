function calcularTotalActivos() {
  return activos.reduce((total, activo) => total + activo.valor, 0);
}

function calcularTotalPasivos() {
  return pasivos.reduce((total, pasivo) => total + pasivo.valor, 0);
}

function calcularBalanceGeneral() {
  const totalActivos = calcularTotalActivos();
  const totalPasivos = calcularTotalPasivos();
  const patrimonioNeto = totalActivos - totalPasivos;

  return {
    totalActivos: totalActivos,
    totalPasivos: totalPasivos,
    patrimonioNeto: patrimonioNeto,
  };
}

let myPieChart;

function actualizarGraficoPastel() {
  let totalActivos = calcularTotalActivos();
  let totalPasivos = calcularTotalPasivos();
  var ctx = document.getElementById("myPieChart").getContext("2d");
  const balanceGeneral = calcularBalanceGeneral();
  document.getElementById("balanceGeneralTexto").innerHTML =
    "$" + balanceGeneral.patrimonioNeto;

  if (myPieChart) {
    myPieChart.destroy();
  }

  myPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Activos", "Pasivos"],
      datasets: [
        {
          label: "Distribución de Activos y Pasivos",
          data: [totalActivos, totalPasivos],
          backgroundColor: ["#4caf50", "#3c4b64"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}

function actualizarTabla(group) {
  const tableBody = document.getElementById(`tabla-${group}`);
  tableBody.innerHTML = "";
  const items = getGroupArray(group);
  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.referencia}</td>
      <td>${item.valor}$</td>
      <td>${item.fecha}</td>
      <td><button class="boton-accion" onclick="editarItem('${group}', ${index})">Editar</button></td>
      <td><button class="boton-accion" onclick="eliminarItem('${group}', ${index})">Eliminar</button></td>
    `;
    tableBody.appendChild(row);
  });
  actualizarGraficoPastel();
  actualizarGraficoLineas();
  actualizarGraficoBarras();
}

actualizarTabla("activos");
actualizarTabla("pasivos");
actualizarTabla("ingresos");
actualizarTabla("egresos");
