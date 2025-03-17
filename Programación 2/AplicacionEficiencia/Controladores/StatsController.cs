
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using AplicacionEficiencia.Controladores.Graficos;
using AplicacionEficiencia.Core;
using AplicacionEficiencia.Dal;
using AplicacionEficiencia.Modelos;
using AplicacionEficiencia.Vistas;
using LiveChartsCore.Kernel;

namespace AplicacionEficiencia.Controladores
{
    internal sealed class StatsController
    {
        private readonly Estadistica _view;
        private Dictionary<DateTime, DateTime> activityPeriods = new Dictionary<DateTime, DateTime>();
        private List<SesionProgramaDTO> sesions = new List<SesionProgramaDTO>();
        private int[] dailyUsageSegments = {0, 0, 0, 0, 0, 0, 0};

        public StatsController(Estadistica view) {
            this._view = view;
            this._view.btn_apply_filter.Click += Btn_apply_filter_Click; ;
            FetchData();
            FilterData();
            UpdateProfileTime();
            LoadProfileChart();
            LoadAppsChart();
        }

        private void Btn_apply_filter_Click(object sender, RoutedEventArgs e)
        {
            DateTime? date1 = _view.datep_fecha_inicio.SelectedDate;
            DateTime? date2 = _view.datep_fecha_fin.SelectedDate;

            if (date1 is not null && date2 is not null)
            {
                var dict = FetchAppUsage((DateTime) date1, (DateTime) date2);
                var labels = dict.Select(kvp => GetAppFromID(kvp.Key)!.nombre).ToArray();
                var data = dict.Select(kvp => (int)kvp.Value).ToArray();
                var chart = new GraficoLista(labels, data);

                if (data.Length > 0)
                {
                    chart.CreateXAxes(GetTimeConverter(data.Max()));
                    _view.apps_stats_chart.DataContext = chart;
                }
            }
        }

        private void LoadProfileChart() 
        {
            var chart = new GraficoBarras(new string[] { "Hace 6 Días", "Hace 5 Días", "Hace 4 Días", "Hace 3 Días", "Hace 2 Días", "Hace 1 Día", "Hoy"}, dailyUsageSegments);
            chart.CreateYAxes(GetTimeConverter(dailyUsageSegments.Max()));
            _view.profile_stats_chart.DataContext = chart;
        }

        private void LoadAppsChart ()
        {
            var dict = FetchAppUsage();
            var labels = dict.Select(kvp => GetAppFromID(kvp.Key)!.nombre).ToArray();
            var data = dict.Select(kvp => (int) kvp.Value).ToArray();
            var chart = new GraficoLista(labels, data);


            if (data.Length > 0)
            {
                chart.CreateXAxes(GetTimeConverter(data.Max()));
                _view.apps_stats_chart.DataContext = chart;
            }
        }

        private void UpdateProfileTime() {
            var time = GetAverageTime(activityPeriods);
            string format = GetTimeConverter(time).Format();

            _view.txt_profile_time.Text = format;
        }

        private float GetAverageTime(Dictionary<DateTime, DateTime> period) {
            float time = 0;

            foreach(var kvp in period) 
            {
                time += CalculateTime(kvp.Key, kvp.Value);
            }
            return time / period.Count();
        }
 
        private float CalculateTime(DateTime start, DateTime end)
        {
            TimeSpan difference = end - start;
            return (float) difference.TotalSeconds;
        }

        private void FetchData() 
        {
            using (var conn = new ConexionContext())
            {
                activityPeriods = conn.Sesiones!
                    .Select(x => new {x.horaInicio, x.horaFin})
                    .ToDictionary(k => k.horaInicio, v => v.horaFin);
            }
        }

