import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import JobPostPage from "./pages/JobPostPage/JobPostPage";
import JobDetailsPage from "./pages/JobDetailsPage/JobDetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/job-post"
          element={<ProtectedRoutes Component={JobPostPage} />}
        />
        <Route path="/job-details/:id" element={<JobDetailsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
