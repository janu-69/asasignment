import React, { useState } from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import validator from 'validator';

const Login = () => {
  const[useremail,setuseremail]=useState();
  const[userpassword,setuserpassword]=useState();
  const navigate=useNavigate();

  const handleuserlogin=()=>{

   if(!useremail || !userpassword){
    alert('please fill all the credentails');
   }
   else{
    if(validator.isEmail(useremail)){
      const data={
        email:useremail,
        password:userpassword
       }
    
       console.log(data)
    
       axios.post("http://localhost:7000/api/login",data)
       .then((res)=>{
         console.log(res)
         if(res.data.message==="something went wrong"){
          alert("something went wrong");
         }
         if(res.data.message==="please enter the valid password"){
          alert('something went wrong');
         }
         if(res.data.message==='login success'){
          localStorage.setItem("token",res.data.token);
          localStorage.setItem("name",res.data.name);
          alert('login success...')
          navigate('/home');
         }
       })
       .catch((err)=>{
        console.log(err)
       })
    }
    else{
      alert("please enter the valid email...");
    }
   }
    
   }
  return (
    <>
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-1/2 w-1/2 bg-green-300 rounded-2xl flex flex-col justify-center p-10 max-sm:p-2 max-sm:w-11/12'>
      <h1 className='text-center font-bold text-2xl'>LOGIN FORM</h1>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='email' placeholder='enter the  email' value={useremail} onChange={(e)=>setuseremail(e.target.value)}></input>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='password' placeholder='enter the password' value={userpassword} onChange={(e)=>setuserpassword(e.target.value)}></input>
      <button className='bg-green-600 rounded-2xl mt-4 px-1/2 py-1 hover:bg-green-700' onClick={handleuserlogin}>login</button> 
      <div className='flex justify-between mt-4'><p>Dont have an account?</p> <Link to={"/signup"}><p className='text-blue-600 cursor-pointer'>Signup</p></Link></div>
      </div>
    </div>
    </>
  )
}

export default Login