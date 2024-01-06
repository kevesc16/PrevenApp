import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  correo: string = '';
  nacionalidad:string='';
  contrasena: string = '';
  loading: boolean = true;


  constructor(

    private router: Router,
    private helper: HelperService,
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private storage: StorageService
  ) {}
  simularCargaMenu = () => (this.loading = false);


  goBack() {
    this.navCtrl.back();
  }



  ngOnInit() {
    setTimeout(this.simularCargaMenu, 1000);

  }
  async reg() {
    let confirmar = await this.helper.showConfirm(
      'Desea que sus datos sean guardados de manera permanente?',
      'Si',
      'No'
    );
    if (confirmar == true) {
      this.helper.showAlert('Registro completado!', 'Aceptar');
      this.router.navigateByUrl('login');
    }
  }

  async registro() {
    const loader = await this.helper.showLoader('Cargando');

    try {
      if (this.contrasena === '') {
        await loader.dismiss();
        await this.helper.showAlert('Debe ingresar una contraseña', 'Error');
        return;
      }
      if (this.correo === '') {
        await loader.dismiss();
        await this.helper.showAlert('Debe ingresar un correo', 'Error');
        return;
      }
      /*if (this.nombre === '') {
        await loader.dismiss();
        await this.helper.showAlert('Debe ingresar un nombre', 'Error');
        return;
      }*/


      await loader.dismiss();


      var user = [
        {
          correo: this.correo,
          contraseña:this.contrasena
        }
      ];

      await loader.dismiss();
      await this.storage.agregarUsuario(user)
      await this.auth.createUserWithEmailAndPassword(
        this.correo,
        this.contrasena
      );
      await this.helper.showAlert(
        'Usuario registrado corretamente',
        'Información'
      );
      await this.router.navigateByUrl('login');
      await loader.dismiss();
    } catch (error: any) {
      if (error.code == 'auth/email-already-in-use') {
        await loader.dismiss();
        await this.helper.showAlert('El correo ya esta en uso', 'Error');
      }
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert('Error en el formato del correo', 'Error');
      }
      if (error.code == 'auth/missing-email') {
        await loader.dismiss();
        await this.helper.showAlert('Debe ingresar un correo', 'Error');
      }
      if (error.code == 'auth/weak-password') {
        await loader.dismiss();
        await this.helper.showAlert(
          'El largo de la contraseña es incorrecto',
          'Error'
        );
      }
      if (error.code == 'auth/missing-password') {
        await loader.dismiss();
        await this.helper.showAlert('Debe ingresar una contraseña', 'Error');
      }
    }

  }
}

