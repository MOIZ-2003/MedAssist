import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

const FormComponent = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state.candidateemail);
  const [candidateid, setCandidateId] = useState(location.state.candidateId);
  console.log(email);
  console.log(candidateid);
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    birthdate: "",
    city: "", // Added city field
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("candidateid", formData.email);
    formData.append("name", formData.name);
    formData.append("age", formData.age);
    formData.append("birthdate", formData.birthdate);
    formData.append("city", formData.city); // Append city to form data
    formData.append("comments", formData.comments);

    try {
      // Assuming you have a server endpoint to handle the data
      const response = await fetch("http://localhost:5000/auth/getCandidateId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        console.log("Data submitted successfully");
      } else {
        // Handle error, maybe show an error message
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div style={{ width: "50%", marginLeft: 0 }}>
        <h2 className="mb-4 dark:text-gray-900" style={{ fontSize: "25px", textAlign: "left" }}>
          Profile
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            borderWidth: "0.5px",
            backgroundColor: "#1a1a2e", // Dark navy blue background color
            boxShadow: "0px 0px 10px #0000ff", // Blue glowing border
          }}
        >
          <div className="mb-3">
            <div>
              <label htmlFor="name" className="form-label" style={{ color: "white", fontSize: "18px" }}>
                Name:
              </label>
            </div>
            <div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="name"
                name="name"
                placeholder="Enter your name"
                style={{ fontSize: "14px", width: "100%", boxShadow: "0px 0px 5px #0000ff" }}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div>
              <label htmlFor="age" className="form-label" style={{ color: "white", fontSize: "18px" }}>
                Age:
              </label>
            </div>
            <div>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="age"
                name="age"
                placeholder="Enter your age"
                style={{ fontSize: "14px", width: "100%", boxShadow: "0px 0px 5px #0000ff" }}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div>
              <label htmlFor="birthdate" className="form-label" style={{ color: "white", fontSize: "18px" }}>
                Birthdate:
              </label>
            </div>
            <div>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="birthdate"
                name="birthdate"
                style={{ fontSize: "14px", width: "100%", boxShadow: "0px 0px 5px #0000ff" }}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div>
              <label htmlFor="city" className="form-label" style={{ color: "white", fontSize: "18px" }}>
                City:
              </label>
            </div>
            <div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="city"
                name="city"
                placeholder="Enter your city"
                style={{ fontSize: "14px", width: "100%", boxShadow: "0px 0px 5px #0000ff" }}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div>
              <label htmlFor="comments" className="form-label" style={{ color: "white", fontSize: "18px" }}>
                Additional Health Condition (if any)
              </label>
            </div>
            <div>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="comments"
                name="comments"
                placeholder="Enter health conditions"
                rows="3"
                style={{ fontSize: "14px", width: "100%", boxShadow: "0px 0px 5px #0000ff" }}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-center text-center">
            <div>
              <button
                type="submit"
                className="btn btn-primary rounded"
                style={{ color: "white", border: "1px solid white", fontSize: "14px", padding: "5px 25px" }}
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-secondary ms-2 rounded"
                style={{ color: "white", border: "1px solid white", marginLeft: "10px", fontSize: "14px", padding: "5px 25px" }}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
