"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css'; // Import your custom CSS module
import Loading from '@/component/wp-admin/Loading';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    localStorage.removeItem("user")
  },[])
 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;
    const userAgent = navigator.userAgent;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, screenHeight, screenWidth, userAgent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Trigger state update in the same tab by manually triggering storage event (hack)
      window.dispatchEvent(new Event("storage"));

      // Redirect to the homepage or dashboard after successful login
      router.push('/wp-admin'); // Change this to your desired route
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.input}
          />
          {loading?<Loading />:<button 
            type="submit" 
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Submitting...' : 'Login'}
          </button>}
          
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <a href="/" className={styles.link}>Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
