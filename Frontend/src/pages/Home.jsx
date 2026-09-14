import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  
import Header from '../components/Header';
import Button from '../components/Button';
import { api } from '../api';
import Videocard from "../components/Videocard"

export default function Home({isLoggedIn,setIsLoggedIn,user}) {
  const [feedType, setFeedType] = useState('all'); 

  const [videos,setVideos]=useState([])
  const [searchQuery, setSearchQuery] = useState("");

useEffect(  ()=>{

  if(!isLoggedIn){
 alert("Please login to use all features")
  }
  

  const getVideos= async ()=>{

    try {
      
      const response= await api.get("/v1/video/all-videos",{
      params :{
        query :searchQuery
      }
    })
 
     
    setVideos(response.data.data)  
    } catch (error) {
      console.log(error.message)
      alert("videos fetching failed")
      
    }

  }
  getVideos();
   
},[searchQuery])
  
 
   

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* Pass the auth state to the Header */}
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />
      
      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-64 border-r border-gray-200 bg-white hidden md:flex flex-col overflow-y-auto shrink-0">
          <nav className="p-4 space-y-1 flex-1">
            <Link to="/" className="block px-4 py-3 bg-gray-100 text-red-600 rounded-xl font-bold">🏠 Home</Link>
            <Link to="/" className="block px-4 py-3 hover:bg-gray-50 rounded-xl font-medium text-gray-700">📺 Videos</Link>
            <Link to="/tweets" className="block px-4 py-3 hover:bg-gray-50 rounded-xl font-medium text-gray-700">💬 Tweets</Link>
            
           
            {isLoggedIn && user &&(
              
               <Link to={`/profile/${user._id}`}className="block px-4 py-3 hover:bg-gray-50 rounded-xl font-medium text-gray-700">👤 My Profile</Link>
            )}
          </nav>
 
          {isLoggedIn && (
            <div className="p-4 border-t border-gray-200 mt-auto">
              <Link to="/tweets">
                <Button variant="primary" className="w-full py-3 text-lg shadow-md hover:shadow-lg transition-shadow">
                  Tweet
                </Button>
              </Link>
            </div>
          )}
        </aside>

        {/* MAIN FEED (Center Column) */}
        <main className="flex-1 overflow-y-auto">
        
          <div className="p-8 text-center text-gray-500">Main Feed Area</div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
           {videos.map((video)=>(
             <Videocard key={video._id} video={video}/>

           ))}
           </div>
        </main>

        {/* RIGHT PANEL (Trends) */}
        <aside className="w-80 border-l border-gray-200 bg-white hidden lg:block overflow-y-auto p-4 shrink-0">
      
           <div className="p-4 bg-gray-50 rounded-2xl">Trending Topics</div>
        </aside>

      </div>
    </div>
  );
}