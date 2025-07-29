/* eslint-disable react/prop-types */
import {createContext, useEffect, useState} from "react";
import axios from 'axios';


export const UserContext = createContext({});

export function UserContextProvider({children}){
  const [user, setUser ] = useState(() => {
    // Try to restore user from localStorage on first load
    const localUser = localStorage.getItem('googleUser');
    return localUser ? JSON.parse(localUser) : null;
  });

  useEffect(() => {
    // Always keep localStorage in sync with user state
    if (user) {
      localStorage.setItem('googleUser', JSON.stringify(user));
    }
  }, [user]);

  // When logging out, clear Google user from localStorage
  const wrappedSetUser = (u) => {
    setUser(u);
    if (!u) {
      localStorage.removeItem('googleUser');
    }
  };

  return (
    <UserContext.Provider value={{user, setUser: wrappedSetUser}}>
      {children}
    </UserContext.Provider>
  )
}