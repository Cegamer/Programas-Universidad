var ctx = document.getElementById('myPieChart').getContext('2d');
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Activos', 'Pasivos'],
    datasets: [{
      label: 'Distribución de Activos y Pasivos',
      data: [10000, 5000], // Valores para Activos y Pasivos
      backgroundColor: ['#4caf50', '#3c4b64'], // Colores para cada segmento
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  }
});