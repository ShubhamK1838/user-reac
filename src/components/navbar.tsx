'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!storedUsername);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-secondary p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        UserBase
      </Link>
      <div>
        <Tabs defaultValue="users" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            {isLoggedIn && <TabsTrigger value="settings"><Link href="/settings">Settings</Link></TabsTrigger>}
            {isLoggedIn && <TabsTrigger value="profile"><Link href="/profile">Profile</Link></TabsTrigger>}
          </TabsList>
        </Tabs>
      </div>
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link href="/signup">
              <Button variant="outline" size="sm">
                Signup
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>
          </>
        ) : (
          <Button variant="default" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
