import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageAiService {

  constructor(
    private http: HttpClient
  ) { }

  sendPrompt(prompt: string){

    let headers = {
      TokenAuth: "N0UV50RD0S3CL0RVM"
    }

    return this.http.post(environment.baseUrl + environment.imageai, {prompt}, {headers: headers});

  }
}
