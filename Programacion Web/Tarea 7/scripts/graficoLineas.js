function agruparPorMes(data) {
  const agrupado = {};

  data.forEach(item => {
      const fecha = new Date(item.fecha);
      const mesAnio = `${fecha.getFullYear()}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}`; // Formato YYYY/MM

      if (!agrupado[mesAnio]) {
          agrupado[mesAnio] = 0;
      }
      agrupado[mesAnio] += item.valor;
  });

  return agrupado;
}

function generarDatosPorMes() {
  const activosPorMes = agruparPorMes(activos);
  const pasivosPorMes = agruparPorMes(pasivos);
  const ingresosPorMes = agruparPorMes(ingresos);
  const egresosPorMes = agruparPorMes(egresos);

  const meses = Object.keys({ ...activosPorMes, ...pasivosPorMes, ...ingresosPorMes, ...egresosPorMes })
      .sort((a, b) => new Date(a + '-01') - new Date(b + '-01')); // Ordenar por fecha

  const obtenerValores = (objeto, meses) => meses.map(mes => objeto[mes] || 0);

  return {
      meses: meses.map(mes => `${mes.split('/')[1]}/${mes.split('/')[0]}`), 
      activos: obtenerValores(activosPorMes, meses),
      pasivos: obtenerValores(pasivosPorMes, meses),
      ingresos: obtenerValores(ingresosPorMes, meses),
      egresos: obtenerValores(egresosPorMes, meses),
  };
}

function actualizarGraficoLineas() {
  const { meses, activos, pasivos, ingresos, egresos } = generarDatosPorMes();

  myLineChart.data.labels = meses;
  myLineChart.data.datasets[0].data = activos;
  myLineChart.data.datasets[1].data = pasivos;
  myLineChart.data.datasets[2].data = ingresos;
  myLineChart.data.datasets[3].data = egresos;

  myLineChart.update(); 
}

var ctx = document.getElementById('myLineChart').getContext('2d');
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: [], 
      datasets: [
          {
              label: 'Activos',
              data: [], 
              borderColor: '#4caf50',
              fill: false
          },
          {
              label: 'Pasivos',
              data: [], 
              borderColor: '#3c4b64',
              fill: false
          },
          {
              label: 'Ingresos',
              data: [], 
              borderColor: '#ff9800',
              fill: false
          },
          {
              label: 'Egresos',
              data: [], 
              borderColor: '#f44336',
              fill: false
          }
      ]
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
              position: 'top', 
          }
      }
  }
});

actualizarGraficoLineas();
