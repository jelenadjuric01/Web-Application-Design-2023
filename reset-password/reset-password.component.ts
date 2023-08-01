import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { ResetService } from '../services/reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router:Router,private userService:UserService,private resetService:ResetService) { }


  email:string="";
  errorEmail:string="";
  alertMessage:string="";
  addedPass:boolean=false;

  ngOnInit(): void {
  }

  reset(){
    this.alertMessage="";
    this.addedPass=false;
    let noErrors:boolean=true;
    this.errorEmail="";
    if(this.email==""){
      this.errorEmail="Obavezno polje!";
      noErrors=false;
    }
    if(noErrors){
      this.userService.checkEmail(this.email).subscribe((u:User)=>{
        if(!u){
          this.errorEmail="Nepostojeci email!"
        }
        else{
          let newP=this.generateRandomString();
          this.resetService.addPassword(this.email,newP).subscribe(resp=>{
            if(resp['message']=='error'){
              this.errorEmail='Greska!'
            }
            else{
              this.addedPass=true;
              this.alertMessage="Nova lozinka Vam je poslata na mail, imate 10 min da je promenite!"
            }
          })
        }
      })
    }

  }
  back(){
    this.router.navigate([""]);
  }
  changePassword() {
    console.log("change password");
    this.router.navigate(['change']);
  }
  register() {
    console.log("register user");
    this.router.navigate(['register']);
  }
  login(){
    this.router.navigate(["login"]);
  }
  generateRandomString(): string {
    let regex=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])(?=.{7,12})([a-zA-Z].*)$/;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&+=';
    let randomString = '';
  
    // Generišemo prvi karakter koji je slovo
    const randomLetter = characters[Math.floor(Math.random() * 52)];
    randomString += randomLetter;
  
    // Generišemo ostale karaktere
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
  
    // Dodajemo veliko slovo, broj i specijalni karakter
    const randomCapitalLetter = characters[Math.floor(Math.random() * 26) + 26];
    const randomNumber = characters[Math.floor(Math.random() * 10) + 52];
    const randomSpecialChar = characters[Math.floor(Math.random() * 8) + 62];
  
    randomString += randomCapitalLetter;
    randomString += randomNumber;
    randomString += randomSpecialChar;
  
    // Ako ne zadovoljava regex, generišemo novi string
    if (!regex.test(randomString)) {
      return this.generateRandomString();
    }
  
    return randomString;
  }
}
