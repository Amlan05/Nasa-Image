
"use client"; 

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter(); 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/signup', { username, email, password });
            console.log(response.data);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            router.push('/');

        } catch (error:any) {
            console.error('Signup failed', error.message);
            setError(error.message); 
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Signup</h1>
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Render error message if error exists */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <Link href="/login"> {/* Add link to the login page */}
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Login
                        </a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
