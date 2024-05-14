const Job = require("../models/job");

const createJobPost = async (req, res, next) => {
  try {
    const {
      companyName,
      logoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      location,
      locationType,
      company,
      description,
      information,
      skills,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !monthlySalary ||
      !jobType ||
      !location ||
      !locationType ||
      !company ||
      !description ||
      !information ||
      !skills
    ) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    const jobDetails = new Job({
      companyName,
      logoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      location,
      locationType,
      company,
      description,
      information,
      skills,
    });

    await jobDetails.save();
    res.json({ message: "Job created successfully", data: jobDetails });
  } catch (error) {
    next(error);
  }
};

const getJobDetailsById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const jobDetails = await Job.findById(jobId);
    res.json({ data: jobDetails });
  } catch (error) {
    next(error);
  }
};

const updateJobDetailsById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const {
      companyName,
      logoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      location,
      locationType,
      company,
      description,
      information,
      skills,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !monthlySalary ||
      !jobType ||
      !location ||
      !locationType ||
      !company ||
      !description ||
      !information ||
      !skills
    ) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    await Job.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          logoUrl,
          jobPosition,
          monthlySalary,
          jobType,
          location,
          locationType,
          company,
          description,
          information,
          skills,
        },
      }
    );

    res.json({ message: "Job details updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const title = req.query.title || "";
    const skills = req.query.skills;

    let filter = {};
    let formattedSkills;
    if (skills) {
      formattedSkills = skills.split(",");

      if (formattedSkills) {
        const regexArray = formattedSkills.map(
          (value) => new RegExp(value, "i")
        );

        filter = {
          skills: { $in: regexArray },
        };
      }
    }

    const jobList = await Job.find(
      {
        jobPosition: { $regex: title, $options: "i" },
        ...filter,
      },
      {
        companyName: 1,
        logoUrl: 1,
        jobPosition: 1,
        monthlySalary: 1,
        jobType: 1,
        location: 1,
        locationType: 1,
        company: 1,
        description: 1,
        information: 1,
        skills: 1,
      }
    );

    res.json({ data: jobList });
  } catch (error) {
    next(error);
  }
};

const deleteJobById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    await Job.deleteOne({ _id: jobId });
    res.json({ message: "Job Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobPost,
  updateJobDetailsById,
  getJobDetailsById,
  getAllJobs,
  deleteJobById,
};
