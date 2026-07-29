import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Leaf } from 'lucide-react';
import '../App.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');
  const { registerCustomer } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.acceptTerms) {
      setError('You must accept the Terms & Conditions.');
      return;
    }

    const result = registerCustomer({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    if (result.success) {
      alert('Your account was created successfully.');
      navigate('/customer/home');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#faf9f5',
      padding: '40px 24px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 8px 32px rgba(15, 38, 30, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, background: '#eef3ef', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315e47' }}>
            <Leaf size={24} />
          </div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#11281b', textAlign: 'center', margin: '0 0 8px' }}>
          Create an Account
        </h1>
        <p style={{ color: '#5c6661', textAlign: 'center', marginBottom: 32, fontSize: 14 }}>
          Join BloomWise for exclusive customer benefits
        </p>

        {error && (
          <div style={{ background: '#fef2f2', color: '#c93434', padding: '12px 16px', borderRadius: 12, fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#11281b' }}>Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={{
                padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8e4',
                background: '#fafbfb', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 14
              }}
              placeholder="Sarah Johnson"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#11281b' }}>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8e4',
                  background: '#fafbfb', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 14
                }}
                placeholder="sarah@example.com"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#11281b' }}>Phone Number</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8e4',
                  background: '#fafbfb', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 14
                }}
                placeholder="+1 555-0000"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#11281b' }}>Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8e4',
                  background: '#fafbfb', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 14
                }}
                placeholder="Min. 8 characters"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#11281b' }}>Confirm</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8e4',
                  background: '#fafbfb', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 14
                }}
                placeholder="Repeat password"
              />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#5c6661', cursor: 'pointer', marginTop: 8 }}>
            <input 
              type="checkbox" 
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              style={{ width: 16, height: 16, accentColor: '#315e47', cursor: 'pointer' }}
            />
            I accept the Terms & Conditions and Privacy Policy
          </label>

          <button type="submit" style={{
            background: '#315e47', color: '#fff', padding: '14px', borderRadius: 12,
            border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 12
          }}>
            Create Account
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#5c6661' }}>
          Already have an account? <Link to="/login" style={{ color: '#315e47', fontWeight: 600, textDecoration: 'none' }}>Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
