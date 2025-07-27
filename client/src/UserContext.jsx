/* eslint-disable react/prop-types */
import {createContext, useEffect, useState} from "react";
import axios from 'axios';


export const UserContext = createContext({});

export function UserContextProvider({children}){
  const [user, setUser ] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({data}) =>{
        if (data && data.email) {
          setUser(data);
        } else {
          // Try to restore Google user from localStorage
          const googleUser = localStorage.getItem('googleUser');
          if (googleUser) {
            setUser(JSON.parse(googleUser));
          }
        }
      }).catch(() => {
        // On error, try to restore Google user from localStorage
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
          setUser(JSON.parse(googleUser));
        }
      });
    }
  },[user]);

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