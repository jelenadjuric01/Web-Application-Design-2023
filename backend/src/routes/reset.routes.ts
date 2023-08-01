import express from 'express';
import { ResController } from '../controllers/reset.controller';

const resRouter = express.Router();

resRouter.route('/login').post(
    (req, res) => new ResController().login(req, res)
)

resRouter.route('/addPassword').post(
    (req, res) => new ResController().addPassword(req, res)
)

export default resRouter;