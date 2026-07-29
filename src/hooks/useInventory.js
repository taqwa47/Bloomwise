import { useState, useEffect } from 'react';

const initialMockInventory = [
  { id: "inv_1", name: "Red Rose", category: "Rose", quantity: 25, minStock: 10, cost: 2.50, sellingPrice: 4.99, supplier: "Local Farms", color: "Red", storageLocation: "Cooler A", lastUpdated: "Today 9:14 AM", notes: "", image: "https://images.unsplash.com/photo-1548839140-29a749e1bc5e?w=150&h=150&fit=crop" },
  { id: "inv_2", name: "White Lily", category: "Lily", quantity: 3, minStock: 5, cost: 3.00, sellingPrice: 6.50, supplier: "Global Blooms", color: "White", storageLocation: "Cooler B", lastUpdated: "Yesterday", notes: "", image: "https://images.unsplash.com/photo-1596438459194-f2832812cd80?w=150&h=150&fit=crop" },
  { id: "inv_3", name: "Yellow Tulip", category: "Tulip", quantity: 40, minStock: 15, cost: 1.80, sellingPrice: 3.75, supplier: "Dutch Imports", color: "Yellow", storageLocation: "Display 1", lastUpdated: "Today 11:02 AM", notes: "", image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=150&h=150&fit=crop" },
  { id: "inv_4", name: "Sunflower", category: "Sunflower", quantity: 0, minStock: 10, cost: 2.20, sellingPrice: 5.25, supplier: "Sunny Farms", color: "Yellow", storageLocation: "Display 2", lastUpdated: "2 days ago", notes: "", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=150&h=150&fit=crop" },
  { id: "inv_5", name: "Orchid", category: "Orchid", quantity: 8, minStock: 5, cost: 12.00, sellingPrice: 25.00, supplier: "Exotic Plants", color: "Purple", storageLocation: "Greenhouse", lastUpdated: "Today 8:00 AM", notes: "", image: "https://images.unsplash.com/photo-1512238972088-8acb84db0771?w=150&h=150&fit=crop" },
  { id: "inv_6", name: "Baby's Breath", category: "Filler", quantity: 50, minStock: 20, cost: 0.50, sellingPrice: 1.50, supplier: "Local Farms", color: "White", storageLocation: "Cooler A", lastUpdated: "Yesterday", notes: "", image: "https://images.unsplash.com/photo-1614030132332-9c3f4a34b2db?w=150&h=150&fit=crop" }
];

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);

  const loadInventory = () => {
    const stored = localStorage.getItem('bloomwise_inventory');
    if (stored) {
      setInventory(JSON.parse(stored));
    } else {
      setInventory(initialMockInventory);
      localStorage.setItem('bloomwise_inventory', JSON.stringify(initialMockInventory));
    }
  };

  useEffect(() => {
    loadInventory();
    const handleStorageChange = () => loadInventory();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveInventory = (newInventory) => {
    setInventory(newInventory);
    localStorage.setItem('bloomwise_inventory', JSON.stringify(newInventory));
    window.dispatchEvent(new Event('storage'));
  };

  const updateQuantity = (id, delta) => {
    const newItems = inventory.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        const now = new Date();
        const timeStr = `Today ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
        return { ...item, quantity: newQuantity, lastUpdated: timeStr };
      }
      return item;
    });
    saveInventory(newItems);
  };

  return { inventory, saveInventory, updateQuantity };
};
