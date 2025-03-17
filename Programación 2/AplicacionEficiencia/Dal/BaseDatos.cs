using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AplicacionEficiencia.Modelos;

namespace AplicacionEficiencia.Dal
{
    internal sealed class ConexionContext : DbContext
    {
        //AQUI
        public string database = "db.db";
        public DbSet<Programa>? Programas { get; private set; }
        public DbSet<Perfil>? Perfiles { get; private set; }
        public DbSet<ProgramasPerfiles>? ProgramasPerfiles { get; private set; }
        public DbSet<SesionDTO>? Sesiones { get; set; }
        public DbSet<SesionProgramaDTO>? SesionesProgramas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(connectionString: $"Filename={database}",
                sqliteOptionsAction: op =>
                {
                    op.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName);
                }
            );
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //Se definen las entidades en la base de datos
            modelBuilder.Entity<Programa>().ToTable("Programas");
            modelBuilder.Entity<Perfil>().ToTable("Perfiles");
            modelBuilder.Entity<ProgramasPerfiles>().ToTable("ProgramasPerfiles");
            modelBuilder.Entity<SesionDTO>().ToTable("Sesiones");
            modelBuilder.Entity<SesionProgramaDTO>().ToTable("SesionProgramas");



            modelBuilder.Entity<Programa>(entity =>
            {
                entity.HasKey(e => e.id);
            });

            modelBuilder.Entity<Perfil>(entity =>
            {
                entity.HasKey(e => e.id);
            });

            modelBuilder.Entity<ProgramasPerfiles>(entity =>
            {
                entity.HasKey(e => new { e.Id_Programa, e.Id_Perfil });

                entity.HasOne(pp => pp.Programa)
                    .WithMany()
                    .HasForeignKey(pp => pp.Id_Programa);

                entity.HasOne(pp => pp.Perfil)
                    .WithMany()
                    .HasForeignKey(pp => pp.Id_Perfil);
            });

            modelBuilder.Entity<SesionDTO>()
                .HasOne(s => s.Perfil)
                .WithMany()
                .HasForeignKey(s => s.PerfilId);

            modelBuilder.Entity<SesionProgramaDTO>().HasKey(e => e.idConexionSesionPrograma);

            base.OnModelCreating(modelBuilder);
        }
    }
}
