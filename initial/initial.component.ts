import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  constructor(private router: Router,private userService:UserService) { }

  agencies:User[]=[];
  name:string="";
  adress:string="";
  sort:string="";
  sortAdr:boolean=false;
  sortName:boolean=false;
  showedAgencies:User[]=[];
  korisnik:User=null;

  ngOnInit(): void {
   let username=localStorage.getItem("logged");
    this.userService.getUser(username!=null?username:"").subscribe((u:User)=>{
      if(u){
        this.korisnik=u;
      }
      else{
        this.korisnik=null;
      }
    })
    this.userService.getAgencies().subscribe((agen:User[])=>{
      this.agencies=agen.filter(a=>{
        return a.approved==true;
      });
      this.showedAgencies=this.agencies;
    })
  }



  register() {
    console.log("register user");
    this.router.navigate(["register"]);
  }

  login() {
    console.log("login user");
    this.router.navigate(["login"]);
  }
  search(){
    
    if(this.name=="" && this.adress!=""){
      this.showedAgencies=this.agencies.filter(a=>{
        return a.city.includes(this.adress)||a.country.includes(this.adress)||a.street.includes(this.adress);
      })
    }
    else if(this.name!=""&& this.adress==""){
      this.showedAgencies=this.agencies.filter(a=>{
        return a.name.includes(this.name);
      })
    }
    else if(this.name!="" && this.adress!=""){
      this.showedAgencies=this.agencies.filter(a=>{
        return a.name.includes(this.name) && (a.city.includes(this.adress)||a.country.includes(this.adress)||a.street.includes(this.adress));
      })
    }
    else if(this.name=="" && this.adress==""){
      this.showedAgencies=this.agencies;
    }
  }
  sortAgencies(){
    if(this.sort=="asc")
    {
      if(this.sortAdr && !this.sortName){
      this.showedAgencies=this.showedAgencies.sort((a,b)=>{
        return (a.street+a.city+a.country)<(b.street+b.city+b.country)?-1:1;
      })
    }
    else if(!this.sortAdr && this.sortName){
      this.showedAgencies=this.showedAgencies.sort((a,b)=>{
        return a.name<b.name?-1:1;
      })
    }
    else if(this.sortAdr && this.sortName){
      this.showedAgencies=this.showedAgencies.sort((a,b)=>{
        return (a.street+a.city+a.country+a.name)<(b.street+b.city+b.country+b.name)?-1:1;
      })
    }
  }
  else if(this.sort=="desc"){
    if(this.sortAdr && !this.sortName){
      this.showedAgencies=this.showedAgencies.sort((a,b)=>{
        return (a.street+a.city+a.country)>(b.street+b.city+b.country)?-1:1;
      })
    }
    else if(!this.sortAdr && this.sortName){
      this.showedAgencies=this.showedAgencies.sort((a,b)=>{
        return a.name>b.name?-1:1;
      })
    }
    else if(this.sortAdr && this.sortName){
      this.showedAgencies=this.showedAgencies.sort((a,b)=>{
        return (a.street+a.city+a.country+a.name)>(b.street+b.city+b.country+b.name)?-1:1;
      })
    }
  }
  }
  logout(){
    localStorage.clear();
    //this.korisnik=null;
    window.location.reload();
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
    this.router.navigate(['object'])
  }
  
 
}