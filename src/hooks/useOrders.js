import { useState, useEffect } from 'react';

const initialMockOrders = [
  { id: "#1042", customerName: "Sarah Johnson", item: "Red Rose Bouquet", amount: 85, status: "Pending", date: "Today 10:30", timestamp: Date.now() - 1000 * 60 * 60 * 2 },
  { id: "#1041", customerName: "Emma Wilson", item: "Lily Arrangement", amount: 120, status: "Completed", date: "Yesterday", timestamp: Date.now() - 1000 * 60 * 60 * 24 },
  { id: "#1039", customerName: "Lisa Davis", item: "Sunflower Bundle", amount: 45, status: "Pending", date: "Yesterday", timestamp: Date.now() - 1000 * 60 * 60 * 25 },
  { id: "#1036", customerName: "Omar Khalil", item: "Orchid Gift Set", amount: 130, status: "Pending", date: "Jun 23", timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5 },
  { id: "#1033", customerName: "Emma Wilson", item: "Lily Arrangement", amount: 120, status: "Completed", date: "Jun 22", timestamp: Date.now() - 1000 * 60 * 60 * 24 * 6 },
  { id: "#1030", customerName: "James Smith", item: "Tulip Basket", amount: 65, status: "Completed", date: "Jun 20", timestamp: Date.now() - 1000 * 60 * 60 * 24 * 8 },
  { id: "#1028", customerName: "Sophia Brown", item: "Bridal Bouquet", amount: 250, status: "Completed", date: "Jun 18", timestamp: Date.now() - 1000 * 60 * 60 * 24 * 10 },
  { id: "#1027", customerName: "Michael Chen", item: "Potted Fern", amount: 35, status: "Cancelled", date: "Jun 17", timestamp: Date.now() - 1000 * 60 * 60 * 24 * 11 },
  { id: "#1022", customerName: "Olivia Davis", item: "Custom Anniversary", amount: 180, status: "Cancelled", date: "Jun 14", timestamp: Date.now() - 1000 * 60 * 60 * 24 * 14 }
];

export const useOrders = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    const stored = localStorage.getItem('bloomwise_orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      setOrders(initialMockOrders);
      localStorage.setItem('bloomwise_orders', JSON.stringify(initialMockOrders));
    }
  };

  useEffect(() => {
    loadOrders();
    const handleStorageChange = () => loadOrders();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('bloomwise_orders', JSON.stringify(newOrders));
    window.dispatchEvent(new Event('storage')); // Trigger update across the same tab
  };

  const updateOrderStatus = (id, newStatus) => {
    const newOrders = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    saveOrders(newOrders);
  };

  return { orders, saveOrders, updateOrderStatus };
};
