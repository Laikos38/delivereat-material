import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openDialog() {
    swal({
      title: "Acerca de DeliverEat",
      text: "Hecho con mucho amor y principalmente paciencia por el grupo 9 de ISW 4k2 2020",
      icon: "info",
    });
  }
}
