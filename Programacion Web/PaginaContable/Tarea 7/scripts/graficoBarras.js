let myBarChart;

function obtenerMesesUnicos() {
  const mesesSet = new Set();

  [...activos, ...pasivos, ...ingresos, ...egresos].forEach(item => {
    const fecha = new Date(item.fecha);
    const mes = fecha.toLocaleString('default', { month: 'long' });
    mesesSet.add(mes);
  });

  return Array.from(mesesSet).sort((a, b) => new Date(`${a} 1, 2024`) - new Date(`${b} 1, 2024`));
}

function calcularResultadosMensuales() {
  const resultados = {};
  
  ingresos.forEach(item => {
    const mes = new Date(item.fecha).toLocaleString('default', { month: 'long' });
    resultados[mes] = (resultados[mes] || 0) + item.valor;
  });

  egresos.forEach(item => {
    const mes = new Date(item.fecha).toLocaleString('default', { month: 'long' });
    resultados[mes] = (resultados[mes] || 0) - item.valor;
  });

  return resultados;
}

function actualizarGraficoBarras() {
  var ctx = document.getElementById('myBarChart').getContext('2d');

  const meses = obtenerMesesUnicos();
  const resultadosMensuales = calcularResultadosMensuales();
  
  const datos = meses.map(mes => resultadosMensuales[mes] || 0);

  if (myBarChart) {
    myBarChart.destroy();
  }

  myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: meses,
      datasets: [{
        label: 'Resultados',
        data: datos,
        backgroundColor: '#4caf50',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        },
      }
    }
  });
}

actualizarGraficoBarras();
