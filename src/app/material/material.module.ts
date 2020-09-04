import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
} from '@angular/material';


const myModules = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
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
