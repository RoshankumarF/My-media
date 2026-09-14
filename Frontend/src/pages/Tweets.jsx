import { useState, useEffect } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import TweetCard from '../components/TweetCard'; // The card we just built!

export default function Tweets({ isLoggedIn, setIsLoggedIn, user }) {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
     
        const response = await api.get('/v1/tweet/get-tweets',);
        
       
        setTweets(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tweets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />

      <main className="flex-1 max-w-3xl mx-auto w-full p-4 lg:py-8">
        
        {/* Page Title & Quick Compose Link */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Latest Tweets</h1>
          {isLoggedIn && (
            <Link 
              to="/compose/tweet" 
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              + New Tweet
            </Link>
          )}
        </div>

        {/* The Feed */}
        {isLoading ? (
          <div className="text-center text-gray-500 py-10">Loading tweets...</div>
        ) : tweets.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-200">
           please login first to see the post
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mapping out our custom TweetCards */}
            {tweets.map((tweet) => (
              <TweetCard key={tweet._id} tweet={tweet} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}