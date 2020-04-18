import express from "express";
import authCtrl from "../../controllers/authController";

const authRouter = express.Router();

authRouter.post('/login', authCtrl.login);
authRouter.post('/register', authCtrl.register);

export default authRouter;