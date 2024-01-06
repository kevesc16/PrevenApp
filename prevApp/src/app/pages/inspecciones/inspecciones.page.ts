import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-inspecciones',
  templateUrl: './inspecciones.page.html',
  styleUrls: ['./inspecciones.page.scss'],
})
export class InspeccionesPage implements OnInit {
  loading:boolean= true;

  constructor(
    private router:Router,
    private helper:HelperService,
    private storage:StorageService,
    private auth:AngularFireAuth,
    private navCtrl: NavController) { }



  simularCargaMenu =()=>
  this.loading= false;

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
    this.cargarInfoIns();
    setTimeout(this.simularCargaMenu,1500);
  }
  async cargarInfoIns() {
    const autos = await this.storage;
    console.log("Autos:", autos);
    //this.autos = autos;
  }

  async alerta(){
    let confirmar= await this.helper.showConfirm("Desea confirmar el viaje?","Si","No")
    if(confirmar== true){
      this.helper.showAlert("Su UberFruna ha sido contactado!","Aceptar")
      this.router.navigate(['menu/:correo']);
    }
  }

}









