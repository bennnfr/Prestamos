import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ path: 'prestamo', loadChildren: () => import('./pages/prestamo/prestamo.module').then(m => m.PrestamoModule) },
                        { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
                        { path: '**', redirectTo: 'home' },
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
