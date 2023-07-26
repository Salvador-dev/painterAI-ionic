import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent  implements OnInit {

  @Input() post!: Post;
  @Input() isNew!: boolean;

  selectImage: string = '';
  

  constructor(
    public platform: Platform,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.selectImage = this.post.images[0];
  }

  saveImage(){

    if(this.platform.is('capacitor')){

      //compartir

    } else {
      this.utilsService.saveImageInWeb(this.selectImage);
    }

  }

  copyPromptToClipboard(){

    this.utilsService.copyToClipboard(this.post.prompt);
    this.utilsService.presentToast({
      message: 'Copiado a portapapeles',
      icon: 'clipboard-outline',
      duration: 1000,
      color: 'primary'
    });

  }

}
