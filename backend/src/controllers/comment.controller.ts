import * as express from 'express';

import { Request, Response } from 'express';

import Comment from '../models/comment';
import mongoose from 'mongoose';
import { Console } from 'console';



export class CommentController {
   

   
    addComm = (req: Request, res: Response) => {
       
            const agency = req.body.agency;
            
                let com = new Comment({
                
                    agency: agency,
                    grade:parseInt(req.body.grade),
                    client:req.body.client,
                    review:req.body.review
                  
            
                })
              
        
                com.save((err, resp) => {
                    if (err) {
                        console.log(err);
                        res.json({ "message": "error" });
                    } else {
                        res.json({ "message": "Worker added" });
                    }
                
            });
        }
     
           
    
    delete=(req: express.Request, res: express.Response) => {
        
        const agency = req.body.agency;
          
        Comment.deleteOne({ 'agency': agency,'client':req.body.client }, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    
    update=(req: express.Request, res: express.Response) => {
        
        const agency = req.body.agency;
          
        Comment.updateOne({ 'agency': agency,'client':req.body.client },{"grade":parseInt(req.body.grade),'review':req.body.review}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    getCommClient=(req: express.Request, res: express.Response) => {
        
        

        Comment.find({'client':req.body.client}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json(user)
        })
    }
    getCommAgency=(req: express.Request, res: express.Response) => {
        
        

        Comment.find({'agency':req.body.agency}, (err, user) => {
            if (err) {
                console.log(err);
                res.json({"message":"error"})
            }
            else res.json(user)
        })
    }

}
   
