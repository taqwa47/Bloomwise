import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Home, 
  ShoppingBag, 
  Gift, 
  CalendarHeart, 
  Users, 
  Package, 
  Heart, 
  Award, 
  Sparkles,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  ShoppingCart
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import '../styles/CustomerLayout.css';

const CustomerLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // We will add Notifications later, hardcoding 0 for now
  const unreadCount = 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/customer/home', icon: Home },
    { name: 'Shop Flowers', path: '/customer/shop', icon: ShoppingBag },
    { name: 'Build a Bouquet', path: '/customer/bouquet-builder', icon: Sparkles },
    { name: 'My Occasions', path: '/customer/occasions', icon: CalendarHeart },
    { name: 'My Recipients', path: '/customer/recipients', icon: Users },
    { name: 'My Orders', path: '/customer/orders', icon: Package },
    { name: 'Favorites', path: '/customer/favorites', icon: Heart },
    { name: 'Rewards', path: '/customer/rewards', icon: Award },
    { name: 'Events & Decor', path: '/customer/event-requests', icon: Gift },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="customer-layout">
      {/* Top Navigation */}
      <header className="customer-header">
        <div className="customer-header-inner">
          <div className="customer-brand">
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <NavLink to="/customer/home" className="brand-logo" onClick={closeMobileMenu}>
              <div className="logo-icon"><Leaf size={20} /></div>
              <span className="brand-text">BloomWise</span>
            </NavLink>
          </div>

          <nav className="customer-desktop-nav">
            {navItems.slice(0, 4).map((item) => (
              <NavLink key={item.path} to={item.path} className={({isActive}) => isActive ? "desktop-nav-item active" : "desktop-nav-item"}>
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="customer-header-actions">
            <NavLink to="/customer/notifications" className="action-icon-btn">
              <Bell size={20} />
              {unreadCount > 0 && <span className="action-badge">{unreadCount}</span>}
            </NavLink>
            <NavLink to="/customer/cart" className="action-icon-btn">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
            </NavLink>
            <div className="profile-dropdown-container">
              <NavLink to="/customer/profile" className="profile-avatar">
                {user?.fullName?.charAt(0) || 'C'}
              </NavLink>
            </div>
            <button onClick={handleLogout} className="action-icon-btn logout-btn" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}>
        <div className="mobile-nav-sidebar" onClick={e => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <div className="mobile-nav-profile">
              <div className="profile-avatar large">{user?.fullName?.charAt(0) || 'C'}</div>
              <div>
                <div className="profile-name">{user?.fullName}</div>
                <div className="profile-email">{user?.email}</div>
              </div>
            </div>
            <button className="close-menu-btn" onClick={closeMobileMenu}>
              <X size={24} />
            </button>
          </div>

          <div className="mobile-nav-content">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}
                  onClick={closeMobileMenu}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
            
            <div className="mobile-nav-divider"></div>
            
            <NavLink to="/customer/profile" className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"} onClick={closeMobileMenu}>
              <Settings size={18} />
              <span>Profile & Settings</span>
            </NavLink>
            <button className="mobile-nav-item" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="customer-main-content">
        <div className="customer-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
