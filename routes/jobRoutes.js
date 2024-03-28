import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import createJobController, {
  deleteJobController,
  getJobController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobController.js";
// import { route } from "express/lib/router/index.js";

const router = express.Router();

/**
 *@swagger
 * components:
 *  schemas:
 *    Jobs:
 *      type: object
 *      required:
 *        - company
 *        - position
 *        - status
 *        - workType
 *        - workLocation
 *        - createdBy
 *      properties:
 *        company:
 *          type: string
 *          description: Company name
 *        position:
 *          type: string
 *          description: Job position
 *        status:
 *          type: string
 *          description: Job status
 *        workType:
 *          type: string
 *          description: Job work type
 *        workLocation:
 *          type: string
 *          description: Job location city or country
 *        createdBy:
 *          type: mongoose.types.objectId,
 *          ref: User,
 *          description: Job created by user
 *      example:
 *        id: GDHJGD788BJBJ
 *        comapny: tcs
 *        position: mern stack
 *        status: interview
 *        workType: full-time
 *        workLocation: mumbai
 *        createdBy : hdfhfhdvchbfbcb
 */

/**
 *  @swagger
 *  tags:
 *    name: Jobs
 *    description: Jobs apis
 */

// Create job || post

/**
 * @swagger
 * /api/v1/jobs/create-job:
 *   post:
 *     summary: Creates a new job
 *     description: This endpoint is for creating a new job entry in the system.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobs'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jobs'
 *       500:
 *         description: Internal server error
 */

router.post("/create-job", userAuth, createJobController);

//Get job || get

/**
 * @swagger
 * /api/v1/jobs/get-job:
 *   post:
 *     summary: Get a Job
 *     description: This endpoint is for creating a new job entry in the system.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobs'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jobs'
 *       500:
 *         description: Internal server error
 */
router.get("/get-job", userAuth, getJobController);

// Update job || PUT || PATCH
/**
 * @swagger
 * /api/v1/jobs/update-job/:id:
 *   post:
 *     summary: Update a job
 *     description: This endpoint is for creating a new job entry in the system.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobs'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jobs'
 *       500:
 *         description: Internal server error
 */
router.patch("/update-job/:id", userAuth, updateJobController);

// Delete job || DELETE
/**
 * @swagger
 * /api/v1/jobs/delete-job/:id:
 *   post:
 *     summary: Delete a job
 *     description: This endpoint is for creating a new job entry in the system.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobs'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jobs'
 *       500:
 *         description: Internal server error
 */
router.delete("/delete-job/:id", userAuth, deleteJobController);

// STATS & FILTER job || get
/**
 * @swagger
 * /api/v1/jobs/get-stats:
 *   post:
 *     summary: Adding stats and filters
 *     description: This endpoint is for creating a new job entry in the system.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobs'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jobs'
 *       500:
 *         description: Internal server error
 */
router.get("/get-stats", userAuth, jobStatsController);

export default router;
