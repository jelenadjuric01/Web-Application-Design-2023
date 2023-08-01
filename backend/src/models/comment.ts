import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Comment = new Schema({
    agency: {
        type: String
    },
    client: {
        type: String
    },
    grade: {
        type: Number
    },
    review:{
        type:String
    }
    
})

export default mongoose.model('Comment', Comment, 'comments');