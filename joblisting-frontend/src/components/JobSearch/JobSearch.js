import React from "react";
import styles from "./JobSearch.module.css";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaUserGroup } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";
import companylogo from "../../assets/companylogo.png";
import indiaFlag from "../../assets/emojione-v1_flag-for-india.png";
function JobSearch() {
  return (
    <div className={styles.body}>
      <div className={styles.serchcontainer}>
        <CiSearch className={styles.searchIcon} />
        <input className={styles.searchjob} type="text" placeholder="Type any job title" />
        <div className={styles.select}>
          <div className={styles.selectItem}>
            <select>
              <option value="0">Skills</option>
              <option value="1">Audi</option>
              <option value="2">BMW</option>
              <option value="3">Citroen</option>
            </select>
            <div className={styles.items}>
              <p>Frontend</p>
              <i>
                <RxCross2 />
              </i>
            </div>
            <div className={styles.items}>
              <p>CSS</p>
              <i>
                <RxCross2 />
              </i>
            </div>
            <div className={styles.items}>
              <p>Javascript</p>
              <i>
                <RxCross2 />
              </i>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.buttonfilter}>Apply Filter</button>
            <button className={styles.buttonclear}>Clear</button>
          </div>
        </div>
      </div>
      <div className={styles.searchResultContainer}>
        <div className={styles.leftside}>
          <img src={companylogo} style={{ height: "50px" }} alt="logo" />
          <div>
            <p>Frontend Developer</p>
            <div className={styles.jobDetails}>
              <div className={styles.jobInfo}>
                <p>
                  <FaUserGroup />
                </p>
                <p>11-50</p>
              </div>
              <div className={styles.jobInfo}>
                <p>
                  <LiaRupeeSignSolid className={styles.rupeeicon} />
                </p>
                <p>11-50</p>
              </div>
              <div className={styles.jobInfo}>
                <img src={indiaFlag} alt="" />
                <p>Delhi</p>
              </div>
            </div>
            <div className={styles.jobType}>
              <p>Office</p>
              <p>Full time</p>
            </div>
          </div>
        </div>
        <div className={styles.rightside}>
          <div className={styles.items}>
            <p>Frontend</p>
            <p>CSS</p>
            <p>Javascript</p>
            <p>HTML</p>
          </div>
          <div className={styles.grpbutton}>
          <button className={styles.buttoneditjob}>Edit job</button>
          <button className={styles.buttonview}>View details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
