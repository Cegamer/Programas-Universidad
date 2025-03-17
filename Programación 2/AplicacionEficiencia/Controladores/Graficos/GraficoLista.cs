using System.Collections.Generic;
using AplicacionEficiencia.Core;
using CommunityToolkit.Mvvm.ComponentModel;
using LiveChartsCore;
using LiveChartsCore.Defaults;
using LiveChartsCore.Measure;
using LiveChartsCore.SkiaSharpView;
using LiveChartsCore.SkiaSharpView.Painting;
using SkiaSharp;


namespace AplicacionEficiencia.Controladores.Graficos
{
    public partial class GraficoLista : ObservableObject
    {
        public ISeries[] Series { get; private set; }
        public Axis[] XAxes { get; private set; }
        public Axis[] YAxes { get; private set; }


        public GraficoLista(string[] labels, int[] data)
        {
            this.YAxes = new Axis[] { CreateYAxes(labels) };
            this.Series = new ISeries[] { CreateSeries(data) };
        }

        private RowSeries<int> CreateSeries(int[] values)
        {
            var whitePaint = new SolidColorPaint(SKColors.White); // Definir una pintura (paint) blanca

            return new RowSeries<int>
            {
                Values = values,
                Stroke = null,
                Fill = new SolidColorPaint(ColorControler.GetWindowGlassSKColor()),
                DataLabelsPaint = whitePaint, // Usar la pintura blanca para el texto de las etiquetas de datos
                DataLabelsSize = 13,
                DataLabelsPosition = DataLabelsPosition.Middle,
                DataLabelsFormatter = point => StatsController.GetTimeConverter((float) point.Coordinate.PrimaryValue).Format()
            };
        }

        private Axis CreateYAxes(string[] labels)
        {
            return new Axis
            {
                Labels = labels,
                LabelsRotation = 0,
                //SeparatorsPaint = new SolidColorPaint(SKColor.Parse("#989899")), //hex #989899
                SeparatorsAtCenter = false,
                //TicksPaint = new SolidColorPaint(SKColor.Parse("#989899")), //hex #323235
                LabelsPaint = new SolidColorPaint(SKColor.Parse("#989899")),
                TextSize = 13,
                TicksAtCenter = true,
                ForceStepToMin = true,
                MinStep = 1
            };
        }

        public void CreateXAxes(ITimeConverter timeConverter)
        {
            var axis = new Axis
            {
                Labeler = (value) =>
                {
                    timeConverter.SetValue((float)value);
                    return timeConverter.Format();
                },
                SeparatorsPaint = new SolidColorPaint(SKColor.Parse("#989899")), //hex #989899
                TextSize = 13,
                LabelsPaint = new SolidColorPaint(SKColor.Parse("#989899"))

            };
            this.XAxes = new Axis[] {
                axis
            };
        }
    }
}