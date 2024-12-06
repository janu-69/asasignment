import React, { useState } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom'
import validate from "validator"

const Signup = () => {

    const [username,setusername]=useState();
    const[useremail,setuseremail]=useState();
    const[userpassword,setuserpassword]=useState();

    const handleusersignup=()=>{

       if(!useremail || !username || !userpassword){
        alert("please fill all the credentials below")
       }
       else{
        if(validate.isEmail(useremail)){
            console.log('true');
            const data={
                name:username,
                email:useremail,
                password:userpassword
            }
            console.log(data)
    
            axios.post('http://localhost:7000/api/signup',data)
            .then((res)=>{
                console.log(res)
                if(res.data.message==="user already exist"){
                    alert("user already exist please login to continue..")
                }
                if(res.data.message==='something wrong while creating'){
                    alert('something went wrong');
                }
                if(res.data.message==="admin created"){
                    alert("user created successfully....")
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{
           alert("please enter the valid email")
        }
       }
       setusername("");
       setuserpassword("");
       setuseremail("");
    }
  return (
    <>
     <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-1/2 w-1/2 bg-green-300 rounded-2xl flex flex-col justify-center p-10 max-sm:p-2 max-sm:w-11/12'>
      <h1 className='text-center font-bold text-2xl'>SIGNUP FORM</h1>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='text' placeholder='enter the name' value={username} onChange={(e)=>setusername(e.target.value)}></input>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='email' placeholder='enter the email' value={useremail} onChange={(e)=>setuseremail(e.target.value)}></input>
      <input className='p-1 mt-3 pl-4 rounded-xl border-none' type='password' placeholder='enter the password' value={userpassword} onChange={(e)=>setuserpassword(e.target.value)}></input>
      <button className='bg-green-600 rounded-2xl mt-4 px-1/2 py-1 hover:bg-green-700' onClick={handleusersignup}>Signup</button> 
      <div className='flex justify-between mt-4'><p>Already have an account ?</p> <Link to={"/login"}><p className='text-blue-600 cursor-pointer'>Login</p></Link></div>
      </div>
    </div>
    
    
    </>
  )
}

export default Signup