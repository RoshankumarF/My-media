import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {api} from "../api";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import CommentSection from "../components/CommentSection";
import { Link } from "react-router-dom";

function WatchVideo({ isLoggedIn, setIsLoggedIn, user }) {
    const { videoId } = useParams();

    const [video, setVideo] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked,setIsLiked]=useState(false);

  const [subscriberCount,setSubscriberCount] =useState(0)

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

    
    useEffect(()=>{
       const increaseView = async () => {
        try {
            await api.post(`/v1/video/view/${videoId}`);
        } catch (error) {
            console.log("Failed to increase view:", error);
        }
    };

    if (videoId) {
        increaseView();
    }
    },[videoId])


    useEffect(() => {
    const checkSubscription = async () => {
        if (!user || !video?.owner?._id) return;

        try {
            const response = await api.get(
                `/v1/subscription/check-subscription/${video.owner._id}`
            );

            setIsSubscribed(response.data.data.isSubscribed);
        } catch (error) {
            console.error("Failed to check subscription:", error);
        }
    };

    checkSubscription();
}, [user, video]);


useEffect(() => {
    const getSubscriberCount = async () => {
        if (!video?.owner?._id) return

        try {

    

            const response = await api.get(
                `/v1/subscription/subscriber-count/${video.owner._id}`
            )

            setSubscriberCount(
                response.data.data.subscriberCount
            )
        } catch (error) {
            console.error("Failed to get subscriber count:", error)
        }
    };

    getSubscriberCount()
}, [video])


useEffect(()=>{
  const checkLike =async()=>{
    try {

      const response = await  api.post(`/v1/like/check/video-like/${videoId}`)
      setIsLiked(response.data.data.isLiked)

      
    } catch (error) {
      console.log("There is error in checkLike",error)
      
    }
  }
},[])

    if (!video) {
        return <div>Loading...</div>;
    }


 


 
   

   //The Subscribe Function
  const handleSubscribe = async () => {
    
    if (!user) {
      alert("Please log in to subscribe to channels!");
      return;
    }

    try {
      setIsSubmitting(true);
       
      const response = await api.post(
        `/v1/subscription/toggle-subscription/${video.owner._id}`
         
      );

      // 3. Update the button instantly based on backend response!
      setIsSubscribed(response.data.data.isSubscribed);
      
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Could not update subscription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //Like function 

  const handlelike=async ()=>{
    if(!user){
      alert("please log in to Like the video")
      return
    }

    try {
      setIsSubmitting(true);
      const response = await api.post(`/v1/like/video-like/:${videoId}`)
      setIsLiked(response.data.data.isLiked)
      
    } catch (error) {
      console.log("Like failed",error)
    }finally{
      setIsSubmitting(false)
    }

  }

    return (
       <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-4">
          
        
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-sm">
            <video 
              src={video.videoFile} 
              poster={video.thumbnail} 
              controls 
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
          

         
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="flex items-center gap-3">
    <Link to={`/profile/${video.owner._id}`} className="flex items-center gap-3 cursor-pointer group"> 
  {video.owner?.avatar ? (
    <img 
      src={video.owner.avatar} 
      alt={video.owner.username} 
      className="w-10 h-10 rounded-full object-cover shadow-sm"
    />
  ) : (
    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
      {video.owner?.username?.charAt(0).toUpperCase() || "U"}
    </div>
  )}
  
  <div>
    <h3 className="font-semibold text-gray-900 leading-tight">
      {video.owner?.username || "Unknown Creator"}
    </h3>

    <p className="text-xs text-gray-500 mt-0.5">
      
       {subscriberCount}  Subscribers
    </p>


   
   
  </div>
    </Link>
  
  <Button 
        variant={isSubscribed ? "secondary" : "primary"} 
        className="ml-2 py-1.5 px-4 text-sm transition-all"
        onClick={handleSubscribe}
        disabled={isSubmitting}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </Button>
</div>

              <div className="flex items-center gap-2">
                <Button variant={isLiked ? "secondary" :"primary" }
                onClick={handlelike}
                disabled={isSubmitting}
                className="flex items-center gap-2 text-sm py-1.5">
                  👍 {isLiked ? "Liked" : "Like"}
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
          <div className="mt-8 border-t border-gray-200 pt-6">
            <CommentSection videoId={video._id} user={user} />
          </div>
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