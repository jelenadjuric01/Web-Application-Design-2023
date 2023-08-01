import express from 'express';
import { BusinessController } from '../controllers/business.controller';

const busRouter = express.Router();

busRouter.route('/addBusiness').post(
    (req, res) => new BusinessController().addBus(req, res)
)

busRouter.route('/getBus').post(
    (req, res) => new BusinessController().getBus(req, res)
)

busRouter.route('/updateBus').post(
    (req, res) => new BusinessController().updateBus(req, res)
)
busRouter.route('/offer').post(
    (req, res) => new BusinessController().offer(req, res)
)
busRouter.route('/getAll').post(
    (req, res) => new BusinessController().delete(req, res)
)
busRouter.route('/updateRooms').post(
    (req, res) => new BusinessController().updateRooms(req, res)
)
busRouter.route('/cancel').post(
    (req, res) => new BusinessController().updateCancel(req, res)
)
busRouter.route('/getAll').get(
    (req, res) => new BusinessController().getAllBus(req, res)
)





export default busRouter;