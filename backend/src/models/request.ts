import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Req = new Schema({
    agency: {
        type: String
    },
    approved: {
        type: Boolean
    },
    workers: {
        type: Number
    }
    
})

export default mongoose.model('Req', Req, 'requests');