export class Pedido {
    descripcion: string;
    loAntesPosible?: boolean;
    fechaEntrega?: Date;
    horaEntrega?: string;
    ciudad: string;
    calleOrigen: string;
    alturaOrigen: string;
    referenciaOrigen?: string;
    calleDestino: string;
    alturaDestino: string;
    referenciaDestino?: string;

    constructor() {
        this.descripcion = '';
        this.loAntesPosible = null;
        this.fechaEntrega = null;
        this.horaEntrega = '';
        this.ciudad = '';
        this.calleOrigen = '';
        this.alturaOrigen = '';
        this.referenciaOrigen = '';
        this.calleDestino = '';
        this.alturaDestino = '';
        this.referenciaDestino = '';
    }
}
