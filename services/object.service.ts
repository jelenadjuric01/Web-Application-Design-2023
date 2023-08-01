import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Room from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http: HttpClient) { }

  uri = "http://127.0.0.1:4000/object";

  

  addObject(client:string,type:string,square:number,rooms:number,adress:string,Rooms:Room[]) {
    let data = {
      client:client,type:type,square:square,rooms:rooms,adress:adress,Rooms:Rooms
    }
    return this.http.post(`${this.uri}/addObject`, data)
  }
  getObjects(client:string) {
    let data = {
      username:client
    }
    return this.http.post(`${this.uri}/getObjects`, data)
  }
  delete(id:string) {
    let data = {
      id:id
    }
    return this.http.post(`${this.uri}/delete`, data)
  }
  updateObject(type:string,_id:string,square:number,rooms:number,adress:string,Rooms:Room[]) {
    let data = {
      type:type,_id:_id,square:square,rooms:rooms,adress:adress,Rooms:Rooms
    }
    return this.http.post(`${this.uri}/updateObject`, data)
  }
  getObject() {
    let data = {
    }
    return this.http.post(`${this.uri}/getObject`, data)
  }
}
