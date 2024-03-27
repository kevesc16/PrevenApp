import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
const storageUsuario = "usuarioData";
const StorageInspeccion="inspeccionData";
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  userCorreo: any;

  constructor() { }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }


  async setItem(llave:string, valor:string){
    await Preferences.set({key:llave,value:valor});
  }


  async obtenerUsuario(){
    const storageData = await this.getItem(storageUsuario);
    if (storageData == null) {
      return [];
    }

    const data:any[] = JSON.parse(storageData);
    if (data) {
      return data;
    }else{
      return [];
    }
  }

  async agregarUsuario(user:any[]){
    const usuarios = await this.obtenerUsuario();
    for (const i of usuarios) {
      if (i) {
        user.push(i);
      }
    }

    this.setItem(storageUsuario,JSON.stringify(user));

  }

async getNombreUsuario(): Promise<string | null> {
  return this.getItem('nombreUsuario');
}

async agregarInspeccion(inspeccion: any) {
  const inspeccionData = await this.obtenerInspecciones();
  inspeccionData.push(inspeccion);
  this.setItem('inspecciones', JSON.stringify(inspeccionData));
}

async obtenerInspecciones(): Promise<any[]> {
  const inspeccionData = await this.getItem('inspecciones');
  if (inspeccionData== null) {
    return [];
  }
  const data:any[]=JSON.parse(inspeccionData)
  if (data) {
    return data;
}else{
  return [];
}

  }
}




