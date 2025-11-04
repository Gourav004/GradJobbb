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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
