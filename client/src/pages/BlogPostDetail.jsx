import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogComments from './BlogComments';
import BlogLikeShare from './BlogLikeShare';

const dummyPosts = [
  {
    id: 1,
    title: 'How to Organize a Successful Event',
    content: `Planning a successful event requires attention to detail, creativity, and strong organizational skills. Here are some steps to help you:

1. Define your event goals and objectives.
2. Set a realistic budget.
3. Choose a suitable venue.
4. Promote your event effectively.
5. Gather feedback after the event.

By following these steps, you can ensure your event is memorable and impactful!`,
    author: 'Ch Zawar Tahir',
    authorAvatar: '/zawar.jpg',
    date: '2025-07-20',
    image: '/hero.jpg',
    tags: ['Event', 'Tips', 'Guide'],
    category: 'Event Tips',
  },
  {
    id: 2,
    title: 'Top 5 Event Trends in 2025',
    content: `The event industry is evolving rapidly. Here are the top 5 trends for 2025:

1. Hybrid events
2. Sustainable practices
3. AI-powered networking
4. Immersive experiences
5. Data-driven planning

Stay ahead by embracing these trends!`,
    author: 'Usman Kashif',
    authorAvatar: '/usman.jpg',
    date: '2025-07-18',
    image: '/shalom.png',
    tags: ['Trends', '2025', 'Innovation'],
    category: 'Trends',
  },
  {
    id: 3,
    title: 'Why User Experience Matters in Event Management',
    content: `User experience (UX) is crucial for event success. A great UX can:

- Increase attendance
- Boost engagement
- Encourage positive feedback

Focus on seamless registration, clear communication, and enjoyable activities to enhance UX.`,
    author: 'Admin',
    authorAvatar: '/shalom.png',
    date: '2025-07-15',
    image: '/paduru.png',
    tags: ['UX', 'Event', 'Design'],
    category: 'UX',
  },
];

export default function BlogPostDetail() {
  const { id } = useParams();
  const post = dummyPosts.find(p => p.id === Number(id));
  const related = dummyPosts.filter(p => p.id !== Number(id) && p.category === post?.category).slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Post Not Found</h2>
        <Link to="/blog" className="text-blue-600 underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 md:px-0">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
        <div className="flex items-center gap-4 mb-4">
          <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full border-2 border-primary" />
          <div>
            <div className="font-bold text-primary">{post.author}</div>
            <div className="text-xs text-gray-500">{post.date} | <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">{post.category}</span></div>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-primary mb-2">{post.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">#{tag}</span>
          ))}
        </div>
        <BlogLikeShare postId={post.id} />
        <div className="prose max-w-none text-gray-800 whitespace-pre-line mb-8">{post.content}</div>
        <BlogComments postId={post.id} />
        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold mb-4 text-primary">Related Posts</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map(rp => (
                <Link to={`/blog/${rp.id}`} key={rp.id} className="block bg-gray-50 rounded-lg shadow p-4 hover:shadow-lg transition-all">
                  <div className="font-bold text-primary mb-1">{rp.title}</div>
                  <div className="text-xs text-gray-500 mb-2">By {rp.author} | {rp.date}</div>
                  <div className="text-gray-700 text-sm line-clamp-2">{rp.content.slice(0, 80)}...</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <Link to="/blog" className="inline-block mt-8 bg-primary text-white px-6 py-2 rounded hover:bg-primarydark transition">Back to Blog</Link>
      </div>
    </div>
  );
}
