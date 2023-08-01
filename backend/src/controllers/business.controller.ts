import * as express from 'express';

import { Request, Response } from 'express';

import Business from '../models/business';
import mongoose from 'mongoose';



export class BusinessController {
   

   
    addBus = (req: Request, res: Response) => {
       
           
                let bus = new Business({
                    _id: new mongoose.Types.ObjectId(),

                    agency: req.body.agency,
                    object:req.body.object,
                    deadline:req.body.deadline,
                    client:req.body.client,
                    rooms:req.body.rooms
                  
                });

                bus.save((err, resp) => {
                    if (err) {
                        console.log(err);
                        res.json({ "message": "error" });
                    } else {
                        res.json({ "message": "Worker added" });
                    }
                
            });
        }
        
        getBus = (req: express.Request, res: express.Response) => {
            let username = req.body.username;
      
            Business.find({$or:[{ 'client': username },{'agency':username}]}, (err, user) => {
                if (err) console.log(err);
                else res.json(user)
            })
        }
        getAllBus = (req: express.Request, res: express.Response) => {
          
      
            Business.find({}, (err, user) => {
                if (err) console.log(err);
                else res.json(user)
            })
        }
           

updateCancel=(req: express.Request, res: express.Response) => {
        
        
          
    Business.updateOne({ '_id': req.body.id },{"cancelReason":req.body.cancel,"status":req.body.status}, (err, user) => {
        if (err) {
            console.log(err);
            res.json({"message":"error"})
        }
        else res.json({"message":"ok"})
    })
}
  
updateRooms=(req: express.Request, res: express.Response) => {
        
        
          
    Business.updateOne({ '_id': req.body.id },{"rooms":req.body.rooms}, (err, user) => {
        if (err) {
            console.log(err);
            res.json({"message":"error"})
        }
        else res.json({"message":"ok"})
    })
}
    
    updateBus=(req: express.Request, res: express.Response) => {
        
        
          
        Business.updateOne({ '_id': req.body.id },{"status":req.body.status}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }
    offer=(req: express.Request, res: express.Response) => {
        
        
          
        Business.updateOne({ '_id': req.body.id },{"offer":parseInt(req.body.offer),"status":"aPrihvaceno"}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    delete=(req: express.Request, res: express.Response) => {
        
        Business.deleteOne({ '_id': req.body.id }, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    
}
   
