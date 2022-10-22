import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin=true;
  constructor( 
    private authService: AuthService, 
    private router:Router,
    private loadingCtrl:LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    //console.log(form);
    if(!form.valid){
      return;
    }

    const username = form.value.email;
    const password = form.value.password;

    console.log(username, password);
    if(this.isLogin){
      //send login request..
      this.loadingCtrl.create({keyboardClose:true,message:'Logging in'})
      .then(loadingEl =>{
        loadingEl.present();
        this.authService.userLogin(username,password)
        .subscribe(
          user => {
            if (user && user.access_token) {
                    this.isLoading= false;
                    loadingEl.dismiss();
                    this.router.navigateByUrl('/home/tabs/cnn')
                    
                }else{
                    this.isLoading= false;
                    loadingEl.dismiss();
                    this.showAlert('An error ocurred!',"Invalid user password or username")
                    //this.alertService.error("Invalid user password or username"); 
              }
          },
          error => {
              console.log("On Login",error);
              this.isLoading= false;
              loadingEl.dismiss();
              this.showAlert('An error ocurred!',JSON.stringify(error.error))
              //this.alertService.error(error.error);  
          });
        });
    }else{
      //send for sign up...
      this.loadingCtrl.create({keyboardClose:true,message:'Registering user'})
      .then(loadingEl =>{
        loadingEl.present();
        this.authService.userRegistered(username,password)
        .subscribe(
          user => {
              this.isLoading= false;
              loadingEl.dismiss();
              this.showAlert('Succefully registered',user.message);
            },
          error => {
              console.log("On Register",error);
              this.isLoading= false;
              loadingEl.dismiss();
              this.showAlert('An error ocurred!',JSON.stringify(error.error))
          });
        });  
    }
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }

  showAlert(header,message){
    this.alertCtrl
              .create({
                header: header,
                message: message,
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      //TODO..
                    }
                  }
                ]
              })
              .then(alertEl => alertEl.present());
  }

}
