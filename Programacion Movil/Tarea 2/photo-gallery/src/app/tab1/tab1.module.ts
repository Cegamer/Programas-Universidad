import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../components/header.component';

@NgModule({
  declarations: [Tab1Page],  // Declaración del componente
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    HeaderComponent,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  exports: [Tab1Page] // Exportar si es necesario
})
export class Tab1PageModule {}
