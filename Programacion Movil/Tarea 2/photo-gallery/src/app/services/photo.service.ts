import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, orderBy, deleteDoc, doc, onSnapshot, QuerySnapshot, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATa_U8bJyQja2lbN__UTAJrqeGrWm_VbI",
  authDomain: "galeria-f9db8.firebaseapp.com",
  projectId: "galeria-f9db8",
  storageBucket: "galeria-f9db8.firebasestorage.app",
  messagingSenderId: "934954748424",
  appId: "1:934954748424:web:d11942d3e216c433bd5fbd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];

  constructor() {
    this.listenToPhotos();
  }

  public async addNewToGallery() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      const savedImageFile = await this.uploadToFirestore(capturedPhoto);

      if (savedImageFile) {
        console.log('Foto guardada en Firestore:', savedImageFile);
      }
    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }

  private async uploadToFirestore(photo: Photo): Promise<UserPhoto | null> {
    try {
      const fileName = `${Date.now()}.jpeg`;
      const response = await fetch(photo.webPath!);
      let blob = await response.blob();
      blob = await this.resizeImage(blob, 800, 800);
      const base64Data = (await this.convertBlobToBase64(blob)) as string;

      const photoData: UserPhoto = {
        filepath: fileName,
        webviewPath: base64Data,
        timestamp: Date.now(),
      };

      await addDoc(collection(db, 'photos'), photoData);
      return photoData;
    } catch (error) {
      console.error("Error subiendo la foto a Firestore:", error);
      return null;
    }
  }

  public async deletePicture(photo: UserPhoto) {
    try {
      const q = query(collection(db, 'photos'), where('filepath', '==', photo.filepath));
      const querySnapshot = await getDocs(q);

      for (const docSnap of querySnapshot.docs) {
        await deleteDoc(doc(db, 'photos', docSnap.id));
      }
    } catch (error) {
      console.error('Error eliminando la foto:', error);
    }
  }

  private listenToPhotos() {
    const photosCollection = query(collection(db, 'photos'), orderBy('timestamp', 'desc'));

    onSnapshot(photosCollection, (snapshot: QuerySnapshot) => {
      this.photos = snapshot.docs.map(doc => doc.data() as UserPhoto);
    });
  }

  private async resizeImage(blob: Blob, maxWidth: number, maxHeight: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject("Error al obtener el contexto del canvas.");
            return;
          }

          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxWidth;
              height = width / aspectRatio;
            } else {
              height = maxHeight;
              width = height * aspectRatio;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((newBlob) => {
            if (newBlob) {
              resolve(newBlob);
            } else {
              reject("Error al redimensionar la imagen");
            }
          }, "image/jpeg", 0.8);
        };
      };
      reader.onerror = reject;
    });
  }

  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject('Error al convertir Blob a Base64');
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  timestamp: number;
}
