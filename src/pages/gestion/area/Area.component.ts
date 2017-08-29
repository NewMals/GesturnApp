import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from "../../../providers/api";
import { DTOarea } from "../../../DTO/area";
import { ToastController, NavController } from "ionic-angular";
import { DTOticket } from "../../../DTO/ticket";
import { DTOusuario } from "../../../DTO/usuario";
import { TabsPage } from "../../tabs/tabs";
import { DirecPage } from "../../pages";

@Component({
    selector: 'page-area',
    templateUrl: 'Area.component.html'

})

export class AreaPage {

    arrayArea = new Array<DTOarea>(); 

    constructor(public storage: Storage
        , public api: Api
        , public toastCtrl: ToastController
        , public navCtrl: NavController){
        this.areas();
    }

    areas(){
        this.api.get('area').subscribe(response =>{
           if(response.status == 200){
                this.arrayArea =  response.json();
           }else{
                this.toastError('mensaje por cambiar en area.component consultar areas');
           }
        });

    }

    generarTicket(area : DTOarea){
       this.storage.get('Usuario').then(value => {
            let usuario = JSON.parse(value) as DTOusuario;
            let ticket = new DTOticket;

            ticket.cliente = usuario.id;
            ticket.codigoArea = area.codigo;

            this.api.post('ticket', ticket).subscribe(response =>{
                    if(response.status == 200){
                        this.storage.set('Area', JSON.stringify(area));
                        this.storage.set('Ticket', JSON.stringify(response.json()));
                        this.navCtrl.push(DirecPage);
                }else{
                        this.toastError('mensaje por cambiar en area.component generar ticket');
                }
            }, (err) =>{
                this.toastError('No se encuentra disponible el servidor de Ticket');
            });
       }); 
       
    }

   toastError(mensaje){
     let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 3000,
        position: 'top'
      });
      toast.present();
   }

   obtenerCliente(){
       
   }
  

}