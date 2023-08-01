import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private router:Router,private uservice:UserService) { }
  korisnik:User;
  ngOnInit(): void {
    this.uservice.getUser(localStorage.getItem("logged")).subscribe((user:User)=>{
      this.korisnik=user;
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
    this.router.navigate(["business"]);
  }

}