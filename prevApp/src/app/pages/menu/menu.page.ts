import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IonCard , AnimationController, MenuController} from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { Menu } from 'src/app/models/menu';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  nombre:string="";
  private animation!: Animation;

  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  menuArray:Menu[]=[]
  loading:boolean= true;

  constructor(  private router: Router,
    private animationCtrl: AnimationController,
    private helper:HelperService,
    private menuCtrl:MenuController,
    private auth:AngularFireAuth,
    private storage:StorageService,
) { }

  ngOnInit() {
    this.mostrarToastUser();
    this.cargarMenu()
    setTimeout(this.simularCargaMenu,2000);
  }

  closemenu(){
    this.menuCtrl.close();
  }
  simularCargaMenu =()=>
  this.loading= false;

  cargarMenu(){
    var par=456
    this.menuArray.push(
      {
        id:1,
        titulo:"Inpeccionar",
        url:"/"+"inspeccion",
        icono:"search-outline",
    })
  }




async mostrarToastUser(){
const users = await this.storage.obtenerUsuario();
const emailFirebaseUser= await this.auth.currentUser;
//console.log("Usuario firebase",emailFirebaseUser?.email);
//console.log("Usuarios de storage",users);
const userFilter = users.filter(e => e.correo == emailFirebaseUser?.email)
//console.log("Usuario filtrado",userFilter[0].nombre);
await this.helper.showToast("Bienvenid@ "+userFilter[0].correo);
}

async logOut() {
    var confirmar = await this.helper.showConfirm("Desea cerrar la sesión actual?","Confirmar","Cancelar");
    if (confirmar == true) {
      await this.auth.signOut();
      await this.router.navigateByUrl("login");
    }
  }

  toggle(){
    this.menuCtrl.toggle();
  }

  cerrarMenu(){
    this.menuCtrl.close();
  }

  perfil(){
    this.router.navigateByUrl("perfil");
  }
}
