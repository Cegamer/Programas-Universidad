import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // ✅ Importa el módulo de Ionic
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true, // ✅ Componente independiente
  imports: [IonicModule, CommonModule] // ✅ IMPORTA IonicModule aquí
})
export class HeaderComponent {
  @Input() userEmail: string = '';
  @Input() userImage: string = '';
}
