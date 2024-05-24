import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {PhotoStorageService}from 'src/app/services/photo-storage.service'
import { StorageService } from 'src/app/services/storage.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.page.html',
  styleUrls: ['./inspeccion.page.scss'],
})
export class InspeccionPage implements OnInit {
//inspeccion:string[]=[];
 photo:string[]=[];
 nombre:string="";
 ubicacion:string="";
 descripcion:string="";
 importancia:string="";
 tipo:string ="";
 empresa:string="";
 persona:string="";

  constructor(
    private navCtrl: NavController,
    private photoService: PhotoStorageService,
    private storage: StorageService,
    private helper :HelperService,

  ) { }

  ngOnInit() {
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    this.photo.push (image.webPath!) ;
     await this.photoService.savePicture(image);
  }
  async selectPictureFromGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    this.photoService.savePicture(image);
    this.photo.push(image.webPath!);
    await this.photoService.savePicture(image);
  }

  goBack() {
    this.navCtrl.back();
  }
  async deletePicture(photo: string) {
    await Filesystem.deleteFile({
      path: photo,
      directory: Directory.Data
    });
    this.photo = this.photo.filter(p => p !== photo);
  }
  async subirInsp(){
    const loader = await this.helper.showLoader('Cargando');
    try {
      if(this.nombre===""){
        await loader.dismiss();
        await this.helper.showAlert('Debe ingresar un nombre','Ingrese el nombre')
        return;
      }
    if (!this.importancia){
      await loader.dismiss();
      await this.helper.showAlert('Debe seleccionar la importancia','Ingrese la importancia')
      return;
    }
    if (!this.tipo){
      await loader.dismiss();
      await this.helper.showAlert('Debe seleccionar el tipo de operación','Ingrese el tipo de operación')
      return;
    }
    if (!this.empresa){
      await loader.dismiss();
      await this.helper.showAlert('Debe ingresar una empresa','Ingrese la empresa')
      return;
    }
    if (this.ubicacion===""){
      await loader.dismiss();
      await this.helper.showAlert('Debe ingresar una ubicacion','Ingrese la ubicacion')
      return;
    }
    if (!this.persona){
      await loader.dismiss();
      await this.helper.showAlert('Debe ingresar una persona','Ingrese la persona')
      return;
    }
    if (this.descripcion===""){
      await loader.dismiss();
      await this.helper.showAlert('Debe ingresar una descripcion','Ingrese la descripcion')
      return;
    }
    if (this.photo.length===0){
      await loader.dismiss();
      await this.helper.showAlert('Debe ingresar una foto','Ingrese la foto')
      return;
    }
    } catch (error) {
      await loader.dismiss();
      await this.helper.showAlert('Ha ocurrido un error', 'Error');
    }

    await loader.dismiss();



      var inspeccion=[
        {
          nombre: this.nombre,
          foto: this.photo,
          ubicacion: this.ubicacion,
          descripcion: this.descripcion,
          importancia: this.importancia,
          tipo: this.tipo,
          empresa: this.empresa,
          persona: this.persona
        }
      ]
      
      await loader.dismiss();
      this.storage.agregarInspeccion(inspeccion);
      await this.helper.showAlert('Inspeccion guardada correctamente','Guardado')
      this.nombre="";
      this.importancia="";
      this.tipo="";
      this.empresa="";
      this.persona="";
      this.ubicacion="";
      this.descripcion="";
      this.photo=[];
      console.log('nombre:', this.nombre);
      console.log('ubicacion:', this.ubicacion);
      await loader.dismiss();
      this.navCtrl.navigateRoot('menu');
      await loader.dismiss();

    }


  }

