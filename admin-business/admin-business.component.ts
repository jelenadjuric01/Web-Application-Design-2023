import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';
import Business from '../models/business';
import { BusinessService } from '../services/business.service';
import Obj from '../models/object';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-admin-business',
  templateUrl: './admin-business.component.html',
  styleUrls: ['./admin-business.component.css']
})
export class AdminBusinessComponent implements OnInit {

  constructor(private router:Router,private uservice:UserService,private bservice:BusinessService,private oservice:ObjectService) { }
  client:boolean=true;
  korisnik:User;
  poslovi:Business[]=[];
  colors:string[]=["lightgray","yellow","red","green"];
  objekti:Obj[]=[];
  klijenti:User[]=[];
  agencije:User[]=[];


  ngOnInit(): void {
    this.uservice.getUser(localStorage.getItem("logged")).subscribe((user:User)=>{
      this.korisnik=user;
      this.bservice.getAll().subscribe((z:Business[])=>{
       this.poslovi=z;
       this.canvasHide();
      })
      this.uservice.getClients().subscribe((k:User[])=>{
        this.klijenti=k;
      })
      this.uservice.getAgencies().subscribe((a:User[])=>{
        this.agencije=a;
      })
      this.oservice.getObject().subscribe((o:Obj[])=>{
        this.objekti=o;
      })

    })
  }
  showSketchColor(p:Business){
    let o=this.objekti.find(a=>{
      return a._id==p.object;
    })
    this.ctx1.clearRect(0,0,this.canvas1.width,this.canvas1.height);
    
    for(let i=0;i<o.rooms;i++){
      let r= o.Rooms[i];
      if(p.rooms[0]!=-1){
        if(p.rooms.find(a=>{
          return a==1;
        })){
          this.ctx1.fillStyle='yellow';
        }
        else{
        this.ctx1.fillStyle=this.colors[p.rooms[i]];
        }
    this.ctx1.fillRect(r.startX,r.startY,r.width,r.height);
      }
        this.ctx1.strokeRect(r.startX,r.startY,r.width,r.height);
        r.doors.forEach(d=>{
          let i=d.direction-1;
          this.ctx1.strokeRect(d.startX,d.startY,this.w[i],this.h[i]);

        })
      
    }
   }
   deny(c:Business){
    this.bservice.cancel(c._id,"","aktivan").subscribe(rwsp=>{
      this.bservice.getAll().subscribe((z:Business[])=>{
        this.poslovi=z;
        this.canvasHide();
       })
    })
   }
   cancel(p:Business){
    this.bservice.updateBus(p._id,"otkazan").subscribe(resp=>{
      this.bservice.getAll().subscribe((z:Business[])=>{
        this.poslovi=z;
        this.canvasHide();
       })
    })
   }
   getStatus(z:Business):string{
    let s="";
    switch(z.status){
      case 'neaktivan':
       { s="Neaktivan";
        break;}
      case 'aktivan':{
        s="Aktivan";
        break;
      }
      case 'aOdbijeno':{
        s="Agencija odbila";
        break;
      }
      case 'aPrihvaceno':{
        s="Agencija prihvatila("+z.offer+')';
        break;
      }
      case 'kOtkazan':{
        s="U procesu otkazivanja";
        break;
      }
      case 'otkazan':{
        s="Otkazan";
        break;
      }
      case 'zavrsen':{
        s="Zavrsen";
        break;
      }
    }
    return s;
  }
  @ViewChild('canvasSh') canvasSh: ElementRef;
  private canvas1: HTMLCanvasElement;
  private ctx1: CanvasRenderingContext2D;
  agency(username:string):string{
    let a =this.agencije.find(a=>{
      return a.username==username;
    })
    return a.name;
  }
  ngAfterViewInit() {
   
    this.canvas1 = this.canvasSh.nativeElement;
    this.canvas1.style.background = 'lightgray';
    
    this.ctx1 = this.canvas1.getContext('2d');
    this.ctx1.strokeStyle = 'black';
    this.ctx1.lineWidth=2;


  }
  h:number[]=[5,5,7,-7];
  w:number[]=[7,-7,5,5];
  business(){
    this.router.navigate(['admin-business']);
  }
  
  user(username:string):string{
    let u=this.klijenti.find(a=>{
      return a.username==username;
    })
    return u.firstname+" "+u.lastname+'\n'+u.phone+", "+u.email;
  }
  getDate(z:Business):string{
    let d=z.deadline.toString();
    let a=d.split('-');
    return a[2].split('T')[0]+'-'+a[1]+'-'+a[0];
  }
  object(id:string):string{

    let o=this.objekti.find(a=>{
      return a._id==id;
    })
    
    return o.square+"m^2, "+o.adress;
  }
  canvasHide(){
    if( this.poslovi.length==0){
      this.canvas1.width=0;
      this.canvas1.height=0;
    }
    else{
      this.canvas1.width=300;
      this.canvas1.height=150;
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  changePassword(){
    this.router.navigate(["change"]);
  }

  showAll(value:boolean){
    if(value){
      this.router.navigate(["admin-client"]);
    }
    else{
      this.router.navigate(["admin-agency"]);
    }
  }

}
