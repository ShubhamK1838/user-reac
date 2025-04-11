'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import { toast } from 'react-toastify';
import {AuthCard} from '@/components/auth-card';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    // Implement signup logic here (e.g., API call)
    console.log('Signup:', {username, password, email});
    toast.info('Signup functionality will be implemented in future steps. For now, please use the login page.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push('/login'); // Redirect to login for now.
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <AuthCard
        title="Signup"
        description="Create a new account"
        onSubmit={handleSignup}
        submitButtonText="Signup"
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
          <label className="block text-sm font-medium text-foreground">Email</label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

export default SignupPage;
