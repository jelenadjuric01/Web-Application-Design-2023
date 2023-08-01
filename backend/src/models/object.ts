import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Obj = new Schema({
     
    type: {
        type: String
      },
      adress: {
        type: String
      },
      rooms: {
        type: Number
      },
      square: {
        type: Number
      },
      
      client:{
        type:String
      },
      _id:{
        type:ObjectId
      },
      Rooms:{
        type:[{
          startX:{
            type:Number
          },
      startY:{
      type:Number
    },
    height:{
      type:Number
    },
    width:{
      type:Number
    },
    doors:{
      type:[
        {
          startX:{
            type:Number
          },
          startY:{
            type:Number
          },
          direction:{
            type:Number
          }
        }
      ]
    },
    finished:{
      type:Boolean,
      default:false
    }
        }]
      }
    });
    

export default mongoose.model('Obj', Obj, 'objects');