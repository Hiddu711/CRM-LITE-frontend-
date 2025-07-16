const API_BASE_URL = "https://crm-lite-backend-2.onrender.com";

export async function apiFetch(endpoint, { method = 'GET', body, headers = {}, ...rest } = {}) {
  const token = localStorage.getItem('token');
  const fetchHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (token) {
    fetchHeaders['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE_URL}/api${endpoint}`, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.msg || 'API request failed');
    error.response = { data };
    throw error;
  }
  return data;
} 