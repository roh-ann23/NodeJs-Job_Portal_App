import express from "express";
import { updateUserController } from "../controllers/userController.js";
// import userAuth from "../middelwares/authMiddleware.js";
import userAuth from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routes
// GET USERS || GET

// UPDATE USER || PUT
/**
 * @swagger
 * /api/v1/user/update-user:
 *   post:
 *     summary: Update a job
 *     description: This endpoint is for Updating a job entry in the system.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.put("/update-user", userAuth, updateUserController);

export default router;
