import { useState } from 'react';
import  {api} from "../api.js"
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Logo from '../components/Logo.jsx';
import { Link } from 'react-router-dom';
export default function UploadVideo({user}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const formData = new FormData(e.currentTarget);

    try {
      setIsLoading(true);

      
      

      
      const response = await api.post('/v1/video/publish-video', formData);

      console.log("Video uploaded successfully:", response.data);
      alert("Video uploaded!");
      
      // Send the user back to the home feed to see their new video
      navigate('/'); 

    } catch (error) {
      if (error.response) {
        console.log(error)
        console.error("Upload failed:", error.response.data);
        alert(error.response.data.message || "Upload failed. Please try again.");
      } else {
        alert("Could not connect to the server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* 1. THE CUSTOM INLINE HEADER (No need to import Header.jsx!) */}
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
        
        {/* Simple Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <input 
            type="text" 
            placeholder="Search videos..." 
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full">
            🔍
          </button>
        </div>
        
        {/* Empty div on the right to keep the search bar perfectly centered */}
        <div className="w-10"></div> 
      </header>
      
      {/* 2. THE MAIN UPLOAD FORM */}
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Video</h1>
          <p className="text-gray-500 text-sm mb-8">Share your moments with the world.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="space-y-4">
              <Input label="Video Title" name="title" type="text" placeholder="Catchy title goes here..." required />
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Tell viewers about your video..."
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  required
                ></textarea>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-5">
              <p className="text-sm font-semibold text-gray-700">Media Assets</p>
              
              <Input 
                label="Video File (MP4, WebM)" name="videoFile" type="file" accept="video/*" required
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700"
              />
              
              <Input 
                label="Thumbnail Image" name="thumbnail" type="file" accept="image/*" required
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-100 file:text-gray-700"
              />
            </div>
            
            <Button type="submit" variant="primary" className="w-full mt-4" isLoading={isLoading}>
              {isLoading ? "Uploading Video..." : "Publish Video"}
            </Button>

          </form>
        </div>
      </main>
    </div>
  );
}