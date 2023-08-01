import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router,private uservice:UserService) { }
  client:boolean=true;
  admin:User;
  business(){
    this.router.navigate(['admin-business']);
  }
  ngOnInit(): void {
    this.uservice.getUser(localStorage.getItem("logged")).subscribe((user:User)=>{
      this.admin=user;
    })
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
