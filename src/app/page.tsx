// pages/index.tsx
"use client"; 

import Link from 'next/link';
import NasaImage from '../components/NasaImage';
import { useEffect } from 'react';
import {connect} from "../dbConfig/dbConfig"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Home = () => {

  connect()
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; 
  
    if (!session?.user || !localStorage.getItem('isLoggedIn')) {
        router.push('/login');
    }
  }, [session, status, router]);


  return (
    <div className="flex flex-col min-h-screen bg-blue-100 p-8">
      <nav className="bg-white p-4 shadow-md mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">NASA Astronomy Picture of the Day</h1>
          <div>
            <Link href="/login">
              Login
            </Link>
            <span className="mx-2"> | </span>
            <Link href="/signup">
              Signup
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow">
        <NasaImage />
      </div>
    </div>
  );
};

export default Home;
