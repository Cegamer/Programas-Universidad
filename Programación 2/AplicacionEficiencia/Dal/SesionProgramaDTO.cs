using AplicacionEficiencia.Modelos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacionEficiencia.Dal
{
    public class SesionProgramaDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idConexionSesionPrograma { get; set; }
        [ForeignKey("SesionId")]
        public int SesionId { get; set; }
        [ForeignKey("ProgramaId")]
        public int ProgramaId { get; set; }
        public DateTime horaInicio { get; set; }
        public DateTime horaFin { get; set; }
        public TimeSpan tiempoTranscurrido { get; set; }
    }
}
