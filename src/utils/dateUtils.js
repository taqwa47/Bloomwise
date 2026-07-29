// Date Utility Functions

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const generateCalendarGrid = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const grid = [];
  
  // Empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    grid.push(null);
  }
  
  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(new Date(year, month, i));
  }
  
  return grid;
};

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export const isToday = (date) => {
  return isSameDay(date, new Date());
};

export const calculateDaysRemaining = (targetDateStr, repeatsYearly = false) => {
  if (!targetDateStr) return -1;
  const targetDate = new Date(targetDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let nextOccurence = new Date(targetDate);
  
  if (repeatsYearly) {
    nextOccurence.setFullYear(today.getFullYear());
    // If the date has already passed this year, it's next year
    if (nextOccurence < today) {
      nextOccurence.setFullYear(today.getFullYear() + 1);
    }
  }
  
  nextOccurence.setHours(0, 0, 0, 0);
  
  const diffTime = nextOccurence.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const calculateReminderTriggerDate = (occasionDateStr, repeatsYearly, reminderOption) => {
  // reminderOption: 'On the same day', 'One day before', 'Three days before', 'One week before', 'Two weeks before', 'One month before'
  const nextOccurence = new Date(occasionDateStr);
  const today = new Date();
  
  if (repeatsYearly) {
    nextOccurence.setFullYear(today.getFullYear());
    if (nextOccurence < today) {
      nextOccurence.setFullYear(today.getFullYear() + 1);
    }
  }

  const triggerDate = new Date(nextOccurence);
  
  switch(reminderOption) {
    case 'One day before': triggerDate.setDate(triggerDate.getDate() - 1); break;
    case 'Three days before': triggerDate.setDate(triggerDate.getDate() - 3); break;
    case 'One week before': triggerDate.setDate(triggerDate.getDate() - 7); break;
    case 'Two weeks before': triggerDate.setDate(triggerDate.getDate() - 14); break;
    case 'One month before': triggerDate.setMonth(triggerDate.getMonth() - 1); break;
    case 'On the same day':
    default:
      break;
  }
  
  return triggerDate;
};
