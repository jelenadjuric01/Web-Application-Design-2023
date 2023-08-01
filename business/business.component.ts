import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import User from '../models/user';
import Business from '../models/business';
import { BusinessService } from '../services/business.service';
import Obj from '../models/object';
import { ObjectService } from '../services/object.service';
import { WorkerService } from '../services/worker.service';
import Worker from '../models/worker';
import { CommentService } from '../services/comment.service';
import Comment from '../models/comment';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  constructor(private router:Router,private uservice:UserService,private bservice:BusinessService,private oservice:ObjectService,private wservice:WorkerService,private cservice:CommentService) { }

  korisnik:User;
  zahtevi:Business[]=[];
  klijenti:User[]=[];
  objekti:Obj[]=[];
  ponuda:number;
  errorPonuda:string="";
  alertMessage:string="";
  agencije:User[]=[];
  razlog:string="";
  poslovi:Business[]=[];
  zaposleni:Worker[]=[];
  nezaposleni:Worker[]=[];
  alertBussines:string="";
  soba:number;
  radnik:string;
  colors:string[]=["lightgray","yellow","red","green"];
  dovoljno:boolean=false;
  komentari:Comment[]=[];
  zavrseni:boolean=false;
  nekomentarisane:User[]=[];
  text:string="";
  ocena:number;
  agencijaK:string;
  errorAgency:string="";
  errorText:string="";
  errorOcena:string="";
  updateAlert:string="";
  error:string="";



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
  assign(p:Business){
    this.alertBussines="";
    let noError=true;
    if(!this.radnik || !this.soba){
      this.alertBussines="Popunite sva polja!";
      noError=false;
      return;
    }
    this.wservice.assign(p.object,this.soba,this.radnik).subscribe(resp=>{
      //p.rooms[this.soba]= POTENCIJALNO JOS JEDNO STANJE
      p.rooms[this.soba]=0;
      this.bservice.updateRoom(p._id,p.rooms).subscribe(resp=>{
        location.reload();

      })
    })
  }
  zavrsen(p:Business){
    let o=this.objekti.find(a=>{
      return a._id==p.object;
    })
    let pl=p.rooms.filter(a=>{
      return a==3;
    }).length
    return o.rooms==pl && p.status!='zavrsen';
  }
  zavrsiPosao(p:Business){
    this.bservice.updateBus(p._id,'zavrsen').subscribe(resp=>{
      location.reload();
    })
  }
  color(p:Business){
    
    let r=this.objekti.find(a=>{
      return a._id==p.object;
    }).Rooms[this.soba];
    this.showSketch(p.object);
    this.ctx1.fillStyle='white';
    this.ctx1.fillRect(r.startX,r.startY,r.width,r.height);
    r.doors.forEach(d=>{
      let i=d.direction-1;
      this.ctx1.strokeRect(d.startX,d.startY,this.w[i],this.h[i]);

    })
  }

  requests(){
    this.bservice.getBus(this.korisnik.username).subscribe((z:Business[])=>{
      this.zahtevi=z.filter(a=>{
        return a.status=="aPrihvaceno" || a.status=="aOdbijeno";
      });
      this.zavrseni=false;

      this.canvasHide();
    })
  }
  all(){
    this.bservice.getBus(this.korisnik.username).subscribe((z:Business[])=>{
      this.zahtevi=z;
      this.zavrseni=false;

      this.canvasHide();
    })
  }
  canvasHide(){
    if((this.zahtevi.length==0 && this.korisnik.type=='klijent')||(this.korisnik.type=='agencija' && this.zahtevi.length==0 && this.poslovi.length==0)){
      this.canvas1.width=0;
      this.canvas1.height=0;
    }
    else{
      this.canvas1.width=300;
      this.canvas1.height=150;
    }
  }

  active(){
    this.bservice.getBus(this.korisnik.username).subscribe((z:Business[])=>{
      this.zahtevi=z.filter(a=>{
        return a.status=="aktivan";
      });
      this.zavrseni=false;
      this.canvasHide();
    })
  }
  finished(){
    this.bservice.getBus(this.korisnik.username).subscribe((z:Business[])=>{
      this.zahtevi=z.filter(a=>{
        return a.status=='zavrsen';
      });
      if(this.zahtevi.length>0){
        this.zavrseni=true;
      }
      
      this.canvasHide();
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
  dodeli(p:Business){
    this.alertBussines="";
    let o=this.objekti.find(a=>{
      return a._id==p.object;
    })
    let unfinished=p.rooms.filter(a=>{
      return a==-1 || a==1;
    }).length;
    if(unfinished>o.rooms) unfinished=o.rooms;
    if(this.nezaposleni.length==0 && unfinished==0){
      this.alertBussines="Nemate dovoljno slobodnih radnika!";
      return;
    }
    
    if(unfinished>this.nezaposleni.length || this.nezaposleni.length==0){
      for(let i=0;i<o.rooms;i++){
        if(p.rooms[i]!=0)
          p.rooms[i]=1;
      }
      this.alertBussines="Nemate dovoljno slobodnih radnika!";
      this.bservice.updateRoom(p._id,p.rooms).subscribe();

    }
    else{
      this.dovoljno=true;
      p.dovoljno=true;
    }
    //this.bservice.updateRoom(p._id,p.rooms).subscribe();
  }

  ngOnInit(): void {
    this.uservice.getUser(localStorage.getItem("logged")).subscribe((user:User)=>{
      this.korisnik=user;
      this.bservice.getBus(this.korisnik.username).subscribe((z:Business[])=>{
        this.oservice.getObject().subscribe((o:Obj[])=>{
          this.objekti=o;
          this.uservice.getClients().subscribe((k:User[])=>{
            this.klijenti=k;
          
        if(this.korisnik.type=='agencija')
        {this.zahtevi=z.filter(a=>{
          return a.status=='neaktivan' || a.status=="aPrihvaceno";
        })
        this.poslovi=z.filter(a=>{
          return a.status=='aktivan';
        })
        this.wservice.getWorkers(this.korisnik.username).subscribe((w:Worker[])=>{
          this.zaposleni=w.filter(a=>{
            return a.object!=null;
          });
          this.nezaposleni=w.filter(a=>{
            return a.object==null;
          })
          

        })
        }
        else{
          this.zahtevi=z;
          this.cservice.getComC(this.korisnik.username).subscribe((c:Comment[])=>{
            this.komentari=c;
            
            this.uservice.getAgencies().subscribe((a:User[])=>{
              this.agencije=a;
              this.komentari.forEach(a=>{
                a.Agencija=this.agency(a.agency);
              })
              let zavrseni=this.zahtevi.filter(a=>{
                return a.status=='zavrsen';
              })
              zavrseni.forEach(a=>{
                if(this.nekomentarisane.filter(k=>{
                  return k.username==a.agency;
                }).length==0 && this.komentari.filter(k=>{
                  return k.agency==a.agency;
                }).length==0){
                  this.nekomentarisane.push(this.agencije.find(b=>{
                    return b.username==a.agency;
                  }));
                }
              })
            })
            
          })
        }
        this.canvasHide();
        
      })
      
      })
    })

    })
  }
  deleteComment(c:Comment){
    this.cservice.delete(c.agency,c.client).subscribe(resp=>{
      this.nekomentarisane=[];

          this.cservice.getComC(this.korisnik.username).subscribe((c:Comment[])=>{
            this.komentari=c;
            
            this.uservice.getAgencies().subscribe((a:User[])=>{
              this.agencije=a;
              this.komentari.forEach(a=>{
                a.Agencija=this.agency(a.agency);
              })
              let zavrseni=this.zahtevi.filter(a=>{
                return a.status=='zavrsen';
              })
              zavrseni.forEach(a=>{
                if(this.nekomentarisane.filter(k=>{
                  return k.username==a.agency;
                }).length==0 && this.komentari.filter(k=>{
                  return k.agency==a.agency;
                }).length==0){
                  this.nekomentarisane.push(this.agencije.find(b=>{
                    return b.username==a.agency;
                  }));
                }
              })
            })
            
          })
    })
  }
  updateComment(c:Comment){
    this.updateAlert="";
    this.error="";
    if(!c.grade){
      this.error="Ocena mora da postoji!"
      return;
    }
    if(c.grade<=0 || c.grade>5){
      this.updateAlert="Ocena mora biti izmedju 1 i 5!";
      return;
    }
    this.cservice.update(c.agency,c.client,c.grade,c.review).subscribe(resp=>{
      this.nekomentarisane=[];
          this.cservice.getComC(this.korisnik.username).subscribe((c:Comment[])=>{
            this.komentari=c;
            
            this.uservice.getAgencies().subscribe((a:User[])=>{
              this.agencije=a;
              this.komentari.forEach(a=>{
                a.Agencija=this.agency(a.agency);
              })
              let zavrseni=this.zahtevi.filter(a=>{
                return a.status=='zavrsen';
              })
              zavrseni.forEach(a=>{
                if(this.nekomentarisane.filter(k=>{
                  return k.username==a.agency;
                }).length==0 && this.komentari.filter(k=>{
                  return k.agency==a.agency;
                }).length==0){
                  this.nekomentarisane.push(this.agencije.find(b=>{
                    return b.username==a.agency;
                  }));
                }
              })
            })
            
          })
    })
  }
  comment(){
    this.errorAgency="";
    this.errorText="";
    this.errorOcena="";
    let noError=true;
    if(!this.ocena){
      this.errorOcena="Obavezno polje!";
      noError=false;
    }
   
    if(!this.agencijaK){
      this.errorAgency="Obavezno polje!";
      noError=false;
    }
    if(this.ocena<=0 || this.ocena>5){
      this.errorOcena="Ocena moze biti izmedju 1 i 5";
      noError=false;
    }
    if(noError)
    {this.cservice.addCom(this.agencijaK,this.korisnik.username,this.ocena,this.text).subscribe(resp=>{
      this.nekomentarisane=[];
      this.ocena=null;
      this.text="";
      this.agencijaK="";
          this.cservice.getComC(this.korisnik.username).subscribe((c:Comment[])=>{
            this.komentari=c;
            
            this.uservice.getAgencies().subscribe((a:User[])=>{
              this.agencije=a;
              this.komentari.forEach(a=>{
                a.Agencija=this.agency(a.agency);
              })
              let zavrseni=this.zahtevi.filter(a=>{
                return a.status=='zavrsen';
              })
              zavrseni.forEach(a=>{
                if(this.nekomentarisane.filter(k=>{
                  return k.username==a.agency;
                }).length==0 && this.komentari.filter(k=>{
                  return k.agency==a.agency;
                }).length==0){
                  this.nekomentarisane.push(this.agencije.find(b=>{
                    return b.username==a.agency;
                  }));
                }
              })
            })
            
          })
    })}
  }
  roomAssigned(p:Business):boolean{
    let o=this.objekti.find(a=>{
      return a._id==p.object;
    })
    let a=p.rooms.filter(a=>{
      return a==0 || a==3 ||a==2;
    }).length
    let b=p.rooms.filter(a=>{
      return a==2;
    }).length
    return a==o.rooms && b!=o.rooms?true:false;
  }
  roomFinished(p:Business):boolean{
    let o=this.objekti.find(a=>{
      return a._id==p.object;
    })
    let a=p.rooms.filter(a=>{
      return a==2;
    }).length
    let b=p.rooms.filter(a=>{
      return a==3;
    }).length
    return a>0 && b!=o.rooms?true:false;
  }
  zavrsi(p:Business){
    this.alertBussines="";
    if(!this.soba){
      this.alertBussines="Morate izabrati sobu!";
      return;
    }
    if(p.rooms[this.soba]==0){
      this.alertBussines="Morate prvo opremiti sobu!"
      return;
    }
    p.rooms[this.soba]=3;
    this.bservice.updateRoom(p._id,p.rooms).subscribe(resp=>{
    location.reload();
  })
}

  opremi(p:Business){
    this.alertBussines="";
    if(!this.soba){
      this.alertBussines="Morate izabrati sobu!";
      return;
    }
    p.rooms[this.soba]=2;
    this.bservice.updateRoom(p._id,p.rooms).subscribe(resp=>{
    location.reload();
  })
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
  showSketch(id:string){
    let o=this.objekti.find(a=>{
      return a._id==id;
    })
    this.ctx1.clearRect(0,0,this.canvas1.width,this.canvas1.height);
    
    o.Rooms.forEach(r=>{
      if(r.finished){
        this.ctx1.strokeRect(r.startX,r.startY,r.width,r.height);
        r.doors.forEach(d=>{
          let i=d.direction-1;
          this.ctx1.strokeRect(d.startX,d.startY,this.w[i],this.h[i]);

        })
      }
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
  business(){
    location.reload();
  }
  objects(){
    this.router.navigate(["object"])
  }
  agencies(){
    this.router.navigate([""]);
  }
  back(){
   
      this.router.navigate([this.korisnik.type]);
    
    
  }

  user(username:string):string{
    let u=this.klijenti.find(a=>{
      return a.username==username;
    })
    return u.firstname+" "+u.lastname+'\n'+u.phone+", "+u.email;
  }
  object(id:string):string{

    let o=this.objekti.find(a=>{
      return a._id==id;
    })
    
    return o.square+"m^2, "+o.adress;
  }
  roomExists(p:Business,i:number):boolean{

    let o=this.objekti.find(a=>{
      return a._id==p.object;
    })

    return o.Rooms[i].finished;
    
  }
  prihvati(z:Business){
    let noError=true;
    this.errorPonuda="";
    if(!this.ponuda){
      this.errorPonuda="Obavezno polje!";
      noError=false;
    }
    if(this.ponuda<=0){
      this.errorPonuda="Mora biti vece od 0!";
      noError=false;
    }
    if(noError){
      this.bservice.offer(z._id,this.ponuda).subscribe(resp=>{

        location.reload();
      })
    }

  }
  odbij(z:Business){
    this.bservice.updateBus(z._id,"aOdbijeno").subscribe(resp=>{
  
      location.reload();
    })
  }
  getDate(z:Business):string{
    let d=z.deadline.toString();
    let a=d.split('-');
    return a[2].split('T')[0]+'-'+a[1]+'-'+a[0];
  }

  accept(z:Business){
    this.bservice.updateBus(z._id,"aktivan").subscribe(resp=>{
      this.bservice.getBus(this.korisnik.username).subscribe((z:Business[])=>{
        this.zahtevi=z;
      })
    })
  }
  deny(z:Business){
    this.bservice.delete(z._id).subscribe(resp=>{
      this.bservice.getBus(this.korisnik.username).subscribe((z:Business[])=>{
        this.zahtevi=z;
      })
    })
  }

  cancel(z:Business){
    this.alertBussines="";
    if(!this.razlog){
      this.alertBussines="Unesite razlog!";
      return;
    }
    this.bservice.cancel(z._id,this.razlog,'kOtkazan').subscribe(resp=>{
      if(resp["message"]!='error'){
        this.alertBussines="Zahtev za otkazivanje je poslat!";

      }
      location.reload();
    })
  }
  workersOfRoom(p:Business,i:number):Worker[]{
    return this.zaposleni.filter(a=>{
      return a.object==p.object && a.room==i;
    })
  }
  

}
