import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { FormsModule } from '@angular/forms';
import { MontobancoComponent } from './montobanco/montobanco.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PrestamosComponent,
    MontobancoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    PrestamosComponent,
    MontobancoComponent
  ]
})
export class ComponentsModule { }
