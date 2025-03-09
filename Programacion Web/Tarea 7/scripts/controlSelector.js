    // Función para cambiar entre gráficos activos e inactivos
    document.getElementById('grafico').addEventListener('change', function() {
      var selectedValue = this.value;
      
      // Referencias a los elementos de gráficos
      var resumenResultados = document.getElementById('ResumenResultados');
      var detalleResultados = document.getElementById('DetalleResultados');

      // Cambia las clases dependiendo del gráfico seleccionado
      if (selectedValue === 'ResumenResultados') {
        resumenResultados.classList.add('graficoActivo');
        resumenResultados.classList.remove('graficoInactivo');
        detalleResultados.classList.add('graficoInactivo');
        detalleResultados.classList.remove('graficoActivo');
      } else if (selectedValue === 'DetalleResultados') {
        detalleResultados.classList.add('graficoActivo');
        detalleResultados.classList.remove('graficoInactivo');
        resumenResultados.classList.add('graficoInactivo');
        resumenResultados.classList.remove('graficoActivo');
      }
    });
