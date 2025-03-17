using AplicacionEficiencia.Core;
using AplicacionEficiencia.Modelos;
using AplicacionEficiencia.Vistas;
using System;
using System.Windows.Media.Imaging;

namespace AplicacionEficiencia.Controladores
{
    internal class ProgramaItem
    {
        private readonly ModificarPerfil view;
        private readonly Programa programa;
        private readonly ListaAplicacionesModificarPerfil controler;
        public int ID { get; private set; }
        public string Name { get; private set; }
        public string Path { get; private set; }
        public BitmapSource SourceIcon { get; private set; }
        public RelayCommand RemoveFromList { get; private set; }

        public ProgramaItem(Programa p, ModificarPerfil view, ListaAplicacionesModificarPerfil controler)
        {
            this.ID = p.id;
            this.Name = p.nombre;
            this.Path = p.ruta;
            this.SourceIcon = p.getIcon();
            this.view = view;
            this.RemoveFromList = new RelayCommand(param => OnClick(param));
            this.programa = p;
            this.controler = controler;
        }

        public void AddProgramToAutostartList()
        {
            view.list_app_ejecutar.Items.Add(this);
            controler.ProgramasAutostart.Add(programa);
        }

        public void AddProgramToBloquedList()
        {
            view.list_applicaciones_bloqueadas.Items.Add(this);
            controler.ProgramasBloqueados.Add(programa);
        }

        public void OnClick(object param)
        {
            int ID = Convert.ToInt32(param);

            //Codigo emulando una eliminacion de una BBDD
            view.list_app_ejecutar.Items.Remove(this);
            view.list_applicaciones_bloqueadas.Items.Remove(this);
            controler.ProgramasAutostart.Remove(programa);
            controler.ProgramasBloqueados.Remove(programa);
        }
    }
}
