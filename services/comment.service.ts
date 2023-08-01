import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  uri = "http://127.0.0.1:4000/comment";

  delete(agency: string,client:string) {
    let data = {
      agency:agency,client:client
    }
    return this.http.post(`${this.uri}/delete`, data)
  }

  update(agency: string,client:string,grade:number,review:string) {
    let data = {
      agency:agency,client:client,grade:grade,review:review
    }
    return this.http.post(`${this.uri}/update`, data)
  }

  addCom(agency: string,client:string,grade:number,review:string) {
    let data = {
      agency:agency,client:client,grade:grade,review:review
    }
   return this.http.post(`${this.uri}/addCom`, data);
  }
  getComC(client:string) {
    let data = {
      client:client
    }
    return this.http.post(`${this.uri}/getComC`, data)
  }
  getComA(agency:string) {
    let data = {
      agency:agency
    }
    return this.http.post(`${this.uri}/getComA`, data)
  }
  
}
