/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package futbol;

import controlador.Controlador;
import modelo.Equipo;
import modelo.Partido;
import modelo.Torneo;
import modelo.Usuario;

/**
 *
 * @author Cegamer
 */
public class Futbol {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Torneo torneo = new Torneo();
        Controlador controlador = new Controlador();
        controlador.mostrarLogin();
    }
}
