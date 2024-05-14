import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const loginUser = async (email, password) => {
  try {
    const reqUrl = `${backendUrl}/auth/login`;
    const response = await axios.post(reqUrl, { email, password });
    toast.success("Login Successful", {
      position: "bottom-right",
      autoClose: 2000,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

export const registerUser = async (name, email, mobile, password) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const response = await axios.post(reqUrl, {
      name,
      email,
      mobile,
      password,
    });
    toast.success("Registration Successful", {
      position: "bottom-right",
      autoClose: 2000,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};
