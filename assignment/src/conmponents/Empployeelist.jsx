import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Employeelist = () => {
  const navigate = useNavigate();
  const [getdata, setgetdata] = useState([]);
  const [count,setcount]=useState();

  const handlecreate = () => {
    navigate("/createemployee");
  };

  useEffect(() => {
    const headers = {
      token: localStorage.getItem("token"),
    };
    axios.get("http://localhost:7000/api/employeedetails", { headers })
    .then((res) => {
        console.log(res);
        setgetdata(res.data.data);
        setcount(res.data.data.length);
    
      })
      .catch((err) => {
        console.log(err);
        if(err.response.data.message==="unauthorised user"){
          alert("token expired please relogin again...");
          navigate('/login');
        }
      });
  }, []);

  const handledelete=(employee)=>{
    console.log(employee);
    const data={
      id:employee._id
    }
    const headers={
      token:localStorage.getItem("token")
    }
    axios.post("http://localhost:7000/api/deleteemployee",data,{headers})
    .then((res)=>{
      console.log(res);
      if(res.data.message==="deleted"){
        alert("employee deleted");
        window.location.reload();
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleedit = (employee) => {
    navigate(`/editemployee/${employee._id}`, { state: { employee } });
  };

  return (
    <>
      <Header />
      <div className="w-full p-2 flex justify-evenly">
        <h1 className='bg-gray-400 px-2 py-1 rounded-lg'>Count : {count}</h1>
        <button className="bg-gray-400 px-2 py-1 rounded-md" onClick={handlecreate}>
          Create Employee
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Unique Id</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile No</th>
              <th className="px-4 py-2">Designation</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Create Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {getdata.map((employee) => (
              <tr key={employee._id} className="border-b">
                <td className="px-4 py-2">{employee._id}</td>
                <td className="px-4 py-2">
                  <img
                    src={`http://localhost:7000/${employee.image}`}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.mobile}</td>
                <td className="px-4 py-2">{employee.designation}</td>
                <td className="px-4 py-2">{employee.gender}</td>
                <td className="px-4 py-2">{employee.course}</td>
                <td className="px-4 py-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500" onClick={()=>{handleedit(employee)}}>Edit</button>
                  <button className="text-red-500 ml-2" onClick={()=>{handledelete(employee)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Employeelist;
