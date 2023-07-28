import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { Posts } from 'src/assets/data/images';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts: Post[] = [];
  loading: boolean = false;

  constructor(
    private UtilsService: UtilsService,
    private postsService: PostsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.getPosts();

  }

  doRefresh(event: any){

    setTimeout(() => {

      this.getPosts();
      
      event.target.complete();
    }, 2000);

  }

  getPosts() {

    this.loading = true;

    this.postsService.getPosts().subscribe({
      next: (res: any) => {

        console.log(res);
        this.posts = res.data;
        this.loading = false;

      }, error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    })

    this.posts = Posts;

    console.log(this.posts);
  }

  async showPostDetail(post: Post){

    await this.UtilsService.presentModal({
      component: PostDetailComponent,
      componentProps: {post},
      cssClass: 'modal-full-size'
    })
  }

}
