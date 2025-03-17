using System;
using System.Collections.Generic;
using System.Windows;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AplicacionEficiencia.Dal;

namespace AplicacionEficiencia.Modelos
{
    [Table ("Perfiles")]
    public class Perfil
    {
        [Key]
        [Column("PerfilID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Column("NombrePerfil")]
        [MaxLength(500)]
        public string nombre { get; set; }

        [Column("DescripcionPerfil")]
        [MaxLength(2500)]
        public string descripcion { get; set; }

        [NotMapped]
        public List<Programa> programasAEjecutar { get; set; }
        [NotMapped]
        public List<Programa> programasBloqueados { get; set; }
        [NotMapped]
        public ICollection<SesionDTO> Sesiones { get; set; }


        public Perfil(int id, string nombre, string descripcion)
        {
            this.id = id;
            this.nombre = nombre;
            this.descripcion = descripcion;
            programasAEjecutar = new List<Programa>();
            programasBloqueados = new List<Programa>();
        }

        public void agregarProgramaEjecutar(Programa programa) => programasAEjecutar.Add(programa); 
        public void bloquearPrograma(Programa programa) => programasBloqueados.Add(programa); 

        public void iniciar()
        {
            foreach (Programa programa in programasAEjecutar)
            {
                try { programa.iniciarPrograma(); }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error al ejecutar el programa: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

    }
}
