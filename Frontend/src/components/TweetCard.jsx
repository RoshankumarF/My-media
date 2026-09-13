import { Link } from 'react-router-dom';
import FormatTimeAgo from './Timeformat';

export default function TweetCard({ tweet }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex gap-4 hover:bg-gray-50 transition-colors">
      
      
      <Link to={`/profile/${tweet.owner?._id}`} className="shrink-0">
        {tweet.owner?.avatar ? (
          <img src={tweet.owner.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover shadow-sm" />
        ) : (
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
            {tweet.owner?.username?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </Link>

     
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Link to={`/profile/${tweet.owner?._id}`}>
            <h4 className="font-bold text-gray-900 hover:underline">{tweet.owner?.username || "Unknown User"}</h4>
          </Link>
          <span className="text-sm text-gray-500">{FormatTimeAgo(tweet.createdAt)}</span>
        </div>
        
        
        <p className="text-gray-800 text-lg whitespace-pre-wrap leading-relaxed">
          {tweet.content}
        </p>
      </div>
    </div>
  );
}