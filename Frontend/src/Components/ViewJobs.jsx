import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import React, { useEffect } from "react";

function ViewJobs() {
  const handleViewJobs = async () => {
    try {
      const res = axios.get("http://localhost:5000/user/viewjobs", {
        withCredentials: true,
      });

      console.log("✅ Jobs data:", res.data);
    } catch (error) {
      console.log("❌ Error:", error.message);
    }
  };

  useEffect(() => {
    handleViewJobs();
  }, []);

  return (
    <div className="text-white bg-gray-900 min-h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold">Jobs Page</h1>
    </div>
  );
}

export default ViewJobs;
