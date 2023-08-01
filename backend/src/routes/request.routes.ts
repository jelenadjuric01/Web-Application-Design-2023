import express from 'express';
import { ReqController } from '../controllers/request.controller';
import { REFUSED } from 'dns';
const reqRouter = express.Router();

reqRouter.route('/addReq').post(
    (req, res) => new ReqController().addReq(req, res)
)

reqRouter.route('/delete').post(
    (req, res) => new ReqController().delete(req, res)
)
reqRouter.route('/updateReq').post(
    (req, res) => new ReqController().updateReq(req, res)
)
reqRouter.route('/getReq').post(
    (req, res) => new ReqController().getReq(req, res)
)
reqRouter.route('/getAll').get(
    (req, res) => new ReqController().getAll(req, res)
)
reqRouter.route('/addWorker').post(
    (req, res) => new ReqController().addWorker(req, res)
)
reqRouter.route('/deleteWorker').post(
    (req, res) => new ReqController().deleteWorker(req, res)
)






export default reqRouter;