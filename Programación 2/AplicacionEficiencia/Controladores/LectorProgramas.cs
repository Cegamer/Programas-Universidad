using AplicacionEficiencia.Dal;
using AplicacionEficiencia.Modelos;
using Microsoft.EntityFrameworkCore;
using Shell32;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Windows;


namespace AplicacionEficiencia.Controladores
{
    public static class LectorProgramas
    {
        public static MainWindow? View { get; set; }
        public static List<Programa>? Programas { get; set; }

        public static List<Process> procesosActivosPC()
        {
            List<Process> procesos = new List<Process>();
            return procesos;
        }

        public static void LeerProgrmasInstalados()
        {
            string startMenuPath = Environment.GetFolderPath(Environment.SpecialFolder.CommonStartMenu);
            string programsPath = Path.Combine(startMenuPath, "Programs");
            var list = ObtenerProgramasGuardados();

            if (list is null || list.Count == 0)
            {
                MessageBox.Show("Cargando Programas...");
                Programas = ObtenerProgramasInstalados(programsPath);
            }
            else Programas = list;
        }

        private static List<Programa> ObtenerProgramasInstalados(string carpeta)
        {
            List<Programa> programas = new List<Programa>();
            string[] archivosLnk = Directory.GetFiles(carpeta, "*.lnk"); // Obtener archivos .lnk en la carpeta especificada

            foreach (string archivo in archivosLnk)
            {
                try
                {
                    // Obtener la información del archivo .lnk
                    var shortcut = new FileInfo(archivo);
                    var shell = new Shell32.Shell();
                    var folder = shell.NameSpace(Path.GetDirectoryName(shortcut.FullName));
                    var folderItem = folder.ParseName(Path.GetFileName(shortcut.FullName));
                    string nombre = folder.GetDetailsOf(folderItem, 0); // Nombre del programa
                    string ruta = folder.GetDetailsOf(folderItem, 194); // Ruta del ejecutable
                    FolderItem folderIt = folder.ParseName(System.IO.Path.GetFileName(ruta));

                    if (folderIt != null)
                    {
                        Shell32.ShellLinkObject lnk = folderIt.GetLink;
                        Shell32.FolderItem target = lnk.Target;
                        ruta = target.Path;

                        Debug.WriteLine("Ruta: " + ruta);
                        if (!ruta.Contains("Uninstall") && !ruta.Contains("Desinstalar"))
                        {
                            var p = new Programa(0, nombre, ruta);
                            programas.Add(p);
                            GuardarPrograma(p);
                        }
                    }
                    else Debug.WriteLine("Error al obtener ruta");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error al obtener programa: {ex.Message}");
                }
            }

            // Recursivamente obtener programas de las subcarpetas
            foreach (string subCarpeta in Directory.GetDirectories(carpeta))
                programas.AddRange(ObtenerProgramasInstalados(subCarpeta));

            return programas;
        }

        /*
        -
        - Transacciones con la database
        -
        */

        //Guardar el programa en la base de datos.
        public static void GuardarPrograma(Programa programa)
        {
            using (var conn = new ConexionContext())
            {
                conn.Programas!.Add(programa);
                conn.SaveChanges();
            }
        }
        //Cargar programas guardados en la base de datos
        private static List<Programa> ObtenerProgramasGuardados()
        {
            var list = new List<Programa>();
            using (var conn = new ConexionContext())
            {
                list = conn.Programas!.ToList<Programa>();
            }
            return list;
        }
    }
}
