import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PiMoneyFill } from "react-icons/pi";
import { FaCalendar } from "react-icons/fa";
import styles from "./JobDetails.module.css";
import google from "../../assets/Google.png";
import { getJobDetailsById } from "../../apis/job";
function JobDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [token] = useState(localStorage.getItem("token"));
  useEffect(() => {
    fetchJobDetailsById();
  });

  const fetchJobDetailsById = async () => {
    if (!id) return;
    const response = await getJobDetailsById(id);
    setJobDetails(response.data);
  };
  const weeks = Math.floor((new Date() - new Date(jobDetails?.createdAt)) / (1000 * 60 * 60 * 24 * 7));
  return (
    <>
      {jobDetails ? (
        <>
          <div className={styles.JobDetailsContainer}>
            <div className={styles.title}>
              <h1>{jobDetails.companyName}</h1>
            </div>
            <div className={styles.body}>
              <div className={styles.time}>
                <p>{weeks}w ago</p>
                <p>.</p>
                <p>{jobDetails.jobType}</p>
                <img src={google} alt="" />
                <p>Google</p>
              </div>
              <div className={styles.subTitle}>
                <h1>{jobDetails.jobPosition}</h1>
                {token ? (
                  <button
                    onClick={() => {
                      navigate("/job-post", {
                        state: {
                          id: jobDetails._id,
                          jobDetails: jobDetails,
                          edit: true,
                        },
                      });
                    }}
                    className={styles.editButton}
                  >
                    Edit job
                  </button>
                ) : (
                  ""
                )}
              </div>
              <p className={styles.location}>{jobDetails.location} | India</p>
              <div className={styles.stipend_duration}>
                <div>
                  <div className={styles.icon}>
                    <p>
                      <PiMoneyFill className={styles.moneyIcon} />
                    </p>
                    <p>Stipend</p>
                  </div>
                  <p className={styles.salary}>Rs {jobDetails.monthlySalary}/month</p>
                </div>
                <div>
                  <div className={styles.icon}>
                    <p>
                      <FaCalendar />
                    </p>
                    <p>Duration</p>
                  </div>
                  <p className={styles.duration}>6 Months</p>
                </div>
              </div>
              <div className={styles.JobDetails}>
                <h2>About Company</h2>
                <p>{jobDetails.company}</p>
              </div>
              <div className={styles.JobDetails}>
                <h2>About the job/internship</h2>
                <p>{jobDetails.description}</p>
              </div>
              <div className={styles.JobDetails}>
                <h2>Skill(s) required</h2>
                <div className={styles.skills}>
                  {jobDetails.skills?.map((skill) => {
                    return (
                      <p className={styles.listItem} key={skill}>
                        {skill}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className={styles.JobDetails}>
                <h2>Additional Information</h2>
                <p>{jobDetails.information}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default JobDetails;
