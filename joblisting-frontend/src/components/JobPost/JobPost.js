import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./JobPost.module.css";
import { DEFAULT_SKILLS } from "../../Utils/constants";
import { createJobPost } from "../../apis/job";
import { updateJobPostById } from "../../apis/job";
function JobPost() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [stateData] = useState(state?.jobDetails);
  const [formData, setFormData] = useState({
    companyName: "" || stateData?.companyName,
    logoUrl: "" || stateData?.logoUrl,
    jobPosition: "" || stateData?.jobPosition,
    monthlySalary: "" || stateData?.monthlySalary,
    jobType: "" || stateData?.jobType,
    location: "" || stateData?.location,
    locationType: "" || stateData?.locationType,
    company: "" || stateData?.company,
    description: "" || stateData?.description,
    information: "" || stateData?.information,
    skills: stateData?.skills || [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkills = (event) => {
    const skill = event.target.value;
    const actualSkills = formData.skills;
    const filteredSkills = actualSkills.filter((element) => element === skill);

    if (!filteredSkills.length) {
      const updatedSkills = [...formData.skills, skill];
      setFormData({ ...formData, skills: updatedSkills });
    }
  };

  const removeSkills = (skill) => {
    const actualSkills = formData.skills;
    const filteredSkills = actualSkills.filter((element) => element !== skill);
    setFormData({ ...formData, skills: filteredSkills });
  };

  const handleSubmit = async () => {
    if (
      !formData.companyName ||
      !formData.logoUrl ||
      !formData.jobPosition ||
      !formData.monthlySalary ||
      !formData.jobType ||
      !formData.location ||
      !formData.locationType ||
      !formData.company ||
      !formData.description ||
      !formData.information ||
      !formData.skills
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (state?.edit) {
      updateJobPostById(state?.id, formData);
      navigate("/");
      return;
    }

    await createJobPost(formData);
    navigate("/");
  };

  return (
    <div className={styles.jobDescriptonContainer}>
      <div className={styles.container}>
        <h1 className={styles.head}>Add job description</h1>
        <div className={styles.formGroup}>
          <label>Company Name</label>
          <input
            className={styles.input}
            name="companyName"
            placeholder="Enter your company name here"
            value={formData?.companyName}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>Add logo URL</label>
          <input
            className={styles.input}
            name="logoUrl"
            placeholder="Enter the link"
            value={formData?.logoUrl}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>Job position</label>
          <input
            className={styles.input}
            name="jobPosition"
            placeholder="Enter job position"
            value={formData?.jobPosition}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>Monthly salary</label>
          <input
            className={styles.input}
            name="monthlySalary"
            placeholder="Enter Amount in rupees"
            value={formData?.monthlySalary}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>Job Type</label>
          <select
            className={styles.select}
            name="jobType"
            onChange={handleChange}
          >
            <option disabled selected>
              Select
            </option>
            <option value="Full time">Full time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Remote/office</label>
          <select
            className={styles.select}
            name="locationType"
            onChange={handleChange}
          >
            <option disabled selected>
              Select
            </option>
            <option value="Remote">Remote</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Location</label>
          <input
            className={styles.input}
            name="location"
            placeholder="Enter Location"
            value={formData?.location}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label>Job Description</label>
          <textarea
            className={styles.textarea}
            name="description"
            rows="4"
            placeholder="Type the job description"
            value={formData?.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>About Company</label>
          <textarea
            className={styles.textarea}
            name="company"
            rows="4"
            placeholder="Type about your company"
            value={formData?.company}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Skills Required</label>
          <select
            className={styles.skillInput}
            name="skills"
            onChange={addSkills}
          >
            <option disabled selected>
              Enter the must have skills
            </option>
            {DEFAULT_SKILLS.map((element) => (
              <option key={element}>{element}</option>
            ))}
          </select>
        </div>
        <div className={styles.items}>
          {formData?.skills?.map((element) => (
            <>
              <p>{element}</p>
              <button onClick={() => removeSkills(element)}>X</button>
            </>
          ))}
        </div>
        <div className={styles.formGroup}>
          <label>Information</label>
          <input
            className={styles.input}
            name="information"
            placeholder="Enter the additional information"
            value={formData?.information}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => navigate("/")}
            className={styles.button_cancel}
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.postBtn}>
            {state?.edit ? "Edit Job" : "+ Add Job "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobPost;
