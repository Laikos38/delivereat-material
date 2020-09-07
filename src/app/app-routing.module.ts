import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoqueseaComponent } from './components/loquesea/loquesea.component';
import { PagoComponent } from './components/pago/pago.component';
import { ResumenComponent } from './components/resumen/resumen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'loquesea', component: LoqueseaComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'resumen', component: ResumenComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
