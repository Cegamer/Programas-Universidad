using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacionEficiencia.Core
{
    public interface ITimeConverter
    {
        float Convert();
        string Format();
        void SetValue(float value);
    }
}
