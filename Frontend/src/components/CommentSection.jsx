import { useState, useEffect } from 'react';
import { api } from '../api';
import Button from './Button';
import Input from './Input';
import FormatTimeAgo from './Timeformat';

export default function CommentSection({ videoId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  useEffect(() => {
    const fetchComments = async () => {
      try {
         
        const response = await api.get(`/v1/comment/get-comment/${videoId}`);
        setComments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, [videoId]);

 
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      
      const response = await api.post(
        `/v1/comment/add-comment/${videoId}`, 
        { content: newComment },  
        
      );
 
      setComments([response.data.data, ...comments]);
      setNewComment("");  
    } catch (error) {
      console.error("Failed to post comment", error);
      alert("Could not post comment. Are you logged in?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-6">
      <h3 className="text-lg font-bold mb-4">{comments.length} Comments</h3>
       
      {user ? (
        <form onSubmit={handleCommentSubmit} className="flex gap-4 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-full shrink-0 flex items-center justify-center text-white font-bold">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              user.username?.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 flex flex-col items-end gap-2">
            <Input 
              type="text" 
              placeholder="Add a comment..." 
              className="w-full"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="submit" variant="primary" className="text-sm px-4 py-1.5" isLoading={isSubmitting}>
              Comment
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-8">Please log in to leave a comment.</p>
      )}

      {/* 4. The Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0 overflow-hidden">
               {comment.owner?.avatar && <img src={comment.owner.avatar} alt="avatar" className="w-full h-full object-cover" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {comment.owner?.username || "User"} 
                <span className="text-xs font-normal text-gray-500 ml-2">{FormatTimeAgo(comment.createdAt)}</span>
              </p>
              <p className="text-sm mt-1 text-gray-800">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}