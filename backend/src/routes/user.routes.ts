import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/getUser').post(
    (req, res) => new UserController().getUser(req, res)
)
userRouter.route('/addUser').post(
    (req, res) => new UserController().addUser(req, res)
)
userRouter.route('/checkEmail').post(
    (req, res) => new UserController().checkEmail(req, res)
)
userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)
userRouter.route('/addClient').post(
    (req, res) => new UserController().addClient(req, res)
)
userRouter.route('/addAgency').post(
    (req, res) => new UserController().addAgency(req, res)
)
userRouter.route('/updateClient').post(
    (req, res) => new UserController().updateClient(req, res)
)
userRouter.route('/updateAgency').post(
    (req, res) => new UserController().updateAgency(req, res)
)
userRouter.route('/getAgencies').get(
    (req, res) => new UserController().getAgencies(req, res)
)
userRouter.route('/getClients').get(
    (req, res) => new UserController().getClients(req, res)
)
userRouter.route('/approveUser').post(
    (req, res) => new UserController().approveUser(req, res)
)
userRouter.route('/disapproveUser').post(
    (req, res) => new UserController().disapproveUser(req, res)
)
userRouter.route('/delete').post(
    (req, res) => new UserController().delete(req, res)
)
userRouter.route('/uploadPicture').post(
    (req, res) => new UserController().uploadPicture(req, res)
)








export default userRouter;