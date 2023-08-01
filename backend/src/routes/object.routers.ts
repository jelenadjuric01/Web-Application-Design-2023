import express from 'express';
import { ObjController } from '../controllers/object.controller';

const objRouter = express.Router();

objRouter.route('/addObject').post(
    (req, res) => new ObjController().addObject(req, res)
)

objRouter.route('/getObjects').post(
    (req, res) => new ObjController().getObjects(req, res)
)

objRouter.route('/delete').post(
    (req, res) => new ObjController().delete(req, res)
)
objRouter.route('/updateObject').post(
    (req, res) => new ObjController().updateObject(req, res)
)
objRouter.route('/getObject').post(
    (req, res) => new ObjController().getObject(req, res)
)

export default objRouter;