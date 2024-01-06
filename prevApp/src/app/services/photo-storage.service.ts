import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class PhotoStorageService {

  constructor() { }
   async savePicture(cameraPhoto: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Generate a unique filename
    const fileName = new Date().getTime() + '.jpeg';

    // Save the picture to Preferences
    await Preferences.set({
      key: fileName,
      value: base64Data
    });

    // Return the file information
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

   async readAsBase64(cameraPhoto: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

   convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
