import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  profilePhoto: string | null = localStorage.getItem('profilePhoto');

  constructor() {
    this.profilePhoto = localStorage.getItem('profilePhoto') ?? null;
    this.email = localStorage.getItem('userEmail') ?? ''; // Asegurar que haya un valor

  }

  async login() {
    if (this.email === 'test@example.com' && this.password === '123456') {
      await this.takePhoto();
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90
      });

      this.profilePhoto = image.dataUrl ?? null; // Evitar error de undefined
      if (image.dataUrl) {
        localStorage.setItem('userImage', image.dataUrl); // Guardar solo si no es undefined
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
