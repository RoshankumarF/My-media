 
import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the Pages we just built
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'
import { useEffect } from 'react';
import { api } from './api';

function App() {

  const [isLoggedIn ,setIsLoggedIn]=useState(false)
  const [user,setUser]=useState(null);

  useEffect(()=>{
     const Checkauth=async()=>{
      try {
      const response=   await api.get("v1/user/current-user");
         setIsLoggedIn(true)

         setUser(response.data.data)
      } catch (error) {
        setIsLoggedIn(false)
        setUser(null)
        console.log(error)
      }
     }
     Checkauth();

  },[])
 

   
  return (
    <>
   <BrowserRouter>
      {/* Routes acts as a switch, rendering only the matching path */}
      <Routes>
        
        {/* The main feed */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />} />
        
        {/* The auth pages */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
