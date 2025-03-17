import { Component,ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  @ViewChild('modal') modal!: IonModal;
  constructor() {}

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }

}
