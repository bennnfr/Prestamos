import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Prestamo } from '../../models/prestamo.model';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})

export class PrestamoComponent implements OnInit {
  
  public usr: User
  valorSolicitado: Prestamo;

  allUsers: any
  usuariosPrestamo: any[] = [];
  correoValido = false;
  capital!: number
  resul = 0;
  
  mont!: number;
  constructor( public fire: FirebaseService,
               public firestore: AngularFirestore,
               public router: Router ) {
                  this.usr = {
                  nombre: '',
                  correo: '',
                  cedula: ''
                 }
                 this.valorSolicitado = {
                   cantidadSolicitada: 0,
                   fechaPago: new Date('01/01/01')
                 }
               }

  ngOnInit(): void {
    this.resul = 0
    this.capital = 0
    this.correoValido = false;
    this.allUsers = [];
    this.usuariosPrestamo = [];
    this.getUsers();
    this.fire.getUsersPrestamo().subscribe( r => {
      r.docs.forEach( doc => {
        if ( doc.get('Estatus') === 'Aprobada' ) {
          this.resul = (this.resul + doc.get('ValorSol'))
        }
      } )
      this.capital = environment.capitalBaseBanco - this.resul;
      this.mont = this.capital
    })
  }


  recive( event: Prestamo ) {
    this.valorSolicitado = event;
  }

  validaEmail() {
  const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const resultado = regex.test(this.usr.correo);

  if (resultado === true) {
    this.correoValido = false;
  } else {
    document.getElementById('mail')!.focus();
    this.correoValido = true;
  }
  }

  registerUser() {
    if ( (this.mont - this.valorSolicitado.cantidadSolicitada!) <= 0  ) {
      Swal.fire( 'El banco no tiene fondos suficientes para cubiri la cantidad solicitada', '', 'info' )
      .then( () => this.ngOnInit() )
    } else {
      if ( Math.random() < 0.5 ) {
        if ( this.usr.nombre === '' || this.usr.correo === '' || this.usr.cedula === '' || this.valorSolicitado.cantidadSolicitada === 0) {
          Swal.fire( 'Los valores marcados con * son obligatorios', '', 'warning' )
        } else {
          this.firestore.collection('usuarios').add({
            Nombre: this.usr.nombre,
            Correo: this.usr.correo,
            Cedula: this.usr.cedula,
            ValorSol: this.valorSolicitado.cantidadSolicitada,
            FechaApagar: this.valorSolicitado.fechaPago,
            Estatus: 'Aprobada'
        })
        .then(() => {
          Swal.fire({
            title: 'La solicitud fue registrada con exito',
            text:  '',
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: false,
            allowOutsideClick: false
          })
           .then( () => {
             this.usr.nombre = '',
             this.usr.correo = '',
             this.usr.cedula = '',
             this.valorSolicitado.cantidadSolicitada = 0,
             
             this.ngOnInit()} )
        })
        .catch(e => {
          console.log(e);
          Swal.fire('Ocurrio un error en el registro', '', 'error')
          .then( () => this.ngOnInit() )
        })
        }
        
      } else {
          this.firestore.collection('usuarios').add({
            Nombre: this.usr.nombre,
            Correo: this.usr.correo,
            Cedula: this.usr.cedula,
            ValorSol: this.valorSolicitado.cantidadSolicitada,
            FechaApagar: this.valorSolicitado.fechaPago,
            Estatus: 'Rechazada'
        }).then ( () => {
          Swal.fire( 'La solicitud no fue aprobada', '', 'warning' )
          .then( () => {
            this.usr.nombre = '',
            this.usr.correo = '',
            this.usr.cedula = '',
            this.valorSolicitado.cantidadSolicitada = 0,
            
            this.ngOnInit()
          } )
        } )
      }
    }
    
  }

  pagarSolicitud(item: any) {

  if (item.ValorSol === 0) {
    Swal.fire ( 'La solicitud ya se encuentra pagada', '', 'info' )
  } else {
    Swal.fire({
      title: 'Desea pagar la solicitud por la cantidad de',
      text:  '$'+item.ValorSol.toString(),
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( res => {
      Swal.fire(
        'Procesando, por favor espere',
        '',
        'info'
        )
      if ( res.value ) {
        this.fire.updateUserPago(item.id).then( () => { Swal.fire('Solicitud pagada con exito', '', 'success')
        .then( () => { this.ngOnInit() } )
      },(err) => { Swal.fire('Ocurrio un error', '', 'error') }
        )
      } else {
      Swal.fire( 'No se aplico el pago', '', 'info' )
      }
    } );
  }
  
  }

  eliminarSolicitud(item: any) {
    this.fire.eliminarSolicitud(item.id)
    Swal.fire({
      title: 'Desea eliminar la solicitud seleccionada',
      text:  '',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( res => {
      Swal.fire(
        'Procesando, por favor espere',
        '',
        'info'
        )
      if ( res.value ) {
        this.fire.eliminarSolicitud(item.id).then( () => { Swal.fire('Solicitud eliminada con exito', '', 'success')
        .then( () => { this.ngOnInit() } )
      },(err) => { Swal.fire('Ocurrio un error', '', 'error') }
        )
      } else {
      Swal.fire( 'No se elimino la solicitud', '', 'info' )
      }
    } );
  }

  async getUsers() {
    this.allUsers = await this.fire.getAllUsers();
   }

}
