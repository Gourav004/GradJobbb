import axiosInstance from "@/lib/axiosInstance";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function StudentProfileView() {
  const student = useSelector((store) => store.student);
  const [name, setName] = useState(student.name);

  const handleSaveProfile = () => {
    try {
      const res = axiosInstance.patch(
        "http://localhost:5000/user/profile/edit",
        { name }
      );
    } catch (error) {
      console.log("Error", error.message);
      toast.error("Edit Failed");
    }
  };

  return (
    <div>
      <h1>This is Profile Page</h1>
      <br />
      <input
        className="border-2 rounded-md m-10"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>{name}</p>
      <button
        className="btn btn-outline btn-accent"
        onClick={handleSaveProfile}
      >
        Save
      </button>
    </div>
  );
}

export default StudentProfileView;
