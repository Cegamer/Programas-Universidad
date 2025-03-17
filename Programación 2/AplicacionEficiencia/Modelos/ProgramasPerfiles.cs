using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacionEficiencia.Modelos
{
    internal class ProgramasPerfiles
    {
        public ProgramasPerfiles(int id_Programa, int id_Perfil, bool ejecutar)
        {
            Id_Programa = id_Programa;
            Id_Perfil = id_Perfil;
            Ejecutar = ejecutar;
        }

        public int Id_Programa { get; set; }
        public int Id_Perfil { get; set; }
        public bool Ejecutar { get; set; }

        [ForeignKey("Id_Programa")]
        public Programa Programa { get; set; }

        [ForeignKey("Id_Perfil")]
        public Perfil Perfil { get; set; }
    }
}
