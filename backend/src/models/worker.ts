import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'



const Schema = mongoose.Schema;

let Worker = new Schema({
  
   
    _id:{
        type:ObjectId
    },
            phone:{
                type:String
            },
            email:{
                type:String
            },
            firstname:{
                type:String
            },
            lastname:{
                type:String
            },
            agency:{
                type:String
            },
            specialization:{
                type:String
            },
            object:{
                type:String,
                default:null
            },
            room:{
                type:Number,
                default:null
            }
    
    
})

export default mongoose.model('Worker', Worker, 'workers');