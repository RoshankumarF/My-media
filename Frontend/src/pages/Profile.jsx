import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
 import { api } from '../api';
import Header from '../components/Header';
import Button from '../components/Button';

export default function Profile({ isLoggedIn, setIsLoggedIn, user }) {
   
  const { userId } = useParams();
  
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
         
         
        const response = await api.get(`/v1/user/profile/${userId}`,)
        
     
        setProfileData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (isLoading) return <div className="p-10 text-center text-gray-500">Loading profile...</div>;
  if (!profileData) return <div className="p-10 text-center text-gray-500">User not found.</div>;

  const { user: profileUser, subscriberCount, videos } = profileData;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />

      <main className="flex-1 max-w-[1200px]- mx-auto w-full bg-white shadow-sm min-h-screen">
        
        {/* 1. Cover Image */}
        <div className="w-full h-48 md:h-64 bg-gray-200">
          {profileUser.coverImage ? (
            <img src={profileUser.coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r- from-blue-400 to-purple-500"></div>
          )}
        </div>

        {/* 2. Profile Meta Data */}
        <div className="px-4 sm:px-8 pb-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
            
            {/* Avatar & Names */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white p-1 rounded-full shrink-0">
                {profileUser.avatar ? (
                  <img src={profileUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover bg-gray-200" />
                ) : (
                  <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {profileUser.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <div className="pb-2">
                <h1 className="text-2xl font-bold text-gray-900">{profileUser.fullName}</h1>
                <p className="text-gray-500 font-medium">@{profileUser.username}</p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold text-gray-900">{subscriberCount}</span> Subscribers
                </p>
              </div>
            </div>

            {/* Action Button: Edit Profile vs Subscribe */}
            <div className="pb-2">
              {user?._id === profileUser._id ? (
                <Button variant="secondary" className="px-6 py-2">Edit Profile</Button>
              ) : (
                <Button variant="primary" className="px-6 py-2">Subscribe</Button>
              )}
            </div>
          </div>
        </div>

        {/* 3. Videos Grid */}
        <div className="p-4 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Videos</h2>
          
          {videos.length === 0 ? (
            <p className="text-gray-500">This user hasn't uploaded any videos yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div key={video._id} className="flex flex-col gap-2 cursor-pointer group">
                  <div className="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">{video.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}