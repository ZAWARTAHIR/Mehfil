/* eslint-disable react/jsx-key */

import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext';
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi"; 
import ucpImg from '../assets/ucp1234.jpg';
import shalomImg from '../assets/shalom.png';
import paduruImg from '../assets/grand.jpg';


// Team Section with custom scroll animation
function TeamSection() {
  const teamRefs = useRef([]);
  const [visible, setVisible] = useState([false, false]);

  useEffect(() => {
    const observers = [];
    [0, 1].forEach(idx => {
      const el = teamRefs.current[idx];
      if (!el) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          setVisible(prev => {
            const updated = [...prev];
            updated[idx] = entry.isIntersecting;
            return updated;
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-16 mb-8">
      <h2 className="text-3xl font-bold text-primary mb-8">Our Beautiful Team</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-8 w-full max-w-4xl px-4">
        {/* Card 1 */}
        <div
          ref={el => (teamRefs.current[0] = el)}
          className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl border-t-4 border-blue-500 w-full sm:w-auto transition-all duration-700
            ${visible[0] ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-16 scale-90'}
          `}
          style={{}}
        >
          <img src="../src//assets/zawar.jpg" alt="Ch Zawar Tahir" className="w-40 h-40 object-cover border-4 border-blue-300 mb-4 shadow" style={{clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)', WebkitClipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'}} />
          <h3 className="text-xl font-bold text-primary mb-2">Ch Zawar Tahir</h3>
          <p className="text-gray-600 text-center">Lead Developer & Project Manager. Passionate about building scalable web apps and leading teams to success.</p>
        </div>
        {/* Card 2 */}
        <div
          ref={el => (teamRefs.current[1] = el)}
          className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl border-t-4 border-green-500 w-full sm:w-auto transition-all duration-700
            ${visible[1] ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-90'}
          `}
          style={{}}
        >
          <img src="../src//assets/usman.jpg" alt="Shalom John" className="w-40 h-40 object-cover border-4 border-green-300 mb-4 shadow" style={{clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)', WebkitClipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'}} />
          <h3 className="text-xl font-bold text-green-700 mb-2">Usman Kashif</h3>
          <p className="text-gray-600 text-center">Frontend Specialist. Expert in React and UI/UX, ensuring a beautiful and user-friendly experience.</p>
        </div>
        <div
          ref={el => (teamRefs.current[0] = el)}
          className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl border-t-4 border-pink-500 w-full sm:w-auto transition-all duration-700
            ${visible[0] ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-16 scale-90'}
          `}
          style={{}}
        >
          <img src="../src//assets/ahsin.jpg" alt="Hafiz Ahsin" className="w-40 h-40 object-cover border-4 border-pink-300 mb-4 shadow" style={{clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)', WebkitClipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'}} />
          <h3 className="text-xl font-bold text-pink-700 mb-2">Hafiz Ahsin Ali</h3>
          <p className="text-gray-600 text-center">Backend Specialist. Expert in Node.js and MongoDB, ensuring fast, secure, and scalable server-side performance.</p>
        </div>
      </div>
    </div>
  );
}

  export default function IndexPage() {
    const [events, setEvents] = useState([]);
    const [visibleCards, setVisibleCards] = useState({});
    const cardRefs = useRef([]);
    const videoRef = useRef(null);
    const { user } = useContext(UserContext);

    // Slow down hero video playback
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.6; // 0.6x speed
      }
    }, []);

   //! Fetch events from the server ---------------------------------------------------------------
    useEffect(() => {
      
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/createEvent`)
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }, []);
    
  //! Like Functionality --------------------------------------------------------------
    const handleLike = (eventId) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/event/${eventId}`)
        .then((response) => {
            setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event._id === eventId
                ? { ...event, likes: event.likes + 1 }
                : event
            )
          );
          console.log("done", response)
        })
        .catch((error) => {
          console.error("Error liking ", error);
        });
    };
  

    // Scroll reveal observer for all event cards (must be before return)
    useEffect(() => {
      if (!events.length) return;
      const observers = [];
      events.forEach((event, idx) => {
        const eventDate = new Date(event.eventDate);
        const currentDate = new Date();
        if (!(eventDate > currentDate || eventDate.toDateString() === currentDate.toDateString())) return;
        const el = cardRefs.current[idx];
        if (!el) return;
        const observer = new window.IntersectionObserver(
          ([entry]) => {
            setVisibleCards((prev) => ({
              ...prev,
              [event._id]: entry.isIntersecting
            }));
          },
          { threshold: 0.2 }
        );
        observer.observe(el);
        observers.push(observer);
      });
      return () => observers.forEach(obs => obs.disconnect());
    }, [events]);

    return (
      <>
        <div className="mt-1 flex flex-col">
          <div className="w-full flex justify-center items-center mb-4 relative">
            <video 
              ref={videoRef}
              src="../src/assets/video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full max-w-screen-xl aspect-[4/1] object-cover shadow-md transition-all duration-300 mx-auto filter blur-[2px]" 
              style={{height: 'auto', minHeight: '180px', maxHeight: '480px'}}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-500 to-pink-400 text-2xl sm:text-3xl md:text-4xl font-extrabold text-center px-6 py-3 rounded-2xl shadow-lg"
                style={{
                  backgroundColor: 'rgba(20,20,30,0.55)',
                  boxShadow: '0 4px 24px #0008',
                  border: '2px solid #fff3',
                  textShadow: '0 2px 8px #000a',
                  letterSpacing: '1px',
                  maxWidth: '90%',
                  margin: '0 auto',
                  lineHeight: 1.2
                }}
              >
                Welcome to <span className="text-white">Mehfil</span> — <span className="font-bold text-white">Where Every Event Becomes a Memory!</span>
              </h1>
            </div>
          </div>

          {/* About Us section directly below hero3 image */}
          <div className="w-full flex flex-col items-center justify-center bg-white py-8 px-2 mb-8 shadow-md rounded-xl">
            <h1 className="text-2xl font-bold text-blue-800 mb-2">About Mehfil</h1>
            <p className="text-base text-blue-900 max-w-2xl text-center mb-6">
              Mehfil is a modern event management system designed to make organizing, discovering, and booking events effortless for everyone. Whether you are an event organizer or an attendee, our platform provides a seamless experience from event creation to ticket booking.
            </p>
            <h2 className="text-lg font-semibold text-blue-700 mt-4 mb-4">Key Features</h2>
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 px-2">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center shadow hover:shadow-lg transition-all">
                <span className="text-blue-700 text-2xl mb-2">📝</span>
                <h3 className="font-bold text-blue-800 mb-1 text-center">Easy Event Creation</h3>
                <p className="text-blue-900 text-sm text-center">Organizers can quickly create and publish events with all necessary details and images.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center shadow hover:shadow-lg transition-all">
                <span className="text-blue-700 text-2xl mb-2">🔍</span>
                <h3 className="font-bold text-blue-800 mb-1 text-center">Event Discovery</h3>
                <p className="text-blue-900 text-sm text-center">Users can browse upcoming and ongoing events, filter by date, category, and more.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center shadow hover:shadow-lg transition-all">
                <span className="text-blue-700 text-2xl mb-2">🎟️</span>
                <h3 className="font-bold text-blue-800 mb-1 text-center">Online Booking</h3>
                <p className="text-blue-900 text-sm text-center">Securely book tickets for your favorite events directly from the platform.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center shadow hover:shadow-lg transition-all">
                <span className="text-blue-700 text-2xl mb-2">👍</span>
                <h3 className="font-bold text-blue-800 mb-1 text-center">Like & Promote</h3>
                <p className="text-blue-900 text-sm text-center">Show appreciation for events by liking them and help promote popular events.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center shadow hover:shadow-lg transition-all">
                <span className="text-blue-700 text-2xl mb-2">🤝</span>
                <h3 className="font-bold text-blue-800 mb-1 text-center">Team Collaboration</h3>
                <p className="text-blue-900 text-sm text-center">Multiple organizers and team members can manage events together.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center shadow hover:shadow-lg transition-all">
                <span className="text-blue-700 text-2xl mb-2">📱</span>
                <h3 className="font-bold text-blue-800 mb-1 text-center">Responsive Design</h3>
                <p className="text-blue-900 text-sm text-center">Enjoy a beautiful and user-friendly interface on any device.</p>
              </div>
              {/* <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center shadow hover:shadow-lg transition-all">
                <span className="text-blue-700 text-2xl mb-2">📊</span>
                <h3 className="font-bold text-blue-800 mb-1 text-center">Admin Dashboard</h3>
                <p className="text-blue-900 text-sm text-center">Powerful tools for managing users, events, and analytics (for admins).</p>
              </div> */}
            </div>
            <p className="text-sm text-blue-800 max-w-xl text-center">
              Mehfil is built with the latest web technologies (React, Node.js, MongoDB) to ensure speed, security, and reliability. Join us and make your next event a success!
            </p>
          </div>

          <div className="mx-10 my-5 min-h-[300px] flex items-center justify-center">
            {/* {!user ? (
              <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-lg p-12">
                <img src="../src/assets/paduru.png" alt="Sign in required" className="w-32 h-32 mb-6 animate-bounce" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Sign In Required</h2>
                <p className="text-lg text-blue-800 mb-4">Please sign in to view and book events.</p>
                <Link to="/login">
                  <button className="primary px-8 py-3 text-lg rounded-full shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-all">Sign In</button>
                </Link>
              </div>
            ) : ( */}

              {/* Vertical scroll reveal for events */}
              <div className="w-full py-2">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 px-2 md:px-4 lg:px-8">
                  {events.length > 0 && events.map((event, idx) => {
                    const eventDate = new Date(event.eventDate);
                    const currentDate = new Date();
                    if (eventDate > currentDate || eventDate.toDateString() === currentDate.toDateString()) {
                      return (
                        <div
                          ref={el => cardRefs.current[idx] = el}
                          key={event._id}
                          className={`bg-white rounded-3xl relative transition-all duration-700 shadow hover:shadow-xl hover:-translate-y-1 hover:scale-10 cursor-pointer w-[340px] md:w-[300px] lg:w-[280px] min-h-[370px] 
                            ${visibleCards[event._id] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}
                          `}
                          style={{ willChange: 'transform, opacity' }}
                        >
                          <div className='rounded-tl-3xl rounded-tr-3xl rounded-br-[0] rounded-bl-[0] overflow-hidden w-full h-[170px] bg-gray-100 flex items-center justify-center'>
                            <img
                              src={paduruImg}
                              alt={event.title}
                              className="w-full h-full object-cover rounded-t-3xl"
                            />
                            <div className="absolute flex gap-4 bottom-[240px] right-8 md:bottom-[20px] md:right-3 lg:bottom-[250px] lg:right-4 sm:bottom-[260px] sm:right-3">
                              <button onClick={() => handleLike(event._id)}>
                                <BiLike className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-primary" />
                              </button>
                            </div>
                          </div>
                          <div className="m-3 grid gap-1">
                            <div className="flex justify-between items-center">
                              <h1 className="font-bold text-lg mt-2">{event.title.toUpperCase()}</h1>
                              <div className="flex gap-3 items-center mr-5 text-red-600"> <BiLike /> {event.likes}</div>
                            </div>
                            <div className="flex text-sm flex-nowrap justify-between text-primarydark font-bold mr-4">
                              <div>{event.eventDate.split("T")[0]}, {event.eventTime}</div>
                              <div>{event.ticketPrice === 0? 'Free' : 'Rs. '+ event.ticketPrice}</div>
                            </div>
                            <div className="text-xs flex flex-col flex-wrap truncate-text">{event.description}</div>
                            <div className="flex justify-between items-center my-2 mr-4">
                              <div className="text-sm text-primarydark ">Organized By: <br /><span className="font-bold">{event.organizedBy}</span></div>
                              <div className="text-sm text-primarydark ">Created By: <br/> <span className="font-semibold">{event.owner.toUpperCase()}</span></div>
                            </div>
                            <Link to={'/event/'+event._id} className="flex justify-center">
                              <button className="primary flex items-center gap-2">Book Ticket< BsArrowRightShort className="w-6 h-6" /></button>
                            </Link>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
          </div>
        </div>

        {/* Team Section - Above Footer */}
        <TeamSection />
      </>
    )
  }
