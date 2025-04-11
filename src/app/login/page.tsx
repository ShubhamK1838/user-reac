'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useUser} from '@/context/user-context';
import { toast } from 'react-toastify';
import {AuthCard} from '@/components/auth-card';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {login} = useUser(); // Use the login function from the context

  const handleLogin = async () => {
    try {
      if (username === 'root' && password === 'root') {
        // Mock JWT token for root user
        const mockToken = 'mocked_jwt_token_for_root';
        login(username, 'root@example.com', mockToken);

        toast.success('Login Successful - Logged in as root.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push('/');
        return;
      }

      // Make a request to the backend for login and JWT token
      const response = await fetch('http://localhost:9093/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.jwt; // Assuming the backend returns { jwt: 'token' }

        // Store the JWT token and user info in context
        login(username, '', jwtToken);

        toast.success('Login Successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push('/');
      } else {
        toast.error('Login Failed - Invalid credentials.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login Failed - An error occurred.', {
        position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <AuthCard
        title="Login"
        description="Enter your username and password to login."
        onSubmit={handleLogin}
        submitButtonText="Login"
      >
        <div>
          <label className="block text-sm font-medium text-foreground">Username</label>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Password</label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </AuthCard>
    </div>
  );
};

export default LoginPage;
