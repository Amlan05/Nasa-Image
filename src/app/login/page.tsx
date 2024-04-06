
"use client"; 
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Define the Login component
const Login = () => {
    const router = useRouter(); // Using useRouter within the component body
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
              });

              if (res?.error) {
                console.log(res);
                setError("error");
              }
        
              setError("");
              router.push("/");

        } catch (error) {
            console.log(error);
            setError("");
          }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', { callbackUrl: "/" });
        } catch (error) {
            console.error('Google sign-in failed', error);
        }
    };

    // Render the Login component
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Login</h1>
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
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
                        Sign In
                    </button>
                    <button
                        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleGoogleSignIn}
                    >
                        Sign In with Google
                    </button>
                    <Link href="/signup" passHref={true} legacyBehavior={true}>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Signup
                        </a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
