import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSnackBarModule
} from "@angular/material";

const myModules = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSnackBarModule
];

@NgModule({
  imports: [myModules],
  exports: [myModules],
})
export class MaterialModule { }