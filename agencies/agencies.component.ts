import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { ObjectService } from '../services/object.service';
import Obj from '../models/object';
import { VirtualTimeScheduler } from 'rxjs';
import { BusinessService } from '../services/business.service';
import { CommentService } from '../services/comment.service';
import Comment from '../models/comment';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

  constructor(private router: Router,private userService:UserService,route: ActivatedRoute,private oservice:ObjectService,private bservice:BusinessService,private cservice:CommentService) {
    route.params.subscribe((params) => {
      this.username = params["id"];
    });
   }

  username:string;
  korisnik:User=null;
  agency:User;
  objekti:Obj[]=[];
  alertMessage:string="";
  agencija:string="";
  obj:string="";
  errorAgency:string="";
  errorObject:string="";
  errorDate:string="";
  date:string="";
  komentari:Comment[]=[];
  klijenti:User[]=[];


  anonim(i:number):string{
    return 'Korisnik'+i;
  }
   user(username:string):string{
    let u=this.klijenti.find(a=>{
      return a.username==username;
    })
    return u.firstname+" "+u.lastname;
   }
   Goback(){
    this.router.navigate([""]);
   }
  ngOnInit(): void {
   let username=localStorage.getItem("logged");
    this.userService.getUser(username!=null?username:"").subscribe((u:User)=>{
      this.cservice.getComA(this.username).subscribe((k:Comment[])=>{
        this.userService.getUser(this.username).subscribe((a:User)=>{
          this.agency=a;
          this.komentari=k;
          if(u){
            this.korisnik=u;
            this.userService.getClients().subscribe((kl:User[])=>{
              this.klijenti=kl;
              this.oservice.getObjects(this.korisnik.username).subscribe((o:Obj[])=>{
                this.objekti=o;
              })
              this.komentari.forEach(a=>{
                a.Agencija=this.agency.name;
                a.Klijent=this.user(a.client);
              })
            })
            
          }
          else{
            this.korisnik=null;
            let i=1;
            this.komentari.forEach(a=>{
              a.Agencija=this.agency.name;
              a.Klijent=this.anonim(i);
              i++;
            })
          }
        })
      
      })
      
      
      
      
      
    })
   
  }

  back(){
    this.router.navigate([""]);
  }

  register() {
    console.log("register user");
    this.router.navigate(["register"]);
  }

  login() {
    console.log("login user");
    this.router.navigate(["login"]);
  }
  logout(){
    localStorage.clear();
    //this.korisnik=null;
    this.router.navigate([""]);
  }
  changePassword(){
    this.router.navigate(["change"])
  }
  profile(){
    this.router.navigate(["profile"]);
  }
  business(){
    this.router.navigate(["business"]);
  }
  objects(){
    this.router.navigate(['object'])
  }
  
  zatrazi(){
    this.errorObject="";
    this.errorDate="";
    this.alertMessage="";
    let noError=true;

    if(!this.obj){
      this.errorObject="Obavezno polje!";
      noError=false;
    }
    if(!this.date){
      this.errorDate="Pogresan datum!";
      noError=false;
    }
    let today=new Date();
    let date=new Date(this.date);
    if(date<today){
      this.errorDate="Datum mora biti u buducnosti!"
      noError=false;
    }
    
    let days=[31,28,31,30,31,30,31,31,30,31,30,31];
    if((date.getFullYear()%4==0 && date.getFullYear()%100!=0) ||date.getFullYear()%400==0){
      if(date.getMonth()==1 && date.getDate()>29){
        this.errorDate="Greska, mesec nema toliko dana";
        noError=false;
      }
      else{
        if(days[date.getMonth()]<date.getDate()){
          this.errorDate="Greska, mesec nema toliko dana!";
          noError=false;
        }
      
      }
    }
    else{
    if(days[date.getMonth()]<date.getDate()){
      this.errorDate="Greska, mesec nema toliko dana!";
      noError=false;
    }
  
  }
  if(noError){
    let o=this.objekti.find(a=>{
      return a._id==this.obj;
    })
    let i=0;
    let rooms=[];
    o.Rooms.forEach(a=>{
      
      if(a.finished){
        rooms[i]=-1;
      }
      else{
        rooms[i]=-2;
      }
      i=i+1;
    })
    this.bservice.addBusiness(this.korisnik.username,this.agency.username,this.obj,date,rooms).subscribe(resp=>{
      if(resp["message"]!='error'){
        this.alertMessage="Zahtev je upucen!";
      }
      else{
        this.errorDate='Greska!'
      }
    })
  }


  }
}
