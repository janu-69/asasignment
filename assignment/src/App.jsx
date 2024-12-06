import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signup from './conmponents/Signup'
import Login from './conmponents/Login'
import Home from './conmponents/Home'
import Employeelist from './conmponents/Empployeelist'
import Employeecreate from './conmponents/Employeecreate'
import EditEmployee from './conmponents/EditEmployee'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>

      <Route path="/home" element={<Home/>}></Route>
      <Route path='/employeelist' element={<Employeelist/>}></Route>
      <Route path='/createemployee' element={<Employeecreate/>}></Route>
      <Route path='/editemployee/:id' element={<EditEmployee/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App