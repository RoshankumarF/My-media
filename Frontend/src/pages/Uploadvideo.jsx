import { useState } from 'react';
import  {api} from "../api.js"
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

export default function UploadVideo({user}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const formData = new FormData(e.currentTarget);

    try {
      setIsLoading(true);

      
      

      
      const response = await api.post('/v1/video/publish-video', formData, {
        withCredentials:true
        
      });

      console.log("Video uploaded successfully:", response.data);
      alert("Video uploaded!");
      
      // Send the user back to the home feed to see their new video
      navigate('/'); 

    } catch (error) {
      if (error.response) {
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
      
      <Header  user={user} />
      
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Video</h1>
          <p className="text-gray-500 text-sm mb-8">Share your moments with the world.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* TEXT INPUTS */}
            <div className="space-y-4">
              <Input 
                label="Video Title" 
                name="title"  
                type="text" 
                placeholder="Catchy title goes here..." 
                required 
              />
              
              {/* Native Textarea for Description since it needs multiple lines */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description" 
                  rows="4"
                  placeholder="Tell viewers about your video..."
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* FILE INPUTS */}
            <div className="pt-6 border-t border-gray-100 space-y-5">
              <p className="text-sm font-semibold text-gray-700">Media Assets</p>
              
              <Input 
                label="Video File (MP4, WebM)" 
                name="videoFile"  
                type="file" 
                accept="video/*" // Restricts picker to video files
                required
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              
              <Input 
                label="Thumbnail Image" 
                name="thumbnail"  
                type="file" 
                accept="image/*"  
                required
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
            
            {/* SUBMIT BUTTON WITH LOADING STATE */}
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mt-4"
              isLoading={isLoading} 
            >
              {isLoading ? "Uploading Video... (This may take a while)" : "Publish Video"}
            </Button>

          </form>
        </div>
      </main>
    </div>
  );
}