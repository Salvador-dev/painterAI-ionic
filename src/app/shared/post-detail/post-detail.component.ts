import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
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
    private utilsService: UtilsService,
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    this.selectImage = this.post.images[0];
  }

  submit(){

    let userPosts: Post[] = this.utilsService.getElementFromLocalStorage('userPosts') || [];

    this.utilsService.presentLoading({ message: 'Publicando...'});

    this.postsService.createPosts(this.post).subscribe({
      next: (res: any) => {

        userPosts.push(res.post);

        this.utilsService.setElementInLocalStorage('userPosts', userPosts);

        this.utilsService.routerLink('/home');
        this.utilsService.dismissModal();
        this.utilsService.dismissLoading();


      }, error: (error: any) => {
        console.log(error);
        this.utilsService.presentToast({
          message: error,
          color: 'danger',
          duration: 1500,
          icon: 'alert-circle-outline'

        })
        this.utilsService.dismissLoading();

      }
    })
  }

  saveImage(){

    if(this.platform.is('capacitor')){

      this.utilsService.shareImageInMobile(this.selectImage);
      
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
