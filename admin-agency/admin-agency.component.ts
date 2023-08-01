import { Component, OnInit } from '@angular/core';
import User from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Req from '../models/request';
import Worker from '../models/worker';

import { RequestService } from '../services/request.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-admin-agency',
  templateUrl: './admin-agency.component.html',
  styleUrls: ['./admin-agency.component.css']
})
export class AdminAgencyComponent implements OnInit {

  constructor(private router:Router,private userService:UserService,private rservice:RequestService,private wservice:WorkerService) { }
  klijenti:User[]=[];
  approvedClients:User[]=[];
  unapprovedClients:User[]=[];
  showing:number=0; //0-prikaz klijenata, 1-zahtevi,2-dodaj klijenta, 3- zahtevi za radna mesta, 4- radnici
  zahtevi:Req[]=[];
  radnici:Worker[]=[];
  prihvaceniZahtevi:Req[]=[];


  username: string;
  errorUsername: string;

  password: string;
  errorPassword: string;

  confirmPassword: string;
  errorConfirmPassword: string;
  name:string;
  errorName: string;

  agency:string="";
  errorAgency:string;

  errorAdress: string;
  errorUEmail:string='';
  errorUPhone:string='';
  
  updatedMessage:string="";
  email: string;
  errorEmail: string;

  errorType: string;

  addedUser: boolean = false;
  alertMessage: string;

  errorPhone:string;
  phone:string;

  country:string;
  pib:number;
  errorPib:string;

  description:string;
  errorDesc:string;

  city:string;
  errorCity:string;

  street:string;
  errorStreet:string;

  number:string;
  errorNumber:string;
  
  lastname:string;


  specialization:string;
  errorSpec:string;

  pictureFile : string | ArrayBuffer;
  fileName : string= "user.jpg";
  uploadFile = null;
  errorFile:string;
  picture: object;

  selectedImage:File | null;

  updating:boolean=false;
  updateMessage:string="";
  requestMessage:string="";

  error:string="";

  ngOnInit(): void {
    this.showing=0;
    this.initAgencies();
    this.initRequests();
    this.initWorkers();
    
  }
  initWorkers(){
    this.wservice.getAllWorkers().subscribe((w:Worker[])=>{
      this.radnici=w;
    })
  }
  restartErrors(){
    this.errorUsername = "";
    this.errorPassword = "";
    this.errorConfirmPassword = ""
    this.errorName = "";
    this.errorAdress = ""
    this.errorEmail = "";
    this.errorType = "";
    this.errorCity="";
    this.errorDesc="";
    this.errorNumber="";
    this.errorPib="";
    this.errorPhone="";
    this.errorStreet="";
    this.errorUEmail="";
    this.errorUPhone="";
    this.alertMessage="";
    this.errorAgency="";
    this.errorFile="";
    this.errorSpec="";
    this.errorAgency="";
    this.error="";
  }
  delete(username:string){
    this.userService.delete(username).subscribe(resp=>{
      this.initAgencies();
     
      
    });
  
  }
  initRequests(){
    this.rservice.getAll().subscribe((r:Req[])=>{
      this.zahtevi=r.filter(a=>!a.approved);
      this.prihvaceniZahtevi=r.filter(a=>{
        return a.approved==true;
      });
    })
  }

  getName(username:string){
    return this.approvedClients.find(a=>{
      return a.username.match(username);
    }).name;
  }

  initAgencies(){
    this.userService.getAgencies().subscribe((k:User[])=>{
      this.klijenti=k;
      this.approvedClients=this.klijenti.filter(a=>{
        return a.approved==true;
      })
      this.unapprovedClients=this.klijenti.filter(a=>{
        return a.approved==false;
      })
    })
  }
  denyReq(agency:string){
    this.rservice.delete(agency).subscribe(resp=>{
      if(resp['message']=='error'){
        this.requestMessage="Greska!";
      }
      else{
        this.requestMessage="Odbijeno!";
      }
      this.initRequests();
    })
  }
  acceptReq(agency:string){
    
    this.rservice.updateReq(agency).subscribe(resp=>{
      if(resp['message']=='error'){
        this.requestMessage="Greska!";
      }
      else{
        this.requestMessage="Prihvaceno!";
      }
      this.initRequests();
    })
  }

