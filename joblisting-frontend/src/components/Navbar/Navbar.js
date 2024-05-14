import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import avatar from "../../assets/avatarIcon.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Navbar() {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful", {
      position: "bottom-right",
      autoClose: 2000,
    });
    navigate("/login");
  };
  return (
    <nav className={styles.container}>
      <h2 className={styles.logo}>Jobfinder</h2>
      {token ? (
        <div className={styles.logout}>
          <p onClick={handleLogout}>Logout</p>
          <p>Hello! Recruiter</p>
          <div>
            <img
              className={styles.profileImage}
              src={avatar}
              alt="avatar"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      ) : (
        <div className={styles.buttonGroup}>
          <button
            className={styles.buttonLogin}
            onClick={() => navigate(`/login`)}
          >
            Login
          </button>
          <button
            className={styles.buttonReg}
            onClick={() => navigate(`/register`)}
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
