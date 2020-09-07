import { Component, OnInit } from "@angular/core";
import { Modo } from "src/app/models/modo.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Marker } from "src/app/models/marker.model";
import { LocalizerService } from "../../services/localizer.service";
import { Address } from "../../models/address.model";
import swal from "sweetalert";
import { City } from "../../models/city.model";
import { Time } from "@angular/common";
import { Pedido } from "src/app/models/pedido.model";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-loquesea",
  templateUrl: "./loquesea.component.html",
  styleUrls: ["./loquesea.component.scss"],
})
export class LoqueseaComponent implements OnInit {
  modo: Modo;
  seleccionar: string;
  imageUrl: any;
  formLoQueSea: FormGroup;
  formDirLocal: FormGroup;
  marker: Marker;
  mapLat: number;
  mapLong: number;
  markerVisible = true;
  ciudadOrigen: number;
  noChange: boolean = false;
  loantesposible: boolean = true;
  date: Date = new Date();
  dateMax: Date = new Date();
  timeMin: string = "";
  pedido: Pedido = new Pedido();

  cities: City[] = [
    { city: "Ciudad de Córdoba", value: 1 },
    { city: "Las Varillas", value: 2 },
    { city: "Río Tercero", value: 3 },
    { city: "Villa Carlos Paz", value: 4 },
    { city: "Villa María", value: 5 },
    { city: "San Francisco", value: 6 },
    { city: "Río Cuarto", value: 7 },
    { city: "Villa Allende", value: 8 },
    { city: "Cosquín", value: 9 },
    { city: "La Falda", value: 10 },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private localizer: LocalizerService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.dateMax.setDate(this.date.getDate() + 30);
  }

