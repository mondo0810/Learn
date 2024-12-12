"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Assuming you're using Next.js for routing

export default function CreateEmployee({ employeeId = null }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    salary: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If an employeeId is passed, we are in "update" mode
    if (employeeId) {
      fetchEmployeeDetails(employeeId);
    }
  }, [employeeId]);

  const fetchEmployeeDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/user/${id}`);
      setFormData(response.data); // Assuming the response returns employee data
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch employee details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      let response;
      if (employeeId) {
        // Update existing employee
        response = await axios.put(
          `http://localhost:8080/user/${employeeId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSuccessMessage("Employee updated successfully!");
      } else {
        // Create new employee
        response = await axios.post("http://localhost:8080/user", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSuccessMessage("Employee created successfully!");
      }

      setFormData({ name: "", age: "", salary: "" });
      setTimeout(() => {
        router.push("/"); // Redirect to employee list page
      }, 200);
    } catch (error) {
      console.error(error);
      // Check if error is a response from the API with validation issues
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Use the API's error message
      } else {
        setErrorMessage("Failed to save employee. Please check your inputs.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          {employeeId ? "Update Employee" : "Create Employee"}
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter employee name"
            />
          </div>

          {/* Age Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter employee age"
            />
          </div>

          {/* Salary Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter employee salary"
              step="0.01"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : employeeId
              ? "Update Employee"
              : "Create Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}
