using AplicacionEficiencia.Modelos;
using System.Windows.Controls;

namespace AplicacionEficiencia.Vistas
{
    /// <summary>
    /// Lógica de interacción para SesionActual.xaml
    /// </summary>
    public partial class SesionActual : Page
    {
        public static SesionActual sesionActualVista;
        public static Sesion sesionActual;

        public SesionActual(Sesion sesion)
        {
            InitializeComponent();
            this.label_profile_name.Content = sesion.Perfil.nombre;
            this.label_profile_info.Content = sesion.Perfil.descripcion;
            sesionActualVista = this;
            sesion.IniciarMonitoreo();
            sesionActual = sesion;
        }

        private void button_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            sesionActual.Finalizar();
            MainWindow.mainWindow.frame.Content = MainWindow.perfilesVista;
        }

        private void button1_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            if (sesionActual.pausada)
            {
                sesionActual.Reanudar();
                button1.Content = "Pausar Sesion";

            }

            else
            {
                sesionActual.Pausar();
                button1.Content = "Continuar Sesion";

            }
        }
    }
}
