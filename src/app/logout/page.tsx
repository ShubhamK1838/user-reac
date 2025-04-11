'use client';

import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useUser} from '@/context/user-context'; // Import the useUser hook

const LogoutPage = () => {
  const router = useRouter();
  const {logout} = useUser(); // Get the logout function from the context

  useEffect(() => {
    const logoutAction = async () => {
      logout(); // Call the logout function from the context
      router.push('/login');
    };

    logoutAction();
  }, [router, logout]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
