using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacionEficiencia.Core
{
    internal class HourConverter : ITimeConverter
    {
        private float _seconds {get; set;}
        public HourConverter(float seconds)
        {
            this._seconds = seconds;
        }

        public float Convert()
        {
            return this._seconds / 3600;
        }

        public string Format()
        {
            return $"{Convert():F2}h";
        }

        public void SetValue(float value)
        {
            this._seconds = value;
        }
    }
}
