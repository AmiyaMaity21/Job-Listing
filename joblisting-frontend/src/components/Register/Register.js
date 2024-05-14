import React, { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/auth";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    isAgreed: false,
  });
  const { name, email, mobile, password, isAgreed} = formData;
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!name || !email || !mobile || !password || isAgreed === false) {
      alert("Please fill in all fields");
      return;
    }

    const response = await registerUser(name, email, mobile, password);
    console.log(response);
    navigate("/login");
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Create an account?</h1>
        <h2 className={styles.subHeading}>Your personal job finder is here</h2>
        <input
          className={styles.input}
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleFormChange}
        ></input>
        <input
          className={styles.input}
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleFormChange}
        ></input>
        <input
          className={styles.input}
          name="mobile"
          placeholder="Mobile"
          value={mobile}
          onChange={handleFormChange}
        ></input>
        <input
          className={styles.input}
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleFormChange}
        ></input>
        <label className={styles.label}>
          <input
            onChange={handleFormChange}
            type="checkbox"
            name="isAgreed"
            value={true}
          />
          By creating an account, I agree to our terms of use and privacy policy
        </label>
        <button onClick={handleSubmit} className={styles.button}>
          Create Account
        </button>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
