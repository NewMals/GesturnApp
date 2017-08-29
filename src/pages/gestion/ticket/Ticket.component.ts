import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DTOticket } from "../../../DTO/ticket";
import { Api } from "../../../providers/api";
import { ViewController } from "ionic-angular";

@Component({
    selector: 'page-ticket',
    templateUrl: 'Ticket.component.html'
})
export class TicketPage {

    Ticket = new DTOticket();
    
    constructor(public storage: Storage
        , public api: Api
        , public viewCtrl: ViewController){
            this.verTicket();
    }

    verTicket(){
        this.storage.get('Ticket').then(value => {
            this.Ticket = JSON.parse(value) as DTOticket;
        });
    }

    cerrar(){
         this.viewCtrl.dismiss();
    }
}