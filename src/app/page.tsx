'use client';

import {UserTable} from '@/components/user-table';
import {AddUserDialog} from '@/components/add-user-dialog';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useUser} from '@/context/user-context'; // Import the useUser hook

export default function Home() {
  const router = useRouter();
  const {isLoggedIn} = useUser(); // Use the isLoggedIn state from the context

  useEffect(() => {
    // Check if the user is logged in
    if (!isLoggedIn) {
      router.push('/login'); // Redirect to login page if not logged in
    }
  }, [router, isLoggedIn]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">User Management</h1>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">User List</h2>
        {isLoggedIn && <AddUserDialog />}
      </div>
      {isLoggedIn ? <UserTable /> : null}
    </div>
  );
}
