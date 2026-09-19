import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import Header from '../components/Header';
import Button from '../components/Button';

export default function WatchHistory({ isLoggedIn, setIsLoggedIn, user }) {
  
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
   
 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);

        setError(null);
    
        
      
        const response = await api.get(`/v1/user/get-watch-history/${user._id}`
        )

        setHistory(response.data.data);
        
        
        
        
      } catch (err) {
        console.error("Failed to fetch watch history:", err)
        setError(err.response?.data?.message || "Could not load history.")
       
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchHistory();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />
      
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 lg:py-8">
        
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Watch History</h1>
          {history.length > 0 && (
            <Button variant="outline" className="text-sm">Clear History</Button>
          )}
        </div>

        {/* 4. Strict Conditional Rendering */}
        {!isLoggedIn ? (
          <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-200">
            Please log in to view your watch history.
          </div>
        ) : isLoading ? (
          <div className="text-center text-gray-500 py-10">Loading history...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10 bg-white rounded-2xl border border-red-200">
            {error}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-200">
            You haven't watched any videos yet.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* 5. Safe Mapping with Optional Chaining */}
            {history.map((video) => (
              <Link 
                key={video?._id || Math.random()} 
                to={`/watch/${video?._id}`} 
                className="flex flex-col sm:flex-row gap-4 group bg-white p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="w-full sm:w-64 aspect-video bg-gray-200 rounded-lg overflow-hidden shrink-0">
                  {video?.thumbnail && (
                    <img 
                      src={video.thumbnail} 
                      alt={video?.title || "Video"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                    />
                  )}
                </div>
                
                <div className="flex-1 py-1">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video?.title || "Untitled Video"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {video?.owner?.username || "Unknown Channel"}
                  </p>
                  <p className="text-sm text-gray-500">{video?.views || 0} views</p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2 hidden sm:block">
                    {video?.description || "No description available."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}