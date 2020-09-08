import { Component, OnInit } from "@angular/core";
import swal from "sweetalert";
import { Router } from "@angular/router";

@Component({
  selector: "app-resumen",
  templateUrl: "./resumen.component.html",
  styleUrls: ["./resumen.component.scss"],
})
export class ResumenComponent implements OnInit {
  descripcion: string;
  ciudad: string;
  calleOrigen: string;
  alturaOrigen: string;
  calleDestino: string;
  alturaDestino: string;
  loAntesPosible: string;
  fechaEntrega: string;
  horaEntrega: string;
  pagasCon: string;
  importeTotal: string;
  formaPago: string;
  vuelto: number;
  ultimos4DigitosTarjeta: string;

  constructor(private router: Router) {}

  ngOnInit() {
    /* Datos mock
    localStorage.setItem("pedidoDescripcion", "Cuatro paquetes de macucas");
    localStorage.setItem("pedidoCiudad", "Córdoba Capital");
    localStorage.setItem("pedidoCalleOrigen", "Chacabuco");
    localStorage.setItem("pedidoAlturaOrigen", "550");
    localStorage.setItem("pedidoCalleDestino", "Estrada");
    localStorage.setItem("pedidoAlturaDestino", "59");
    localStorage.setItem("pedidoHoraEntrega", "15:30");
    localStorage.setItem("pedidoFechaEntrega", "2020-09-24");
    localStorage.setItem("loAntesPosible", "true");
    //localStorage.setItem("formaPago", "Efectivo");
    localStorage.setItem("pagasCon", "500");
    localStorage.setItem("ultimos4DigitosTarjeta", "1234");
    localStorage.setItem("formaPago", "Tarjeta");
*/
    let aux = localStorage.getItem("pedidoDescripcion");
    aux ? (this.descripcion = aux) : (this.descripcion = "");

    aux = localStorage.getItem("pedidoCiudadNombre");
    aux ? (this.ciudad = aux) : (this.ciudad = "");

    aux = localStorage.getItem("pedidoCalleOrigen");
    aux ? (this.calleOrigen = aux) : (this.calleOrigen = "");

    aux = localStorage.getItem("pedidoAlturaOrigen");
    aux ? (this.alturaOrigen = aux) : (this.alturaOrigen = "");

    aux = localStorage.getItem("pedidoCalleDestino");
    aux ? (this.calleDestino = aux) : (this.calleDestino = "");

    aux = localStorage.getItem("pedidoAlturaDestino");
    aux ? (this.alturaDestino = aux) : (this.alturaDestino = "");

    aux = localStorage.getItem("pedidoHoraEntrega");
    aux ? (this.horaEntrega = aux) : (this.horaEntrega = "");

    aux = localStorage.getItem("pedidoFechaEntrega");
    aux ? (this.fechaEntrega = aux) : (this.fechaEntrega = "");

    aux = localStorage.getItem("loAntesPosible");
    aux ? (this.loAntesPosible = aux) : (this.loAntesPosible = "");

    aux = localStorage.getItem("formaPago");
    aux ? (this.formaPago = aux) : (this.formaPago = "");

    aux = localStorage.getItem("pagasCon");
    if (aux) {
      this.pagasCon = aux;
      this.vuelto = parseInt(aux) - 70;
    } else this.pagasCon = "";

    aux = localStorage.getItem("ultimos4DigitosTarjeta");
    aux
      ? (this.ultimos4DigitosTarjeta = aux)
      : (this.ultimos4DigitosTarjeta = "");
  }

  confirmar() {
    swal({
      title: "Pedido Confirmado",
      icon: "success",
      text: "El cadete se está dirigiendo al comercio.",
      closeOnClickOutside: true,
      buttons: [false],
    });
    setTimeout(() => {
      swal.close();
      localStorage.clear();
      this.router.navigate(["/home"]);
    }, 3000);
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
          buttons: [false],
        });
        localStorage.clear();
      }
    });
  }
}
