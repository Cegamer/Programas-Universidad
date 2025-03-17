using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AplicacionEficiencia.Core
{
    internal class MinuteConverter : ITimeConverter
    {
        private float _seconds {get; set;}
        public MinuteConverter(float seconds)
        {
            this._seconds = seconds;
        }

        public float Convert()
        {
            return this._seconds / 60;
        }

        public string Format()
        {
            return $"{Convert():F2}m";
        }

        public void SetValue(float value)
        {
            this._seconds = value;
        }
    }
}
