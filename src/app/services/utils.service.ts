import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';
import * as fs from 'file-saver';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  async shareImageInMobile(url: string){

    let base64: string;
    let path = `${Date.now()}.jpg`;

    if(url.includes('https')){
      base64 = this.convertUrlToBase64(url) as unknown as string;
    } else {

      base64 = url;
    }

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache
    }).then(async (res)=> {

      await Share.share({url: res.uri}).then(() => {
        this.presentToast({
          message: 'Imagen',
          color: 'primary',
          icon: 'share-social-outline',
          duration: 1000
        })
      })

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      })


    })

  }

  async convertUrlToBase64(url: string){

    let response = await fetch(url);

    let blob = await response.blob();

    return new Promise((resolve, reject) => {

      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      }

      reader.readAsDataURL(blob);

    });

  }

  saveImageInWeb(url: string){

    return fs.saveAs(url, `${Date.now()}.jpg`);

  }

  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
  
    await modal.present();
  
  }

  dismissModal(){
    return this.modalController.dismiss();
  }



  async copyToClipboard(string: string) {
    return await Clipboard.write({string});
  }

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

}
