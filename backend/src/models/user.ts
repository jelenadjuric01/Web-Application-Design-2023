import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    profile:{
        type:String,
        default:"user.jpg"
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
    name:{
        type:String
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    street:{
        type:String
    },
    pib:{
        type:Number
    },
    description:{
        type:String
    },
    approved:{
        type:Boolean
    },
    emails:{
        type:Array,
        default:null
    },
    usernames:{
        type:Array,
        default:null
    }
})

export default mongoose.model('User', User, 'users');