import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }


  getPosts(){
    let headers = {
      TokenAuth: "N0UV50RD0S3CL0RVM"
    }

    return this.http.get(environment.baseUrl + environment.posts, {headers: headers});
  }

  
  createPosts(post: Post){

    let headers = {
      TokenAuth: "N0UV50RD0S3CL0RVM"
    }

    return this.http.post(environment.baseUrl + environment.posts, post, { headers: headers});
  }

}
