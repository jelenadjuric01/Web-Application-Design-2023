import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { WorkerService } from '../services/worker.service';
import Worker from '../models/worker';
import { RequestService } from '../services/request.service';
import Req from '../models/request';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  constructor(private router:Router,private uservice:UserService,private wservice:WorkerService,private rserive:RequestService) { }
  korisnik:User;
  radnici:Worker[]=[];
  slobodno:number=0;
  zahtev:Req
  alerMessage:string="";
  reqNumber:number;
  upucen:boolean=false;
  name:string;
  errorName: string;
  lastname:string;

  email: string;
  errorEmail: string;
  alert:string="";

  addedUser: boolean = false;
  alertMessage: string;

  updatedMessage:string="";

  errorPhone:string;
  phone:string;

  specialization:string;
  errorSpec:string;

  errorUEmail:string;
  errorUPhone:string;

  uputiti:boolean=false;
  error:string="";


  ngOnInit(): void {
    this.uservice.getUser(localStorage.getItem("logged")).subscribe((user:User)=>{
      this.korisnik=user;
      this.wservice.getWorkers(this.korisnik.username).subscribe((w:Worker[])=>{
        this.radnici=w;
        this.rserive.getReq(this.korisnik.username).subscribe((z:Req)=>{
          this.zahtev=z;
          if(z && z.approved){
            this.slobodno=z.workers;
          }
          else{
            this.uputiti=false;
            this.slobodno=0;
          }
        })
      })

    })
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  changePassword(){
    this.router.navigate(["change"])
  }
  profile(){
    this.router.navigate(["profile"]);
  }
  workers(){
    this.router.navigate(["worker"]);
  }
  back(){
    this.router.navigate(['agencija']);
  }
  uputiZahtev(){
    this.alerMessage="";
    this.alert="";
    if(this.reqNumber<=0 || !this.reqNumber){
      this.alerMessage="Unesite pozitivan broj!";
      return;
    }
    if(this.zahtev){
      this.rserive.delete(this.korisnik.username).subscribe(resp=>{
        this.rserive.addReq(this.korisnik.username,this.reqNumber).subscribe(resp=>{
          if(resp["message"]!="Error"){
            this.alert="Zahtev je upucen!"
            this.rserive.getReq(this.korisnik.username).subscribe((z:Req)=>{
              this.zahtev=z;
              this.uputiti=true;
            })
          }
          else{
            this.alerMessage="Greska!"
          }
        })
      })
    }
    else{
      this.rserive.addReq(this.korisnik.username,this.reqNumber).subscribe(resp=>{
        if(resp["message"]!="Error"){
          this.alert="Zahtev je upucen!"
          this.rserive.getReq(this.korisnik.username).subscribe((z:Req)=>{
            this.zahtev=z;
            this.uputiti=true;
          })
        }
        else{
          this.alerMessage="Greska!"
        }
      })
    }
    
  }

  update(w:Worker){
    this.errorUEmail = "";
    this.error="";
    this.errorUPhone="";
    this.updatedMessage="";
    
    let noErrors: boolean = true;
    let emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!w.email || !w.firstname || !w.lastname || !w.lastname || !w.phone || !w.specialization){
      this.error="Nijedno polje ne sme biti prazno!";
      return;
    }
    if (w.email) {
      console.log(w.email)
      if (!emailRegex.test(w.email)) {
        this.errorUEmail = "Email mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    }
   
    let phoneRegex=/^(\+381|0)(6(([0123459]\d{6,7})|6[0123459]\d{5,6}))$/
    if (w.phone) {
      console.log(w.phone)
      if (!phoneRegex.test(w.phone)) {
        this.errorUPhone = "Broj mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    
  }
  if(noErrors){
    this.wservice.updateWorker(w.firstname,w.lastname,w.phone,w.email,w.agency,w.specialization,w._id).subscribe(resp=>{
      if(resp['message']!='error'){
        this.updatedMessage="Uspesno azurirano!"
      }
      else{
        this.updatedMessage="Greska!";
      }
      this.wservice.getWorkers(this.korisnik.username).subscribe((w:Worker[])=>{
        this.radnici=w;
      });
    })
  }


  }

  register(){
    
    this.errorName = "";
    
    this.errorEmail = "";
    
    this.errorPhone="";

    this.addedUser = false;
    this.alertMessage="";
    let noErrors: boolean = true;

   
   
    if (!this.name ||!this.lastname) {
      this.errorName = "Obavezno polje!"
      noErrors = false;
    }
    
    if (!this.email) {
      this.errorEmail = "Obavezno polje!"
      noErrors = false;
    }
    
    if (!this.phone) {
      this.errorPhone = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.specialization) {
      this.errorSpec = "Obavezno polje!"
      noErrors = false;
    }
    
    
    
    

   
    let emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (this.email) {
      console.log(this.email)
      if (!emailRegex.test(this.email)) {
        this.errorEmail = "Email mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    }
   
    let phoneRegex=/^(\+381|0)(6(([0123459]\d{6,7})|6[0123459]\d{5,6}))$/
    if (this.phone) {
      console.log(this.phone)
      if (!phoneRegex.test(this.phone)) {
        this.errorPhone = "Broj mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    
  }
    if(noErrors){
          
          this.wservice.addWorker(this.name,this.lastname,this.phone,this.email,this.korisnik.username,this.specialization).subscribe(resp=>{
            if(resp['message']!='Error'){
            
              this.rserive.addWorker(this.korisnik.username).subscribe(respo=>{
                if(resp['message']!='error'){
                  this.alertMessage='Radnik dodat!'
                 
                    
                      this.wservice.getWorkers(this.korisnik.username).subscribe((w:Worker[])=>{
                        this.radnici=w;
                        this.rserive.getReq(this.korisnik.username).subscribe((z:Req)=>{
                          this.zahtev=z;
                          if(z){
                            this.slobodno=z.workers;
                          }
                          else{
                            this.slobodno=0;
                          }
                        })
                      })
                    
                  
                 
                }
                else{
                  this.alertMessage="Greska!"

                }
              })
            }
            else{
              this.alertMessage="Greska!"
            }
            this.email = "";
            this.phone="";
            this.name="";
            this.lastname="";
            this.specialization="";
          })
          }
        
        //KAD SE ZAHTREV ODVIJE DESI SE SRANJE, PROVERITI
    
      }
      delete(w:Worker){
        this.wservice.delete(w._id).subscribe(resp=>{
          if(this.zahtev.approved){
            this.rserive.deleteWorker(this.korisnik.username).subscribe(resp=>{
              this.wservice.getWorkers(this.korisnik.username).subscribe((w:Worker[])=>{
                this.radnici=w;
                this.rserive.getReq(this.korisnik.username).subscribe((z:Req)=>{
                  this.zahtev=z;
                  if(z){
                    this.slobodno=z.workers;
                  }
                })
              })
            })
          }
          else{
            this.wservice.getWorkers(this.korisnik.username).subscribe((w:Worker[])=>{
              this.radnici=w;
              this.rserive.getReq(this.korisnik.username).subscribe((z:Req)=>{
                this.zahtev=z;
                if(z && z.approved){
                  this.slobodno=z.workers;
                }
              })
            })
          }
          
          
        })
      }
      business(){
        this.router.navigate(["business"]);
      }

}
