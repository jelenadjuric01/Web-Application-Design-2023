import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Res = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
    
})

export default mongoose.model('Res', Res, 'reset');