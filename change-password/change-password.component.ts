import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router:Router,private uservice:UserService) { }

  oldPassword: string;
  errorOldPassword: string;

  newPassword: string;
  errorNewPassword: string;

  newPasswordRepeated: string;
  errorNewPasswordRepeated: string;

  alertMessage:string="";

  korisnik:User;

  ngOnInit(): void {
    this.uservice.getUser(localStorage.getItem("logged")).subscribe((user:User)=>{
      this.korisnik=user;
    })
  }
  back(){
    if(this.korisnik.type=="klijent"){
      this.router.navigate(["klijent"]);
    }
    else if(this.korisnik.type=="agencija"){
      this.router.navigate(["agencija"])
    }
    else{
      this.router.navigate(["administrator"]);

    }
  }
  change(){
    this.errorNewPassword = "";
    this.errorNewPasswordRepeated = "";
    this.errorOldPassword = "";
    this.alertMessage="";
    let noErrors=true;
    if (!this.oldPassword) {
      this.errorOldPassword = "Obavezno polje!"
      noErrors=false;
    }
    if (!this.newPassword) {
      this.errorNewPassword = "Obavezno polje!"
      noErrors=false;
    }
    if (!this.newPasswordRepeated) {
      this.errorNewPasswordRepeated = "Obavezno polje!"
      noErrors=false;
    }

    let passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;

    if (this.newPassword) {
      console.log(this.newPassword)
      if (!passwordRegex.test(this.newPassword)) {
        this.errorNewPassword = "Lozinka mora biti u odgovarajućem formatu!"
        noErrors = false;
      } 
    }

    if (this.newPassword && this.newPasswordRepeated && this.newPassword !== this.newPasswordRepeated) {
      console.log(this.newPasswordRepeated)
      this.errorNewPasswordRepeated = "Lozinke moraju biti iste!"
      noErrors = false;
    }

    if(this.oldPassword!=this.korisnik.password){
      this.errorOldPassword="Lozinka nije tacna!"
      noErrors=false;
    }

    if(noErrors){
      this.uservice.changePassword(this.korisnik.username,this.newPassword).subscribe((resp)=>{
        if(resp["message"]!='error'){
          this.alertMessage="Uspesno promenjeno!";
        this.oldPassword="";
        this.errorOldPassword="";
      
        this.newPassword="";
        this.errorNewPassword="";
      
        this.newPasswordRepeated="";
        this.errorNewPasswordRepeated="";
        setTimeout(()=>{
          localStorage.clear();
          this.router.navigate([""]);
        },3000);
        }
        else{
        this.alertMessage="Greska!";
        }
      })
    }


  }
  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

}