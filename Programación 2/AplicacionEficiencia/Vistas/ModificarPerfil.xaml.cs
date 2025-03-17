using AplicacionEficiencia.Controladores;
using AplicacionEficiencia.Modelos;
using System.Windows.Controls;

namespace AplicacionEficiencia.Vistas
{
    /// <summary>
    /// Lógica de interacción para ModificarPerfil.xaml
    /// </summary>


    public partial class ModificarPerfil : Page
    {
        public ModificarPerfil(Perfil perfil)
        {
            InitializeComponent();
            nombre_perfil.Text = perfil.nombre;
            ListaAplicacionesModificarPerfil LAMP = new ListaAplicacionesModificarPerfil(this, perfil);
        }

        private void btn_guardar_Click(object sender, System.Windows.RoutedEventArgs e)
        {

        }
    }
}
