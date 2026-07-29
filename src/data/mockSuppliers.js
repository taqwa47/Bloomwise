const INITIAL_SUPPLIERS = [
  {
    id: 'sup_1',
    name: 'Rose Valley Farm',
    category: 'Roses',
    phone: '+972-50-555-0101',
    email: 'orders@rosevalley.com',
    address: '123 Farm Road, Galilee',
    productsSupplied: 'Red Roses, White Roses',
    minOrderAmount: 500,
    avgDeliveryTime: '2 days',
    paymentTerms: 'Net 30',
    status: 'Active',
    rating: 4,
    notes: 'Reliable for fresh roses.',
    lastOrderDate: '2026-06-20'
  },
  {
    id: 'sup_2',
    name: 'Lily Gardens Co.',
    category: 'Lilies',
    phone: '+972-50-555-0102',
    email: 'info@lilygardens.com',
    address: '45 Valley Way, Central',
    productsSupplied: 'White Lily, Pink Lily',
    minOrderAmount: 300,
    avgDeliveryTime: '3 days',
    paymentTerms: 'Net 14',
    status: 'Active',
    rating: 4,
    notes: 'Premium quality lilies.',
    lastOrderDate: '2026-06-18'
  },
  {
    id: 'sup_3',
    name: 'Tropical Blooms Ltd',
    category: 'Exotic Flowers',
    phone: '+972-50-555-0103',
    email: 'sales@tropicalblooms.com',
    address: '88 Coast Blvd, Tel Aviv',
    productsSupplied: 'Orchids, Bird of Paradise',
    minOrderAmount: 1000,
    avgDeliveryTime: '5 days',
    paymentTerms: 'Payment on delivery',
    status: 'Active',
    rating: 4,
    notes: 'Imported exotics.',
    lastOrderDate: '2026-06-15'
  },
  {
    id: 'sup_4',
    name: 'Green Fields Farm',
    category: 'Mixed Flowers',
    phone: '+972-50-555-0104',
    email: 'contact@greenfields.com',
    address: '12 North Road, Haifa',
    productsSupplied: 'Sunflowers, Daisies, Mixed',
    minOrderAmount: 200,
    avgDeliveryTime: '1 day',
    paymentTerms: 'Net 7',
    status: 'Active',
    rating: 4,
    notes: 'Quick local delivery.',
    lastOrderDate: '2026-06-10'
  }
];

export const initSuppliersData = () => {
  if (!localStorage.getItem('bloomwise_suppliers')) {
    localStorage.setItem('bloomwise_suppliers', JSON.stringify(INITIAL_SUPPLIERS));
  }
  if (!localStorage.getItem('bloomwise_purchase_orders')) {
    localStorage.setItem('bloomwise_purchase_orders', JSON.stringify([]));
  }
}

export const getSuppliers = () => {
  return JSON.parse(localStorage.getItem('bloomwise_suppliers') || '[]');
}

export const saveSuppliers = (suppliers) => {
  localStorage.setItem('bloomwise_suppliers', JSON.stringify(suppliers));
}

export const getSupplierById = (id) => {
  const suppliers = getSuppliers();
  return suppliers.find(s => s.id === id);
}

export const getPurchaseOrders = () => {
  return JSON.parse(localStorage.getItem('bloomwise_purchase_orders') || '[]');
}

export const savePurchaseOrders = (orders) => {
  localStorage.setItem('bloomwise_purchase_orders', JSON.stringify(orders));
}

export const getOrdersForSupplier = (supplierId) => {
  return getPurchaseOrders().filter(o => o.supplierId === supplierId);
}
