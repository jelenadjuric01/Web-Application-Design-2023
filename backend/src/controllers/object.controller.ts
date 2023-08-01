import * as express from 'express';
import Obj from '../models/object'
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';



export class ObjController {
    addObject = (req: express.Request, res: express.Response) => {
        let client = req.body.client;
        let sketch = req.body.sketch;
        let obj=new Obj({
          _id: new mongoose.Types.ObjectId(),
          client:client,
          rooms:parseInt(req.body.rooms),
          adress:req.body.adress,
          square:parseInt(req.body.square),
          type:req.body.type,
          Rooms:req.body.Rooms
        })
        obj.save((err,resp)=>{
          if(err){
            console.log(err);
            res.json({"message":'error'})
          }
          else{
            res.json({"message":'ok'})

          }
        })
        
    }    
    getObjects = (req: express.Request, res: express.Response) => {
      let username = req.body.username;

      Obj.find({ 'client': username }, (err, user) => {
          if (err) console.log(err);
          else res.json(user)
      })
  }
  getObject = (req: express.Request, res: express.Response) => {
  
    Obj.find({  }, (err, user) => {
        if (err) console.log(err);
        else res.json(user)
    })
}
  delete = (req: express.Request, res: express.Response) => {
        
    let _id=req.body.id;
    Obj.deleteOne({'_id':_id }, (err, user) => {
        if (err) res.json({"message":"error"})
        else res.json({"message":"ok"})
    })
}
updateObject=(req: express.Request, res: express.Response) => {
 
    
  Obj.updateOne({ '_id': req.body._id },{"type":req.body.type, "adress":req.body.adress,'rooms':parseInt(req.body.rooms),'square':parseInt(req.body.square),'Rooms':req.body.Rooms}, (err, user) => {
      if (err) {
          console.log(err);
          res.json({"message":"error"})
      }
      else res.json({"message":"ok"})
  })
}
    
}
   
