import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  cuenta: { identificacion: string, password: string } = {
    identificacion: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public storage: Storage) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.cuenta).subscribe((resp) => {
      if(this.user._user != null){
        this.storage.set('Usuario', JSON.stringify(this.user._user));
        this.navCtrl.push(MainPage);
      }else{
        this.toastError();
      }
    }, (err) => {
      // Unable to log in
       this.toastError();
    });
  }

   toastError(){
     let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
   }
}
