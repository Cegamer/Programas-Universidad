var ctx = document.getElementById('myLineChart').getContext('2d');
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo'], // Meses en el eje X
    datasets: [
      {
        label: 'Activos',
        data: [10000, 12000, 15000], // Valores de Activos
        borderColor: '#4caf50', // Color de la línea de Activos
        fill: false
      },
      {
        label: 'Pasivos',
        data: [5000, 6000, 7000], // Valores de Pasivos
        borderColor: '#3c4b64', // Color de la línea de Pasivos
        fill: false
      },
      {
        label: 'Ingresos',
        data: [8000, 9000, 10000], // Valores de Ingresos
        borderColor: '#ff9800', // Color de la línea de Ingresos
        fill: false
      },
      {
        label: 'Egresos',
        data: [3000, 4000, 3500], // Valores de Egresos
        borderColor: '#f44336', // Color de la línea de Egresos
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true // Comienza desde 0 en el eje Y
      }
    },
    plugins: {
      legend: {
        position: 'top', // Mostrar la leyenda en la parte superior
      },
    }
  }
});