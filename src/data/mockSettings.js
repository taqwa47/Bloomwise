const INITIAL_SETTINGS = {
  shopName: 'Maison des Fleurs',
  address: '14 Rue de la Paix, Paris',
  phone: '+33 1 4200 0000',
  email: 'contact@maisondesfleurs.com',
  logo: null // base64 string when uploaded
};

export const initSettingsData = () => {
  if (!localStorage.getItem('bloomwise_settings')) {
    localStorage.setItem('bloomwise_settings', JSON.stringify(INITIAL_SETTINGS));
  }
};

export const getSettings = () => {
  return JSON.parse(localStorage.getItem('bloomwise_settings') || JSON.stringify(INITIAL_SETTINGS));
};

export const saveSettings = (settings) => {
  localStorage.setItem('bloomwise_settings', JSON.stringify(settings));
  window.dispatchEvent(new Event('storage')); // Trigger cross-component updates
};
