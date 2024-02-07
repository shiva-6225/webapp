import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.route('/')
    .post(userController.createUser)
    .get(userController.getUser)
    .put(userController.updateUserInfo);
export default router;