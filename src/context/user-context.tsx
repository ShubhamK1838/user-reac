'use client';

import React, {createContext, useState, useEffect, useContext} from 'react';

// Define the User type
interface User {
  username: string;
  email: string;
  jwtToken: string | null; // JWT token
  // Add other user properties as needed
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: (username: string, email: string, jwtToken: string) => void;
  logout: () => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  login: () => {},
  logout: () => {},
});

// Create a provider component
const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>({username: '', email: '', jwtToken: null});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage on component mount
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedJwtToken = localStorage.getItem('jwtToken');

    if (storedUsername && storedEmail && storedJwtToken) {
      setUser({username: storedUsername, email: storedEmail, jwtToken: storedJwtToken});
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username: string, email: string, jwtToken: string) => {
    // Store user data in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('jwtToken', jwtToken); // Store JWT token

    // Update context state
    setUser({username, email, jwtToken});
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('jwtToken'); // Remove JWT token

    // Update context state
    setUser({username: '', email: '', jwtToken: null});
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
const useUser = () => useContext(UserContext);

export {UserProvider, useUser};
