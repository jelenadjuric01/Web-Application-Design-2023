import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-client',
  templateUrl: './admin-client.component.html',
  styleUrls: ['./admin-client.component.css']
})
export class AdminClientComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }
  agencije:User[]=[];
  approvedAgencies:User[]=[];
  unapprovedAgencies:User[]=[];
  showing:number=0; //0-prikaz agencija, 1-zahtevi,2-dodaj agenciju

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

  updateEmail:string;

  error:string="";

  pictureFile : string | ArrayBuffer;
  fileName : string= "user.jpg";
  uploadFile = null;
  errorFile:string;
  picture: object;

  updating:boolean=false;
  updateMessage:string="";

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
  

  ngOnInit(): void {
    this.showing=0;
    this.initClients();
  }
  delete(username:string){
    this.userService.delete(username).subscribe(resp=>{
      this.initClients();
     
      
    });
  
  }

  initClients(){
    this.userService.getClients().subscribe((k:User[])=>{
      this.agencije=k;
      this.approvedAgencies=this.agencije.filter(a=>{
        return a.approved==true;
      })
      this.unapprovedAgencies=this.agencije.filter(a=>{
        return a.approved==false;
      })
    })
  }
  deny(username:string,email:string)
  {
    this.userService.disapproveUser(username,email).subscribe(resp=>{
      this.userService.delete(username).subscribe(resp=>{
        this.initClients();
      })
    })
  }
  accept(username:string){
    this.userService.approveUser(username,true).subscribe(resp=>{
      this.initClients();
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
    this.errorUsername = "";
    this.errorPassword = "";
    this.errorConfirmPassword = ""
    this.errorName = "";
    this.errorAdress = ""
    this.errorEmail = "";
    this.errorType = "";
    this.errorPhone="";
    this.addedUser = false;
    this.alertMessage="";
    this.errorFile="";
    this.errorEmail = "";
    this.error="";
    
      this.errorPhone="";
      this.errorFile="";
    if(this.showing==2){
      this.updating=false;
    }
    else if(this.showing==0){
      this.updateMessage="";
    }

  }
  image:File=null;




  update(korisnik:User){
    if(!this.updating){
      this.updating=true;
    }
    else{
      this.errorEmail = "";
    
      this.errorPhone="";
      this.errorFile="";
      this.updateMessage="";
      let noErrors: boolean = true;
      if(!korisnik.firstname || !korisnik.lastname || !korisnik.email || !korisnik.phone){
        this.error="Nijedno polje ne sme biti prazno!";
        return;
      }
  
      let emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //NACI BOLJI NACIN
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
        
        
      this.userService.updateClient(korisnik,this.fileName,this.pictureFile).subscribe(resp=>{
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
    this.errorPhone="";
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
    if (!this.firstname) {
      this.errorName = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.lastname) {
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
          
          
          this.userService.addUser(this.username,this.password,this.phone,this.email,"klijent",this.fileName,this.pictureFile).subscribe((resp)=>{
            
            
            if(resp["message"]=="User added"){
              
            
                this.userService.addClient(this.firstname,this.lastname,this.username).subscribe(resp=>{
                  if(resp["message"]=="ok")
                  {this.addedUser = true;
                  this.alertMessage = "Korisnik je uspešno dodat!"}
                  this.initClients();
                })
              
             
            }
            else if(resp["message"]=="Denied username"){
              this.errorUsername="Korisnicko ime je odbijeno!"
            }

            this.username = "";
                  this.password = "";
                  this.confirmPassword = "";
                  this.firstname = "";
                  this.lastname = "";
                  this.email = "";
                 
                  this.fileName = "";
                  this.phone="";
                 
                  
          })
          }
        })
        
      }});
      }
    }



}
