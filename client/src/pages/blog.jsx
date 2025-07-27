import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCreateEdit from './BlogCreateEdit';

const dummyPosts = [
  {
    id: 1,
    title: 'How to Organize a Successful Event',
    excerpt: 'Learn the key steps and tips for planning and executing a memorable event, from invitations to feedback.',
    author: 'Ch Zawar Tahir',
    authorAvatar: '../src/assets/zawar.jpg',
    date: '2025-07-20',
    image: '../src/assets/hero.jpg',
    tags: ['Event', 'Tips', 'Guide'],
    category: 'Event Tips',
    likes: 12,
  },
  {
    id: 2,
    title: 'Top 5 Event Trends in 2025',
    excerpt: 'Stay ahead of the curve with these trending ideas and technologies shaping the event industry this year.',
    author: 'Usman Kashif',
    authorAvatar: '../src/assets/usman.jpg',
    date: '2025-07-18',
    image: '../src/assets/shalom.png',
    tags: ['Trends', '2025', 'Innovation'],
    category: 'Trends',
    likes: 8,
  },
  {
    id: 3,
    title: 'Why User Experience Matters in Event Management',
    excerpt: 'Discover how a great UX can boost attendance and satisfaction at your events.',
    author: 'Admin',
    authorAvatar: '../src/assets/shalom.png',
    date: '2025-07-15',
    image: '../src/assets/paduru.png',
    tags: ['UX', 'Event', 'Design'],
    category: 'UX',
    likes: 15,
  },
];

const allCategories = ['All', ...Array.from(new Set(dummyPosts.map(p => p.category)))];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [page, setPage] = useState(1);
  const postsPerPage = 2;

  // Filter by search and category
  let filteredPosts = dummyPosts.filter(post =>
    (category === 'All' || post.category === category) &&
    (post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  filteredPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  // Featured/Popular posts (by likes)
  const popularPosts = [...dummyPosts].sort((a, b) => b.likes - a.likes).slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 md:px-0">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-2">Mehfil Blog</h1>
        <p className="text-lg text-gray-700 mb-4">Latest tips, news, and stories from the world of event management.</p>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`px-3 py-1 rounded-full text-sm border ${category === cat ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-gray-300'} transition`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Admin create post button */}
        <button onClick={() => setShowCreate(!showCreate)} className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primarydark transition">{showCreate ? 'Close' : 'Create New Post'}</button>
      </div>
      {showCreate && <BlogCreateEdit onSave={() => setShowCreate(false)} />}

      {/* Featured Post */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          <img src={dummyPosts[0].image} alt={dummyPosts[0].title} className="w-full md:w-1/3 h-56 object-cover" />
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">{dummyPosts[0].title}</h2>
              <p className="text-gray-700 mb-3">{dummyPosts[0].excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {dummyPosts[0].tags.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">#{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <img src={dummyPosts[0].authorAvatar} alt={dummyPosts[0].author} className="w-8 h-8 rounded-full border-2 border-primary" />
              <span className="text-sm text-gray-500">By {dummyPosts[0].author} | {dummyPosts[0].date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog List & Sidebar */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Blog List */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-primary mb-4">All Posts</h3>
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-all">
                <img src={post.image} alt={post.title} className="w-full md:w-40 h-32 object-cover rounded" />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <Link to={'/blog/' + post.id} className="text-lg font-bold text-primary hover:underline">{post.title}</Link>
                    <p className="text-gray-700 text-sm mt-1 mb-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full border-2 border-primary" />
                      <span className="text-xs text-gray-500">By {post.author} | {post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-gray-500 text-center py-8">No blog posts found.</div>
            )}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex gap-2 justify-center mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 rounded ${page === num ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h4 className="font-bold text-primary mb-2">About This Blog</h4>
            <p className="text-gray-700 text-sm">Mehfil Blog brings you the latest insights, tips, and stories to help you organize, discover, and enjoy events to the fullest.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h4 className="font-bold text-primary mb-2">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['Event', 'Tips', 'Guide', 'Trends', '2025', 'Innovation', 'UX', 'Design'].map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">#{tag}</span>
              ))}
            </div>
          </div>
          {/* Featured/Popular Posts */}
          <div className="bg-white rounded-lg shadow p-5">
            <h4 className="font-bold text-primary mb-2">Popular Posts</h4>
            <div className="space-y-2">
              {popularPosts.map(post => (
                <Link to={'/blog/' + post.id} key={post.id} className="block text-primary hover:underline text-sm">
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
