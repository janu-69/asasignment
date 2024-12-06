import React, { useEffect } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token){
      alert('token expired please login again...');
      navigate("/login");
    }
  },[])
  return (
    <>

    <Header/>
    <div className='max-sm:h-[97vh] h-[85vh] w-full bg-red-300 text-[10vh] font-bold max-sm:text-[4vh] flex justify-center items-center'>
        welcome AdminPanel
    </div>
    
    </>
  )
}

export default Home