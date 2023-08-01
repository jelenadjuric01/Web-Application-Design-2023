import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

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
  business(){
    this.router.navigate(["business"]);
  }
  objects(){
    this.router.navigate(["object"])
  }
  agencies(){
    this.router.navigate([""]);
  }

}
