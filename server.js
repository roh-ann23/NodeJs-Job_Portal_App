// import packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// swagger
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// import files
import connectDB from "./config/db.js";

// import routes
import testRouter from "./routes/testRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";

// import  middleware
import errorMiddleware from "./middlewares/errorMiddleware.js";

// dotenv configuration
dotenv.config();

// Connect to DB
connectDB();

// swagger configure

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Job Portal Application",
      description: "Node and ExpressJs Project as Job portal",
    },
    servers: [
      {
        url : "https://nodejs-job-portal-app-jmho.onrender.com/"
        // url: "http//:localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerDoc(options);

// rest object
const server = express();

// packages security
server.use(helmet());
server.use(xss());
server.use(mongoSanitize());
// packages
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

//User routes
server.use("/api/v1/test", testRouter);
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/user", userRouter);

// home route .. swagger route
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Job routes
server.use("/api/v1/jobs", jobRouter);

// validation middleware
server.use(errorMiddleware);

server.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT);
//   , () => {
//   console.log(
//     `Server is running ${process.env.DEV_MODE} mode on port ${PORT} `
//   );
// });
