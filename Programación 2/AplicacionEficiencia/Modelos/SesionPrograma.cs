using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using AplicacionEficiencia.Dal;

namespace AplicacionEficiencia.Modelos
{
    public class SesionPrograma
    {
        public Sesion sesion { get; set; }
        public Programa programa { get; set; }
        public DateTime horaInicio { get; set; }
        public DateTime horaFin { get; set; }
        public TimeSpan tiempoTranscurrido { get; set; }
        [NotMapped]
        public bool activa;

        public SesionPrograma(Sesion sesion, Programa programa, DateTime horaInicio)
        {
            this.sesion = sesion;
            this.programa = programa;
            this.horaInicio = horaInicio;
            this.activa = true;

        }

        public TimeSpan calcularTiempoTranscurrido(DateTime fin)
        {
            if (!activa)
                tiempoTranscurrido = horaFin - horaInicio;
            else
                tiempoTranscurrido = fin - horaInicio;

            return tiempoTranscurrido;
        }
        public void finalizar()
        {
            horaFin = DateTime.Now;
            activa = false;
            calcularTiempoTranscurrido(DateTime.Now);
            GuardarDatosSesionPrograma(this);
        }

        public static void GuardarDatosSesionPrograma(SesionPrograma sesionPrograma)
        {
            using (var conn = new ConexionContext())
            {
                SesionProgramaDTO dto = new SesionProgramaDTO();
                dto.horaFin = sesionPrograma.horaFin;
                dto.horaInicio = sesionPrograma.horaInicio;
                dto.SesionId = sesionPrograma.sesion.id;
                dto.ProgramaId = sesionPrograma.programa.id;
                dto.tiempoTranscurrido = sesionPrograma.tiempoTranscurrido;


                conn.SesionesProgramas!.Add(dto);
                conn.SaveChanges();
            }
        }

    }
}
