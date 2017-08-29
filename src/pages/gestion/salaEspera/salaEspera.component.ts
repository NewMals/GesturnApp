import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DTOticket } from "../../../DTO/ticket";
import { Api } from "../../../providers/api";
import { NavController } from "ionic-angular";
import { FirstRunPage } from "../../pages";

@Component({
    selector: 'page-salaEspera',
    templateUrl: 'salaEspera.component.html'
})
export class salaEsperaPage {

    arrayTicket = new Array<DTOticket>();
    
    constructor(public storage: Storage
        , public api: Api
        , public navCtrl: NavController){
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
        this.navCtrl.push(FirstRunPage);
    }
}