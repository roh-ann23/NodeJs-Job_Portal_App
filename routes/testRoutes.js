import express from "express";
// import { Server } from "http";
import testController from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", userAuth, testController);

export default router;
