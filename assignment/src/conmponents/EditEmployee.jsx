import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const EditEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee } = location.state || {};

  const [name, setName] = useState(employee?.name || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [mobile, setMobile] = useState(employee?.mobile || '');
  const [designation, setDesignation] = useState(employee?.designation || '');
  const [gender, setGender] = useState(employee?.gender || '');
  const [course, setCourse] = useState(employee?.course || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(employee?.image || '');  // To store the image preview URL

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      token: localStorage.getItem('token'),
    };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', course);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(
        `http://localhost:7000/api/employeedetails/${employee._id}`,
        formData,
        { headers }
      );
      console.log(response);
      alert('Employee updated successfully');
      navigate('/employeelist');
    } catch (error) {
      console.error(error);
      alert('Error updating employee');
      if(error.response.data.message==="unauthorised user"){
        alert("please relogin again..");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="w-full flex flex-col justify-center items-center py-8 px-4">
        <form className="w-full md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-8 rounded-lg shadow-lg border">
          <div className="w-full flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-center">Edit Employee</h2>
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Enter the Employee's Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Enter the Employee's Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Enter the Employee Mobile No:</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Choose the Designation:</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="gender text-lg font-semibold">Select the Gender:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Choose Courses:</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {imagePreview && (
            <div className="mb-4 text-center">
              <img
                src={`http://localhost:7000/${imagePreview}`}
                alt="Employee"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}

          <div className="flex flex-col mb-6">
            <label className="text-lg font-semibold">Upload Employee Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-2 p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleSubmit}
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
