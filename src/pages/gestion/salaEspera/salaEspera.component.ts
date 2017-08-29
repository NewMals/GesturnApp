import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DTOticket } from "../../../DTO/ticket";
import { Api } from "../../../providers/api";

@Component({
    selector: 'page-salaEspera',
    templateUrl: 'salaEspera.component.html'
})
export class salaEsperaPage {

    arrayTicket = new Array<DTOticket>();
    
    constructor(public storage: Storage
        , public api: Api){
            this.listaTicket();
    }

    listaTicket(){
        this.api.get('ticket/sala').subscribe(response => {
            if(response.status == 200){
                this.arrayTicket =  response.json();
           }
        });
    }
}