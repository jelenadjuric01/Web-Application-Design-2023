import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient,private userService:UserService) { }
  username: string;
  errorUsername: string;

  password: string;
  errorPassword: string;

  confirmPassword: string;
  errorConfirmPassword: string;

  firstname: string;
  errorName: string;

  lastname: string;
  errorAdress: string;

  

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

  pictureFile : string | ArrayBuffer;
  fileName : string= "user.jpg";
  uploadFile = null;
  errorFile:string;
  picture: object;



  client:boolean=true;
 


  ngOnInit(): void {
  }
  back(){
    this.router.navigate([""]);
  }
  changeClient(b:boolean){
    this.client=b;
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
    this.errorFile="";
    
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
    this.errorFile="";
    let noErrors: boolean = true;

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
    if (!this.firstname &&this.client) {
      this.errorName = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.lastname && !this.country) {
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
    
    
    if (!this.city && !this.client) {
      this.errorCity = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.street && !this.client) {
      this.errorStreet = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.number && !this.client) {
      this.errorNumber = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.pib &&!this.client) {
      this.errorPib = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.description && !this.client) {
      this.errorDesc = "Obavezno polje!"
      noErrors = false;
    }
    this.uploadFile = new FormData();
    this.uploadFile.set("name", this.fileName);
    this.uploadFile.set("file", this.pictureFile);
    

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
          
          
          this.userService.addUser(this.username,this.password,this.phone,this.email,this.client?"klijent":"agencija",this.fileName,this.pictureFile).subscribe((resp)=>{
           
            
            if(resp["message"]=="User added"){
              
            
            if(this.client){
              this.userService.addClient(this.firstname,this.lastname,this.username).subscribe(resp=>{
                if(resp["message"]=="ok")
                {this.addedUser = true;
                this.alertMessage = "Korisnik je uspešno dodat!"}
              })
            }
            else{
              this.userService.addAgency(this.firstname,this.country,this.city,this.street,this.number,this.pib,this.description,this.username).subscribe(resp=>{
                if(resp["message"]=="ok")
                {this.addedUser = true;
                this.alertMessage = "Korisnik je uspešno dodat!"}
              
              })}
          }
            else if(resp["message"]=="Username denied"){
              this.errorUsername="Korisnicko ime ili email je odbijeno!"
            }

            this.username = "";
                  this.password = "";
                  this.confirmPassword = "";
                  this.firstname = "";
                  this.lastname = "";
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
                  
                  
          
          });
        }
        
      });
    }
      




  });
}
  }
  login(){
    this.router.navigate(['login']);
  }

}

