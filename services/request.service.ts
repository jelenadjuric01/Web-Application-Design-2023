import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  uri = "http://127.0.0.1:4000/request";

  delete(agency: string) {
    let data = {
      agency:agency
    }
    return this.http.post(`${this.uri}/delete`, data)
  }

  updateReq(agency:string) {
    const data={
     
    agency:agency
    }
    return this.http.post(`${this.uri}/updateReq`, data)
  }

  addReq(agency:string,workers:number) {

    const data={
    agency:agency,
    workers:workers
    }
    
   return this.http.post(`${this.uri}/addReq`, data);
  }
  getReq(agency:string) {
    const data={
     
    agency:agency
    }
    return this.http.post(`${this.uri}/getReq`, data)
  }
  getAll() {
    
    return this.http.get(`${this.uri}/getAll`)
  }
  addWorker(agency:string) {
    const data={
     
    agency:agency
    }
    return this.http.post(`${this.uri}/addWorker`, data)
  }
  deleteWorker(agency:string) {
    const data={
     
    agency:agency
    }
    return this.http.post(`${this.uri}/deleteWorker`, data)
  }
  
}
