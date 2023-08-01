import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';
import Obj from '../models/object';
import {  ElementRef, ViewChild } from '@angular/core';
import Room from '../models/room';
import Door from '../models/door';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  constructor(private router:Router,private uservice:UserService,private oservice:ObjectService) { }
  korisnik:User;
  objekti:Obj[]=[];
  client: string;
    rooms: number;
    square:number;
    adress:string;
    sketch:string;
    type:string;
    errorClient:string;
    errorRooms:string;
    errorSquare:string;
    errorAdress:string;
    errorSketch:string;
    errorType:string;
    errorrooms:string;
    errorsquare:string;
    alertMessage:string;
    errorPrva:string;
    vrata:boolean=false;
    Rooms:Room[]=[new Room(),new Room(),new Room()];
    crtaj:number=-1;
    doorW:number=-5;
    doorH:number=-7;
    door:Door=new Door(-5,-5,0);
    errorDoor:string="";
    errorAlert:string="";
    width:number[]=[];
    height:number[]=[];
    errorFile:string="";
    objekat:Obj=new Obj();
    error:string="";

    @ViewChild('canvasEl') canvasEl: ElementRef;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    @ViewChild('canvasSh') canvasSh: ElementRef;
    private canvas1: HTMLCanvasElement;
    private ctx1: CanvasRenderingContext2D;
    
    canvasHide(){
      if(this.objekti.length==0){
        this.canvas1.width=0;
      this.canvas1.height=0;
    }
    else{
      this.canvas1.width=300;
      this.canvas1.height=150;
    }
    }
   //DODAJ PONOVNO ICRTAVANJE VRATA KAD SE SKLONI OBJEKAT
  ngOnInit(): void {
    this.uservice.getUser(localStorage.getItem("logged")).subscribe((user:User)=>{
      this.korisnik=user;
      this.oservice.getObjects(this.korisnik.username).subscribe((o:Obj[])=>{
        this.objekti=o;
        this.canvasHide();
      })
    })
    
  }
  ngAfterViewInit() {
    
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.style.background = 'lightgray';

    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth=2;
    this.canvas1 = this.canvasSh.nativeElement;
    this.canvas1.style.background = 'lightgray';

    this.ctx1 = this.canvas1.getContext('2d');
    this.ctx1.strokeStyle = 'black';
    this.ctx1.lineWidth=2;


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
  business(){
    this.router.navigate(["business"]);
  }
  
  agencies(){
    this.router.navigate([""]);
  }
  prelazakNaCrtanje(){
   
    this.Rooms=[new Room(),new Room(),new Room()];
    this.errorAdress="";
    this.errorSketch="";
    this.errorType="";
    this.errorrooms="";
    this.errorsquare="";
    this.alertMessage="";
    let noErrors:boolean=true;
   
    if(!this.adress){
      this.errorAdress="Obavezno polje!"
      noErrors=false;
    }
    if(!this.type){
      this.errorType="Obavezno polje!"
      noErrors=false;
    }
    if(!this.rooms){
      this.errorrooms="Obavezno polje!"
      noErrors=false;
    }
    if(!this.square){
      this.errorsquare="Obavezno polje!"
      noErrors=false;
    }
    if(this.square<=0){
      this.errorsquare="Mora biti vece od 0!"
      noErrors=false;
    }
    if(this.rooms<=0 ||this.rooms>3){
      this.errorrooms="Mora biti vece od 0 i manje od 4!"
      noErrors=false;
    }
    
  
  if(noErrors){
    this.canvas.style.display = 'block';
    this.crtaj=0;
  }
}
//direction - 1 levo 2 desno 3 gore 4 dole  let h=[5,5,7,-7];
     //let w=[7,-7,5,5];
checkDoor(event: MouseEvent){
  let gix = this.Rooms[this.crtaj].startX;
  let giy = this.Rooms[this.crtaj].startY;
  let dix = gix + this.Rooms[this.crtaj].width, diy = giy+ this.Rooms[this.crtaj].height;
  let lix = gix, liy = diy;
   let ddix = dix, ddiy = giy;
   if(event.offsetX >= dix-3 && event.offsetX<=dix+3 && event.offsetY >= giy && event.offsetY <= diy){
    this.ctx.clearRect(this.door.startX-1, this.door.startY-1, this.doorW-2, this.doorH+2);

    this.doorW=-7;
      this.doorH=5;
      this.door.startX=dix;
       this.door.startY=event.offsetY;
       this.door.direction=2;
   }
   else if(event.offsetX >= gix-3 && event.offsetX<=gix+3 && event.offsetY >= giy && event.offsetY <= diy){
    this.ctx.clearRect(this.door.startX+1, this.door.startY-1, this.doorW+2, this.doorH+2);

    this.doorW=7;
      this.doorH=5;

      this.door.startX=gix;
      this.door.startY=event.offsetY;
      this.door.direction=1;
   }
   else if(event.offsetY >= liy-3 && event.offsetY<=liy+3 && event.offsetX >= gix && event.offsetX <= dix ){
    this.ctx.clearRect(this.door.startX-1, this.door.startY-1, this.doorW+2, this.doorH-1);
    this.doorW=5;
    this.doorH=-7;

    this.door.startX=event.offsetX;
    this.door.startY=liy;
    this.door.direction=4;
   }
   else if(event.offsetY >= ddiy-3 && event.offsetY<=ddiy+3 && event.offsetX >= gix && event.offsetX <= dix )
   {
    this.ctx.clearRect(this.door.startX-1, this.door.startY+1, this.doorW+2, this.doorH+2);

      this.doorW=5;
      this.doorH=7;

      this.door.startX=event.offsetX;
      this.door.startY=ddiy;
      this.door.direction=3;
   }

  else{
    this.errorDoor="Vrata moraju biti na ivici!";
    return;
  }
}
checkPreklapanja(event:MouseEvent,indexSt):boolean{
    let soba1=this.Rooms[this.crtaj];
    let soba2=this.Rooms[indexSt];
    // Provera preklapanja soba
    if (
      soba1.startX < soba2.startX + soba2.width &&
      soba1.startX + soba1.width > soba2.startX &&
      soba1.startY < soba2.startY + soba2.height &&
      soba1.startY + soba1.height > soba2.startY
    ) {
      return true; // Sobe se preklapaju
    }
    return false; // Sobe se ne preklapaju
  
}
checkThreeRooms(event:MouseEvent):boolean{
  if(this.partOfCheckRooms(event,(this.crtaj+1)%3) || this.partOfCheckRooms(event,(this.crtaj+2)%3)){
    if(!this.checkPreklapanja(event,(this.crtaj+1)%3) && !this.checkPreklapanja(event,(this.crtaj+2)%3)){
      this.ctx.strokeRect(
        this.Rooms[(this.crtaj+1)%3].startX, this.Rooms[(this.crtaj+1)%3].startY, this.Rooms[(this.crtaj+1)%3].width, this.Rooms[(this.crtaj+1)%3].height
      );
      this.ctx.strokeRect(
        this.Rooms[(this.crtaj+2)%3].startX, this.Rooms[(this.crtaj+2)%3].startY, this.Rooms[(this.crtaj+2)%3].width, this.Rooms[(this.crtaj+2)%3].height
      );
      return true;
      
    }
  }
  this.Rooms[this.crtaj].startX=this.Rooms[this.crtaj].startY=this.Rooms[this.crtaj].height=this.Rooms[this.crtaj].width=0;
    this.errorAlert="Prostorije moraju da se dodiruju!";
    this.ctx.strokeRect(
      this.Rooms[(this.crtaj+1)%3].startX, this.Rooms[(this.crtaj+1)%3].startY, this.Rooms[(this.crtaj+1)%3].width, this.Rooms[(this.crtaj+1)%3].height
    );
    this.ctx.strokeRect(
      this.Rooms[(this.crtaj+2)%3].startX, this.Rooms[(this.crtaj+2)%3].startY, this.Rooms[(this.crtaj+2)%3].width, this.Rooms[(this.crtaj+2)%3].height
    );
    return false;
 
}

partOfCheckRooms(event:MouseEvent,indexSt:number):boolean{
  let gix = this.Rooms[indexSt].startX;
  let giy = this.Rooms[indexSt].startY;
  let dix = gix + this.Rooms[indexSt].width, diy = giy+ this.Rooms[indexSt].height;
  let lix = gix, liy = diy;
  let ddix = dix, ddiy = giy;
  if(event.offsetX >= dix-3 && event.offsetX<=dix+3 && ((event.offsetY >= giy && event.offsetY <= diy) || (event.offsetY +this.height[this.crtaj]>= giy && event.offsetY+this.height[this.crtaj] <= diy) ||(event.offsetY <= giy && event.offsetY+this.height[this.crtaj] >= diy))){
    
      this.Rooms[this.crtaj].startX=dix;
   }
   else if(event.offsetX+this.width[this.crtaj] >= gix-3 && event.offsetX+this.width[this.crtaj]<=gix+3 && ((event.offsetY >= giy && event.offsetY <= diy) || (event.offsetY +this.height[this.crtaj]>= giy && event.offsetY+this.height[this.crtaj] <= diy) ||(event.offsetY <= giy && event.offsetY+this.height[this.crtaj] >= diy))){
   
    this.Rooms[this.crtaj].startX=gix-this.width[this.crtaj];
   }
   else if(event.offsetY >= liy-3 && event.offsetY<=liy+3 && ((event.offsetX >= gix && event.offsetX <= dix) || (event.offsetX +this.width[this.crtaj]>= gix && event.offsetX+this.width[this.crtaj] <= dix) ||(event.offsetX <= gix && event.offsetX+this.width[this.crtaj] >= dix) ) ){
   

    this.Rooms[this.crtaj].startY=liy;
   }
   else if(event.offsetY+this.height[this.crtaj] >= ddiy-3 && event.offsetY+this.height[this.crtaj]<=ddiy+3 && ((event.offsetX >= gix && event.offsetX <= dix) || (event.offsetX +this.width[this.crtaj]>= gix && event.offsetX+this.width[this.crtaj] <= dix) ||(event.offsetX <= gix && event.offsetX+this.width[this.crtaj] >= dix) ) )
   {
    

    this.Rooms[this.crtaj].startY=ddiy-this.height[this.crtaj];
   }

  else{
    
    return false;
  }
  return true;
}

checkRooms(event:MouseEvent,indexSt:number):boolean{
  
  let gix = this.Rooms[indexSt].startX;
  let giy = this.Rooms[indexSt].startY;
  let dix = gix + this.Rooms[indexSt].width, diy = giy+ this.Rooms[indexSt].height;
  let lix = gix, liy = diy;
  let ddix = dix, ddiy = giy;
  if(event.offsetX >= dix-3 && event.offsetX<=dix+3 && ((event.offsetY >= giy && event.offsetY <= diy) || (event.offsetY +this.height[this.crtaj]>= giy && event.offsetY+this.height[this.crtaj] <= diy) ||(event.offsetY <= giy && event.offsetY+this.height[this.crtaj] >= diy))){
    
      this.Rooms[this.crtaj].startX=dix;
   }
   else if(event.offsetX+this.width[this.crtaj] >= gix-3 && event.offsetX+this.width[this.crtaj]<=gix+3 && ((event.offsetY >= giy && event.offsetY <= diy) || (event.offsetY +this.height[this.crtaj]>= giy && event.offsetY+this.height[this.crtaj] <= diy) ||(event.offsetY <= giy && event.offsetY+this.height[this.crtaj] >= diy))){
   
    this.Rooms[this.crtaj].startX=gix-this.width[this.crtaj];
   }
   else if(event.offsetY >= liy-3 && event.offsetY<=liy+3 && ((event.offsetX >= gix && event.offsetX <= dix) || (event.offsetX +this.width[this.crtaj]>= gix && event.offsetX+this.width[this.crtaj] <= dix) ||(event.offsetX <= gix && event.offsetX+this.width[this.crtaj] >= dix) ) ){
   

    this.Rooms[this.crtaj].startY=liy;
   }
   else if(event.offsetY+this.height[this.crtaj] >= ddiy-3 && event.offsetY+this.height[this.crtaj]<=ddiy+3 && ((event.offsetX >= gix && event.offsetX <= dix) || (event.offsetX +this.width[this.crtaj]>= gix && event.offsetX+this.width[this.crtaj] <= dix) ||(event.offsetX <= gix && event.offsetX+this.width[this.crtaj] >= dix) ) )
   {
    

    this.Rooms[this.crtaj].startY=ddiy-this.height[this.crtaj];
   }

  else{
    this.Rooms[this.crtaj].startX=this.Rooms[this.crtaj].startY=this.Rooms[this.crtaj].height=this.Rooms[this.crtaj].width=0;
    this.errorAlert="Prostorije moraju da se dodiruju!";
    this.ctx.strokeRect(
      this.Rooms[indexSt].startX, this.Rooms[indexSt].startY, this.Rooms[indexSt].width, this.Rooms[indexSt].height
    );
    return false;
  }
  this.ctx.strokeRect(
    this.Rooms[indexSt].startX, this.Rooms[indexSt].startY, this.Rooms[indexSt].width, this.Rooms[indexSt].height
  );
  return true;
}
startCrtanje(event: MouseEvent) {
  this.errorDoor="";
  if(!this.width[this.crtaj] || !this.height[this.crtaj] || this.width[this.crtaj]<=0 || this.height[this.crtaj]<=0){
    this.errorDoor="Duzina i sirina moraju biti veci od 0!";
    return;
  }
  this.errorDoor="";
 if(this.vrata){
  this.checkDoor(event);
  
 }
 else{
  this.ctx.clearRect(this.Rooms[this.crtaj].startX-1, this.Rooms[this.crtaj].startY-1, this.Rooms[this.crtaj].width+2, this.Rooms[this.crtaj].height+2);
  this.Rooms[this.crtaj].startX = event.offsetX;
  this.Rooms[this.crtaj].startY = event.offsetY;
  if(this.crtaj==1 && (this.rooms==2 || this.rooms==3)){

    if(!this.checkRooms(event,0))
    return;
  }
  if(this.crtaj==0 && this.rooms==2 && this.Rooms[1].finished){
    if(!this.checkRooms(event,1)) return;
  }
  if(this.crtaj==2 && this.rooms==3){
    if(!this.checkThreeRooms(event)) return;
  }
  if(this.crtaj!=2 && this.rooms==3 && this.Rooms[(this.crtaj+1)%3].finished && this.Rooms[(this.crtaj+2)%3].finished){
    if(!this.checkThreeRooms(event)) return;

  }
  //DODAJ I ZA TRECU SOBU
  this.errorAlert="";
  this.Rooms[this.crtaj].doors=[];
  
  this.Rooms[this.crtaj].height=this.height[this.crtaj];
  this.Rooms[this.crtaj].width=this.width[this.crtaj];
 }
  
}

krajCrtanje(event: MouseEvent) {
  
  if(this.vrata){
    if(this.errorDoor!="") return;
    this.ctx.strokeRect(
      this.door.startX, this.door.startY, this.doorW, this.doorH
    );
  }
  if(this.errorAlert!="") return;
  this.ctx.strokeRect(
    this.Rooms[this.crtaj].startX, this.Rooms[this.crtaj].startY, this.Rooms[this.crtaj].width, this.Rooms[this.crtaj].height
  );

}




sacuvajNacrt(){
  for(let j=0;j<this.rooms;j++)
    {
      if(this.Rooms[j].finished==false){
        this.errorAlert="Morate prvo zavrsiti sve sobe!";
        return;
      }
    }
    this.errorAlert="";
    this.oservice.addObject(this.korisnik.username,this.type,this.square,this.rooms,this.adress,this.Rooms).subscribe(resp=>{
      if(resp["message"]=='error'){
        this.errorAlert="Greska!";
      }
      else{
        this.alertMessage="Objekat je dodat!";
      }
      this.oservice.getObjects(this.korisnik.username).subscribe((o:Obj[])=>{
        this.objekti=o;
        this.canvasHide();

      })
      this.adress="";
      
      this.square=null;
      this.type="";
      this.rooms=null;
      this.width=[];
      this.height=[];
      this.crtaj=-1;
      this.Rooms=[new Room(),new Room(),new Room()];
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

    })

}
addDoor(i:number){
  
  this.vrata=true;
  this.crtaj=i;
}
  finishDoor(i:number){
    this.vrata=false;
    this.Rooms[i].doors.push(new Door(this.door.startX,this.door.startY,this.door.direction));
    this.door.startX=-5;
    this.door.startY=-5;
  }
  finishRoom(i:number){
    if(this.Rooms[i].doors.length==0){
      this.errorAlert="Morate imati barem jedna vrata u prostoriji "+(i+1).toString()+"!";
      return;
    }
    this.errorAlert="";
    this.Rooms[i].finished=true;
    this.crtaj=i+1;
    this.vrata=false;
    this.door.startX=-5;
    this.door.startY=-5;
  }

  updateRoom(i:number){
    for(let j=0;j<this.rooms;j++)
    {
      if(j!=i && this.Rooms[j].finished==false){
        this.errorAlert="Morate prvo zavrsiti sobu!";
        return;
      }
    }
    this.errorAlert="";
    this.Rooms[i].finished=false;
    this.crtaj=i;
    this.vrata=false;
    this.door.startX=-5;
    this.door.startY=-5;
  }
  reset(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.Rooms.forEach(a=>{
      a.finished=false;
      a.doors=[];
      a.height=0;
      a.startX=0;
      a.startY=0;
      a.width=0;
    
    })
    this.vrata=false;
    this.crtaj=-1;
  }
  
   showSketch(o:Obj){
    this.ctx1.clearRect(0,0,this.canvas1.width,this.canvas1.height);
    let h=[5,5,7,-7];
    let w=[7,-7,5,5];
    o.Rooms.forEach(r=>{
      if(r.finished){
        this.ctx1.strokeRect(r.startX,r.startY,r.width,r.height);
        r.doors.forEach(d=>{
          let i=d.direction-1;
          this.ctx1.strokeRect(d.startX,d.startY,w[i],h[i]);

        })
      }
    })
   }

   delete(o:Obj){
    this.oservice.delete(o._id).subscribe(resp=>{
      this.oservice.getObjects(this.korisnik.username).subscribe((o:Obj[])=>{
        this.objekti=o;
        this.ctx1.clearRect(0,0,this.canvas1.width,this.canvas1.height);
        this.canvasHide();
      })
    })
    //SREDIRI FOOTER
   }

   update(o:Obj){
    this.error="";
    if(!o.adress || !o.square || !o.type){
      this.error="Nijedno polje ne sme biti prazno!";
      return;
    }
    this.oservice.updateObject(o.type,o._id,o.square,o.rooms,o.adress,o.Rooms).subscribe(resp=>{
      this.oservice.getObjects(this.korisnik.username).subscribe((o:Obj[])=>{
        this.objekti=o;
        
      })
    })
   }

   onFileSelected(event) {
    this.errorFile="";
    var file = event.target.files[0];
    var reader = new FileReader();
  
    reader.onload = (e) => {
      var fileContent = e.target.result;
      if (typeof fileContent === 'string') {
        var o = JSON.parse(fileContent);
        
        let regex = /^.*\.(json)$/;
        if (regex.test(event.target.files[0].name)) {
          this.objekat = o;
        } else {
          this.errorFile = "Pogrešan format fajla!";
        }
      }
    };
  
    reader.readAsText(file);
  }
  alertFile:string="";

  checkTwo(r1:Room,r2:Room):boolean{
    let gix = r1.startX;
    let giy = r1.startY;
    let dix = gix + r1.width, diy = giy+ r1.height;
    let lix = gix, liy = diy;
    let ddix = dix, ddiy = giy;
    if(r2.startX == dix && ((r2.startY >= giy && r2.startY <= diy) || (r2.startY +r2.height>= giy && r2.startY+r2.height <= diy) ||(r2.startY <= giy && r2.startY+r2.height >= diy))){
      
        return true;
     }
     else if(r2.startX+r2.width == gix  && ((r2.startY >= giy && r2.startY <= diy) || (r2.startY +r2.height>= giy && r2.startY+r2.height <= diy) ||(r2.startY <= giy && r2.startY+r2.height >= diy))){
     
       return true;
     }
     else if(r2.startY == liy && ((r2.startX >= gix && r2.startX <= dix) || (r2.startX +r2.width>= gix && r2.startX+r2.width<= dix) ||(r2.startX <= gix && r2.startX+r2.width>= dix) ) ){
     
      return true;

    }
     else if(r2.startY+r2.height == ddiy && ((r2.startX >= gix && r2.startX  <= dix) || (r2.startX  +r2.width>= gix && r2.startX +r2.width <= dix) ||(r2.startX  <= gix && r2.startX +r2.width >= dix) ) )
     {
      
  
      return true;
     }
  
    else{
      
      return false;
    }
    
  }
  checkPreklapanjaR(r1:Room,r2:Room):boolean{
    let soba1=r1;
    let soba2=r2;
    // Provera preklapanja soba
    if (
      soba1.startX < soba2.startX + soba2.width &&
      soba1.startX + soba1.width > soba2.startX &&
      soba1.startY < soba2.startY + soba2.height &&
      soba1.startY + soba1.height > soba2.startY
    ) {
      return true; // Sobe se preklapaju
    }
    return false; // Sobe se ne preklapaju
  
}
checkThreeRoomsS(i:number):boolean{
  if(this.checkTwo(this.objekat.Rooms[(i+1)%3],this.objekat.Rooms[i]) || this.checkTwo(this.objekat.Rooms[(i+2)%3],this.objekat.Rooms[i])){
    if(!this.checkPreklapanjaR(this.objekat.Rooms[(i+1)%3],this.objekat.Rooms[i]) && !this.checkPreklapanjaR(this.objekat.Rooms[(i+2)%3],this.objekat.Rooms[i])){
     
      return true;
      
    }
  }
  
    return false;
 
}
  dodajObjekat(){
    this.alertFile="";
    let noErrors:boolean=true;
    this.errorFile="";
    if(!this.objekat.adress){
      this.errorFile="Fali adresa!"
      noErrors=false;
    }
    if(!this.objekat.type){
      this.errorFile="Fali tip objekta!"
      noErrors=false;
    }
    if(!this.objekat.rooms){
      this.errorFile="Fali broj soba!"
      noErrors=false;
    }
    if(!this.objekat.square){
      this.errorsquare="Fali kvadratura!"
      noErrors=false;
    }
    if(this.objekat.square<=0){
      this.errorFile="Kvadratura biti veca od 0!"
      noErrors=false;
    }
    if(this.objekat.rooms<=0 ||this.objekat.rooms>3){
      this.errorFile="Broj soba biti veci od 0 i manje od 4!"
      noErrors=false;
    }
    this.objekat.Rooms.forEach(r=>{
      if(!this.checkDoorR(r)){
        this.errorFile="Vrata nisu ispravna!";
        noErrors=false;
      }
    })
    if(this.objekat.rooms==2){
      if(!this.checkTwo(this.objekat.Rooms[0],this.objekat.Rooms[1])){
        this.errorFile="Sobe se ne dodiruju ili se preklapaju!";
        noErrors=false;

      }
    }
    if(this.objekat.rooms==3){
      for(let i =0;i<3;i++){
        if(!this.checkThreeRoomsS(i)){
          this.errorFile="Sobe se ne dodiruju ili se preklapaju!";
          noErrors=false;

        }
      }
    }
  
  
  if(noErrors){
    //DODATI I OSTALE PROVERE I PROMENITI FORMAT KAO U OPISU
    this.oservice.addObject(this.korisnik.username,this.objekat.type,this.objekat.square,this.objekat.rooms,this.objekat.adress,this.objekat.Rooms).subscribe(resp=>{
      if(resp["message"]=='error'){
        this.errorFile="Greska!"
      }
      else
      {
        this.alertFile="Dodat objekat!";
      }
      this.oservice.getObjects(this.korisnik.username).subscribe((o:Obj[])=>{
        this.objekti=o;
        this.canvasHide();
      })
    })
  }
  }
  checkDoorR(r:Room):boolean{
    let gix = r.startX;
    let giy = r.startY;
    let dix = gix + r.width, diy = giy+ r.height;
    let lix = gix, liy = diy;
     let ddix = dix, ddiy = giy;
     r.doors.forEach(d=>{
      if(d.startX == dix && d.startY >= giy && d.startY <= diy && d.direction==2){
    
        return true;
       }
       else if(d.startX == gix && d.startY >= giy && d.startY <= diy && d.direction==1){
        return true;
       }
       else if(d.startY == liy && d.startX >= gix && d.startX <= dix && d.direction==4){
        return true;
        
       }
       else if(d.startY == ddiy && d.startX >= gix && d.startX <= dix && d.direction==3)
       {
        return true;
       }
    
      else{
        return false;
      }
     })
     return true;
     
  }
}
