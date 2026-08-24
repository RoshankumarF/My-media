 
import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the Pages we just built
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'
import { useEffect } from 'react';

function App() {

  const [isLoggedIn ,setIsLoggedIn]=useState(false)

  useEffect(()=>{
    const token=localStorage.getItem('accessToken')

    if(token){
      setIsLoggedIn(true)

    }else{
      setIsLoggedIn(false);
    }
  },[])
 

   
  return (
    <>
   <BrowserRouter>
      {/* Routes acts as a switch, rendering only the matching path */}
      <Routes>
        
        {/* The main feed */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* The auth pages */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
