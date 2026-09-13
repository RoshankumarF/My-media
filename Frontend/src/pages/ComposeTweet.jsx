import { useState } from 'react';
import { api } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

export default function ComposeTweet() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTweetSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      
      await api.post('/v1/tweet/add-tweet', 
        { content }, 
       
      );
      
      
      navigate('/tweets');
    } catch (error) {
      console.error("Failed to post tweet:", error);
      alert("Could not post your tweet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
    
      <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
        <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">Cancel</Link>
      </header>

     
      <main className="flex-1 max-w-2xl mx-auto w-full p-4 mt-8">
        <form onSubmit={handleTweetSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full text-xl border-none focus:ring-0 outline-none resize-none min-h-[150px]- placeholder-gray-400 bg-transparent"
            autoFocus
          ></textarea>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
            <span className="text-sm text-gray-400">{content.length}/280</span>
            <Button 
              type="submit" 
              variant="primary" 
              className="px-8"
              isLoading={isLoading}
              disabled={content.length === 0 || content.length > 280}
            >
              Post Tweet
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}