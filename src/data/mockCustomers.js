const INITIAL_CUSTOMERS = [
  {
    id: 'cust_1',
    name: 'Sarah Johnson',
    type: 'VIP Customer',
    ordersCount: 12,
    totalSpent: 980,
    lastOrderDate: 'Today',
    birthday: 'Aug 15',
    phone: '+1 555-0101',
    email: 'sarah.j@example.com'
  },
  {
    id: 'cust_2',
    name: 'Lisa Davis',
    type: 'VIP Customer',
    ordersCount: 15,
    totalSpent: 1240,
    lastOrderDate: 'Jun 24',
    birthday: 'Nov 30',
    phone: '+1 555-0102',
    email: 'lisa.d@example.com'
  },
  {
    id: 'cust_3',
    name: 'Emma Wilson',
    type: 'VIP Customer',
    ordersCount: 8,
    totalSpent: 620,
    lastOrderDate: 'Yesterday',
    birthday: 'Mar 22',
    phone: '+1 555-0103',
    email: 'emma.w@example.com'
  },
  {
    id: 'cust_4',
    name: 'James Miller',
    type: 'VIP Customer',
    ordersCount: 6,
    totalSpent: 870,
    lastOrderDate: 'Jun 23',
    birthday: 'Jul 4',
    phone: '+1 555-0104',
    email: 'james.m@example.com'
  },
  {
    id: 'cust_5',
    name: 'Nina Russo',
    type: 'VIP Customer',
    ordersCount: 10,
    totalSpent: 750,
    lastOrderDate: 'Jun 22',
    birthday: 'Sep 12',
    phone: '+1 555-0105',
    email: 'nina.r@example.com'
  }
];

export const initCustomersData = () => {
  if (!localStorage.getItem('bloomwise_customers')) {
    localStorage.setItem('bloomwise_customers', JSON.stringify(INITIAL_CUSTOMERS));
  }
};

export const getCustomers = () => {
  return JSON.parse(localStorage.getItem('bloomwise_customers') || '[]');
};

export const saveCustomers = (customers) => {
  localStorage.setItem('bloomwise_customers', JSON.stringify(customers));
};

export const getCustomerOrders = (customerId) => {
  // Mocking some orders for the details modal
  const mockOrders = [
    { id: 'ORD-001', date: '2026-07-20', total: 120, status: 'Completed' },
    { id: 'ORD-002', date: '2026-06-15', total: 85, status: 'Completed' },
    { id: 'ORD-003', date: '2026-05-10', total: 200, status: 'Completed' },
  ];
  return mockOrders;
};
