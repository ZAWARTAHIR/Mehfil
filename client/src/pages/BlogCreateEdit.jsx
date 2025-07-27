import React, { useState } from 'react';

export default function BlogCreateEdit({ onSave, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [category, setCategory] = useState(initialData?.category || 'General');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave && onSave({ title, content, author, category, tags: tags.split(',').map(t => t.trim()) });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <textarea placeholder="Content (supports markdown)" value={content} onChange={e => setContent(e.target.value)} className="w-full border px-3 py-2 rounded min-h-[120px]" required />
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primarydark transition">Save</button>
      </form>
    </div>
  );
}
