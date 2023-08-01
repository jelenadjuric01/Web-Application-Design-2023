import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private router:Router,private userService:UserService){}
  username:string;
  password:string;
  errorUsername:string;
  errorPassword:string;

  ngOnInit(): void {
  }
  login(){
  this.errorUsername = "";
  this.errorPassword = "";

  let noErrors: boolean = true;

  if (!this.username) {
    this.errorUsername = "Obavezno polje!"
    noErrors = false;
  }
  if (!this.password) {
    this.errorPassword = "Obavezno polje!"
    noErrors = false;
  }
  if (this.username) {
    console.log(this.username)
    this.userService.getUser(this.username).subscribe((user: User) => {
      if (!user) {
        // check if user exists in database
        this.errorUsername = "Korisnik sa datim korisničkim imenom ne postoji!"
        noErrors = false;
      } else {
        console.log(user);
        // check if it has the same password as it has been written in the appropriate field
        if(user.type!="administrator"){
          noErrors=false;
          this.errorUsername="Ne postoji administrator sa ovim korisnickim imenom!"
        }
        if (this.password && user.password != this.password) {
          console.log(this.password)
          console.log(user.password)
          this.errorPassword = "Pogrešna lozinka!";
          noErrors = false;
        }
        if(noErrors){
          localStorage.setItem("logged",user.username);
          this.router.navigate([user.type]);
        }
      }
    });
  }
}
  back(){
    this.router.navigate([""]);
  }
  changePassword() {
    console.log("change password");
    this.router.navigate(['change']);
  }
  reset(){
    this.router.navigate(["reset"]);
  }

}


