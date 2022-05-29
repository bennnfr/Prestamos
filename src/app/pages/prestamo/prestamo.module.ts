import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamoRoutingModule } from './prestamo-routing.module';
import { PrestamoComponent } from './prestamo.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrestamoComponent,
  ],
  imports: [
    CommonModule,
    PrestamoRoutingModule,
    ComponentsModule,
    FormsModule
  ]
})
export class PrestamoModule { }
