import React, { useState } from 'react';
import Header from './Header';
import axios from "axios"
import validate from "validator" 
import { Link, useNavigate } from 'react-router-dom';

const Employeecreate = () => {
  const navigate=useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [designation, setdesignation] = useState('');
  const [gender, setgender] = useState('');
  const [course, setcourse] = useState([]);
  const [img, setimg] = useState(null);

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setcourse((prevCourses) =>
      checked ? [...prevCourses, value] : prevCourses.filter((course) => course !== value)
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setimg(file);
  };
  
  const handlesubmit=()=>{
    if(!name || !email || !mobile || !designation || !gender || !course || !img){
        alert('please fill all the credentials');
    }
    else{
        if(validate.isEmail(email)){
        const headers={
            token:localStorage.getItem("token")
        }
    
        const formdata=new FormData();
        formdata.append("name",name);
        formdata.append("email",email);
        formdata.append("number",mobile);
        formdata.append("designation",designation);
        formdata.append("gender",gender);
        formdata.append("course",course);
        formdata.append("image",img);
        console.log(formdata);
        axios.post("http://localhost:7000/api/createemployee",formdata,{headers})
        .then((res)=>{
            console.log(res)
            if(res.data.message==="employee created"){
                alert('employee created');
            }
            if(res.data.message==="please fill all the credentials"){
                alert("something went wrong");
            }
        })
        .catch((err)=>{
            console.log(err);
            if(err.response.data.message==="unauthorised user"){
              alert("please relogin again..");
              navigate("/login");
            }
        })
      
  }
  else{
    alert('please enter valid email address...')
  }
    }
}
 

  return (
    <>
      <Header />
      <div className="w-full flex flex-col justify-center items-center py-8 px-4">
        <form className="w-full md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-8 rounded-lg shadow-lg border">
          <div className='w-full flex items-center justify-between mb-6'>
            <h2 className="text-2xl font-bold text-center">Create Employee</h2>
            <Link to='/employeelist'><h1 className='text-2xl font-bold'>Back</h1></Link>
            </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Enter the Employee's Name:</label>
            <input type="text" required placeholder="Enter the name" value={name} onChange={(e) => setname(e.target.value)} className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Enter the Employee's Email:</label>
            <input
              type="email"
              required
              placeholder="Enter the email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Enter the Employee Mobile No:</label>
            <input
              type="number"
              required
              placeholder="Enter the number"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Choose the Designation:</label>
            <select
              value={designation}
              onChange={(e) => setdesignation(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose option</option>
              <option value="hr">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label className="gender text-lg font-semibold">Select the Gender:</label>

            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="gender" value="male" required className="mr-2" onChange={() => setgender('male')}/>Male</label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="female" required className="mr-2" onChange={() => setgender('female')}/>Female</label>
            </div>

          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold">Choose Courses:</label>
            <div className="flex flex-col space-y-2">
              <label>
                <input type="checkbox" value="MBA" onChange={handleCourseChange} className="mr-2"/>MBA</label>
              <label>
                <input type="checkbox" value="BCA" onChange={handleCourseChange} className="mr-2"/>BCA</label>
              <label>
                <input type="checkbox" value="BSC" onChange={handleCourseChange} className="mr-2"/>BSC</label>
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-lg font-semibold">Upload Employee Image:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" className="mt-2 p-3 border border-gray-300 rounded-md"/>
        </div>
        </form>
        <div className="flex justify-center mt-5">
            <button className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 transition duration-300" onClick={handlesubmit}>Submit</button>
          </div>
      </div>
    </>
  );
};

export default Employeecreate;
