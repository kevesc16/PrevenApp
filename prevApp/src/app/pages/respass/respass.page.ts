import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-respass',
  templateUrl: './respass.page.html',
  styleUrls: ['./respass.page.scss'],
})
export class RespassPage implements OnInit {



  correo:string="";
  cCorreo:string="";
  nuevaCont:string="";
  repetirCont:string="";
  loading:boolean= true;

    constructor(
      private helper:HelperService,
      private router:Router,
      private auth: AngularFireAuth,
      private navCtrl: NavController
      ) { }

      goBack() {
        this.navCtrl.back();
      }

      simularCargaMenu =()=>
      this.loading= false;

    ngOnInit() {
      setTimeout(this.simularCargaMenu,1500);
    }
    /*async conf(){
      let confirmar= await this.helper.showConfirm("Seguro que quiere que esta sea su nueva contraseña?","Shi","Ño")
      if (confirmar==true){
        this.helper.showAlert("La contraseña ha sido cambiada!","Aceptar")
        this.router.navigateByUrl('login')
      }
    }*/
  /*async conf(){
    try {
      const email = this.correo;
      await this.helper.changePassword(email);
      this.helper.showAlert("Revisa tu bandeja de entrada","Listo!")
      this.router.navigateByUrl('/login')
    } catch (error: any) {
      if (error.code == 'auth/user-not-found'){
        this.helper.showAlert("El correo ingresado no existe","Error")

      }
    }
  }*/
  async conf(){
    const loader = await this.helper.showLoader("Cargando");
    try {
      const email = this.correo;
      await this.helper.changePassword(email);
      this.helper.showAlert("Revisa tu bandeja de entrada","Listo!")
      await loader.dismiss();
      this.router.navigateByUrl('/login')
    } catch (error: any) {
      if (error.code === 'auth/user-not-found'){
        await loader.dismiss();
        this.helper.showAlert("El correo ingresado no existe","Error");
      }
       if(error.code == 'auth/invalid-email'){
        await loader.dismiss();
        await this.helper.showAlert("Error en el formato del correo","Error");
      }
      if(error.code=='auth/missing-email'){
        await loader.dismiss();
        await this.helper.showAlert("Debe ingresar un correo","Error");
      } /*else {
        console.error(error);
        await loader.dismiss();
        this.helper.showAlert("Ha ocurrido un error", "Error");*/
      }
    }
  }



