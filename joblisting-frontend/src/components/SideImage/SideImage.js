import React from "react";
import styles from "./SideImage.module.css";
import sideImage from "../../assets/image 466.png";

function SideImage() {
  return (
    <div className={styles.imageContainer}>
      <img className={styles.sideImage}src={sideImage} alt="sideimg"></img>
      <h1 className={styles.sideImageText}>Your Personal Job Finder</h1>
    </div>
  );
}

export default SideImage;
