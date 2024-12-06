import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate=useNavigate();
    const [name,setname]=useState('')
    useEffect(()=>{
        const name=localStorage.getItem("name")
        setname(name);
    },[])

    const handlelogout=()=>{
      localStorage.clear();
      navigate('/login');
    }
  return (
  <>
  <div className='p-10 max-sm:p-1 flex justify-around items-center'>
       <Link to={"/home"}><h1 className='text-xl font-bold cursor-pointer max-sm:text-sm'>DEALSDRAY</h1></Link>
       <Link to={"/home"}><h1 className='font-semibold hover:scale-110 cursor-pointer max-sm:text-sm text-xl'>Home</h1></Link>
       <Link to={"/employeelist"}><h1 className='font-semibold hover:scale-110 cursor-pointer max-sm:text-sm text-xl'>Employee List</h1></Link>
       <h1 className='font-semibold hover:scale-110 text-xl'>{name}</h1>
       <button className='px-5 bg-red-500 text-white rounded-md max-sm:text-sm max-sm:px-2' onClick={handlelogout}>Logout</button>
    </div>
  </>
  )
}

export default Header