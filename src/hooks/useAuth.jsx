import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const MOCK_OWNER = {
  id: 'owner-1',
  email: 'owner@bloomwise.com',
  password: 'Owner123',
  role: 'owner',
  fullName: 'Shop Owner'
};

const MOCK_CUSTOMER = {
  id: 'cust-demo-1',
  email: 'customer@bloomwise.com',
  password: 'Customer123',
  role: 'customer',
  fullName: 'Sarah Johnson'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount
    const savedUser = localStorage.getItem('bloomwise_auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    let authenticatedUser = null;

    // Check mock accounts first
    if (email === MOCK_OWNER.email && password === MOCK_OWNER.password) {
      authenticatedUser = { ...MOCK_OWNER };
    } else if (email === MOCK_CUSTOMER.email && password === MOCK_CUSTOMER.password) {
      authenticatedUser = { ...MOCK_CUSTOMER };
    } else {
      // Check registered customers in localStorage
      const usersRaw = localStorage.getItem('bloomwise_customers');
      if (usersRaw) {
        const users = JSON.parse(usersRaw);
        const found = users.find(u => u.email === email && u.password === password);
        if (found) {
          authenticatedUser = { ...found, role: 'customer' };
        }
      }
    }

    if (authenticatedUser) {
      // Don't save password in session
      delete authenticatedUser.password;
      setUser(authenticatedUser);
      localStorage.setItem('bloomwise_auth_user', JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const registerCustomer = (userData) => {
    // Basic validation
    const usersRaw = localStorage.getItem('bloomwise_customers');
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    
    if (users.find(u => u.email === userData.email) || userData.email === MOCK_OWNER.email || userData.email === MOCK_CUSTOMER.email) {
      return { success: false, message: 'Email already exists' };
    }

    const newCustomer = {
      ...userData,
      id: `cust-${Date.now()}`,
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    users.push(newCustomer);
    localStorage.setItem('bloomwise_customers', JSON.stringify(users));

    const sessionUser = { ...newCustomer };
    delete sessionUser.password;
    
    setUser(sessionUser);
    localStorage.setItem('bloomwise_auth_user', JSON.stringify(sessionUser));

    return { success: true, user: sessionUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bloomwise_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, registerCustomer }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
