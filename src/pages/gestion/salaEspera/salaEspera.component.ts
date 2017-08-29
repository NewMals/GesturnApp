import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DTOticket } from "../../../DTO/ticket";
import { Api } from "../../../providers/api";
import { NavController, ModalController } from "ionic-angular";
import { FirstRunPage } from "../../pages";
import { TicketPage } from "../ticket/Ticket.component";

@Component({
    selector: 'page-salaEspera',
    templateUrl: 'salaEspera.component.html'
})
export class salaEsperaPage {

    arrayTicket = new Array<DTOticket>();
    
    constructor(public storage: Storage
        , public api: Api
        , public navCtrl: NavController
        , public modalCtrl: ModalController){
            this.listaTicket();
    }

    listaTicket(){
        this.api.get('ticket/sala').subscribe(response => {
            if(response.status == 200){
                this.arrayTicket =  response.json();
           }
        });
    }

    cerrarSesion(){
        this.storage.set('Usuario', JSON.stringify(null));
        this.storage.set('Ticket', JSON.stringify(null));
        this.navCtrl.push(FirstRunPage);
    }

    verTicket(){
        let modal = this.modalCtrl.create(TicketPage);
        modal.present();
    }
}