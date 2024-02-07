import express from "express";
import * as connectionController from "../controllers/connection-controller.js";

const router = express.Router();

router.route('/')
    .all(connectionController.connectDB);

export default router;