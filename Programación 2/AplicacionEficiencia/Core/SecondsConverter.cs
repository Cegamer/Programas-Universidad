using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacionEficiencia.Core
{
    internal class SecondsConverter : ITimeConverter
    {
        private float _seconds {get; set;}
        public SecondsConverter(float seconds)
        {
            this._seconds = seconds;
        }

        public float Convert()
        {
            return this._seconds;
        }

        public string Format()
        {
            return $"{Convert():F2}s";
        }

        public void SetValue(float value)
        {
            this._seconds = value;
        }
    }
}
