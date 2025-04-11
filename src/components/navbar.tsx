'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useRouter} from 'next/navigation';
import {useUser} from '@/context/user-context'; // Import the useUser hook
import {useEffect} from 'react';

const Navbar = () => {
  const router = useRouter();
  const {isLoggedIn, logout} = useUser(); // Use the isLoggedIn state and logout function from the context

  return (
    <nav className="bg-secondary p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        UserBase
      </Link>
      <div>
        <Tabs defaultValue="users" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="users">
              <Link href="/">Users</Link>
            </TabsTrigger>
            {isLoggedIn && (
              <>
                <TabsTrigger value="settings">
                  <Link href="/settings">Settings</Link>
                </TabsTrigger>
                <TabsTrigger value="profile">
                  <Link href="/profile">Profile</Link>
                </TabsTrigger>
              </>
            )}
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
          <Button variant="default" size="sm" onClick={() => logout()}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
