'use client';

import {signOut} from 'next-auth/react';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await signOut({redirect: false});
      router.push('/login');
    };

    logout();
  }, [router]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
