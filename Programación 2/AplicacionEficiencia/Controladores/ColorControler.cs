using SkiaSharp;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace AplicacionEficiencia.Controladores
{
    public class ColorControler
    {
        public Color ColorAcent001;
        public Color ColorAcent002;

        public ColorControler() {
            
        }

        public static SKColor GetWindowGlassSKColor()
        {
            var color = SystemParameters.WindowGlassColor;
            return new SKColor(color.R, color.G, color.B, color.A);
        }
    }
}
