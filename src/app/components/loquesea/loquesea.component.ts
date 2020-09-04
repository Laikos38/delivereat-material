import { Component, OnInit } from '@angular/core';
import { Modo } from 'src/app/models/modo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marker } from 'src/app/models/marker.model';
import { LocalizerService } from '../../services/localizer.service';
import { Address } from '../../models/address.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-loquesea',
  templateUrl: './loquesea.component.html',
  styleUrls: ['./loquesea.component.scss']
})
export class LoqueseaComponent implements OnInit {
  modo: Modo;
  seleccionar: string;
  imageUrl: any;
  submit: boolean;
  formLoQueSea: FormGroup;
  marker: Marker;

  constructor(private formBuilder: FormBuilder, private localizer: LocalizerService) { }

  ngOnInit() {
    this.marker = new Marker();
    this.submit = false;
    this.modo = Modo.PideLoQueSea;
    this.formLoQueSea = this.formBuilder.group({
      Descripcion: ['', [Validators.required, Validators.maxLength(200)]]
    });


  }

  addMarker(event) {
    const coords: { lat: number, lng: number } = event.coords;
    this.marker.lat = coords.lat;
    this.marker.long = coords.lng;
    this.localizer.getAddress(this.marker.lat, this.marker.long).subscribe((resp: any) => {

      console.log(resp);
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < resp.length; i++) {
        if (resp[i].types[0] === 'locality') {
          // tslint:disable-next-line: max-line-length
          const address: Address = { number: resp[0].address_components[0].long_name, street: resp[0].address_components[1].long_name, city: resp[i].address_components[0].long_name};
          console.log(address);
          break;
        }
      }
    });

  }


  onSelectImage(event) {
    // Valido que sea tipo jpg.
    if (event.target.files[0].type !== 'image/jpeg') {
      this.dialogError('Unicamente se pueden subir imagenes JPG');
      return;
    }
    // Valido que no pese más de 5 mbs.
    if (event.target.files[0].size > 5000000) {
      this.dialogError('El archivo pesa más de 5 Mbs');
      return;
    }
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event) => {
        this.imageUrl = reader.result;
      };
    }
  }

  dialogError(error: string) {
    swal({
      title: 'Fracaso',
      text: error,
      icon: 'error',
      closeOnClickOutside: true,
      buttons: [false]
    });
    setTimeout( () => {
      swal.close(); }, 3000 );
  }

  cambiarModo(modo: string){
    switch(modo) { 
      case 'select_origen': { 
        this.submit = true;
        if (this.formLoQueSea.invalid){
          return;
        }
        this.modo = Modo.SeleccionarOrigen;
        this.seleccionar = "origen";
        break; 
      } 
      case 'select_destino': { 
        this.modo = Modo.SeleccionarDestino;
        this.seleccionar = "destino";
        break; 
      } 
      default: { 
        break; 
      } 
   } 
  }
}