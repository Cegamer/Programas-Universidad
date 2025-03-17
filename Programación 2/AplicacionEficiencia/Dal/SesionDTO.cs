using AplicacionEficiencia.Modelos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacionEficiencia.Dal
{
    public class SesionDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public int PerfilId { get; set; }

        [ForeignKey("PerfilId")]
        public Perfil Perfil { get; set; }

        public DateTime horaInicio { get; set; }

        public DateTime horaFin { get; set; }

        public TimeSpan tiempoSesion { get; set; }


        public override string ToString()
        {
            return $"ID: {id}, Perfil ID: {PerfilId}, Hora de inicio: {horaInicio}, Hora de fin: {horaFin}";
        }

    }
}
