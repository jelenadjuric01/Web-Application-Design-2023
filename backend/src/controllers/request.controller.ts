import * as express from 'express';

import { Request, Response } from 'express';

import Req from '../models/request';
import mongoose from 'mongoose';



export class ReqController {
   

   
    addReq = (req: Request, res: Response) => {
       
            const agency = req.body.agency;
            Req.findOne({"agency":agency},(err,r)=>{
                if(err){
                    console.log(err);
                    res.json({ "message": "Error" });

                }
                else if(r==null){
                let request = new Req({
                
                    agency: agency,
                    workers:parseInt(req.body.workers),
                    approved:false
                  
                });
    
              
        
                request.save((err, resp) => {
                    if (err) {
                        console.log(err);
                        res.json({ "message": "Error" });
                    } else {
                        res.json({ "message": "Worker added" });
                    }
                
            });
        }
        else{
            res.json({"message":"error"})
        }
            })
           
    }
    addWorker=(req: express.Request, res: express.Response) => {
        
        const agency = req.body.agency;
          
        Req.updateOne({ 'agency': agency },{$inc:{'workers':-1}}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }
    deleteWorker=(req: express.Request, res: express.Response) => {
        
        const agency = req.body.agency;
          
        Req.updateOne({ 'agency': agency },{$inc:{'workers':1}}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    
    updateReq=(req: express.Request, res: express.Response) => {
        
        const agency = req.body.agency;
          
        Req.updateOne({ 'agency': agency },{"approved":true}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    delete=(req: express.Request, res: express.Response) => {
        
        let agency=req.body.agency;
        

        Req.deleteOne({ 'agency': agency }, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    getReq=(req: express.Request, res: express.Response) => {
        
        let agency=req.body.agency;
        

        Req.findOne({ 'agency': agency }, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json(user)
        })
    }

    getAll=(req: express.Request, res: express.Response) => {
        
    
        

        Req.find({ }, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json(user)
        })
    }

    
}
   
