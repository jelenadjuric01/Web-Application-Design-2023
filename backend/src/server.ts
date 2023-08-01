import express, { Router } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import workerRouter from './routes/worker.routes';
import reqRouter from './routes/request.routes';
import resRouter from './routes/reset.routes';
import objRouter from './routes/object.routers';
import busRouter from './routes/business.routes';
import comRouter from './routes/comment.routes';



const app = express();
var bodyparser = require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const path = require("path");  


app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, '../src/assets')));
console.log("Dirname: " + __dirname);
app.use(express.json({limit: '10mb'}));



mongoose.connect("mongodb://127.0.0.1:27017/company")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router = express.Router()

router.use('/user', userRouter)
router.use('/worker', workerRouter)
router.use('/request', reqRouter)
router.use('/reset', resRouter)
router.use('/object', objRouter)
router.use('/business', busRouter)
router.use('/comment', comRouter)


router.use('/uploads',express.static(path.join('./src/users')))


app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));