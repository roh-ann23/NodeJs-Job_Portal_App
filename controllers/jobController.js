import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import moment from "moment";

// ====== CREATE || JOBS ======

const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Provide all fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobModel.create(req.body);
  res.status(201).json({ job });
};

export default createJobController;

// ======  GET || JOBS ======

export const getJobController = async (req, res, next) => {
  // extract from req.query
  const { status, workType, search, sort } = req.query;
  //   const {  } = req.query;

  //conditions for searching filters
  const queryObject = {
    createdBy: req.user.userId,
  };

  //logic filters

  // status logic
  if (status && status !== "all") {
    // all status values naslya tr queryObject madhil status chi value next status la assign jhali pahije
    queryObject.status = status;
  }

  // work type filters
  if (workType && workType !== "all") {
    queryObject.workType = workType; // for work type filter ===
  }

  // this logic for positions.. means.. position che kahi words search kele tri jobs show hotil tya words cjya related
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  } // key madhe search ani value madhe position chya related values..start_end kahi hi
  // === nested filterss hi hotet... keys add krun

  // to find query object
  let queryResult = jobModel.find(queryObject);

  // sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt"); // '-' sign use kele latest sathi
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt"); //  sign nhi kele oldest sathi
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position"); //  position chya basis vr krt ahe ani sign nhi kele a to z sathi
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position"); //  position chya basis vr krt ahe ani sign '- kele z to a sathi
  }

  // pagination

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);

  // jobs count
  const totalJobs = await jobModel.countDocuments(queryResult);
  const pageNumb = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;
  // keys off kelya nantr all jobs show hotil

  //   const jobs = await jobModel.find({ createdBy: req.user.userId }); // we use this before above searching filters
  res.status(200).json({
    // check this in get-job request in postman
    // totalJobs: jobs.length,
    totalJobs,
    jobs,
    pageNumb,
  });
};

// ======= UPDATE || JOBS ======

export const updateJobController = async (req, res, next) => {
  const { id } = req.params; // id extract keli params madhun
  const { company, position } = req.body;
  //Validation
  if (!company || !position) {
    next("Provide all fields");
  }

  // find job
  const job = await jobModel.findOne({ _id: id });
  //validation
  if (!job) {
    next("Job not found");
  }

  // validation for the user who create create that user
  if (!req.user.userId === job.createdBy.toString()) {
    next("You're not authorized to update the job");
    return;
  }

  // find that one job and update
  const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ updateJob });
};

// ======= DELETE || JOBS ======

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  //find jobs
  const jobs = await jobModel.findOne({ _id: id });

  if (!jobs) {
    next("Job not found");
  }

  // validation for userid and job id and validation for the user who create create that user
  if (!req.user.userId === jobs.createdBy.toString()) {
    next("You're not authorized to update the job");
    return;
  }

  // Delete job
  await jobs.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted Successfully!",
  });
};

// ======= STATS & FILTER || JOBS ======

export const jobStatsController = async (req, res) => {
  const stats = await jobModel.aggregate([
    // Serach by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status", // status varun find krtoy .. ans = 3 status ahet
        count: { $sum: 1 }, // total kiti ahet every status madhe..eka type chya status cha count kiti ahe te kalel        }
      },
    },
  ]);

  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  // Monthly or Yearly Application
  let monthlyApplication = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" }, // e.g __ year = 2022, month = 9 , count = 9 .. means year 2022 tya mdhil month 9va ani ase 9 jobs ahet
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  // moment package ... hya package ne date ani time eka format madhe disel

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(200).json({
    totalJobs: stats.length,
    stats,
    monthlyApplication,
  });
  //   res.status(200).json({
  //     totalJobs: stats.length,
  //     defaultStats,
  //   });
};
