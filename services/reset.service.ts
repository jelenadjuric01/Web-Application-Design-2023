import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http: HttpClient) { }

  uri = "http://127.0.0.1:4000/reset";

  login(email: string, password:string) {
    let data = {
      email:email,password:password
    }
    return this.http.post(`${this.uri}/login`, data)
  }

  addPassword(email:string,password:string) {
    let data = {
      email:email,password:password
    }
    return this.http.post(`${this.uri}/addPassword`, data)
  }

}
