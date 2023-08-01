import express from 'express';
import { WorkerController } from '../controllers/worker.controller';
const workerRouter = express.Router();

workerRouter.route('/addWorker').post(
    (req, res) => new WorkerController().addWorker(req, res)
)


workerRouter.route('/updateWorker').post(
    (req, res) => new WorkerController().updateWorker(req, res)
)
workerRouter.route('/delete').post(
    (req, res) => new WorkerController().delete(req, res)
)
workerRouter.route('/getWorkers').post(
    (req, res) => new WorkerController().getWorkers(req, res)
)
workerRouter.route('/getAllWorkers').post(
    (req, res) => new WorkerController().getAllWorkers(req, res)
)
workerRouter.route('/assign').post(
    (req, res) => new WorkerController().assign(req, res)
)





export default workerRouter;