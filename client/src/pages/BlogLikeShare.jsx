import React, { useState } from 'react';

export default function BlogLikeShare({ postId }) {
  const [likes, setLikes] = useState(12);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  return (
    <div className="flex items-center gap-4 mt-4 mb-8">
      <button onClick={handleLike} className={`flex items-center gap-1 px-3 py-1 rounded ${liked ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'} hover:bg-blue-200 transition`}>
        <span role="img" aria-label="like">👍</span> {likes}
      </button>
      <div className="flex gap-2">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Share</a>
        <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">Tweet</a>
      </div>
    </div>
  );
}
