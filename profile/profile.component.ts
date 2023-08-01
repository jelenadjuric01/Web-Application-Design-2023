import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router:Router,private uservice:UserService) { }
  korisnik:User;
  client:boolean;

  errorEmail: string;

  alertMessage: string="";

  errorPhone:string;
 
  errorNumber:string;

  pictureFile : string | ArrayBuffer;
  fileName : string= "";
  uploadFile = null;
  errorFile:string;
  picture: object;
  error:string="";

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
      this.errorFile = "Dobar format fajla!"
    }else{
      this.errorFile = "GREŠKA: Pogresan format fajla!"
      this.picture = null;
      this.fileName = "";
    }
  }
  

  ngOnInit(): void {
    this.uservice.getUser(localStorage.getItem("logged")).subscribe((user:User)=>{
      this.korisnik=user;
      this.client=(this.korisnik.type=="klijent");
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
  update(){
    
    this.errorEmail = "";
    this.error="";
    this.errorNumber="";
    this.errorPhone="";
    
    this.alertMessage="";
    let noErrors: boolean = true;

    let emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(this.korisnik.type=="klijent" && (!this.korisnik.firstname || !this.korisnik.lastname || !this.korisnik.phone || !this.korisnik.email)){
      this.error="Nijedno polje ne sme biti prazno!";
      return;
    }
    if(this.korisnik.type=="agencija" && (!this.korisnik.name || !this.korisnik.description || !this.korisnik.phone || !this.korisnik.email || !this.korisnik.city || !this.korisnik.country || !this.korisnik.street)){
      this.error="Nijedno polje ne sme biti prazno!";
      return;
    }
    if (this.korisnik.email) {
      console.log(this.korisnik.email)
      if (!emailRegex.test(this.korisnik.email)) {
        this.errorEmail = "Email mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    }
    let phoneRegex=/^(\+381|0)(6(([0123459]\d{6,7})|6[0123459]\d{5,6}))$/
    if (this.korisnik.phone) {
      console.log(this.korisnik.phone)
      if (!phoneRegex.test(this.korisnik.phone)) {
        this.errorPhone = "Broj mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    
    }
   
    this.uservice.checkEmail(this.korisnik.email).subscribe((u:User)=>{
      if(u && u.username!=this.korisnik.username){
        this.errorEmail="Email adresa vec postoji u bazi!";
        noErrors=false;
      }
      if(noErrors){
        if(this.client){
          this.uservice.updateClient(this.korisnik,this.fileName,this.pictureFile).subscribe(resp=>{
            if(resp["message"]=="ok"){
              this.alertMessage="Uspešno ažurirano!"
            }
          })
        }
        else{
          this.uservice.updateAgency(this.korisnik,this.fileName,this.pictureFile).subscribe(resp=>{
            if(resp["message"]=="ok"){
              this.alertMessage="Uspešno ažurirano!"
            }
          })
        }
      }
    });
  
  
  
    
  

  
}
workers(){
  this.router.navigate(["worker"]);
}
  back(){
    if(this.client){
      this.router.navigate(["klijent"]);
    }
    else{
      this.router.navigate(["agencija"]);
    }
  }
  agencies(){
    this.router.navigate([""]);
  }
  business(){
    this.router.navigate(["business"]);
  }
  objects(){
    this.router.navigate(["object"]);
  }
}
