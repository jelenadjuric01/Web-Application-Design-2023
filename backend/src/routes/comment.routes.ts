import express from 'express';
import { CommentController } from '../controllers/comment.controller';
const comRouter = express.Router();

comRouter.route('/addCom').post(
    (req, res) => new CommentController().addComm(req, res)
)

comRouter.route('/delete').post(
    (req, res) => new CommentController().delete(req, res)
)
comRouter.route('/getComC').post(
    (req, res) => new CommentController().getCommClient(req, res)
)
comRouter.route('/getComA').post(
    (req, res) => new CommentController().getCommAgency(req, res)
)
comRouter.route('/update').post(
    (req, res) => new CommentController().update(req, res)
)

export default comRouter;