'use client';

import React, {createContext, useState, useEffect, useContext} from 'react';

// Define the User type
interface User {
  username: string;
  email: string;
  // Add other user properties as needed
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: (username: string, email: string) => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage on component mount
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    if (storedUsername && storedEmail) {
      setUser({username: storedUsername, email: storedEmail});
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username: string, email: string) => {
    // Store user data in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    // Update context state
    setUser({username, email});
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    // Update context state
    setUser(null);
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
