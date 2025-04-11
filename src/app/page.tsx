'use client';

import {UserTable} from '@/components/user-table';
import {AddUserDialog} from '@/components/add-user-dialog';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is 'root'
    if (localStorage.getItem('username') !== 'root') {
      router.push('/login'); // Redirect to login page
    }
  }, [router]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">User Management</h1>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">User List</h2>
        <AddUserDialog />
      </div>
      <UserTable />
    </div>
  );
}