        private void FilterData() {
            var date6 = DateTime.Today;
            var date5 = DateTime.Today.AddDays(-1);
            var date4 = DateTime.Today.AddDays(-2);
            var date3 = DateTime.Today.AddDays(-3);
            var date2 = DateTime.Today.AddDays(-4);
            var date1 = DateTime.Today.AddDays(-5);
            var date0 = DateTime.Today.AddDays(-6);

            dailyUsageSegments[6] = (int) GetTime(activityPeriods.Where(kvp => CompareDates(kvp.Key, date6)).ToDictionary(k => k.Key, v => v.Value));
            dailyUsageSegments[5] = (int) GetTime(activityPeriods.Where(kvp => CompareDates(kvp.Key, date5)).ToDictionary(k => k.Key, v => v.Value));
            dailyUsageSegments[4] = (int) GetTime(activityPeriods.Where(kvp => CompareDates(kvp.Key, date4)).ToDictionary(k => k.Key, v => v.Value));
            dailyUsageSegments[3] = (int) GetTime(activityPeriods.Where(kvp => CompareDates(kvp.Key, date3)).ToDictionary(k => k.Key, v => v.Value));
            dailyUsageSegments[2] = (int) GetTime(activityPeriods.Where(kvp => CompareDates(kvp.Key, date2)).ToDictionary(k => k.Key, v => v.Value));
            dailyUsageSegments[1] = (int) GetTime(activityPeriods.Where(kvp => CompareDates(kvp.Key, date1)).ToDictionary(k => k.Key, v => v.Value));
            dailyUsageSegments[0] = (int) GetTime(activityPeriods.Where(kvp => CompareDates(kvp.Key, date0)).ToDictionary(k => k.Key, v => v.Value));
        }

        private bool CompareDates(DateTime dateA, DateTime dateB) {
            return dateA.Year == dateB.Year && dateA.Month == dateB.Month && dateA.Day == dateB.Day;
        }


        private float GetTime(Dictionary<DateTime, DateTime> period) {
            float time = 0;

            foreach(var kvp in period) 
            {
                time += CalculateTime(kvp.Key, kvp.Value);
            }
            return time;
        }

        public static ITimeConverter GetTimeConverter(float seconds) {
            if (seconds < 60) 
                return new SecondsConverter(seconds);
            if (seconds < 3600)
                return new MinuteConverter(seconds);
            return new HourConverter(seconds);
        }

        private Dictionary<int, double> FetchAppUsage() 
        {
            List<SesionProgramaDTO> sesiones = new List<SesionProgramaDTO>();
            Dictionary<Programa, TimeSpan> dict = new Dictionary<Programa, TimeSpan>();

            using (var context = new ConexionContext())
            {
                sesiones = context.SesionesProgramas!.ToList();
            }

            var result = sesiones
                .GroupBy(s => s.ProgramaId)
                .Select(s => new 
                { 
                    Programa = s.Key,
                    Time = s.Sum(s => s.tiempoTranscurrido.TotalSeconds)
                })
                .OrderByDescending(s => s.Time)
                .Take(5)
                .ToDictionary(k => k.Programa, v => v.Time);
            return result;
        }


        private Dictionary<int, double> FetchAppUsage(DateTime date1, DateTime date2) 
        {
            List<SesionProgramaDTO> sesiones = new List<SesionProgramaDTO>();
            Dictionary<Programa, TimeSpan> dict = new Dictionary<Programa, TimeSpan>();

            using (var conn = new ConexionContext())
            {
                sesiones = conn.SesionesProgramas!
                    .Where(x => x.horaInicio >= date1 && x.horaInicio <= date2)
                    .ToList();
            }

            var result = sesiones
                .GroupBy(s => s.ProgramaId)
                .Select(s => new
                {
                    Programa = s.Key,
                    Time = s.Sum(s => s.tiempoTranscurrido.TotalSeconds)
                })
                .OrderByDescending(s => s.Time)
                .Take(5)
                .ToDictionary(k => k.Programa, v => v.Time);
            return result;
        }

        private Programa? GetAppFromID (int ID) {
            using (var conn = new ConexionContext())
            {
                return conn.Programas!.FirstOrDefault(p => p.id == ID);
            } 
        }
    }
}