  deny(username:string,email:string)
  {
    this.userService.disapproveUser(username,email).subscribe(resp=>{
      this.userService.delete(username).subscribe(resp=>{
        this.initAgencies();
      })
    })
  }
  accept(username:string){
    this.userService.approveUser(username,true).subscribe(resp=>{
      this.initAgencies();
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }
  back(){
    this.router.navigate(["administrator"]);
  }
  
  changeShowing(n:number){
    this.showing=n;
    if(this.showing==2){
      this.updating=false;
    }
    else if(this.showing==0){
      this.updateMessage="";
    }
    this.restartErrors();
    this.initRequests();
  }
  


  onFileSelected(event) {
    console.log('event', event);

    let rand = Math.floor(Math.random()*10000 + 1);
    this.fileName = rand + event.target.files[0].name;

    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (evt) => {
      this.pictureFile = evt.target.result;
      console.log('cc', this.pictureFile);
    };

    let regex = /^.*\.(png|jpg|JPG)$/;
    if(regex.test(this.fileName)){
      
    }else{
      this.errorFile = "GREŠKA: Pogresan format fajla!"
      this.picture = null;
      this.fileName = "";
    }
  }
  


  update(korisnik:User){
    if(!this.updating){
      this.updating=true;
    }
    else{
      this.errorEmail = "";
      this.error="";
      this.errorPhone="";
      this.errorFile="";
      this.updateMessage="";
      let noErrors: boolean = true;
      if(!korisnik.city || !korisnik.country || !korisnik.description || !korisnik.email || !korisnik.name || !korisnik.phone || !korisnik.street){
        this.error="Nijedno polje ne sme biti prazno!";
        return;
      }
      let emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 
      if (korisnik.email) {
        console.log(korisnik.email)
        if (!emailRegex.test(korisnik.email)) {
          this.errorEmail = "Email mora biti u odgovarajućem formatu!"
          noErrors = false;
        } 
      }
      let phoneRegex=/^(\+381|0)(6(([0123459]\d{6,7})|6[0123459]\d{5,6}))$/
      if (korisnik.phone) {
        console.log(korisnik.phone)
        if (!phoneRegex.test(korisnik.phone)) {
          this.errorPhone = "Broj mora biti u odgovarajućem formatu!"
          noErrors = false;
        } 
      
      }
      this.userService.checkEmail(korisnik.email).subscribe((u:User)=>{
        if(u && u.username!=korisnik.username){
          this.errorEmail="Email adresa vec postoji u bazi!";
          noErrors=false;
        }
       
      if(noErrors){
        
        
      this.userService.updateAgency(korisnik,this.fileName,this.pictureFile).subscribe(resp=>{
        if(resp["message"]=="ok"){
          this.updateMessage="Korisnik je uspesno azuriran!"
        }
        else{
          this.updateMessage="Greska!"
        }
      })
      this.updating=false;
    
  }
});
    }
      

  }
  register(){
    this.errorUsername = "";
    this.errorPassword = "";
    this.errorConfirmPassword = ""
    this.errorName = "";
    this.errorAdress = ""
    this.errorEmail = "";
    this.errorType = "";
    this.errorCity="";
    this.errorDesc="";
    this.errorNumber="";
    this.errorPib="";
    this.errorPhone="";
    this.errorStreet="";
    this.addedUser = false;
    this.alertMessage="";
    let noErrors: boolean = true;
    this.errorFile="";
   
    if (!this.username) {
      this.errorUsername = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.password) {
      this.errorPassword = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.confirmPassword) {
      this.errorConfirmPassword = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.name) {
      this.errorName = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.country) {
      this.errorAdress = "Obavezno polje!"
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
    
    
    if (!this.city) {
      this.errorCity = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.street) {
      this.errorStreet = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.number) {
      this.errorNumber = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.pib) {
      this.errorPib = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.description) {
      this.errorDesc = "Obavezno polje!"
      noErrors = false;
    }
    
   

    let passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;

    if (this.password) {
      console.log(this.password)
      if (!passwordRegex.test(this.password)) {
        this.errorPassword = "Lozinka mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    }

    if (this.password && this.confirmPassword && this.password !== this.confirmPassword) {
      console.log(this.confirmPassword)
      this.errorConfirmPassword = "Lozinke moraju biti iste!"
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
    let pibRegex=/^^(\+)?\d{9,13}$/;
    if (this.pib) {
      console.log(this.pib)
      if (this.pib<=0 || !pibRegex.test(this.pib.toString())) {
        this.errorPib = "Pib mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    }
    let numRegex=/^(\d*\w*|bb)$/;

      if (this.number) {
        console.log(this.number)
        if (!numRegex.test(this.number)) {
          this.errorNumber = "Broj mora biti u odgovarajućem formatu!"
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
    if (this.username) {
      console.log(this.username)
      this.userService.getUser(this.username).subscribe((user: User) => {
        if (user) {
          // check if user exists in database
          console.log(user);
          this.errorUsername = "Korisničko ime već postoji u bazi!"
          noErrors = false;
        }
      else{
        this.userService.checkEmail(this.email).subscribe((u:User)=>{
          if(u){
            this.errorEmail="Email adresa vec postoji u bazi!";
            noErrors=false;
          }
          else if(noErrors){
          
          
          this.userService.addUser(this.username,this.password,this.phone,this.email,"agencija",this.fileName,this.pictureFile).subscribe((resp)=>{
           
            
            if(resp["message"]=="User added"){
              
            
              
                this.userService.addAgency(this.name,this.country,this.city,this.street,this.number,this.pib,this.description,this.username).subscribe(resp=>{
                  if(resp["message"]=="ok")
                  {this.addedUser = true;
                  this.alertMessage = "Korisnik je uspešno dodat!"}
                
                })
              
            }
            else if(resp["message"]=="Username denied"){
              this.errorUsername="Korisnicko ime ili email je odbijeno!"
            }

            this.username = "";
                  this.password = "";
                  this.confirmPassword = "";
                 this.name="";
                  this.country = "";
                  this.email = "";
                  this.city = "";
                  this.country = "";
                  this.description = "";
                  this.fileName = "";
                  this.phone="";
                  this.street="";
                  this.number="";
                  this.pib=null;
                  
          })
          }
        })
        
      }});
      }
    }

    updateWorker(w:Worker){
    
      this.errorUEmail = "";
      this.error="";
      this.errorUPhone="";
      this.updatedMessage="";
      
      let noErrors: boolean = true;
      let emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(!w.email || !w.firstname || !w.lastname || !w.phone || !w.specialization){
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
        this.initWorkers();
      })
    }
  }
  deleteWorker(w:Worker){
    this.wservice.delete(w._id).subscribe(resp=>{
      let zahtev=this.zahtevi.find(a=>a.agency.match(w.agency));
      if(zahtev && zahtev.approved){
        this.rservice.deleteWorker(zahtev.agency).subscribe(resp=>{
          
          
        })
      }
        this.initRequests();
        this.initWorkers();
  
    })
  }

  registerWorker(){
    
    this.errorName = "";
    
    this.errorEmail = "";
    this.errorFile="";
    this.errorPhone="";
    this.errorAgency="";
    this.errorSpec="";
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
    if (!this.agency) {
      this.errorAgency = "Obavezno polje!"
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
          
          this.wservice.addWorker(this.name,this.lastname,this.phone,this.email,this.agency,this.specialization).subscribe(resp=>{
            if(resp['message']!='Error'){
            
              this.rservice.addWorker(this.agency).subscribe(respo=>{
                if(resp['message']!='error'){
                  this.alertMessage='Radnik dodat!'
                 this.initRequests();
                 this.initWorkers();
                  
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
            this.agency="";
          })
          }
        
        //SREDITI FOOTER
    
      }


}
