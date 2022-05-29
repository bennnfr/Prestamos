import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Prestamo } from '../../models/prestamo.model';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  data: Prestamo
  
  @Output() sender = new EventEmitter
  montoValido = false;
  constructor() { 
    this.data = {
      cantidadSolicitada: 0,
      fechaPago: new Date()
    }
  }

  ngOnInit(): void {
  this.montoValido = false;
    
  }

  focusOutFunction() {
    this.sender.emit(this.data);
  }

  validaMonto() {
    if (this.data.cantidadSolicitada! >= 1000 && this.data.cantidadSolicitada! <= 200000 ) {
    this.montoValido = false
    } else {
      document.getElementById('monto')!.focus();
      this.montoValido = true
    }
  }

}
