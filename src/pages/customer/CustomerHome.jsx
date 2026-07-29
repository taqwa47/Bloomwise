import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { initialFlowers } from '../../data/mockFlowers';
import { 
  ShoppingBag, Sparkles, CalendarHeart, Truck, Gift, Heart, 
  Users, Bell, ArrowRight, Star, Clock, MapPin, Tag, ChevronRight,
  Plus
} from 'lucide-react';
import '../../styles/CustomerLayout.css';

const CustomerHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.fullName?.split(' ')[0] || 'Guest';

  const recommendedFlowers = initialFlowers.slice(0, 4);
  const orderAgainFlowers = initialFlowers.slice(4, 7);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, paddingBottom: 48 }}>
      
      {/* 1. HERO SECTION */}
      <div style={{
        background: '#fcfaf5',
        borderRadius: 32,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0,0,0,0.03)'
      }}>
        <div className="customer-hero-wrapper">
          {/* Left Side: Text */}
          <div className="customer-hero-content">
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 48, margin: '0 0 16px', fontWeight: 600, color: '#11281b', letterSpacing: '-0.02em' }}>
              Welcome back, {firstName} <span style={{ fontSize: 40 }}>🌷</span>
            </h1>
            <p style={{ fontSize: 18, color: '#4a5550', margin: '0 0 32px', lineHeight: 1.6, fontWeight: 400, maxWidth: 500 }}>
              Make every moment unforgettable with the perfect flowers.<br/>
              We’re here to help you celebrate what matters most.
            </p>
            
            <div className="customer-hero-actions" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/customer/shop" style={{
                background: '#11281b', color: '#fff', padding: '14px 28px', borderRadius: 16,
                textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 12px rgba(17,40,27,0.2)', transition: 'transform 0.2s'
              }}>
                <ShoppingBag size={18} /> Shop Flowers
              </Link>
              <Link to="/customer/bouquet-builder" style={{
                background: '#fff', color: '#11281b', padding: '14px 28px', borderRadius: 16,
                textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid #e2e8e4', transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <Sparkles size={18} /> Build a Bouquet
              </Link>
              <Link to="/customer/occasions" style={{
                background: '#fff', color: '#11281b', padding: '14px 28px', borderRadius: 16,
                textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid #e2e8e4', transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <CalendarHeart size={18} /> Add Occasion
              </Link>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="customer-hero-image-col">
            <img 
              src="/src/assets/hero.png" 
              alt="Premium Bouquet" 
              className="customer-hero-image"
            />
          </div>
        </div>

        {/* Bottom Information Strip */}
        <div className="customer-hero-stats">
          <div className="customer-hero-stats-inner">
            <Link to="/customer/occasions" style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px', borderRadius: 12, transition: 'background 0.2s' }}>
              <div style={{ width: 40, height: 40, background: '#fdf2f8', color: '#ec4899', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarHeart size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#88928d', marginBottom: 2 }}>Next Occasion</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#11281b' }}>Anniversary (7 Days)</div>
              </div>
              <ArrowRight size={16} color="#88928d" />
            </Link>
            
            <div style={{ width: 1, background: '#e2e8e4', margin: '8px 0' }} className="stats-divider"></div>
            
            <Link to="/customer/orders" style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px', borderRadius: 12, transition: 'background 0.2s' }}>
              <div style={{ width: 40, height: 40, background: '#eef3ef', color: '#315e47', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#88928d', marginBottom: 2 }}>Active Order</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#11281b' }}>#1042 - Preparing</div>
              </div>
              <ArrowRight size={16} color="#88928d" />
            </Link>
            
            <div style={{ width: 1, background: '#e2e8e4', margin: '8px 0' }} className="stats-divider"></div>
            
            <Link to="/customer/rewards" style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px', borderRadius: 12, transition: 'background 0.2s' }}>
              <div style={{ width: 40, height: 40, background: '#fffbeb', color: '#d97706', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={20} fill="#fcd34d" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#88928d', marginBottom: 2 }}>Bloom Points</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#11281b' }}>85 Points</div>
              </div>
              <ArrowRight size={16} color="#88928d" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. QUICK SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {[
          { icon: CalendarHeart, color: '#c93434', bg: '#fef2f2', title: 'Upcoming Occasion', desc: 'Your anniversary is in 7 days', btn: 'Choose a Gift', link: '/customer/occasions' },
          { icon: Truck, color: '#315e47', bg: '#eef3ef', title: 'Active Order', desc: 'Order #1042 is being prepared', btn: 'Track Order', link: '/customer/orders' },
          { icon: Gift, color: '#d97706', bg: '#fffbeb', title: 'Loyalty Rewards', desc: 'You have 85 Bloom Points', btn: 'View Rewards', link: '/customer/rewards' },
          { icon: Heart, color: '#ec4899', bg: '#fdf2f8', title: 'Favorites', desc: '8 saved bouquets', btn: 'View Favorites', link: '/customer/favorites' },
          { icon: Users, color: '#4f46e5', bg: '#eef2ff', title: 'Saved Recipients', desc: '5 people saved', btn: 'Send Flowers', link: '/customer/recipients' },
          { icon: Bell, color: '#0284c7', bg: '#f0f9ff', title: 'Notifications', desc: '3 new reminders', btn: 'Open Notifications', link: '/customer/notifications' }
        ].map((card, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 24, padding: 24, boxShadow: '0 4px 24px rgba(17,40,27,0.04)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, background: card.bg, color: card.color, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.icon size={24} />
              </div>
              <h3 style={{ margin: 0, fontSize: 18, color: '#11281b', fontFamily: 'var(--font-heading)' }}>{card.title}</h3>
            </div>
            <p style={{ margin: '0 0 24px', color: '#5c6661', fontSize: 15, flex: 1 }}>{card.desc}</p>
            <Link to={card.link} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fafbfb', border: '1px solid #e2e8e4', borderRadius: 12, textDecoration: 'none', color: '#11281b', fontWeight: 600, fontSize: 14, transition: 'all 0.2s' }}>
              {card.btn} <ChevronRight size={16} color="#88928d" />
            </Link>
          </div>
        ))}
      </div>

      {/* 3. RECOMMENDED BOUQUETS */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#11281b', margin: '0 0 8px' }}>Recommended for You</h2>
            <p style={{ margin: 0, color: '#5c6661' }}>Hand-picked arrangements based on your taste.</p>
          </div>
          <Link to="/customer/shop" style={{ color: '#315e47', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {recommendedFlowers.map(flower => (
            <div key={flower.id} onClick={() => navigate(`/customer/products/${flower.id}`)} style={{ background: '#fff', borderRadius: 24, padding: 16, boxShadow: '0 4px 24px rgba(17,40,27,0.04)', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative' }}>
              <button style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Heart size={18} color="#88928d" />
              </button>
              <div style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: '#315e47', zIndex: 2 }}>
                {flower.category}
              </div>
              <img src={flower.image} alt={flower.name} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 16, marginBottom: 16 }} />
              <h3 style={{ margin: '0 0 8px', fontSize: 18, color: '#11281b' }}>{flower.name}</h3>
              <p style={{ margin: '0 0 16px', color: '#88928d', fontSize: 13, lineHeight: 1.4, flex: 1 }}>{flower.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#315e47' }}>₪{flower.price}</div>
                <button onClick={(e) => { e.stopPropagation(); navigate(`/customer/products/${flower.id}`); }} style={{ background: '#315e47', color: '#fff', padding: '8px 16px', borderRadius: 10, border: 'none', fontWeight: 600, cursor: 'pointer' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. UPCOMING OCCASIONS */}
      <div style={{ background: '#fff', borderRadius: 32, padding: 40, boxShadow: '0 4px 24px rgba(17,40,27,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#11281b', margin: '0 0 8px' }}>My Upcoming Occasions</h2>
            <p style={{ margin: 0, color: '#5c6661' }}>Never miss a special day. We've got you covered.</p>
          </div>
          <Link to="/customer/occasions" style={{ background: '#f4f9f6', color: '#315e47', padding: '10px 20px', borderRadius: 12, fontWeight: 600, textDecoration: 'none' }}>Manage Occasions</Link>
        </div>

        <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 16 }}>
          {[
            { title: "Wedding Anniversary", name: "Sarah & John", date: "Aug 15", days: 7, urgent: true },
            { title: "Mom's Birthday", name: "Eleanor", date: "Aug 22", days: 14, urgent: false },
            { title: "Graduation", name: "Emma", date: "Sep 3", days: 26, urgent: false }
          ].map((occ, i) => (
            <div key={i} style={{ minWidth: 300, background: occ.urgent ? '#fef2f2' : '#fafbfb', border: occ.urgent ? '1px solid #fecaca' : '1px solid #e2e8e4', borderRadius: 24, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, background: occ.urgent ? '#fff' : '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: occ.urgent ? '#c93434' : '#315e47', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <CalendarHeart size={24} />
                </div>
                <div style={{ background: occ.urgent ? '#c93434' : '#eef3ef', color: occ.urgent ? '#fff' : '#315e47', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  In {occ.days} Days
                </div>
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: 18, color: '#11281b' }}>{occ.title}</h3>
              <p style={{ margin: '0 0 24px', color: '#5c6661', fontSize: 14 }}>{occ.name} • {occ.date}</p>
              <button style={{ width: '100%', background: occ.urgent ? '#c93434' : '#fff', color: occ.urgent ? '#fff' : '#11281b', border: occ.urgent ? 'none' : '1px solid #e2e8e4', padding: '12px', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>
                View Gift Suggestions
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ACTIVE ORDERS & 6. FAVORITE RECIPIENTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32 }}>
        
        {/* Active Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#11281b', margin: 0 }}>Your Orders</h2>
          <div style={{ background: '#fff', borderRadius: 24, padding: 24, boxShadow: '0 4px 24px rgba(17,40,27,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, background: '#eef3ef', color: '#315e47', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={24} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: '#5c6661', fontWeight: 600 }}>ORDER #1042</div>
                  <div style={{ fontSize: 18, color: '#11281b', fontWeight: 700 }}>Preparing for Delivery</div>
                </div>
              </div>
              <div style={{ background: '#fef3c7', color: '#92400e', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>In Progress</div>
            </div>
            
            <div style={{ background: '#fafbfb', borderRadius: 16, padding: 20, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#5c6661' }}><Clock size={14} style={{display:'inline', verticalAlign:'middle', marginRight:6}}/>Delivery Date:</span>
                <span style={{ fontWeight: 600, color: '#11281b' }}>Today, 2:00 PM - 5:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#5c6661' }}><MapPin size={14} style={{display:'inline', verticalAlign:'middle', marginRight:6}}/>Recipient:</span>
                <span style={{ fontWeight: 600, color: '#11281b' }}>Sarah Johnson</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ flex: 1, background: '#315e47', color: '#fff', padding: '12px', borderRadius: 12, border: 'none', fontWeight: 600, cursor: 'pointer' }}>Track Order</button>
              <button style={{ flex: 1, background: '#fff', color: '#11281b', padding: '12px', borderRadius: 12, border: '1px solid #e2e8e4', fontWeight: 600, cursor: 'pointer' }}>View Details</button>
            </div>
          </div>
        </div>

        {/* Favorite Recipients */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#11281b', margin: 0 }}>Favorite Recipients</h2>
            <Link to="/customer/recipients" style={{ color: '#315e47', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>View All</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { name: "Mom", relation: "Mother", initials: "M", color: "#ec4899", bg: "#fdf2f8" },
              { name: "Sarah", relation: "Wife", initials: "S", color: "#8b5cf6", bg: "#f5f3ff" },
              { name: "Emma", relation: "Daughter", initials: "E", color: "#14b8a6", bg: "#f0fdfa" }
            ].map((rec, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: '0 4px 16px rgba(17,40,27,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: rec.bg, color: rec.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
                    {rec.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#11281b', fontSize: 16 }}>{rec.name}</div>
                    <div style={{ color: '#88928d', fontSize: 13 }}>{rec.relation}</div>
                  </div>
                </div>
                <button style={{ background: '#fafbfb', border: '1px solid #e2e8e4', color: '#11281b', padding: '8px 16px', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Send Gift</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. SEASONAL OFFERS */}
      <div style={{ background: '#fff', borderRadius: 32, padding: 40, boxShadow: '0 4px 24px rgba(17,40,27,0.02)', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#11281b', margin: 0 }}>Seasonal Offers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          
          <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden' }}>
            <Tag size={120} color="#f59e0b" style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.2 }} />
            <div style={{ background: '#d97706', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, width: 'fit-content', marginBottom: 16 }}>LIMITED TIME</div>
            <h3 style={{ margin: '0 0 12px', fontSize: 24, color: '#92400e', fontFamily: 'var(--font-heading)' }}>Free Delivery</h3>
            <p style={{ margin: '0 0 24px', color: '#b45309', fontSize: 15 }}>On all orders above ₪200 this summer.</p>
            <button style={{ background: '#92400e', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Shop Now</button>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden' }}>
            <Heart size={120} color="#ec4899" style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.2 }} />
            <div style={{ background: '#db2777', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, width: 'fit-content', marginBottom: 16 }}>ANNIVERSARY</div>
            <h3 style={{ margin: '0 0 12px', fontSize: 24, color: '#9d174d', fontFamily: 'var(--font-heading)' }}>15% Off Romantic</h3>
            <p style={{ margin: '0 0 24px', color: '#be185d', fontSize: 15 }}>Celebrate love with our premium red roses.</p>
            <button style={{ background: '#9d174d', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Use Coupon</button>
          </div>

        </div>
      </div>

      {/* 8. ORDER AGAIN */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: '#11281b', margin: '0 0 24px' }}>Order Again</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {orderAgainFlowers.map(flower => (
            <div key={flower.id} style={{ background: '#fff', borderRadius: 24, padding: 20, boxShadow: '0 4px 24px rgba(17,40,27,0.04)', display: 'flex', gap: 20 }}>
              <img src={flower.image} alt={flower.name} style={{ width: 100, height: 100, borderRadius: 16, objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 16, color: '#11281b' }}>{flower.name}</h4>
                <div style={{ fontSize: 13, color: '#88928d', marginBottom: 12 }}>Last ordered: May 12</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, color: '#315e47', fontSize: 16 }}>₪{flower.price}</div>
                  <button onClick={() => navigate(`/customer/products/${flower.id}`)} style={{ background: '#eef3ef', color: '#315e47', border: 'none', padding: '6px 16px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>Reorder</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. QUICK ACTIONS & 10. LOYALTY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        
        {/* Quick Actions */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#11281b', margin: '0 0 24px' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: "Shop Flowers", icon: ShoppingBag, path: "/customer/shop" },
              { label: "Build Bouquet", icon: Sparkles, path: "/customer/bouquet-builder" },
              { label: "Add Occasion", icon: CalendarHeart, path: "/customer/occasions" },
              { label: "Add Recipient", icon: Users, path: "/customer/recipients" }
            ].map((action, i) => (
              <Link key={i} to={action.path} style={{ background: '#fff', padding: 20, borderRadius: 20, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, boxShadow: '0 4px 16px rgba(17,40,27,0.03)', border: '1px solid transparent', transition: 'border 0.2s' }}>
                <div style={{ width: 48, height: 48, background: '#fafbfb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315e47' }}>
                  <action.icon size={20} />
                </div>
                <span style={{ color: '#11281b', fontWeight: 600, fontSize: 14 }}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Loyalty Rewards */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: '#11281b', margin: '0 0 24px' }}>Bloom Rewards</h2>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 24px rgba(17,40,27,0.04)', display: 'flex', flexDirection: 'column', height: 'calc(100% - 56px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 13, color: '#5c6661', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Current Balance</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: 8 }}>
                  85 <Star size={28} fill="#d97706" />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#5c6661', marginBottom: 4 }}>Membership Level</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#11281b' }}>Bronze Member</div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#5c6661', marginBottom: 8 }}>
                <span>15 points to Silver Level</span>
                <span>100 pts</span>
              </div>
              <div style={{ width: '100%', height: 8, background: '#fef3c7', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: '#d97706', borderRadius: 4 }}></div>
              </div>
            </div>

            <div style={{ background: '#fafbfb', padding: 16, borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#11281b' }}>₪20 Discount Reward</div>
                <div style={{ fontSize: 13, color: '#88928d' }}>Unlocks at 100 points</div>
              </div>
              <Link to="/customer/rewards" style={{ background: '#fff', color: '#11281b', border: '1px solid #e2e8e4', padding: '8px 16px', borderRadius: 10, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                View All
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CustomerHome;
