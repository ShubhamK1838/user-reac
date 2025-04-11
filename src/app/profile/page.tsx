'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {toast} = useToast();

  useEffect(() => {
    // Retrieve user data from localStorage or any other source
    const storedUsername = localStorage.getItem('username') || '';
    const storedEmail = localStorage.getItem('email') || ''; // Retrieve email as well
    setUsername(storedUsername);
    setEmail(storedEmail); // Set the email state
  }, []);

  const handleUpdateProfile = async () => {
    // Implement update profile logic here (e.g., API call)
    console.log('Update Profile:', {username, email, password});
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });

    // You can also update the username and email in localStorage if needed
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <Button onClick={handleUpdateProfile}>Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