  ngOnInit() {
    this.mapLat = -31.4255279;
    this.mapLong = -64.18481;
    this.marker = new Marker();
    this.modo = Modo.PideLoQueSea;
    this.formLoQueSea = this.formBuilder.group({
      Descripcion: ["", [Validators.required, Validators.maxLength(255)]],
      fechaEntrega: [{ value: "", disabled: true }, [Validators.required]],
      horaEntrega: [{ value: "", disabled: true }, [Validators.required]],
    });
    this.formDirLocal = this.formBuilder.group({
      Ciudad: [this.cities[0].value, [Validators.required]],
      Calle: ["", [Validators.required, Validators.maxLength(255)]],
      Numero: ["", [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      Descripcion: ["", [Validators.maxLength(255)]],
    });
    this.formDirLocal.valueChanges.subscribe((resp) => {
      if (!this.noChange) {
        this.getCoords();
      }
    });

    // Cargar de localstorage
    let aux = localStorage.getItem("pedidoDescripcion");
    if (aux) {
      this.formLoQueSea.controls.Descripcion.setValue(aux);
      aux = localStorage.getItem("image");
      if (aux) {
        this.imageUrl = aux;
      }
    }
  }

  getTime() {
    let dateString = this.formatDate(this.date);
    let dateString2 = this.formatDate(
      this.formLoQueSea.controls.fechaEntrega.value
    );
    if (dateString == dateString2) {
      let ahora = new Date();
      let hora =
        ahora.getHours().toString() + ":" + ahora.getMinutes().toString();
      return hora;
    }
  }

  formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  habilitarFechaEntrega() {
    if (this.loantesposible) {
      this.loantesposible = false;
      this.formLoQueSea.controls.fechaEntrega.enable();
      this.formLoQueSea.controls.horaEntrega.enable();
    } else {
      this.loantesposible = true;
      this.formLoQueSea.controls.fechaEntrega.disable();
      this.formLoQueSea.controls.horaEntrega.disable();
    }
  }

  getCoords() {
    const street = this.formDirLocal.controls.Calle.value;
    const sNumber = this.formDirLocal.controls.Numero.value;
    const cityValue = this.formDirLocal.controls.Ciudad.value;
    let cityName: string;
    if (this.formDirLocal.invalid) {
      return;
    }
    for (const city of this.cities) {
      if (city.value === cityValue) {
        cityName = city.city;
        break;
      }
    }

    this.localizer
      .getCoords(street, sNumber, cityName)
      .subscribe((resp: any) => {
        if (resp.status === "ZERO_RESULTS") {
          this.markerVisible = false;
          return;
        }
        if (resp.results[0].partial_match) {
          this.markerVisible = false;
          return;
        }
        this.markerVisible = true;
        this.marker.lat = resp.results[0].geometry.location.lat;
        this.marker.long = resp.results[0].geometry.location.lng;
        this.mapLat = this.marker.lat;
        this.mapLong = this.marker.long;
      });
  }

  addMarker(event) {
    const coords: { lat: number; lng: number } = event.coords;
    let address = new Address();

    this.localizer.getAddress(coords.lat, coords.lng).subscribe((resp: any) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].types[0] === "locality") {
          // tslint:disable-next-line: max-line-length
          address = {
            number: resp[0].address_components[0].long_name,
            street: resp[0].address_components[1].long_name,
            city: resp[i].address_components[0].long_name,
          };
          break;
        }
      }
      if (this.validarCiudad(address) === 0) {
        return;
      }

      this.marker.lat = coords.lat;
      this.marker.long = coords.lng;
      this.noChange = true;
      this.formDirLocal.controls.Ciudad.setValue(this.validarCiudad(address));
      this.formDirLocal.controls.Calle.setValue(address.street);
      this.formDirLocal.controls.Numero.setValue(address.number);
      this.noChange = false;
      this.markerVisible = true;
    });
  }

  validarCiudad(address: Address): number {
    if (this.modo === Modo.SeleccionarDestino) {
      let cityName = "";
      for (const city of this.cities) {
        if (city.value === this.ciudadOrigen) {
          cityName = city.city;
        }
      }
      if (cityName === address.city) {
        return this.ciudadOrigen;
      }
      this.openSnackBar("El envío debe ser dentro de " + cityName);
      return 0;
    }
    for (const city of this.cities) {
      if (address.city === city.city) {
        return city.value;
      }
    }
    this.openSnackBar("No tenemos cobertura en esta zona :(");
    return 0;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ["error-snackbar"],
    });
  }

  onSelectImage(event) {
    // Valido que sea tipo jpg.
    if (event.target.files[0].type !== "image/jpeg") {
      this.dialogError("Unicamente se pueden subir imagenes JPG");
      return;
    }
    // Valido que no pese más de 5 mbs.
    if (event.target.files[0].size > 5000000) {
      this.dialogError("El archivo pesa más de 5 Mbs");
      return;
    }
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event) => {
        this.imageUrl = reader.result;
        localStorage.setItem("image", this.imageUrl);
      };
    }
  }

  dialogError(error: string) {
    swal({
      title: "Fracaso",
      text: error,
      icon: "error",
      closeOnClickOutside: true,
      buttons: [false],
    });
    setTimeout(() => {
      swal.close();
    }, 3000);
  }

  cambiarModo(modo: string) {
    switch (modo) {
      case "select_origen": {
        this.formLoQueSea.markAllAsTouched();
        if (this.formLoQueSea.invalid) {
          return;
        }

        // Cargar del localstorage
        let aux = localStorage.getItem("pedidoCiudad");
        if (aux) {
          this.formDirLocal.controls.Ciudad.setValue(parseInt(aux));
          aux = localStorage.getItem("pedidoCalleOrigen");
          this.formDirLocal.controls.Calle.setValue(aux);
          aux = localStorage.getItem("pedidoAlturaOrigen");
          this.formDirLocal.controls.Numero.setValue(aux);
          aux = localStorage.getItem("pedidoReferenciaOrigen");
          if (aux) {
            this.formDirLocal.controls.Descripcion.setValue(aux);
          }
        }

        // Guardar en localstorage
        localStorage.setItem(
          "pedidoDescripcion",
          this.formLoQueSea.controls.Descripcion.value
        );
        if (this.loantesposible) {
          localStorage.setItem("loAntesPosible", "true");
        } else {
          localStorage.setItem("loAntesPosible", "false");
          localStorage.setItem(
            "pedidoFechaEntrega",
            this.formatDate(this.formLoQueSea.controls.fechaEntrega.value)
          );
          localStorage.setItem(
            "pedidoHoraEntrega",
            this.formLoQueSea.controls.horaEntrega.value
          );
        }

        this.modo = Modo.SeleccionarOrigen;
        this.seleccionar = 'dirección del comercio';

        break;
      }
      case "select_destino": {
        this.formDirLocal.controls.Calle.markAsTouched();
        this.formDirLocal.controls.Numero.markAsTouched();
        if (this.formDirLocal.invalid) {
          return;
        }

        // Guardar en localstorage
        localStorage.setItem(
          "pedidoCiudad",
          this.formDirLocal.controls.Ciudad.value
        );

        let cityOrigen = this.cities.find(
          (x) => x.value == this.formDirLocal.controls.Ciudad.value
        );
        localStorage.setItem("pedidoCiudadNombre", cityOrigen.city);

        localStorage.setItem(
          "pedidoCalleOrigen",
          this.formDirLocal.controls.Calle.value
        );
        localStorage.setItem(
          "pedidoAlturaOrigen",
          this.formDirLocal.controls.Numero.value
        );
        if (this.formDirLocal.controls.Descripcion.value) {
          localStorage.setItem(
            "pedidoReferenciaOrigen",
            this.formDirLocal.controls.Descripcion.value
          );
        } else {
          localStorage.setItem("pedidoReferenciaOrigen", "");
        }

        // Cargar del localstorage
        let aux = localStorage.getItem("pedidoCalleDestino");
        if (aux) {
          this.formDirLocal.controls.Calle.setValue(aux);
          aux = localStorage.getItem("pedidoAlturaDestino");
          this.formDirLocal.controls.Numero.setValue(aux);
          aux = localStorage.getItem("pedidoReferenciaDestino");
          if (aux) {
            this.formDirLocal.controls.Descripcion.setValue(aux);
          } else {
            this.formDirLocal.controls.Descripcion.setValue("");
          }
          aux = localStorage.getItem("pedidoCiudad");
          this.formDirLocal.controls.Ciudad.setValue(parseInt(aux));
          this.ciudadOrigen = parseInt(aux);
        } else {
          this.ciudadOrigen = this.formDirLocal.controls.Ciudad.value;
          this.formDirLocal.reset();
          this.formDirLocal.controls.Ciudad.setValue(this.ciudadOrigen);
        }

        this.modo = Modo.SeleccionarDestino;
        this.seleccionar = 'dirección de entrega';
        this.formDirLocal.controls.Ciudad.disable();
        this.markerVisible = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  irAPago() {
    // Guardar en localstorage
    localStorage.setItem(
      "pedidoCalleDestino",
      this.formDirLocal.controls.Calle.value
    );
    localStorage.setItem(
      "pedidoAlturaDestino",
      this.formDirLocal.controls.Numero.value
    );
    if (this.formDirLocal.controls.Descripcion.value) {
      localStorage.setItem(
        "pedidoReferenciaDestino",
        this.formDirLocal.controls.Descripcion.value
      );
    } else {
      localStorage.setItem("pedidoReferenciaDestino", "");
    }

    this.router.navigate(["/pago"]);
  }

  cancelar() {
    swal({
      title: "Confirmar",
      text: "¿Estás seguro de cancelar tu pedido?",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((cancelar) => {
      if (cancelar) {
        setTimeout(() => {
          swal.close();
          this.router.navigate(["/home"]);
        }, 2000);
        swal("Pedido cancelado!", {
          icon: "success",
        });
        localStorage.clear();
      }
    });
  }
}
