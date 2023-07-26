import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';

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
    public platform: Platform
  ) { }

  ngOnInit() {
    this.selectImage = this.post.images[0];
  }

}
