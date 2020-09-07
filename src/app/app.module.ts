import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./components/home/home.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { LoqueseaComponent } from "./components/loquesea/loquesea.component";
import { MaterialModule } from "./material/material.module";
import { PagoComponent } from "./components/pago/pago.component";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ResumenComponent } from './components/resumen/resumen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopbarComponent,
    LoqueseaComponent,
    PagoComponent,
    ResumenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD4HRCOA8f1OaZpZtY78Bh20Kk0bopb8Zs",
    }),
    NgxMaterialTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
