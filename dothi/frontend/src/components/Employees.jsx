"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CreateEmployee from "./CreateEmployee";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async (searchQuery = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/user`, {
        params: {
          searchParams: searchQuery,
        },
        headers: {
          Accept: "*/*",
        },
      });
      setEmployees(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearchParams(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEmployees(searchParams);
  };

  const handleDelete = (id) => {
    console.log("Delete employee with ID:", id);
    axios
      .delete(`http://localhost:8080/user/${id}`)
      .then(() => fetchEmployees());
  };

  const handleView = (id) => {
    // Handle view logic, navigate to view page with employee ID
    console.log("View employee with ID:", id);
    // For example, navigate to a detailed view page
    // history.push(`/employee/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Employee List</h1>

        <Link
          className="p-5 bg-amber-500 rounded-lg inline-block my-5 hover:bg-amber-600 text-white"
          href="/create"
        >
          Create Employee
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="flex mb-6 space-x-4 items-center"
        >
          <input
            type="text"
            placeholder="Search employees..."
            value={searchParams}
            onChange={handleSearch}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Loading Indicator */}
        {loading && <p className="text-blue-600 text-center">Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Employee List */}
        {!loading && !error && (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border border-gray-200">ID</th>
                <th className="p-3 text-left border border-gray-200">Name</th>
                <th className="p-3 text-left border border-gray-200">Age</th>
                <th className="p-3 text-left border border-gray-200">Salary</th>
                <th className="p-3 text-left border border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200">
                      {employee.id}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {employee.name}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {employee.age}
                    </td>
                    <td className="p-3 border border-gray-200">
                      {employee.salary}
                    </td>
                    <td className="p-3 flex justify-center border border-gray-200">
                      <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mr-2">
                        <Link href={`/create/${employee.id}`}>Edit</Link>
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-3 text-center text-gray-500 border border-gray-200"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
