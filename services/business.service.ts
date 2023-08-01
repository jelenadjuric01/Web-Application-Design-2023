import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  uri = "http://127.0.0.1:4000/business";

  

  addBusiness(client:string,agency:string,object:string,deadline:Date, rooms:number[]) {
    let data = {
      client:client,agency:agency,object:object,deadline:deadline,rooms:rooms
    }
    return this.http.post(`${this.uri}/addBusiness`, data)
  }
  updateBus(id:string,status:string) {
    let data = {
      id:id,status:status
    }
    return this.http.post(`${this.uri}/updateBus`, data)
  }
  getBus(username:string) {
    let data = {
      username:username
    }
    return this.http.post(`${this.uri}/getBus`, data)
  }
  offer(id:string,offer:number) {
    let data = {
      id:id,offer:offer
    }
    return this.http.post(`${this.uri}/offer`, data)
  }
  delete(id:string) {
    let data = {
      id:id
    }
    return this.http.post(`${this.uri}/delete`, data)
  }
  updateRoom(id:string,rooms:number[]) {
    let data = {
      id:id,rooms:rooms
    }
    return this.http.post(`${this.uri}/updateRooms`, data)
  }
  cancel(id:string,cancel:string, status:string) {
    let data = {
      id:id,cancel:cancel,status:status
    }
    return this.http.post(`${this.uri}/cancel`, data)
  }
  getAll() {
    
    return this.http.get(`${this.uri}/getAll`)
  }
}
