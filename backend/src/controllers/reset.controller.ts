import * as express from 'express';
import Res from '../models/reset'
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dj200356d@student.etf.bg.ac.rs',
      pass: '0611001756027'
    },
    tls: {
        rejectUnauthorized: false
      }
  });
  

export class ResController {
    login = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let password = req.body.password;

        Res.findOne({ 'email': email, 'password': password }, (err, user) => {
            if (err) {
                console.log(err);
                
            }
            else res.json(user)
        })
    }
    addPassword = async (req: Request, res: Response) => {
        const uri = 'mongodb://127.0.0.1:27017';
        const client = new MongoClient(uri);
        let noErrors=true;

        const database = client.db('company');
    const collection = database.collection('reset');
    try {
    // Create TTL index with expireAfterSeconds set to desired time (e.g., 10 minutes)
    await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 600 });
    let text="Postovani, Vasa nova lozinka je "+req.body.password+" , molim Vas promenite je u roku od 10 minuta!"
    // Insert document with createdAt field
    const document = { password: req.body.password,
        email: req.body.email, createdAt: new Date() };
    await collection.insertOne(document);
    var mailOptions = {
        from: 'dj200356d@student.etf.bg.ac.rs',
        to: req.body.email,
        subject: 'Zaboravljena lozinka',
        text: text
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          noErrors=false;
          console.log(error);
        } else {
          console.log('Email sent:', info.response);
        }
        if(noErrors){
            res.json({"message":"ok"});
            }
            else{
                res.json({"message":"error"});
                Res.deleteOne({'email':req.body.email},(err,resp)=>{

                })
            }
      });
      
        }
        catch (error) {
            console.error('Error:', error);
            res.json({"message":"error"});
        }
        

        
    }
        
       
    
    
}
   
