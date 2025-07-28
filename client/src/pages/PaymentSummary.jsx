/* eslint-disable no-unused-vars */
import axios from 'axios';
import  { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {IoMdArrowBack} from 'react-icons/io'
import { UserContext } from '../UserContext';
import Qrcode from 'qrcode' //TODO:

export default function PaymentSummary() {
    const [showSignInError, setShowSignInError] = useState(false);
    const [showFieldError, setShowFieldError] = useState(false);
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const {user, setUser} = useContext(UserContext);
    const [details, setDetails] = useState({
      name: '',
      email: '',
      contactNo: '',
    });
//!Adding a default state for ticket-----------------------------
    const defaultTicketState = {
      userid: user ? (user._id || user.email) : '',
      eventid: '',
      ticketDetails: {
        name: user ? user.name : '',
        email: user ? user.email : '',
        eventname: '',
        eventdate: '',
        eventtime: '',
        ticketprice: '',
        qr: '',
      }
    };
//! add default state to the ticket details state
    const [ticketDetails, setTicketDetails] = useState(defaultTicketState);

    const [payment, setPayment] = useState({
      nameOnCard: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
    const [redirect, setRedirect] = useState('');
  
    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/event/${id}/ordersummary/paymentsummary`).then(response => {
        setEvent(response.data)

        setTicketDetails(prevTicketDetails => ({
          ...prevTicketDetails,
          eventid: response.data._id,
       //!capturing event details from backend for ticket----------------------
          ticketDetails: {
            ...prevTicketDetails.ticketDetails,
            eventname: response.data.title,
            eventdate: response.data.eventDate.split("T")[0],
            eventtime: response.data.eventTime,
            ticketprice: response.data.ticketPrice,
          }
        }));
      }).catch((error) => {
        console.error("Error fetching events:", error);
      });
    }, [id]);
//! Getting user details using useeffect and setting to new ticket details with previous details
    useEffect(() => {
      setTicketDetails(prevTicketDetails => ({
        ...prevTicketDetails,
        userid: user ? (user._id || user.email) : '',
        ticketDetails: {
          ...prevTicketDetails.ticketDetails,
          name: user ? user.name : '',
          email: user ? user.email : '',
        }
      }));
    }, [user]);
    
    
    if (!event) return '';

    const handleChangeDetails = (e) => {
      const { name, value } = e.target;
      setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };
  
    const handleChangePayment = (e) => {
      const { name, value } = e.target;
      setPayment((prevPayment) => ({
        ...prevPayment,
        [name]: value,
      }));
    };
//! creating a ticket ------------------------------
    const createTicket = async (e) => {
      e.preventDefault();
      if (!user) {
        setShowSignInError(true);
        return;
      }
      // Field validation
      if (!details.name.trim() || !details.email.trim() || !details.contactNo.trim()) {
        setShowFieldError(true);
        return;
      }
      setShowSignInError(false);
      setShowFieldError(false);
      try {
        const qrCode = await generateQRCode(
          ticketDetails.ticketDetails.eventname,
          ticketDetails.ticketDetails.name
        );
        const updatedTicketDetails = {
          ...ticketDetails,
          ticketDetails: {
            ...ticketDetails.ticketDetails,
            qr: qrCode,
          }
        };
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tickets`, updatedTicketDetails);
        alert("Ticket Created");
        setRedirect(true)
        console.log('Success creating ticket', updatedTicketDetails)
      } catch (error) {
        console.error('Error creating ticket:', error);
      }
    }
//! Helper function to generate QR code ------------------------------
async function generateQRCode(name, eventName) {
  try {
    const qrCodeData = await Qrcode.toDataURL(
        `Event Name: ${name} \n Name: ${eventName}`
    );
    return qrCodeData;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
}
if (redirect){
  return <Navigate to={'/wallet'} />
}
    return (
      <>
      <div>
      <Link to={'/event/'+event._id+ '/ordersummary'}>
                
       <button 
              // onClick={handleBackClick}
              className='
              inline-flex 
              mt-12
              gap-2
              p-3 
              ml-12
              bg-gray-100
              justify-center 
              items-center 
              text-blue-700
              font-bold
              rounded-sm'
              >
                
          <IoMdArrowBack 
            className='
            font-bold
            w-6
            h-6
            gap-2'/> 
            Back
          </button>
          </Link>
          </div>
      <div className="ml-12 bg-gray-100 shadow-lg mt-8 p-16 w-3/5 float-left">
          {/* Payment Option Info - styled like Order Summary */}
          <div className="bg-blue-100 w-1/2 p-5 mb-8 rounded shadow border border-blue-200">
            <h2 className="text-xl font-bold mb-4">Payment Info</h2>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Credit / Debit Card</span>
              <span className="text-sm text-gray-700">Name on Card: <b>Ucp</b></span>
              <span className="text-sm text-gray-700">Card Number: <b>5648 3212 7802</b></span>
              <span className="text-sm text-gray-700">Expiry Date: <b>12/25</b></span>
              <span className="text-sm text-gray-700">CVV: <b>532</b></span>
            </div>
          </div>

          {/* Sign In Required Inline Message */}
          {!user && (
            <div className="mb-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-800 rounded flex items-center gap-2 shadow">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" /></svg>
              <span className="font-semibold">For making payment, sign in is required.</span>
            </div>
          )}
          {/* Your Details */}
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold mb-4">Your Details</h2>
            {/* Gender Selection */}
            <div className="flex items-center ml-10 gap-8 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={details.gender === 'male'}
                  onChange={e => setDetails(prev => ({ ...prev, gender: e.target.value }))}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={details.gender === 'female'}
                  onChange={e => setDetails(prev => ({ ...prev, gender: e.target.value }))}
                />
                Female
              </label>
            </div>
            {showFieldError && (
              <div className="mb-2 p-3 bg-red-100 border-l-4 border-red-500 text-red-800 rounded flex items-center gap-2 shadow animate-pulse">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                <span className="font-semibold">All fields are required.</span>
              </div>
            )}
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={e => { handleChangeDetails(e); if (showFieldError) setShowFieldError(false); }}
              placeholder="Name"
              className="input-field ml-10 w-80 h-10 bg-gray-50 border border-gray-30  rounded-md p-2.5"
            />
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={e => { handleChangeDetails(e); if (showFieldError) setShowFieldError(false); }}
              placeholder="Email"
              className="input-field w-80 ml-10 h-10 bg-gray-50 border border-gray-30  rounded-sm p-2.5"
            />
            <div className="flex space-x-4">
              <input
                type="tel"
                name="contactNo"
                value={details.contactNo}
                onChange={e => { handleChangeDetails(e); if (showFieldError) setShowFieldError(false); }}
                placeholder="Contact No"
                className="input-field ml-10 w-80 h-10 bg-gray-50 border border-gray-30 rounded-sm p-2.5"
              />
            </div>
          </div>

          {/* Make Payment Button */}
          <div className="float-right mt-10">
            <p className="text-sm font-semibold pb-2 pt-8">Total : PKR. {event.ticketPrice}</p>
            {showSignInError && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="p-8 bg-gradient-to-r from-red-400 via-red-500 to-pink-500 border-4 border-red-700 text-white rounded-2xl text-center font-bold flex flex-col items-center shadow-2xl animate-pulse min-w-[350px] max-w-[90vw]">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                    <span className="text-2xl drop-shadow-lg">Sign in required!</span>
                  </div>
                  <span className="text-base font-medium mb-4">Please sign in to continue with your payment.</span>
                  <div className="w-full flex justify-center gap-4 mt-2">
                    <Link to="/login">
                      <button className="px-10 py-3 bg-white text-red-700 rounded-full hover:bg-red-700 hover:text-white transition-all font-bold shadow-lg border-2 border-white text-lg">Sign In</button>
                    </Link>
                    <button onClick={() => setShowSignInError(false)} className="px-10 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-400 hover:text-white transition-all font-bold shadow-lg border-2 border-white text-lg">Cancel</button>
                  </div>
                  {/* Google Sign-In Button */}
                  <div className="w-full flex justify-center mt-6">
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        const decodeJwt = (token) => {
                          try {
                            const base64Url = token.split('.')[1];
                            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                            }).join(''));
                            return JSON.parse(jsonPayload);
                          } catch (e) {
                            return null;
                          }
                        };
                        const profile = decodeJwt(credentialResponse.credential);
                        const googleUser = {
                          name: profile?.name || profile?.email || 'Google User',
                          email: profile?.email || '',
                          token: credentialResponse.credential,
                          isGoogle: true
                        };
                        localStorage.setItem('googleUser', JSON.stringify(googleUser));
                        setUser(googleUser);
                        setShowSignInError(false);
                      }}
                      onError={() => {
                        alert('Google Login Failed');
                      }}
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            )}
            <Link to={'/'}>
              <button type="button" 
                onClick = {createTicket}
                className="primary">
                Make Payment
              </button>
            </Link>
          </div>
      </div>
      <div className="float-right bg-blue-100 w-1/4 p-5 mt-8 mr-12">
          <h2 className="text-xl font-bold mb-8">Order Summary</h2>
          <div className="space-y-1">
            
            <div>
               <p className="float-right">1 Ticket</p>
            </div>
            <p className="text-lg font-semibold">{event.title}</p>
            <p className="text-xs">{event.eventDate.split("T")[0]},</p>
            <p className="text-xs pb-2"> {event.eventTime}</p>
            <hr className=" my-2 border-t pt-2 border-gray-400" />
            <p className="float-right font-bold">PKR. {event.ticketPrice}</p>
            <p className="font-bold">Sub total: {event.ticketPrice}</p>
          </div>
          
        </div>
      </>
    );
}
