import * as express from 'express';

import { Request, Response } from 'express';

import Worker from '../models/worker';
import mongoose from 'mongoose';



export class WorkerController {
   

   
    addWorker = (req: Request, res: Response) => {
       
        
            const phone = req.body.phone;
            const email = req.body.email;
            const agency = req.body.agency;
          
            let worker = new Worker({
                _id: new mongoose.Types.ObjectId(),
                agency: agency,
                email: email,
                phone: phone,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                specialization:req.body.specialization
            });

          
    
            worker.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.json({ "message": "Error" });
                } else {
                    res.json({ "message": "Worker added" });
                }
            
        });
    }

    assign=(req: express.Request, res: express.Response) => {
       
        Worker.updateOne({ '_id': req.body._id },{"object":req.body.object, "room":parseInt(req.body.room)}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

   

    
    updateWorker=(req: express.Request, res: express.Response) => {
        let firstname = req.body.firstname;
        let lastname=req.body.lastname;
        const phone = req.body.phone;
        const email = req.body.email;
        const agency = req.body.agency;
          
        Worker.updateOne({ '_id': req.body._id },{"firstname":firstname, "lastname":lastname,'phone':phone,'email':email,'agency':agency}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    delete=(req: express.Request, res: express.Response) => {
        
        let id=req.body._id;
        

        Worker.deleteOne({ '_id': id }, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }
    getWorkers = (req: express.Request, res: express.Response) => {
        let agency = req.body.agency;

        Worker.find({ 'agency': agency }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getAllWorkers = (req: express.Request, res: express.Response) => {
       

        Worker.find({}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    
}
   
