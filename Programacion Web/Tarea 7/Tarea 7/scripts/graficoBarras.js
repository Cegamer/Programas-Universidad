var ctx = document.getElementById('myBarChart').getContext('2d');
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo'], // Meses en el eje X
    datasets: [{
      label: 'Resultados',
      data: [5000, 5000, 6500], // Resultados por mes en el eje Y
      backgroundColor: ['#4caf50', '#3c4b64', '#ff9800'], // Colores de las barras
    }]
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
        display: false // Opcional: No mostrar la leyenda
      },
    }
  }
});