import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import {Link} from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from 'react-icons/rx';
import { BsFillCaretDownFill } from 'react-icons/bs';


export default function Header() {
  const {user,setUser} = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  //! Fetch events from the server -------------------------------------------------
  useEffect(() => {
    
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/event`).then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);


  //! Search bar functionality----------------------------------------------------
  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the clicked element is the search input or its descendant
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    };

    // Listen for click events on the entire document
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []); 
  
  //! Logout Function --------------------------------------------------------
  const [redirectLogout, setRedirectLogout] = useState(false);
  async function logout(){
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`);
    setUser(null);
    setRedirectLogout(true);
  }
//! Search input ----------------------------------------------------------------
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (redirectLogout) {
    window.location.href = '/';
    return null;
  }
  return (
    <header className='w-full sticky top-0 left-0 right-0 z-[999] bg-white shadow-md'>
      <div className="flex items-center justify-between py-2 px-4 sm:px-6">
        {/* Logo: leftmost on all screens */}
        <div className="flex-1 flex justify-start">
          <Link to={'/'} className="flex items-center">
            <img src="/Mehfil-unscreen.gif" alt="Logo" className="h-12 sm:h-9 w-auto object-contain" />
          </Link>
        </div>
        {/* Hamburger for mobile */}
        <div className="flex sm:hidden">
          <button onClick={() => setisMenuOpen(isMenuOpen === 'mobile' ? false : 'mobile')} className="ml-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Desktop nav/search/actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Desktop search bar */}
          <div className="bg-white rounded py-2.5 px-4 w-80 gap-4 items-center shadow-md shadow-gray-200 flex">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <div ref={searchInputRef}>
              <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchInputChange} className='text-sm text-black outline-none w-full '/>
            </div>
          </div>
          {/* Desktop nav/actions */}
          <div className='flex gap-3 text-sm'>
            <Link to={'/want-to-add'}>
              <div className='flex flex-col place-items-center py-1 px-2 rounded text-primary cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 hover:transition-shadow duration-1500'>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 stroke-3 py-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <div className='font-bold color-primary text-sm'>Add Event</div>
              </div>
            </Link>
            <Link to={'/wallet'}>
              <div className='flex flex-col place-items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 hover:transition-shadow duration-1500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 py-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
                <div>Wallet</div>
              </div>
            </Link>
            <Link to={'/calendar'}>
              <div className='flex flex-col place-items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 hover:transition-shadow duration-1500'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 py-1">
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                </svg>
                <div>Calendar</div>
              </div>
            </Link>
            {/* Blog link */}
            <Link to={'/blog'}>
              <div className='flex flex-col place-items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 hover:transition-shadow duration-1500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 py-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.556 0 8.25-1.567 8.25-3.5v-2.25c0-1.933-3.694-3.5-8.25-3.5s-8.25 1.567-8.25 3.5v2.25c0 1.933 3.694 3.5 8.25 3.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c4.556 0 8.25-1.567 8.25-3.5s-3.694-3.5-8.25-3.5-8.25 1.567-8.25 3.5 3.694 3.5 8.25 3.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25c4.556 0 8.25-1.567 8.25-3.5S16.556.25 12 .25 3.75 1.817 3.75 3.75 7.444 5.25 12 5.25z" />
                </svg>
                <div>Blog</div>
              </div>
            </Link>
          </div>
          {/* User/account actions for desktop */}
          {!!user && (
            <div className="flex flex-row items-center gap-2 sm:gap-8 relative">
              <div className="flex items-center gap-2">
                <Link to={'/useraccount'}>
                  {user.name.toUpperCase()}
                </Link>
                <BsFillCaretDownFill className="h-5 w-5 cursor-pointer hover:rotate-180 transition-all" onClick={() => setisMenuOpen(isMenuOpen === 'user' ? false : 'user')} />
              </div>
              <div className="hidden md:flex">
                <button onClick={logout} className="secondary">
                  <div>Log out</div>
                  <RxExit/>
                </button>
              </div>
              {/* User dropdown menu (desktop) */}
              {isMenuOpen === 'user' && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg py-2 px-4 flex flex-col gap-2 min-w-[160px] z-[1000] animate-slide-down">
                  <Link to="/useraccount" className="hover:text-primary py-1" onClick={() => setisMenuOpen(false)}>Account</Link>
                  <Link to="/wallet" className="hover:text-primary py-1" onClick={() => setisMenuOpen(false)}>Wallet</Link>
                  <Link to="/calendar" className="hover:text-primary py-1" onClick={() => setisMenuOpen(false)}>Calendar</Link>
                  <Link to="/blog" className="hover:text-primary py-1" onClick={() => setisMenuOpen(false)}>Blog</Link>
                  <button onClick={logout} className="text-left hover:text-primary py-1">Log out</button>
                </div>
              )}
            </div>
          )}
          {!user && (
            <div>
              <Link to={'/login'} className=" ">
                <button className="primary">
                  <div>Sign in </div>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Mobile dropdown menu */}
      {isMenuOpen === 'mobile' && (
        <div className="sm:hidden fixed left-0 right-0 top-[64px] z-[9999] bg-black bg-opacity-60 flex flex-col" style={{height: 'calc(100vh - 64px)'}}>
          <div className="bg-white w-full py-6 px-6 rounded-b-2xl shadow-xl flex flex-col gap-6 animate-slide-down">
            {/* Search bar */}
            <div className="flex bg-gray-100 rounded py-2.5 px-4 gap-4 items-center shadow-md shadow-gray-200">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="text-sm text-black outline-none w-full"
                autoFocus
              />
              <button onClick={() => setisMenuOpen(false)} className="ml-2 text-gray-500">✕</button>
            </div>
            {/* Nav links */}
            <nav className="flex flex-col gap-4 text-lg font-semibold">
              <Link to="/want-to-add" onClick={() => setisMenuOpen(false)} className="hover:text-primary transition-colors">Add Event</Link>
              <Link to="/wallet" onClick={() => setisMenuOpen(false)} className="hover:text-primary transition-colors">Wallet</Link>
              <Link to="/calendar" onClick={() => setisMenuOpen(false)} className="hover:text-primary transition-colors">Calendar</Link>
              <Link to="/blog" onClick={() => setisMenuOpen(false)} className="hover:text-primary transition-colors">Blog</Link>
              {!!user ? (
                <>
                  <Link to="/useraccount" onClick={() => setisMenuOpen(false)} className="hover:text-primary transition-colors">{user.name.toUpperCase()}</Link>
                  <button onClick={logout} className="text-left hover:text-primary transition-colors">Log out</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setisMenuOpen(false)} className="hover:text-primary transition-colors">Sign in</Link>
              )}
            </nav>
          </div>
        </div>
      )}

      {/*------------------------- Search Functionality -------------------  */}
      {searchQuery && Array.isArray(events) && events.length > 0 && (
        <div className="p-2 w-144 z-10 absolute rounded left-[28.5%] top-14 md:w-[315px] md:left-[17%] md:top-16 lg:w-[540px] lg:left-[12%] lg:top-16 bg-white">
          {/* Filter events based on the search query */}
          {events
            .filter((event) => event && event.title && event.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((event) => (
              <div key={event._id} className="p-2">
                {/* Display event details */}
                <Link to={"/event/" + event._id}>
                  <div className="text-black text-lg w-full">{event.title}</div>
                </Link>
              </div>
            ))}
        </div>
      )}

        </header>
  );
}
