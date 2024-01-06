import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;
  isModalOpen = false;
  infoIcon = 'person-outline';

  constructor(
    private storage: StorageService,
    private auth: AngularFireAuth,
    private navCtrl: NavController

    ) { }

  ngOnInit() {
    this.cargarinfoUser();
  }

  goBack() {
    this.navCtrl.back();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if(isOpen){
      this.navCtrl.navigateForward('/perfil');
    }
  }
  
  async cargarinfoUser() {
    const user = await this.storage.obtenerUsuario();
    const userFirebaseEmail = await this.auth.currentUser;
    const userFilter = user.filter(e => e.correo == userFirebaseEmail?.email);
    await userFilter[0].nombre;
    console.log("infoUser", userFilter[0].nombre);

    console.log("property", this.storage.userCorreo);
    this.usuario = (await this.storage.obtenerUsuario()).filter(e => e.correo == userFirebaseEmail?.email);
    console.log("USUARIO FILTRADO", this.usuario);

  }
}
