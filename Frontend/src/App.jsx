 
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
import UploadVideo from './pages/Uploadvideo';
import WatchVideo from './pages/WatchVideo';
import Profile from './pages/Profile';
import Tweets from './pages/Tweets';
import ComposeTweet from './pages/ComposeTweet';
import WatchHistory from './pages/WatchHistory';

function App() {

  const [isLoggedIn ,setIsLoggedIn]=useState(false)
  const [user,setUser]=useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(()=>{
     const Checkauth=async()=>{
      try {
      const response=   await api.get("/v1/user/current-user")
        setIsLoggedIn(true)
            


         setUser(response.data.data)
     } catch (error) {
            
       setIsLoggedIn(false)
       setUser(null)
        
     } finally {
            setAuthLoading(false)
        }
     }
    Checkauth();

  },[])

  if (authLoading) {
    return <div>Loading...</div>
}
 

   
  return (
    <>
   <BrowserRouter>
      
      <Routes>
        
        {/* The main feed */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />} />

        <Route 
  path="/tweets" 
  element={<Tweets isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />} 
/>

<Route path="/compose/tweet" element={<ComposeTweet/>}/>
        
        {/* The auth pages */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element ={<UploadVideo/>}/>

        <Route path="/watch/:videoId" element={<WatchVideo  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/>}/>

        <Route path="/profile/:userId" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/>} />

        <Route path="/history" element={<WatchHistory isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/> }/>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
