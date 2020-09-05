import { Component, OnInit } from '@angular/core';
import { Modo } from 'src/app/models/modo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marker } from 'src/app/models/marker.model';
import { LocalizerService } from '../../services/localizer.service';
import { Address } from '../../models/address.model';
import swal from 'sweetalert';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-loquesea',
  templateUrl: './loquesea.component.html',
  styleUrls: ['./loquesea.component.scss']
})
export class LoqueseaComponent implements OnInit {
  modo: Modo;
  seleccionar: string;
  imageUrl: any;
  formLoQueSea: FormGroup;
  formDirLocal: FormGroup;
  marker: Marker;
  cities: City[] = [
    {city: 'Ciudad de Córdoba', value: 1},
    {city: 'Las Varillas', value: 2},
    {city: 'Río Tercero', value: 3},
    {city: 'Villa Carlos Paz', value: 4},
    {city: 'Villa María', value: 5},
    {city: 'San Francisco', value: 6},
    {city: 'Río Cuarto', value: 7},
    {city: 'Villa Allende', value: 8},
    {city: 'Cosquín', value: 9},
    {city: 'La Falda', value: 10}
];

  constructor(private formBuilder: FormBuilder, private localizer: LocalizerService) { }

  ngOnInit() {
    this.marker = new Marker();
    this.modo = Modo.PideLoQueSea;
    this.formLoQueSea = this.formBuilder.group({
      Descripcion: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.formDirLocal = this.formBuilder.group({
      Ciudad: [this.cities[0].value, [Validators.required]],
      Calle: ['', [Validators.required, Validators.maxLength(255)]],
      Numero: ['', [Validators.required, Validators.pattern('[0-9]{1,7}')]],
      Descripcion: ['', [Validators.maxLength(255)]]
    });


  }

  addMarker(event) {
    const coords: { lat: number, lng: number } = event.coords;
    let address = new Address();
    this.localizer.getAddress(coords.lat, coords.lng).subscribe((resp: any) => {

      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < resp.length; i++) {
        if (resp[i].types[0] === 'locality') {
          // tslint:disable-next-line: max-line-length
          address = { number: resp[0].address_components[0].long_name, street: resp[0].address_components[1].long_name, city: resp[i].address_components[0].long_name};
          break;
        }
      }
      const x = this.validarCiudad(address);
      if ( x === 0) {
        return;
      }
      this.marker.lat = coords.lat;
      this.marker.long = coords.lng;
      this.formDirLocal.controls.Ciudad.setValue(this.validarCiudad(address));
      this.formDirLocal.controls.Calle.setValue(address.street);
      this.formDirLocal.controls.Numero.setValue(address.number);
    });

  }

  validarCiudad(address: Address): number {
    for (let city of this.cities) {
      if (address.city === city.city) {
        return city.value;
      }
    }
    return 0;
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

  cambiarModo(modo: string) {
    switch (modo) {
      case 'select_origen': {
        this.formLoQueSea.controls.Descripcion.markAsTouched();
        if (this.formLoQueSea.invalid) {
          return;
        }
        this.modo = Modo.SeleccionarOrigen;
        this.seleccionar = 'origen';

        break;
      }
      case 'select_destino': {
        this.formDirLocal.controls.Calle.markAsTouched();
        this.formDirLocal.controls.Numero.markAsTouched();
        if (this.formDirLocal.invalid) {
          return;
        }
        this.modo = Modo.SeleccionarDestino;
        this.seleccionar = 'destino';
        break;
      }
      default: {
        break;
      }
   }
  }
}