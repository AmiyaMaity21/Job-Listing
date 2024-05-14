const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        logoUrl: {
            type: String,
            required: true,
        },
        jobPosition: {
            type: String,
            required: true,
        },
        monthlySalary: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        locationType: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        information: {
            type: String,
            required: true,
        },
        skills: {
            type: Array,
            required: true,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Job", jobSchema);
