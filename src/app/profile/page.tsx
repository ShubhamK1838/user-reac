'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useUser} from '@/context/user-context';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {user, setUser} = useUser(); // Access user data and setUser from the context

  useEffect(() => {
    // Set the username and email from the context if available
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      // Implement update profile logic here (e.g., API call)
      console.log('Update Profile:', {username, email, password});
      // You should make an API call to update the profile in the backend

      const response = await fetch(`http://localhost:9093/users/${user?.username}`, {
        method: 'PUT', // Or PATCH depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.jwtToken}`, // Include JWT token
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {

        // const updatedUserData = await response.json();

        // Update the user context with the updated profile data if the response is ok.
        setUser((prevUser) => ({
            ...prevUser,
            username: username,
            email: email,
          }));


        toast.success('Profile Updated - Your profile has been updated successfully.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });


      } else {
          toast.error('Profile update failed.', {
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
      console.error('Profile update error:', error);
      toast.error('Profile update failed - An error occurred.', {
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
