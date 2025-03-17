using CommunityToolkit.Mvvm.ComponentModel;
using LiveChartsCore.SkiaSharpView.Painting;
using LiveChartsCore.SkiaSharpView;
using LiveChartsCore;
using SkiaSharp;
using AplicacionEficiencia.Core;

namespace AplicacionEficiencia.Controladores
{
    public partial class GraficoBarras : ObservableObject
    {
        public Axis[] XAxes { get; private set; }
        public Axis[] YAxes { get; private set; }
        public ISeries[] Series { get; private set; }
        public int[] values { get; private set; }
        public string[] labels { get; private set; }

        public GraficoBarras(string[] labels, int[] values)
        {
            this.values = values;
            this.labels = labels;
            this.XAxes = new Axis[] {
                CreateXAxes(labels)
            };
            this.Series = new ISeries[] {
                CreateSeries(values)
            };
        }

        private Axis CreateXAxes(string[] labels)
        {
            return new Axis
            {
                Labels = labels,
                LabelsRotation = 0,
                SeparatorsPaint = new SolidColorPaint(SKColor.Parse("#989899")), //hex #989899
                SeparatorsAtCenter = false,
                TicksPaint = new SolidColorPaint(SKColor.Parse("#989899")), //hex #323235
                LabelsPaint = new SolidColorPaint(SKColor.Parse("#989899")),
                TextSize = 13,
                TicksAtCenter = true,
                ForceStepToMin = true,
                MinStep = 1
            };
        }

        private ColumnSeries<int> CreateSeries(int[] values)
        {
            return new ColumnSeries<int>
            {
                Values = values,
                Fill = new SolidColorPaint(ColorControler.GetWindowGlassSKColor())
            };
        }

        public void CreateYAxes(ITimeConverter timeConverter)
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
            this.YAxes = new Axis[] {
                axis
            };
        }
    }
}
