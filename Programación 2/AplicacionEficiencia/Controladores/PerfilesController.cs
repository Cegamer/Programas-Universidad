using AplicacionEficiencia.Modelos;
using AplicacionEficiencia.Vistas;
using AplicacionEficiencia.Core;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using AplicacionEficiencia.Dal;
using System.Linq;
using System;

namespace AplicacionEficiencia.Controladores
{
    public class PerfilesController
    {
        public readonly static Dictionary<int, Perfil> perfiles = new Dictionary<int, Perfil>();
        public readonly Perfiles view;
        public readonly ExpandableGrid manager;
        public static int GridSize = 3;

        public PerfilesController(Perfiles view)
        {
            this.view = view;
            this.view.btn_new_profile.Click += Btn_new_profile_Click;   
            this.manager = new ExpandableGrid(ref view.profiles_grid, GridSize, 400, space: 8);
            llenarDiccionarioPerfiles();
            MostrarPerfiles();
        }

        private void llenarDiccionarioPerfiles()
        {
            perfiles.Clear();
            var perfilesLista = ObtenerPerfilesGuardados();
            foreach (var perfil in perfilesLista) { 
                perfiles.Add(perfil.id, perfil);
            }
            /*
            var perfil1 = new Perfil(1, "Trabajo", "Para trabajar");
            var perfil2 = new Perfil(2, "Juego", "Para jugar GTA");
            PerfilesController.perfiles.Add(perfil1.id, perfil1);
            PerfilesController.perfiles.Add(perfil2.id, perfil2);*/
        }

        private void Btn_new_profile_Click(object sender, RoutedEventArgs e)
        {
            int id = perfiles.Count + 1;
            Perfil nuevoPerfil = new Perfil(id, $"Nuevo Perfil {id}", "");
            perfiles.Add(id, nuevoPerfil);
            GuardarNuevoPerfil(nuevoPerfil);
            MostrarPerfiles();
        }

        public static void GuardarNuevoPerfil(Perfil perfil)
        {
            using (var conn = new ConexionContext())
            {
                conn.Perfiles!.Add(perfil);
                conn.SaveChanges();
            }
        }

        public void MostrarPerfiles() 
        {
            llenarDiccionarioPerfiles();
            manager.Reset();
            foreach (var perfil in PerfilesController.perfiles.Values)
            {
                var UICard = CreateProfileCard(perfil);
                manager.Insert(UICard);
            }
        }

