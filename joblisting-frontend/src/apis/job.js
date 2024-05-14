import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const getJobDetailsById = async (jobId) => {
  try {
    const reqUrl = `${backendUrl}/job/details/${jobId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createJobPost = async (jobPostPayload) => {
  try {
    const reqUrl = `${backendUrl}/job/create`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `${token}`;
    const response = await axios.post(reqUrl, jobPostPayload);
    toast.success("Job created successfully", {
      position: "top-center",
      autoClose: 2000,
    });
    return response;
  } catch (error) {
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

export const updateJobPostById = async (jobPostId, updateFormData) => {
  try {
    const reqUrl = `${backendUrl}/job/edit/${jobPostId}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `${token}`;
    const response = await axios.put(reqUrl, updateFormData);
    toast.success("Job updated successfully", {
      position: "top-center",
      autoClose: 2000,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

export const getAllJobPost = async (filter) => {
  try {
    const reqUrl = `${backendUrl}/job/all-jobs?title=${filter?.title}&skills=${filter?.skills}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
