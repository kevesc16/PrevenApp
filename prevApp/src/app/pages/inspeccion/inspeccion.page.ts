import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
//import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.page.html',
  styleUrls: ['./inspeccion.page.scss'],
})
export class InspeccionPage implements OnInit {

  constructor(
    private navCtrl:NavController,
  //  private cam: CameraResultType

    ) { }

  ngOnInit() {
//Camera.requestPermissions()
  }
    goBack() {
      this.navCtrl.back();
    }

    /*async takephoto() {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera
        });
        var imageUrl = image.webPath;
      };*/

    }

