import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Business = new Schema({
    _id:{
        type:ObjectId
    },
    agency: {
        type: String
    },
    object: {
        type: String
    },
    deadline: {
        type: Date
    },
    status:{
        type:String,
        default:"neaktivan"
        //neaktivan-tek poslat, aOdbijeno-agencija odbila, aPrihvaceno- agencija prihvatila, aktivan-klijent prihvatio, kOtkazan-klijent otkazao,
        //otkazan-zvanicno otkazan, zavrsen - gotovo
    },
    client:{
        type:String
    },
    rooms:{
        type:[Number]
        //0 dodeljuju se radnici, 1 zuto, 2 crveno, 3 zeleno, -1 ne postoji
    },
    offer:{
        type:Number,
        default:null
    },
    cancelReason:{
        type:String,
        default:null
    }
    
})

export default mongoose.model('Business', Business, 'business');