using AplicacionEficiencia.Dal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Windows;

namespace AplicacionEficiencia
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            var facade = new DatabaseFacade(new ConexionContext());
            facade.EnsureCreated();
        }
    }
}
