import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import swal from "sweetalert";
import { Modo } from "src/app/models/modo.model";
import { MatRadioChange } from "@angular/material";

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
      montoEfectivo: ["", [Validators.required, Validators.maxLength(255)]],
    });
    this.formTarjeta = this.formBuilder.group({
      numeroTarjeta: [
        "",
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern("^4[0-9]{6,}$"),
        ],
      ],
      nombreTitular: ["", [Validators.required, Validators.maxLength(255)]],
      fechaVencimiento: [
        "",
        [
          Validators.required,
          Validators.pattern("(1[0-2]|0[1-9]|[1-9])/[0-9]{4}"),
        ],
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
    (this.modo === 5 && this.formTarjeta.invalid) ||
    (this.modo === 4 && this.formEfectivo.invalid)
      ? this.dialogError("Revisá los datos a ingresar")
      : this.dialogSuccess("Hiciste todo bien pa!");
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

  dialogSuccess(msg: string) {
    swal({
      title: "Éxito",
      text: msg,
      icon: "success",
      closeOnClickOutside: true,
      buttons: [false],
    });
    setTimeout(() => {
      swal.close();
    }, 3000);
  }
}
