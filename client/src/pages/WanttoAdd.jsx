import React, { useState } from 'react';
import axios from 'axios';

const WanttoAdd = () => {

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    eventName: '',
    description: '',
    date: '',
    time: '',
  });
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (showError) setShowError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any field is empty
    const isEmpty = Object.values(form).some((v) => v.trim() === '');
    if (isEmpty) {
      setShowError(true);
      return;
    }
    // Submit to backend
    axios.post(`${import.meta.env.VITE_BACKEND_URL}createEvent`, form)
      .then(() => {
        setShowSuccess(true);
        setForm({
          name: '',
          contact: '',
          email: '',
          eventName: '',
          description: '',
          date: '',
          time: '',
        });
      })
      .catch(() => {
        setShowError(true);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-6 px-2 relative overflow-hidden">
      {/* Animated Flowers - Left Side */}
      <div className="hidden sm:block absolute left-0 top-0 h-full w-28 pointer-events-none z-10">
        {/* Near form */}
        <div className="absolute animate-flower-float1" style={{top: '40px', left: '70px'}}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="8" fill="#f472b6"/><path d="M18 2v6M18 28v6M2 18h6M28 18h6M8.5 8.5l4 4M27.5 27.5l-4-4M8.5 27.5l4-4M27.5 8.5l-4 4" stroke="#ec4899" strokeWidth="1.5"/></svg>
        </div>
        {/* Animated Stars - Left Side */}
        <div className="absolute animate-flower-float2" style={{top: '20px', left: '30px'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 15,9 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,9" fill="#fcd34d" stroke="#fbbf24" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="absolute animate-flower-float1" style={{top: '120px', left: '10px'}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="8,1 9.5,5 14,5.25 10.5,8 11.5,13 8,10.5 4.5,13 5.5,8 2,5.25 6.5,5" fill="#fef9c3" stroke="#fde68a" strokeWidth="1"/>
          </svg>
        </div>
        <div className="absolute animate-flower-float1" style={{top: '-60px', left: '10px'}}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="12" fill="#fbbf24"/><path d="M24 6v8M24 34v8M6 24h8M34 24h8M13.5 13.5l5.5 5.5M34.5 34.5l-5.5-5.5M13.5 34.5l5.5-5.5M34.5 13.5l-5.5 5.5" stroke="#f59e42" strokeWidth="2"/></svg>
        </div>
        <div className="absolute animate-flower-float2" style={{top: '100px', left: '60px'}}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="7" fill="#60a5fa"/><path d="M16 2v5M16 25v5M2 16h5M25 16h5M7.5 7.5l3 3M24.5 24.5l-3-3M7.5 24.5l3-3M24.5 7.5l-3 3" stroke="#2563eb" strokeWidth="1.5"/></svg>
        </div>
        <div className="absolute animate-flower-float2" style={{top: '-180px', left: '50px'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polygon points="10,2 12,7 18,7.5 13.5,11 15,17 10,13.5 5,17 6.5,11 2,7.5 8,7" fill="#fef08a" stroke="#fde047" strokeWidth="1"/>
          </svg>
        </div>
        <div className="absolute animate-flower-float2" style={{top: '-120px', left: '30px'}}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="8" fill="#f472b6"/><path d="M18 2v6M18 28v6M2 18h6M28 18h6M8.5 8.5l4 4M27.5 27.5l-4-4M8.5 27.5l4-4M27.5 8.5l-4 4" stroke="#ec4899" strokeWidth="1.5"/></svg>
        </div>
        <div className="absolute animate-flower-float1" style={{top: '-200px', left: '5px'}}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="7" fill="#60a5fa"/><path d="M16 2v5M16 25v5M2 16h5M25 16h5M7.5 7.5l3 3M24.5 24.5l-3-3M7.5 24.5l3-3M24.5 7.5l-3 3" stroke="#2563eb" strokeWidth="1.5"/></svg>
        </div>
        <div className="absolute animate-flower-float2" style={{top: '-300px', left: '35px'}}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="10" fill="#6ee7b7"/><path d="M20 4v7M20 29v7M4 20h7M29 20h7M10.5 10.5l4.5 4.5M29.5 29.5l-4.5-4.5M10.5 29.5l4.5-4.5M29.5 10.5l-4.5 4.5" stroke="#10b981" strokeWidth="2"/></svg>
        </div>
      </div>
      {/* Animated Flowers - Right Side */}
      <div className="hidden sm:block absolute right-0 top-0 h-full w-28 pointer-events-none z-10">
        {/* Near form */}
        <div className="absolute animate-flower-float2" style={{top: '60px', right: '70px'}}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="10" fill="#6ee7b7"/><path d="M20 4v7M20 29v7M4 20h7M29 20h7M10.5 10.5l4.5 4.5M29.5 29.5l-4.5-4.5M10.5 29.5l4.5-4.5M29.5 10.5l-4.5 4.5" stroke="#10b981" strokeWidth="2"/></svg>
        </div>
        {/* Animated Stars - Right Side */}
        <div className="absolute animate-flower-float1" style={{top: '30px', right: '30px'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 15,9 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,9" fill="#fcd34d" stroke="#fbbf24" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="absolute animate-flower-float2" style={{top: '150px', right: '10px'}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="8,1 9.5,5 14,5.25 10.5,8 11.5,13 8,10.5 4.5,13 5.5,8 2,5.25 6.5,5" fill="#fef9c3" stroke="#fde68a" strokeWidth="1"/>
          </svg>
        </div>
        <div className="absolute animate-flower-float2" style={{top: '-80px', right: '10px'}}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="10" fill="#6ee7b7"/><path d="M20 4v7M20 29v7M4 20h7M29 20h7M10.5 10.5l4.5 4.5M29.5 29.5l-4.5-4.5M10.5 29.5l4.5-4.5M29.5 10.5l-4.5 4.5" stroke="#10b981" strokeWidth="2"/></svg>
        </div>
        <div className="absolute animate-flower-float1" style={{top: '120px', right: '60px'}}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="8" fill="#f472b6"/><path d="M18 2v6M18 28v6M2 18h6M28 18h6M8.5 8.5l4 4M27.5 27.5l-4-4M8.5 27.5l4-4M27.5 8.5l-4 4" stroke="#ec4899" strokeWidth="1.5"/></svg>
        </div>
        <div className="absolute animate-flower-float2" style={{top: '-200px', right: '50px'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polygon points="10,2 12,7 18,7.5 13.5,11 15,17 10,13.5 5,17 6.5,11 2,7.5 8,7" fill="#fef08a" stroke="#fde047" strokeWidth="1"/>
          </svg>
        </div>
        <div className="absolute animate-flower-float1" style={{top: '-160px', right: '30px'}}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="7" fill="#60a5fa"/><path d="M16 2v5M16 25v5M2 16h5M25 16h5M7.5 7.5l3 3M24.5 24.5l-3-3M7.5 24.5l3-3M24.5 7.5l-3 3" stroke="#2563eb" strokeWidth="1.5"/></svg>
        </div>
        <div className="absolute animate-flower-float2" style={{top: '-240px', right: '5px'}}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="8" fill="#f472b6"/><path d="M18 2v6M18 28v6M2 18h6M28 18h6M8.5 8.5l4 4M27.5 27.5l-4-4M8.5 27.5l4-4M27.5 8.5l-4 4" stroke="#ec4899" strokeWidth="1.5"/></svg>
        </div>
        <div className="absolute animate-flower-float1" style={{top: '-320px', right: '35px'}}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="12" fill="#fbbf24"/><path d="M24 6v8M24 34v8M6 24h8M34 24h8M13.5 13.5l5.5 5.5M34.5 34.5l-5.5-5.5M13.5 34.5l5.5-5.5M34.5 13.5l-5.5 5.5" stroke="#f59e42" strokeWidth="2"/></svg>
        </div>
      </div>
      <style>{`
        @keyframes flower-float1 {
          0% { transform: translateY(0); opacity: 0.7; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes flower-float2 {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(60vh) scale(1.1); opacity: 1; }
          100% { transform: translateY(110vh) scale(0.95); opacity: 0; }
        }
        .animate-flower-float1 {
          animation: flower-float1 8s linear infinite;
        }
        .animate-flower-float2 {
          animation: flower-float2 10s linear infinite;
        }
      `}</style>
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-xl relative z-20">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Event Info</h1>
        {showError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center font-semibold">
            All fields required
          </div>
        )}
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center font-semibold">
            Submit successful
          </div>
        )}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">Name</label>
            <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">Contact</label>
            <input required type="text" name="contact" value={form.contact} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your contact number" />
          </div>
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">Email</label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">Event Name</label>
            <input required type="text" name="eventName" value={form.eventName} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter event name" />
          </div>
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">Description</label>
            <textarea required name="description" value={form.description} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter event description" rows={3} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-blue-900 mb-2">Date</label>
              <input required type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-semibold text-blue-900 mb-2">Time</label>
              <input required type="time" name="time" value={form.time} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div className="pt-6 flex justify-center">
            <button type="submit" className="primary px-8 py-3 text-lg rounded-full shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-all">Submit</button>
          </div>
        </form>
        {/* WhatsApp Contact Section */}
        <div className="mt-8 flex flex-col items-center w-full">
          <a
            href="https://wa.me/923037065198"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition-all text-base sm:text-lg font-semibold w-full sm:w-auto justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.468-.148-.666.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.666-1.611-.912-2.206-.242-.579-.487-.5-.666-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.075-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.075.149.198 2.099 3.205 5.077 4.381.711.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.271-.198-.568-.347z"/>
            </svg>
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default WanttoAdd;