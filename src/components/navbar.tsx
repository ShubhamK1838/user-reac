'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="bg-secondary p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        UserBase
      </Link>
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
