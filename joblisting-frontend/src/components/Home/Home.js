import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { CiSearch } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";
import indiaFlag from "../../assets/emojione-v1_flag-for-india.png";
import { DEFAULT_SKILLS } from "../../Utils/constants";
import { getAllJobPost } from "../../apis/job";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [jobs, setJobs] = useState([]);
  const [token] = useState(localStorage.getItem("token"));

  const fetchAllJobs = async () => {
    const formatedSkills = skills.join(",");
    const response = await getAllJobPost({ skills: formatedSkills, title });
    setJobs(response.data);
  };

  useEffect(() => {
    fetchAllJobs();
  }, [skills, title]);

  const handleSkills = (event) => {
    const skill = event.target.value;
    const filteredSkills = skills.filter((element) => element === skill);

    if (!filteredSkills.length) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkills = (skill) => {
    const filteredSkills = skills.filter((element) => element !== skill);
    setSkills([...filteredSkills]);
  };
  return (
    <div className={styles.body}>
      <div className={styles.serchcontainer}>
        <CiSearch className={styles.searchIcon} />
        <input
          value={title}
          className={styles.searchjob}
          type="text"
          placeholder="Type any job title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className={styles.select}>
          <div className={styles.selectItem}>
            <select name="skills" onChange={handleSkills}>
              <option disabled selected>
                Skills
              </option>
              {DEFAULT_SKILLS.map((element) => (
                <option key={element}>{element}</option>
              ))}
            </select>
            <div className={styles.items}>
              {skills?.map((element) => (
                <>
                  <p>{element}</p>
                  <button onClick={() => removeSkills(element)}>X</button>
                </>
              ))}
            </div>
          </div>
          <div className={styles.buttonGroup}>
            {token ? (
              <button
                className={styles.buttonfilter}
                onClick={() => navigate(`/job-post`)}
              >
                + Add Job
              </button>
            ) : (
              <button className={styles.buttonfilter} onClick={fetchAllJobs}>
                Apply Filter
              </button>
            )}
            <button
              className={styles.buttonclear}
              onClick={() => {
                setSkills([]);
                setTitle("");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {jobs.map((data) => {
        return (
          <div key={data._id} className={styles.searchResultContainer}>
            <div className={styles.content}>
              <img src={data.logoUrl} alt="logo" />
              <div>
                <p className={styles.jobPosition}>{data.jobPosition}</p>
                <div className={styles.jobDetails}>
                  <div className={styles.jobInfo}>
                    <FaUserGroup />
                    <p>11-50</p>
                  </div>
                  <div className={styles.jobInfo}>
                    <LiaRupeeSignSolid />
                    <p>{data.monthlySalary}</p>
                  </div>
                  <div className={styles.jobInfo}>
                    <img src={indiaFlag} alt="" />
                    <p>{data.location}</p>
                  </div>
                </div>
                <div className={styles.jobType}>
                  <p>{data.locationType}</p>
                  <p>{data.jobType}</p>
                </div>
              </div>
            </div>
            <div className={styles.rightside}>
              <div className={styles.items}>
                {data?.skills.map((skill, i) => {
                  return <p key={i}>{skill}</p>;
                })}
              </div>
              <div className={styles.grpbutton}>
                {token ? (
                  <button
                    className={styles.buttoneditjob}
                    onClick={() => {
                      navigate("/job-post", {
                        state: {
                          id: data._id,
                          jobDetails: data,
                          edit: true,
                        },
                      });
                    }}
                  >
                    Edit job
                  </button>
                ) : (
                  ""
                )}
                <button
                  className={styles.buttonview}
                  onClick={() => navigate(`/job-details/${data._id}`)}
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
