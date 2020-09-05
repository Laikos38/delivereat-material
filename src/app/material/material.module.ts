import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule
} from '@angular/material';


const myModules = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule
]

@NgModule({
  imports: [
    myModules
  ],
  exports: [
    myModules
  ]
})
export class MaterialModule { }
