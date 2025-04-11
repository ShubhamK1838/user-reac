'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const Navbar = () => {
  return (
    <nav className="bg-secondary p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        UserBase
      </Link>
      <div>
        <Tabs defaultValue="users" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-x-4">
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
      </div>
    </nav>
  );
};

export default Navbar;
