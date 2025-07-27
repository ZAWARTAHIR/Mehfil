import React, { useState } from 'react';

const dummyComments = [
  { id: 1, author: 'Ali', text: 'Great post! Very helpful.', date: '2025-07-20' },
  { id: 2, author: 'Sara', text: 'Thanks for the tips!', date: '2025-07-21' },
];

export default function BlogComments({ postId }) {
  const [comments, setComments] = useState(dummyComments);
  const [comment, setComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now(), author: 'Guest', text: comment, date: new Date().toISOString().split('T')[0] }
    ]);
    setComment('');
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-2">Comments</h3>
      <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Post</button>
      </form>
      <div className="space-y-3">
        {comments.map(c => (
          <div key={c.id} className="bg-gray-50 rounded p-3">
            <div className="text-sm font-semibold text-primary">{c.author}</div>
            <div className="text-gray-700 text-sm">{c.text}</div>
            <div className="text-xs text-gray-400">{c.date}</div>
          </div>
        ))}
        {comments.length === 0 && <div className="text-gray-400">No comments yet.</div>}
      </div>
    </div>
  );
}
