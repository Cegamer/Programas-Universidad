using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AplicacionEficiencia.Vistas;

namespace AplicacionEficiencia.Controladores
{
    internal class ConfigControler
    {
        private Ajustes _view;

        public ConfigControler(Ajustes view) {
            this._view = view;
            this._view.rbtn_fsize_l.Click += Rbtn_fsize_l_Click;
            this._view.rbtn_fsize_m.Click += Rbtn_fsize_m_Click;
            this._view.rbtn_fsize_s.Click += Rbtn_fsize_s_Click;
        }

        private void Rbtn_fsize_s_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            PerfilesController.GridSize = 3;
        }

        private void Rbtn_fsize_m_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            PerfilesController.GridSize = 4;
        }

        private void Rbtn_fsize_l_Click(object sender, System.Windows.RoutedEventArgs e)
        {
            PerfilesController.GridSize = 5;
        }
    }
}
