using System;
using System.Diagnostics;
using System.Drawing;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Media.Imaging;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Windows.Documents;
using System.Collections.Generic;

namespace AplicacionEficiencia.Modelos
{
    [Table("Programa")]
    public class Programa
    {
        [Key]
        [Column("ProgramaID")]
        public int id { get; set; }

        [Column("NombreProgrma")]
        [MaxLength(200)]
        public string nombre { get; set; }

        [Column("RutaProgrma")]
        [DataType(DataType.Text)]
        public string ruta { get; set; }

        [Column("NombreProceso")]
        [DataType(DataType.Text)]
        public string nombreProceso { get; set; }

        public Programa(int id, string nombre, string ruta)
        {
            this.id = id;
            this.nombre = nombre;
            this.ruta = ruta;
            this.nombreProceso = obtenerNombreProceso();
        }

        public Process iniciarPrograma()
        {
            var proceso = Process.Start(ruta);
            nombreProceso = proceso.ProcessName;
            Debug.WriteLine(nombreProceso);
            return proceso;
        }
        private string obtenerNombreProceso()
        {
            ProcessStartInfo startInfo = new ProcessStartInfo(ruta);

            try
            {
                string nombreArchivo = System.IO.Path.GetFileNameWithoutExtension(ruta);
                startInfo.FileName = nombreArchivo;

                using (Process proceso = new Process())
                {
                    proceso.StartInfo = startInfo;
                    return proceso.StartInfo.FileName;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error al obtener el nombre del proceso: {ex.Message}");
                return null;
            }
        }
        public BitmapSource getIcon()
        {
            try
            {
                Icon icon = Icon.ExtractAssociatedIcon(ruta);
                Bitmap bitmap = icon.ToBitmap();

                BitmapSource bitmapSource = Imaging.CreateBitmapSourceFromHIcon(
                    bitmap.GetHicon(),
                    Int32Rect.Empty,
                    BitmapSizeOptions.FromEmptyOptions());

                return bitmapSource;
            }
            catch { return null; }
        }
    }
}
