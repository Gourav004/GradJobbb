import "./App.css";
import Hero from "./Components/Hero.jsx";
import Explore from "./Components/Explore.jsx";
import LoginSignup from "./Components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // <-- import Toaster
import Dashboard from "./Components/Dashboard";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studentProfile" element={<StudentProfileView />} />
          <Route path="/jobs" element={<ViewJobs />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/viewAJob/:id" element={<ViewJob />} />
          <Route path="/appliedJobs" element={<AppliedJobs />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminViewProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
