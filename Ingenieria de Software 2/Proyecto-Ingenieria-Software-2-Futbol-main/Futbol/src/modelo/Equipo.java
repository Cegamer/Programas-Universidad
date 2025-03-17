package modelo;

import java.util.ArrayList;
import java.util.List;

public class Equipo {

    private List<Partido> partidos = new ArrayList<Partido>();

    private String nombre;
    private String identifier;
    private int ganados;
    private int perdidos;
    private int empatados;
    private int puntos;
    private String rutaEscudo;

    public Equipo(String nombre, String rutaEscudo) {
        this.nombre = nombre;
        this.identifier = formatearIdentifier(nombre);
        this.ganados = 0;
        this.perdidos = 0;
        this.empatados = 0;
        this.puntos = 0;
        this.rutaEscudo = rutaEscudo;
    }

    public static String formatearIdentifier(String nombre) {
        return nombre.toUpperCase().replaceAll("\\s", "");
    }

    public String getRutaEscudo() {
        return rutaEscudo;
    }

    public String getIdentifier() {
        return identifier;
    }

    public int getGanados() {
        return ganados;
    }

    public int getPerdidos() {
        return perdidos;
    }

    public int getEmpatados() {
        return empatados;
    }

    public int getPuntos() {
        return puntos;
    }

    public List<Partido> getPartidos() {
        return partidos;
    }

    public String getNombre() {
        return nombre;
    }

    void agregarPartido(Partido partido) {
        partidos.add(partido);

        if (partido.getGanador() == null) {
            empatados++;
        } else if (partido.getGanador().equals(this)) {
            ganados++;
        } else {
            perdidos++;
        }
        calcularPuntos();
    }

    void calcularPuntos() {
        puntos = ganados * 3 + empatados;
    }
}
