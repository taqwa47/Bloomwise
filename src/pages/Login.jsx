import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Leaf } from 'lucide-react';
import '../App.css'; // Reuse base styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      if (result.user.role === 'owner') {
        navigate('/dashboard');
      } else {
        navigate('/customer/home');
      }
    } else {
      setError(result.message);
    }
  };

  const handleDemoClick = (type) => {
    if (type === 'owner') {
      setEmail('owner@bloomwise.com');
      setPassword('Owner123');
    } else {
      setEmail('customer@bloomwise.com');
      setPassword('Customer123');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#faf9f5',
      padding: '24px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 32px rgba(15, 38, 30, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, background: '#eef3ef', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315e47' }}>
            <Leaf size={24} />
          </div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#11281b', textAlign: 'center', margin: '0 0 8px' }}>
          Welcome back
        </h1>
        <p style={{ color: '#5c6661', textAlign: 'center', marginBottom: 32, fontSize: 14 }}>
          Log in to your BloomWise account
        </p>

        {error && (
          <div style={{ background: '#fef2f2', color: '#c93434', padding: '12px 16px', borderRadius: 12, fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#11281b' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8e4',
                background: '#fafbfb', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 14
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#11281b' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8e4',
                background: '#fafbfb', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 14
              }}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" style={{
            background: '#315e47', color: '#fff', padding: '14px', borderRadius: 12,
            border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 8
          }}>
            Log In
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#5c6661' }}>
          Don't have an account? <Link to="/register" style={{ color: '#315e47', fontWeight: 600, textDecoration: 'none' }}>Register</Link>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f2f1eb' }}>
          <p style={{ fontSize: 12, color: '#88928d', textAlign: 'center', marginBottom: 12 }}>Demo Accounts</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => handleDemoClick('owner')}
              style={{ flex: 1, padding: 8, fontSize: 12, borderRadius: 8, border: '1px solid #e2e8e4', background: '#fff', cursor: 'pointer' }}
            >
              Owner Demo
            </button>
            <button 
              onClick={() => handleDemoClick('customer')}
              style={{ flex: 1, padding: 8, fontSize: 12, borderRadius: 8, border: '1px solid #e2e8e4', background: '#fff', cursor: 'pointer' }}
            >
              Customer Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
