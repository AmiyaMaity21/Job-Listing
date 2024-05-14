import React from "react";
import JobPost from "../../components/JobPost/JobPost";
import styles from "./JobPostPage.module.css";
import jobDescriptionImage from "../../assets/jobPost.png";
function JobPostPage() {
  return (
    <div className={styles.jobPostPage}>
      <JobPost />
      <div className={styles.imageContainer}>
        <img
          className={styles.jobdescriptionImage}
          src={jobDescriptionImage}
          alt="jobdescriptionImage"
        />
        <h2 className={styles.jobPostImageText}>
          Recruiter add job details here
        </h2>
      </div>
    </div>
  );
}

export default JobPostPage;
