<<<<<<< HEAD
<<<<<<< HEAD
const API = process.env.REACT_APP_API_URL || 'http://localhost:5042/api';
=======
const API = 'https://quantitymeasurementapp-backend-1.onrender.com/api';
>>>>>>> e6b8b32 ([Devansh Singh]Add. Quantity Measurement App Frontend)
=======
const API = process.env.REACT_APP_API_URL || 'https://quantitymeasurementapp-backend-1.onrender.com/api';
>>>>>>> 05667c4 ([Devansh Singh]Add. Quantity Measurement App Frontend)

function getToken() {
  return localStorage.getItem('qm_token');
}

async function apiFetch(path, body = null, method = 'POST') {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(API + path, opts);
  let data;
  try { data = await res.json(); } catch { data = {}; }
  return { ok: res.ok, status: res.status, data };
}

export const authAPI = {
  login: (email, password) =>
    apiFetch('/auth/login', { email, password }),
  register: (username, email, password, phone) =>
    apiFetch('/auth/register', { username, email, password, phone }),
  googleLogin: (idToken) =>
    apiFetch('/auth/google', { idToken }),
  me: () =>
    apiFetch('/auth/me', null, 'GET'),
};

export const measureAPI = {
  compare:  (quantityOne, quantityTwo) =>
    apiFetch('/quantity/compare', { quantityOne, quantityTwo }),
  convert:  (quantityOne, targetUnit) =>
    apiFetch('/quantity/convert', { quantityOne, targetUnit }),
  add:      (quantityOne, quantityTwo) =>
    apiFetch('/quantity/add', { quantityOne, quantityTwo }),
  subtract: (quantityOne, quantityTwo) =>
    apiFetch('/quantity/subtract', { quantityOne, quantityTwo }),
  divide:   (quantityOne, quantityTwo) =>
    apiFetch('/quantity/divide', { quantityOne, quantityTwo }),
  history:  () =>
    apiFetch('/quantity/history', null, 'GET'),
  deleteHistory: () =>
    apiFetch('/quantity/history', null, 'DELETE'),
  historyByOperation: (operationType) =>
    apiFetch('/quantity/history/operation/' + operationType, null, 'GET'),
  historyByType: (measurementType) =>
    apiFetch('/quantity/history/type/' + measurementType, null, 'GET'),
  stats: () =>
    apiFetch('/quantity/stats', null, 'GET'),
};

export const UNITS = {
  Length:      ['Inch', 'Feet', 'Yard', 'Centimeter'],
  Weight:      ['Gram', 'Kilogram', 'Tonne'],
  Temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  Volume:      ['Milliliter', 'Liter', 'Gallon'],
};

export function roundDisplay(n) {
  if (n === undefined || n === null) return '—';
  const num = parseFloat(n);
  if (isNaN(num)) return String(n);
  return parseFloat(num.toPrecision(8)).toString();
}
