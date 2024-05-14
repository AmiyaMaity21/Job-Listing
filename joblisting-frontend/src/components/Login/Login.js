import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
    }
    const response = await loginUser(formData.email, formData.password);
    if (response?.name) {
      localStorage.setItem("token", response?.token);
      navigate("/");
    }
  };
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.container}>
        <h1 className={styles.loginHeading}>Already have an account?</h1>
        <h2 className={styles.loginSubHeading}>Your personal job finder is here</h2>
        <input
          className={styles.input}
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleFormChange}
        ></input>
        <input
          className={styles.input}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleFormChange}
        ></input>
        <button onClick={handleSubmit} className={styles.button}>
          Sign in
        </button>
        <p className="">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
