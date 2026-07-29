const INITIAL_EVENTS = [
  {
    id: 'evt_1',
    clientName: 'Sarah & John',
    type: 'Wedding',
    date: '2025-07-15',
    time: '16:00',
    location: 'Haifa',
    status: 'Preparing',
    budget: 800,
    budget: 800,
    theme: 'White Roses',
    inventoryReserved: true,
    flowers: [
      { id: 'f1', name: 'White Rose', required: 150 },
      { id: 'f2', name: 'Baby\'s Breath', required: 80 }
    ]
  },
  {
    id: 'evt_2',
    clientName: 'Emma Wilson',
    type: 'Birthday',
    date: '2025-07-22',
    time: '14:00',
    location: 'Tel Aviv',
    status: 'Confirmed',
    budget: 200,
    budget: 200,
    theme: 'Pink Peony',
    inventoryReserved: true,
    flowers: [
      { id: 'f3', name: 'Pink Peony', required: 30 }
    ]
  },
  {
    id: 'evt_3',
    clientName: 'Mark Davis',
    type: 'Graduation',
    date: '2025-08-10',
    time: '18:00',
    location: 'Jerusalem',
    status: 'Pending',
    budget: 150,
    budget: 150,
    theme: 'Mixed Colors',
    inventoryReserved: false,
    flowers: []
  }
];

export const initEventsData = () => {
  if (!localStorage.getItem('bloomwise_events')) {
    localStorage.setItem('bloomwise_events', JSON.stringify(INITIAL_EVENTS));
  }
};

export const getEvents = () => {
  return JSON.parse(localStorage.getItem('bloomwise_events') || '[]');
};

export const saveEvents = (events) => {
  localStorage.setItem('bloomwise_events', JSON.stringify(events));
};

export const checkInventoryForEvent = (eventFlowers) => {
  const inventory = JSON.parse(localStorage.getItem('bloomwise_inventory') || '[]');
  const warnings = [];

  eventFlowers.forEach(ef => {
    const invItem = inventory.find(i => i.name.toLowerCase() === ef.name.toLowerCase());
    const available = invItem ? invItem.quantity : 0;
    if (ef.required > available) {
      warnings.push({
        name: ef.name,
        required: ef.required,
        available: available
      });
    }
  });

  return warnings;
};

// Deduct from inventory
export const deductInventoryForEvent = (eventFlowers) => {
  const inventory = JSON.parse(localStorage.getItem('bloomwise_inventory') || '[]');
  let updated = false;

  const newInventory = inventory.map(item => {
    const ef = eventFlowers.find(f => f.name.toLowerCase() === item.name.toLowerCase());
    if (ef) {
      updated = true;
      return { ...item, quantity: Math.max(0, item.quantity - ef.required) };
    }
    return item;
  });

  if (updated) {
    localStorage.setItem('bloomwise_inventory', JSON.stringify(newInventory));
  }
};

// Restore to inventory
export const restoreInventoryForEvent = (eventFlowers) => {
  const inventory = JSON.parse(localStorage.getItem('bloomwise_inventory') || '[]');
  let updated = false;

  const newInventory = inventory.map(item => {
    const ef = eventFlowers.find(f => f.name.toLowerCase() === item.name.toLowerCase());
    if (ef) {
      updated = true;
      return { ...item, quantity: item.quantity + ef.required };
    }
    return item;
  });

  if (updated) {
    localStorage.setItem('bloomwise_inventory', JSON.stringify(newInventory));
  }
};
