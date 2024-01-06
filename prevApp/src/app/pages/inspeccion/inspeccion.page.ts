import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {PhotoStorageService}from 'src/app/services/photo-storage.service'
import {InspeStorageService}from 'src/app/services/inspe-storage.service'

@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.page.html',
  styleUrls: ['./inspeccion.page.scss'],
})
export class InspeccionPage implements OnInit {
inspeccion:string[]=[];
 photo:string[]=[];
 ubicacion:string="";
 descripcion:string="";
 importancia:string="";
 tipo:string="";
 empresa:string="";
 persona:string="";

  constructor(
    private navCtrl: NavController,
    private photoService: PhotoStorageService,
    private storage:InspeStorageService

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
    /*
    if (this.importancia===""){
      await loader.dismiss();
      await this.helper.showAlert('Debe seleccionar la importancia')
      return;*/
      this.inspeccion.push(this.ubicacion,this.descripcion,this.importancia,this.persona,this.tipo,this.empresa);
      this.inspeccion = this.inspeccion.concat(this.photo);
      //this.storage.saveInsp(this.inspeccion);
    }


  }

