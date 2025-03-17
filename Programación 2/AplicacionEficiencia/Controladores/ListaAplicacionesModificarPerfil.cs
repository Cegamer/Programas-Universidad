using AplicacionEficiencia.Dal;
using AplicacionEficiencia.Modelos;
using AplicacionEficiencia.Vistas;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace AplicacionEficiencia.Controladores
{
    public class ListaAplicacionesModificarPerfil
    {
        public ModificarPerfil view;
        public Perfil perfil { get; private set; }
        public List<Programa> ProgramasBloqueados { get; private set; }
        public List<Programa> ProgramasAutostart { get; private set; }

        public ListaAplicacionesModificarPerfil(ModificarPerfil view, Perfil perfil)
        {
            this.perfil = perfil;
            this.view = view;
            this.view.btn_agregarapp.Click += Btn_agregarapp_Click;
            this.view.btn_guardar.Click += Btn_guardar_Click;
            this.ProgramasAutostart = new List<Programa>();
            this.ProgramasBloqueados = new List<Programa>();
            this.ProgramasAutostart.AddRange(perfil.programasAEjecutar);
            this.ProgramasBloqueados.AddRange(perfil.programasBloqueados);
            ActualizarListas();
            mostrarListaAplicaciones();
        }

        private void ActualizarListas()
        {
            foreach (var p in ProgramasAutostart)
            {
                var pItem = new ProgramaItem(p, view, this);
                view.list_app_ejecutar.Items.Add(pItem);
            }

            foreach (var p in ProgramasBloqueados)
            {
                var pItem = new ProgramaItem(p, view, this);
                view.list_applicaciones_bloqueadas.Items.Add(pItem);
            }
        }

        private void Btn_agregarapp_Click(object sender, RoutedEventArgs e)
        {
            var startMenuPath = Environment.GetFolderPath(Environment.SpecialFolder.CommonStartMenu);
            var programsPath = Path.Combine(startMenuPath, "Programs");
            var fileChoser = new OpenFileDialog();
            fileChoser.DefaultExt = ".exe";
            fileChoser.Filter = "Executable Files (*.exe)|*.exe";
            fileChoser.InitialDirectory = programsPath;

            if (fileChoser.ShowDialog() ?? false)
            {
                string path = fileChoser.FileName;
                string name = System.IO.Path.GetFileName(path);
                var programa = new Programa(0, name, path);

                //LectorProgramas.Programas.Add(programa);
                LectorProgramas.GuardarPrograma(programa);
                ActualizarListaProgramas();
            }
        }

        private void ActualizarListaProgramas()
        {
            LectorProgramas.LeerProgrmasInstalados();
            view.panelAplicaciones.Children.Clear();
            mostrarListaAplicaciones();
        }

        private void Btn_guardar_Click(object sender, RoutedEventArgs e)
        {
            var perfiles = PerfilesController.perfiles;
            var nuevoNombre = this.view.txtNombrePerfil.Text;

            perfil.nombre = (!string.IsNullOrEmpty(nuevoNombre)) ? nuevoNombre : perfil.nombre;
            perfil.descripcion = this.view.txtDescripcion.Text;
            perfil.programasAEjecutar = ProgramasAutostart;
            perfil.programasBloqueados = ProgramasBloqueados;
            GuardarPerfilModificado(perfil);
            Regrasar();
        }

        private void Regrasar()
        {
            var view = new Perfiles();
            new PerfilesController(view);
            MainWindow.perfilesController.MostrarPerfiles();
            MainWindow.mainWindow.frame.Content = MainWindow.perfilesVista;
        }

        private bool AplicacionEnListas(Programa p) => (ProgramasAutostart.Contains(p) || ProgramasBloqueados.Contains(p));

        public void mostrarListaAplicaciones()
        {
            //Contenedor de la lista
            StackPanel stackPanelPrincipal = new StackPanel();
            int counter = 0;

            foreach (Programa programa in LectorProgramas.Programas)
            {
                var brush = (counter % 2 == 0) ? new SolidColorBrush(Color.FromRgb(28, 28, 30)) : Brushes.Transparent;

                Border border = new Border();
                StackPanel panel = new StackPanel();
                Grid grid = new Grid();
                Button btn_open = new Button();
                Button btn_autostart = new Button();
                Button btn_block = new Button();

                grid.Margin = new Thickness(5, 0, 10, 5);
                border.Background = brush;
                border.Margin = new Thickness(0, (counter == 0) ? 0 : 5, 0, 0);
                border.CornerRadius = new CornerRadius(4);
                border.BorderThickness = new Thickness(1);
                border.BorderBrush = new SolidColorBrush(Color.FromRgb(28, 28, 30));
                border.Child = grid;

                //
                ColumnDefinition image_container = new ColumnDefinition();
                ColumnDefinition space_5p = new ColumnDefinition();
                ColumnDefinition button_container = new ColumnDefinition();
                image_container.Width = new GridLength(25);
                space_5p.Width = new GridLength(5);
                button_container.Width = new GridLength(1, GridUnitType.Star);
                grid.ColumnDefinitions.Add(image_container);
                grid.ColumnDefinitions.Add(space_5p);
                grid.ColumnDefinitions.Add(button_container);

                RowDefinition imagey_container = new RowDefinition();
                RowDefinition name_container = new RowDefinition();
                imagey_container.Height = new GridLength(1, GridUnitType.Auto);
                name_container.Height = new GridLength(1, GridUnitType.Auto);
                grid.RowDefinitions.Add(name_container);
                grid.RowDefinitions.Add(imagey_container);

                Image icon = new Image();
                icon.Name = "image" + programa.id;
                icon.Height = 25;
                icon.Width = 25;
                icon.Source = programa.getIcon();
                grid.Children.Add(icon);
                Grid.SetColumn(icon, 0);
                Grid.SetRow(icon, 1);

                Label label = new Label();
                label.Content = programa.nombre;
                label.FontSize = 17;
                label.Foreground = new SolidColorBrush(Color.FromRgb(255, 255, 255));
                label.Width = 150;
                label.HorizontalAlignment = HorizontalAlignment.Left;
                grid.Children.Add(label);
                Grid.SetColumn(label, 0);
                Grid.SetRow(label, 0);
                Grid.SetColumnSpan(label, 3);

                btn_open.Content = "Play";
                //btn_open.Width = 25;
                btn_open.Height = 25;
                btn_open.FontSize = 13;
                btn_open.Background = Brushes.Transparent;
                btn_open.Foreground = new SolidColorBrush(Color.FromRgb(141, 141, 147));
                btn_open.AddHandler(Button.ClickEvent, new RoutedEventHandler((sender, e) =>
                {
                    string executablePath = programa.ruta;

                    try { Process.Start(executablePath); }
                    catch (Exception ex)
                    {
                        MessageBox.Show($"Error al ejecutar el programa: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }));
                panel.Children.Add(btn_open);

                btn_autostart.Content = "+";
                btn_autostart.Width = 25;
                btn_autostart.Height = 25;
                btn_autostart.Background = Brushes.Transparent;
                btn_autostart.FontSize = 13;
                btn_autostart.Foreground = new SolidColorBrush(Color.FromRgb(141, 141, 147));
                btn_autostart.AddHandler(Button.ClickEvent, new RoutedEventHandler((_, e) =>
                {
                    var item = new ProgramaItem(programa, view, this);
                    if (!AplicacionEnListas(programa)) item.AddProgramToAutostartList();
                }));
                panel.Children.Add(btn_autostart);

                btn_block.Content = "⨂";
                btn_block.Width = 25;
                btn_block.Height = 25;
                btn_block.FontSize = 13;
                btn_block.Background = Brushes.Transparent;
                btn_block.Foreground = new SolidColorBrush(Color.FromRgb(141, 141, 147));
                btn_block.AddHandler(Button.ClickEvent, new RoutedEventHandler((_, e) =>
                {
                    var item = new ProgramaItem(programa, view, this);
                    if (!AplicacionEnListas(programa)) item.AddProgramToBloquedList();
                }));
                panel.Children.Add(btn_block);
                panel.Orientation = Orientation.Horizontal;
                panel.HorizontalAlignment = HorizontalAlignment.Center;
                grid.Children.Add(panel);
                Grid.SetColumn(panel, 2);
                Grid.SetRow(panel, 1);

                stackPanelPrincipal.Children.Add(border);
                counter++;
            }

            view.panelAplicaciones.Children.Add(stackPanelPrincipal);
        }

       /*
       -
       - Transacciones con la database
       -
       */

        //Guardar el perfil en la base de datos.
        public static void GuardarPerfilModificado(Perfil perfil)
        {
            using (var conn = new ConexionContext())
            {
                var perfilAModificar = conn.Perfiles!.FirstOrDefault(p => p.id == perfil.id);

                perfilAModificar.nombre = perfil.nombre;
                perfilAModificar.descripcion = perfil.descripcion;

                var programasPerfilesToDelete = conn.ProgramasPerfiles!.Where(pp => pp.Id_Perfil == perfil.id);
                conn.ProgramasPerfiles!.RemoveRange(programasPerfilesToDelete);

                foreach (var programa in perfil.programasBloqueados)
                {
                    ProgramasPerfiles programasPerfiles = new ProgramasPerfiles(programa.id, perfil.id, false);
                    conn.ProgramasPerfiles!.Add(programasPerfiles);
                }
                foreach (var programa in perfil.programasAEjecutar) {
                    ProgramasPerfiles programasPerfiles = new ProgramasPerfiles(programa.id, perfil.id, true);
                    conn.ProgramasPerfiles!.Add(programasPerfiles);
                }

                conn.SaveChanges();
            }
        }
    }
}
