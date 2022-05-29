import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-montobanco',
  templateUrl: './montobanco.component.html',
  styleUrls: ['./montobanco.component.css']
})
export class MontobancoComponent implements OnInit {
  @Input() monto: number = 0
  capital!: number
  resul = 0;
  constructor(public fire: FirebaseService) { }

  ngOnInit(): void {
    this.resul = 0
    this.capital = 0
    this.fire.getUsersPrestamo().subscribe( r => {
      r.docs.forEach( doc => {
        if ( doc.get('Estatus') === 'Aprobada' ) {
          this.resul = (this.resul + doc.get('ValorSol'))
        }
        
      } )
      this.capital = environment.capitalBaseBanco - this.resul;
      this.monto = this.capital
    } 
    
    )
  }



}
