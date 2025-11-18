import "./App.css";
import Hero from "./Components/Hero.jsx";
import Explore from "./Components/Explore.jsx";
import LoginSignup from "./Components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import appStore from "./Store/AppStore.jsx";
import { Provider } from "react-redux";
import StudentProfileView from "./Components/StudentProfileView.jsx";
import ViewJobs from "./Components/ViewJobs.jsx";
import EditProfile from "./Components/EditProfile.jsx";
import ViewJob from "./Components/ViewJob.jsx";
import AppliedJobs from "./Components/AppliedJobs.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import AdminDashboard from "./Components/adminDashBoard.jsx";
import AdminViewProfile from "./Components/AdminViewProfile.jsx";
import AdminViewJobs from "./Components/AdminViewJobs.jsx";
import AdminViewJob from "./Components/AdminViewAJob.jsx";
import AdminPostJob from "./Components/AdminPostJob.jsx";
import DashboardContent from "./Components/adminDashBoard.jsx";
import StudentDashboardContent from "./Components/Dashboard.jsx";
import Showcase from "./Components/Showcase.jsx";
import Chatbot from "./Components/Chatbot.jsx";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        {/* Toast container */}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<StudentDashboardContent />} />
          <Route path="/studentProfile" element={<StudentProfileView />} />
          <Route path="/jobs" element={<ViewJobs />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/viewAJob/:id" element={<ViewJob />} />
          <Route path="/appliedJobs" element={<AppliedJobs />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/students" element={<DashboardContent />} />
          <Route path="/admin/profile" element={<AdminViewProfile />} />
          <Route path="/admin/jobs" element={<AdminViewJobs />} />
          <Route path="/admin/viewJob/:id" element={<AdminViewJob />} />
          <Route path="/admin/postJob" element={<AdminPostJob />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/chatai" element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
