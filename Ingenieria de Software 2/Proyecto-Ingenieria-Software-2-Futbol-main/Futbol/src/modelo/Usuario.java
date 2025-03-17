/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modelo;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Usuario {

    private int tipo;
    private String nombre;
    private String contrasena;

    public Usuario(int tipo, String nombre, String contrasena) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.contrasena = contrasena;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public int getTipo() {
        return tipo;
    }

    public void setTipo(int tipo) {
        this.tipo = tipo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public static List<Usuario> cargarUsuarios() {

        List<Usuario> usuarios = new ArrayList<Usuario>();
        try (FileReader reader = new FileReader("src/Datos/Usuarios.json")) {
            JSONParser parser = new JSONParser();
            JSONArray listaUsuariosJSON = (JSONArray) parser.parse(reader);
            for (Object obj : listaUsuariosJSON) {
                JSONObject equipoJSON = (JSONObject) obj;

                String nombre =  equipoJSON.get("nombre").toString();
                String pass =  equipoJSON.get("contrasena").toString();
                int tipo =Integer.parseInt(equipoJSON.get("tipo").toString());

                // Crea un objeto Equipo a partir de los datos
                Usuario usuario = new Usuario(tipo, nombre,pass);

                // Agrega el objeto Equipo a la lista de equipos
                usuarios.add(usuario);
            }
            return usuarios;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
