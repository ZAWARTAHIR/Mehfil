import  { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user? user.name : "",
    title: "",
    optional:"",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: '',
    likes: 0
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const [showError, setShowError] = useState(false);
  const [dateLimitError, setDateLimitError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDateLimitError("");
    // List of required fields
    const requiredFields = [
      'title', 'optional', 'description', 'organizedBy', 'eventDate', 'eventTime', 'location', 'ticketPrice'
    ];
    const isEmpty = requiredFields.some((key) => {
      if (typeof formData[key] === 'number') {
        return formData[key] === 0;
      }
      return !formData[key] || formData[key].toString().trim() === '';
    });
    if (isEmpty) {
      setShowError(true);
      return;
    }
    setShowError(false);
    // Check if more than 3 events exist for the selected date
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/createEvent`);
      // Compare only the date part (ignore time)
      const selectedDate = formData.eventDate;
      const eventsOnDate = res.data.filter(ev => {
        // ev.eventDate may include time, so split at 'T' if present
        const evDate = ev.eventDate.split('T')[0];
        return evDate === selectedDate;
      });
      if (eventsOnDate.length >= 3) {
        setDateLimitError('You cannot add more than 3 events on the same date.');
        return;
      }
    } catch (err) {
      setDateLimitError('Error checking event date limit.');
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/createEvent`, formData)
      .then((response) => {
        window.alert("🎉 Event added successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error posting event:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className='flex flex-col w-full max-w-xl bg-white p-8 rounded-lg shadow-lg'>
        <div><h1 className='font-bold text-[36px] mb-5 text-center'>Post an Event</h1></div>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          {showError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center font-semibold">
              All fields are required
            </div>
          )}
          {dateLimitError && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-8 bg-gradient-to-r from-red-400 via-red-500 to-pink-500 border-4 border-red-700 text-white rounded-2xl text-center font-bold flex flex-col items-center shadow-2xl animate-pulse min-w-[350px] max-w-[90vw]">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                  <span className="text-2xl drop-shadow-lg">Event Limit Reached!</span>
                </div>
                <span className="text-base font-medium mb-4">{dateLimitError}</span>
                <button onClick={() => setDateLimitError("")} className="mt-4 px-10 py-3 bg-white text-red-700 rounded-full hover:bg-red-700 hover:text-white transition-all font-bold shadow-lg border-2 border-white text-lg">Close</button>
              </div>
            </div>
          )}
          <div className='flex flex-col gap-5'>
            <label className='flex flex-col'>
              Title:
              <input
                type="text"
                name="title"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <label className='flex flex-col'>
              Category:
              <input
                type="text"
                name="optional"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.optional}
                onChange={handleChange}
                required
              />
            </label >
            <label className='flex flex-col'>
              Description:
              <textarea
                name="description"
                className='rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none'
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>
            <label className='flex flex-col'>
              Organized By:
              <input
                type="text"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                name="organizedBy"
                value={formData.organizedBy}
                onChange={handleChange}
                required
              />
            </label>
            <label className='flex flex-col'>
              Event Date:
              <input
                type="date"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </label>
            <label className='flex flex-col'>
              Event Time:
              <input
                type="time"
                name="eventTime"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.eventTime}
                onChange={handleChange}
                required
              />
            </label>
            <label className='flex flex-col'>
              Location:
              <input
                type="text"
                name="location"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.location}
                onChange={handleChange}
                required
              />
            </label>
            <label className='flex flex-col'>
              Ticket Price:
              <input
                type="number"
                name="ticketPrice"
                className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
                value={formData.ticketPrice}
                onChange={handleChange}
                required
              />
            </label>
            <button className='primary mt-4' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
