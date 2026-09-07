import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {api} from "../api";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";

function WatchVideo({ isLoggedIn, setIsLoggedIn, user }) {
    const { videoId } = useParams();

    const [video, setVideo] = useState(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await api.get(`/v1/video/watch/${videoId}`);
 

                setVideo(response.data.data);
            } catch (error) {
                console.log("Failed to get video:", error);
            }
        };

        getVideo();
    }, [videoId]);

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
       <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* 1. Real HTML5 Video Player */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-sm">
            <video 
              src={video.videoFile} 
              poster={video.thumbnail} 
              controls 
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>

          {/* 2. Real Video Data */}
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {/* Assuming owner is populated with username */}
                  {video.owner?.username?.charAt(0).toUpperCase() || "C"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 leading-tight">
                    {video.owner?.username || "Channel Name"}
                  </h3>
                </div>
                <Button variant="primary" className="ml-2 py-1.5 px-4 text-sm">Subscribe</Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="secondary" className="flex items-center gap-2 text-sm py-1.5">
                  👍 Like
                </Button>
                <Button variant="secondary" className="flex items-center gap-2 text-sm py-1.5">
                   ↪️ Share
                </Button>
              </div>
            </div>
          </div>

          {/* 3. Description Box */}
          <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-800 shadow-sm mt-4">
            <p className="font-semibold mb-2">{video.views} views</p>
            <p className="whitespace-pre-wrap">{video.description}</p>
          </div>
          
          {/* Comments section hidden for brevity... */}
        </div>

        {/* RIGHT COLUMN: Suggested Videos (Static for now) */}
        <aside className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-gray-900 mb-4">Up Next</h3>
          <div className="text-gray-500 text-sm">More videos coming soon...</div>
        </aside>

      </main>
    </div>
    );
}

export  default WatchVideo;