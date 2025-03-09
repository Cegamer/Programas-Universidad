import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';

// 🔥 Configuración de Firebase (asegúrate de usar tu propia configuración)
const firebaseConfig = {
  apiKey: "AIzaSyATa_U8bJyQja2lbN__UTAJrqeGrWm_VbI",
  authDomain: "galeria-f9db8.firebaseapp.com",
  projectId: "galeria-f9db8",
  storageBucket: "galeria-f9db8.firebasestorage.app",
  messagingSenderId: "934954748424",
  appId: "1:934954748424:web:d11942d3e216c433bd5fbd"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];

  /** 📷 Tomar una nueva foto y subirla a Firestore */
  public async addNewToGallery() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      const savedImageFile = await this.uploadToFirestore(capturedPhoto);

      if (savedImageFile) {
        this.photos.unshift(savedImageFile);
        console.log('✅ Foto guardada correctamente en Firestore:', savedImageFile);
      } else {
        console.error('❌ No se pudo guardar la imagen en Firestore.');
      }
    } catch (error) {
      console.error('❌ Error al capturar la foto:', error);
    }
  }

  /** 🔄 Subir la imagen a Firestore */
  private async uploadToFirestore(photo: Photo): Promise<UserPhoto | null> {
    try {
      const fileName = `${Date.now()}.jpeg`;

      // Convertir imagen a Base64
      if (!photo.webPath) {
        throw new Error('No se encontró la ruta de la imagen.');
      }

      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      const base64Data = (await this.convertBlobToBase64(blob)) as string;

      // Crear objeto para guardar en Firestore
      const photoData: UserPhoto = {
        filepath: fileName,
        webviewPath: base64Data,
        timestamp: Date.now(),
      };

      // Guardar en Firestore
      await addDoc(collection(db, 'photos'), photoData);

      return photoData;
    } catch (error) {
      console.error('❌ Error subiendo la foto a Firestore:', error);
      return null;
    }
  }

  /** 🗑️ Eliminar foto de Firestore */
  public async deletePicture(photo: UserPhoto, position: number) {
    try {
      // Elimina la foto de la lista local
      this.photos.splice(position, 1);

      // Buscar la referencia en Firestore
      const q = query(collection(db, 'photos'), where('filepath', '==', photo.filepath));
      const querySnapshot = await getDocs(q);

      // Eliminar la foto en Firestore
      querySnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, 'photos', docSnap.id));
      });

      console.log('✅ Foto eliminada correctamente de Firestore');
    } catch (error) {
      console.error('❌ Error eliminando la foto:', error);
    }
  }

  /** 🔄 Convertir Blob a Base64 */
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject('Error al convertir Blob a Base64');
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  /** 📥 Cargar imágenes guardadas desde Firestore */
  public async loadSaved() {
    try {
      const q = query(collection(db, 'photos'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      this.photos = querySnapshot.docs.map((docSnap) => docSnap.data() as UserPhoto);
      console.log('📸 Fotos cargadas desde Firestore:', this.photos);
    } catch (error) {
      console.error('❌ Error al cargar las fotos desde Firestore:', error);
    }
  }
}

/** 📂 Interfaz para las fotos */
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  timestamp: number;
}
