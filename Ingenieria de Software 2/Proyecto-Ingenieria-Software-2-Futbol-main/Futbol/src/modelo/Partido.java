package modelo;

public class Partido {

    private Equipo Local;
    private Equipo Visitante;
    private int golesLocal;
    private int golesVisitante;

    public Partido(Equipo Local, Equipo Visitante, int golesLocal, int golesVisitante) {
        this.Local = Local;
        this.Visitante = Visitante;
        this.golesLocal = golesLocal;
        this.golesVisitante = golesVisitante;

        this.Local.agregarPartido(this);
        this.Visitante.agregarPartido(this);
    }

    public Equipo getLocal() {
        return Local;
    }

    public Equipo getVisitante() {
        return Visitante;
    }

    public int getGolesLocal() {
        return golesLocal;
    }

    public int getGolesVisitante() {
        return golesVisitante;
    }

    public Equipo getGanador() {
        if (golesLocal == golesVisitante) {
            return null;
        }
        if (golesLocal > golesVisitante) {
            return Local;
        } else {
            return Visitante;
        }
    }

    public Equipo getPerdedor() {
        if (golesLocal == golesVisitante) {
            return null;
        }
        if (golesLocal < golesVisitante) {
            return Local;
        } else {
            return Visitante;
        }
    }
}
