import axios from "axios";
import React from "react";

function ViewJob() {
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/viewjobs", {
        withCredentials: true,
      });

      console.log(res.data);
    } catch (error) {
      console.log("Error Fetch jobs", error.message);
    }
  };
  return <div></div>;
}

export default ViewJob;