        public UIElement CreateProfileCard(Perfil perfil)
        {
            var b = new Border() { 
                Background = new SolidColorBrush(Color.FromRgb(28, 28, 30)), 
                CornerRadius = new CornerRadius(12),
                Padding = new Thickness(5)
            };
            var grid = new Grid();
            var r1 = new RowDefinition() {Height = new GridLength(1, GridUnitType.Star)}; //Imagen
            var r2 = new RowDefinition() {Height = new GridLength(1, GridUnitType.Auto)}; //Nombre
            var r3 = new RowDefinition() {Height = new GridLength(1, GridUnitType.Auto) };//Descripcion
            var r4 = new RowDefinition() {Height = new GridLength(1, GridUnitType.Auto)}; //Boton Editar
            var r5 = new RowDefinition() {Height = new GridLength(1, GridUnitType.Auto)}; //Boton Iniciar
            grid.RowDefinitions.Add(r1);
            grid.RowDefinitions.Add(r2);
            grid.RowDefinitions.Add(r3);
            grid.RowDefinitions.Add(r4);
            grid.RowDefinitions.Add(r5);

            UIElement image = CreateProfileImage(perfil);
            grid.Children.Add(image);
            Grid.SetColumn(image, 0);
            Grid.SetRow(image, 0);

            Label nombre = new Label() { 
                Content = perfil.nombre,
                FontSize = 17,
                Foreground = new SolidColorBrush(Colors.White),
                Padding = new Thickness(5, 5, 5, 0),
                FontWeight = FontWeights.SemiBold
            };
            grid.Children.Add(nombre);
            Grid.SetRow(nombre, 1);

            Label info = new Label()
            {
                Content = perfil.descripcion,
                FontSize = 15,
                Foreground = new SolidColorBrush(Color.FromRgb(152, 152, 153)),
                Padding = new Thickness(5, 0, 5, 5),
            };
            grid.Children.Add(info);
            Grid.SetRow(info, 2);

            Button btn_edit = new Button { 
                Content = "Editar", 
                Height = 36,
                FontSize = 17,
                Style = Application.Current.Resources["MediumEnfasisCardButton"] as Style,
                Margin = new Thickness(0, 0, 0, 5)
            };
            btn_edit.AddHandler(Button.ClickEvent, new RoutedEventHandler((sender, e) =>
            {
                LectorProgramas.View!.frame.Content = new ModificarPerfil(perfil);
            }));
            grid.Children.Add(btn_edit);
            Grid.SetRow(btn_edit, 3);

            Button btn_start = new Button { 
                Content = "Iniciar", 
                Height = 36,
                FontSize = 17,
                Style = Application.Current.Resources["HighEnfasisButton"] as Style,
            };
            btn_start.AddHandler(Button.ClickEvent, new RoutedEventHandler((sender, e) =>
            {
                if (SesionActual.sesionActual == null)
                {
                    perfil.iniciar();
                    Sesion sesion = new Sesion(perfil);
                    sesion.OnStartListeners += () => {
                        MainWindow.mainWindow.rbtn_sesion_actual.Visibility = Visibility.Visible;
                        MainWindow.mainWindow.separator_sesion_actual.Visibility = Visibility.Visible;
                    };
                    sesion.OnStopListeners  += () => {
                        MainWindow.mainWindow.rbtn_sesion_actual.Visibility = Visibility.Collapsed;
                        MainWindow.mainWindow.separator_sesion_actual.Visibility = Visibility.Collapsed;
                    };
                    MainWindow.mainWindow.frame.Content = new SesionActual(sesion);
                }
                else
                {
                    MessageBox.Show($"Ya hay un perfil activo, debe finalizar la sesión del perfil {SesionActual.sesionActual.Perfil.nombre} antes de iniciar otro perfil", "Error", MessageBoxButton.OK, MessageBoxImage.Information);
                }
            }));
            grid.Children.Add(btn_start);
            Grid.SetRow(btn_start, 4);
            b.Child = grid;

            return b;
        }

        //mejorar
        private UIElement CreateProfileImage(Perfil perfil)
        {
            Grid grid = new Grid() { Height = 240, Width = 240 };
            int columna = 0;
            int fila = 0;

            for (int i = 0; i < perfil.programasAEjecutar.Count; i++)
            {
                Image image = new Image();
                image.Name = "image" + perfil.programasAEjecutar[i].id;
                image.Height = 50;
                image.Width = 50;
                image.Source = perfil.programasAEjecutar[i].getIcon();
                grid.Children.Add(image);

                grid.ColumnDefinitions.Add(new ColumnDefinition());

                Grid.SetColumn(image, columna);
                Grid.SetRow(image, fila);
                columna++;
                if (columna == 3)
                {
                    columna = 0; fila++;
                }
            }
            for (int i = 0; i <= fila; i++)
            {
                grid.RowDefinitions.Add(new RowDefinition());
            }
            return grid;
        }

        //Cargar perfiles guardados en la base de datos
        private static List<Perfil> ObtenerPerfilesGuardados()
        {
            var perfiles = new List<Perfil>();
            using (var conn = new ConexionContext())
            {
                perfiles = conn.Perfiles!.ToList<Perfil>();
                foreach (var perfil in perfiles)
                {
                    perfil.programasAEjecutar = conn.ProgramasPerfiles
                        .Where(pp => pp.Id_Perfil == perfil.id && pp.Ejecutar)
                        .Select(pp => pp.Programa)
                        .ToList();

                    perfil.programasBloqueados = conn.ProgramasPerfiles
                        .Where(pp => pp.Id_Perfil == perfil.id && !pp.Ejecutar)
                        .Select(pp => pp.Programa)
                        .ToList();
                }
            }
            return perfiles;
        }
    }
}
