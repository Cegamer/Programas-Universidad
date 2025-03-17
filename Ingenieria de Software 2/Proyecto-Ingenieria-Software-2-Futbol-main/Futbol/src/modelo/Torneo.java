package modelo;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.json.simple.*;
import org.json.simple.parser.*;

public class Torneo {

    private static List<Equipo> equipos = new ArrayList<Equipo>();
    private static List<Partido> partidos = new ArrayList<Partido>();
    private static Torneo torneoSingleton;

    public Torneo() {
        if (torneoSingleton == null) {
            torneoSingleton = this;
        } else {
            System.out.println("Torneo ya creado");
        }
    }

    public static Torneo getTorneoSingleton() {
        return torneoSingleton;
    }

    public static void agregarEquipo(Equipo equipo) {
        equipos.add(equipo);
    }

    public static void agregarPartido(Partido partido) {
        partidos.add(partido);
    }

    public static List<Equipo> getEquipos() {
        return equipos;
    }

    public static List<Partido> getPartidos() {
        return partidos;
    }

    public static Equipo getEquipoByName(String nombre) {
        for (Equipo equipo : equipos) {
            if (equipo.getIdentifier().equals(Equipo.formatearIdentifier(nombre))) {
                return equipo;
            }
        }
        return null;
    }

    public static void guardarEquipos() {
        JSONArray listaEquiposJSON = new JSONArray();
        for (Equipo equipo : equipos) {
            JSONObject equipoJSON = new JSONObject();
            equipoJSON.put("nombre", equipo.getNombre());
            equipoJSON.put("equipoID", equipo.getIdentifier());
            equipoJSON.put("ganados", equipo.getGanados());
            equipoJSON.put("perdidos", equipo.getPerdidos());
            equipoJSON.put("empatados", equipo.getEmpatados());
            equipoJSON.put("puntos", equipo.getPuntos());
            equipoJSON.put("rutaEscudo", equipo.getRutaEscudo());

            listaEquiposJSON.add(equipoJSON);
        }

        try (FileWriter file = new FileWriter("src/Datos/Equipos.json")) {
            file.write(listaEquiposJSON.toJSONString());
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void cargarEquipos() {
        try (FileReader reader = new FileReader("src/Datos/Equipos.json")) {
            JSONParser parser = new JSONParser();
            JSONArray listaEquiposJSON = (JSONArray) parser.parse(reader);

            equipos.clear(); // Limpia la lista actual de equipos

            for (Object obj : listaEquiposJSON) {
                JSONObject equipoJSON = (JSONObject) obj;

                String nombre = (String) equipoJSON.get("nombre");
                String rutaEscudo = (String) equipoJSON.get("rutaEscudo");

                // Crea un objeto Equipo a partir de los datos
                Equipo equipo = new Equipo(nombre,rutaEscudo);

                // Agrega el objeto Equipo a la lista de equipos
                equipos.add(equipo);
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }

    public static void guardarPartidos() {
        JSONArray listaPartidosJSON = new JSONArray();
        for (Partido partido : partidos) {
            JSONObject partidoJSON = new JSONObject();
            partidoJSON.put("localId", partido.getLocal().getIdentifier());
            partidoJSON.put("visitanteId", partido.getVisitante().getIdentifier());
            partidoJSON.put("golesLocal", partido.getGolesLocal());
            partidoJSON.put("golesVisitante", partido.getGolesVisitante());

            listaPartidosJSON.add(partidoJSON);
        }

        try (FileWriter file = new FileWriter("src/Datos/Partidos.json")) {
            file.write(listaPartidosJSON.toJSONString());
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void cargarPartidos() {
        try (FileReader reader = new FileReader("src/Datos/Partidos.json")) {
            JSONParser parser = new JSONParser();
            JSONArray listaPartidossJSON = (JSONArray) parser.parse(reader);
            partidos.clear();

            for (Object obj : listaPartidossJSON) {
                JSONObject partidoJSON = (JSONObject) obj;
                Equipo Local = getEquipoByName(partidoJSON.get("localId").toString());
                Equipo Visitante = getEquipoByName(partidoJSON.get("visitanteId").toString());;
                int golesLocal = Integer.parseInt(partidoJSON.get("golesLocal").toString());;
                int golesVisitante = Integer.parseInt(partidoJSON.get("golesVisitante").toString());;;

                Partido partido = new Partido(Local, Visitante, golesLocal, golesVisitante);
                partidos.add(partido);

            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }
}
