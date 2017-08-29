import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  cuenta: { nombres: string, email: string, contrasena: string , identificacion : number } = {
    nombres: '',
    email: '',
    contrasena: '',
    identificacion: 0
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public storage: Storage) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.cuenta).subscribe((resp) => {
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
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
   }
}
