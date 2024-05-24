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
  inspecciones:any[]=[];

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
 /*async cargarInfoIns() {
    try {
      const inspecciones = await this.storage.obtenerInspecciones();
      console.log('Inspecciones', inspecciones);
      this.inspecciones = inspecciones;
    } catch (error) {
      console.error('Error al cargar las inspecciones:', error);
    }
  }*/
  async cargarInfoIns() {
    try {
      this.inspecciones = await this.storage.obtenerInspecciones();
      console.log(this.inspecciones);
    } catch (error) {
      console.error(error);
    }
  }

  async alerta(){
   // let confirmar= await this.helper.showConfirm("Desea confirmar el viaje?","Si","No")
    //if(confirmar== true){
      this.helper.showAlert("Weeeenaaaaaa!","Aceptar")
      this.router.navigate(['menu']);

  }

}









