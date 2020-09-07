import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import swal from "sweetalert";
import { Modo } from "src/app/models/modo.model";
import { MatRadioChange } from "@angular/material";
import { dateValidator } from '../../validators/date.validator';


@Component({
  selector: "app-pago",
  templateUrl: "./pago.component.html",
  styleUrls: ["./pago.component.scss"],
})
export class PagoComponent implements OnInit {
  modo: Modo;
  formOpciones: FormGroup;
  formEfectivo: FormGroup;
  formTarjeta: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formOpciones = this.formBuilder.group({
      opcionesPago: ["", Validators.required],
    });
    this.formEfectivo = this.formBuilder.group({
      montoEfectivo: [
        "",
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern("^[1-9][0-9]*$"),
        ],
      ],
    });
    this.formTarjeta = this.formBuilder.group({
      numeroTarjeta: [
        "",
        [
          Validators.required,
          Validators.pattern('4[0-9]{3}[ -]*[0-9]{4}[ -]*[0-9]{4}[ -]*[0-9](?:[0-9]{3})'),
          //Validators.pattern("^4[0-9]{15}$"),
        ],
      ],
      nombreTitular: [
        "",
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern("([A-Za-z]{3,})\\s([A-Za-z]{3,})(\\s([A-Za-z]{3,})){0,2}"),
          //Validators.pattern("(([A-Z]|[a-z])+)\\s(([A-Z]|[a-z])+)(\\s(([A-Z]|[a-z]))*)(\\s(([A-Z]|[a-z]))*)"),
        ],
      ],
      fechaVencimiento: [
        "",
        [Validators.required, Validators.pattern("(1[0-2]|0[1-9])/[0-9]{4}"), dateValidator],
      ],
      codigoSeguridad: [
        "",
        [Validators.required, Validators.pattern("[0-9]{3,4}")],
      ],
    });
  }

  radioChange(change: MatRadioChange) {
    change.source.value === "1"
      ? (this.modo = Modo.PagoEfectivo)
      : (this.modo = Modo.PagoTarjeta);
  }

  validarForm() {
    if (this.modo === 4) {
      this.formEfectivo.markAllAsTouched();
      if (this.formEfectivo.invalid) return;
    } else if (this.modo === 5) {
      this.formTarjeta.markAllAsTouched();
      if (this.formTarjeta.invalid) return;
    }
    window.alert("Pasando a confirmación..");
  }
}
