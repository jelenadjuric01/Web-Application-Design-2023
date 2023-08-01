import * as express from 'express';
import User from '../models/user'
import { Request, Response } from 'express';
import fs from 'fs';



export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'username': username, 'password': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    checkEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        console.log(email);
        User.findOne({ 'email': email }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    addUser = (req: Request, res: Response) => {
    
            
            User.findOne({"type":"forbiden"},(err,u)=>{
                const username = req.body.username;
                const password = req.body.password;
                const phone = req.body.phone;
                const email = req.body.email;
                if(!u.emails.includes(email) && !u.usernames.includes(username))
               { const type = req.body.type;
                let nameFile = req.body.slika;
        let uploadFile = req.body.uploadFile;
        
        console.log('slika', nameFile);
        console.log('uploadFajl', uploadFile);

        if(uploadFile != null){
            fs.writeFile('../frontend/src/assets/' + nameFile, uploadFile, 'binary', function (err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
        }
                
                let user = new User({
                    username: username,
                    password: password,
                    type: type,
                    email: email,
                    phone: phone,
                    approved:false,
                    profile:nameFile!=""?nameFile:'user.jpg'
                });
        
                user.save((err, resp) => {
                    if (err) {
                        console.log(err);
                        res.json({ "message": "Error" });
                    } else {
                        res.json({ "message": "User added" });
                    }
                
            });}
            else{
                res.json({ "message": "Username denied" });

            }
        });
    }
        
       
            
        
    

    uploadPicture=(req: express.Request, res: express.Response) => {
        let username=req.body.username;
       
        console.log(req.body)
        User.updateOne({"username":username},{$set:{"profile":req.body.image.name}},(err,resp)=>{
            if(err){
                console.log(err);
                res.json({"message":"error"})
            }
            else{
                res.json({"message":"ok"})
            }
        })
    }

    changePassword=(req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password=req.body.password;


        User.findOneAndUpdate({ 'username': username },{$set:{"password":password}}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"Password changed"})
        })
    }

    
    addClient=(req: express.Request, res: express.Response) => {
        let firstname = req.body.firstname;
        let lastname=req.body.lastname;
        let username=req.body.username;

        User.updateOne({ 'username': username },{"firstname":firstname, "lastname":lastname}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    addAgency=(req: express.Request, res: express.Response) => {
        
        let name=req.body.name;
        let country=req.body.country;
        let city=req.body.city;
        let street=req.body.street+" "+req.body.number;
        let pib=parseInt(req.body.pib);
        let desc=req.body.desc;
        let username=req.body.username;

        User.updateOne({ 'username': username },{"name":name, "country":country,"city":city,"street":street,"pib":pib,"description":desc}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    updateAgency=(req: express.Request, res: express.Response) => {
        
        let name=req.body.name;
        let country=req.body.country;
        let city=req.body.city;
        let street=req.body.street;
        let desc=req.body.desc;
        let email=req.body.email;
        let phone=req.body.phone;
        let username=req.body.username;
        let nameFile = req.body.slika;
        let uploadFile = req.body.uploadFile;
        
       
        if(uploadFile != null){
            User.findOne({"username":username},(err,u)=>{
                let oldProfile=u.profile;
                let pathName='../frontend/src/assets/' + oldProfile;
                if(oldProfile!="user.jpg")
               { fs.unlink(pathName,err=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Uspesno obrisano!");
                    }
                })}
                fs.writeFile('../frontend/src/assets/' + nameFile, uploadFile, 'binary', function (err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                }); 
                User.findOneAndUpdate({"username":username},{$set:{'profile':nameFile}},(err,resp)=>{
                    if(err) console.log(err);
                })
    
            })
        }

        User.findOneAndUpdate({ 'username': username },{$set:{"name":name, "country":country,"city":city,"street":street,"description":desc,"phone":phone,"email":email}}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    
}

    updateClient=(req: express.Request, res: express.Response) => {
        let firstname = req.body.firstname;
        let lastname=req.body.lastname;
        let username=req.body.username;
        let email=req.body.email;
        let phone=req.body.phone;
        let nameFile = req.body.slika;
        let uploadFile = req.body.uploadFile;
        
       
        if(uploadFile != null){
        User.findOne({"username":username},(err,u)=>{
            let oldProfile=u.profile;
            let pathName='../frontend/src/assets/' + oldProfile;
            if(oldProfile!="user.jpg")
           { fs.unlink(pathName,err=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Uspesno obrisano!");
                }
            })}
            fs.writeFile('../frontend/src/assets/' + nameFile, uploadFile, 'binary', function (err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
            User.findOneAndUpdate({"username":username},{$set:{'profile':nameFile}},(err,resp)=>{
                if(err) console.log(err);
            })

        })
    }

        User.collection.updateOne({ 'username': username },{$set:{"firstname":firstname, "lastname":lastname,"phone":phone,"email":email}}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }


    getAgencies = (req: express.Request, res: express.Response) => {
        

        User.find({'type':"agencija" }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }
    getClients = (req: express.Request, res: express.Response) => {
        

        User.find({'type':"klijent" }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }
    approveUser=(req: express.Request, res: express.Response) => {
       
        let username=req.body.username;
        let app=req.body.approved;
        
        User.collection.updateOne({ 'username': username },{$set:{"approved":app}}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    
    delete = (req: express.Request, res: express.Response) => {
        
        let username=req.body.username;
        User.findOne({'username':username }, (err, user) => {
            if(user.profile!='user.jpg'){
                let pathName='../frontend/src/assets/' + user.profile;
                fs.unlink(pathName,err=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Uspesno obrisano!");
                    }
                })
            }

        })
        User.deleteOne({'username':username }, (err, user) => {
            if (err) res.json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }
    disapproveUser = (req: Request, res: Response) => {
    
       
        const email = req.body.email;
        const type = "forbiden";
        const username=req.body.username;
        User.collection.updateOne({ 'type': type },{$push:{"usernames":username,"emails":email}}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    
}

    
}
   
