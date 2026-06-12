/**
 * Client HTTP pour communiquer avec l'API backend (FastAPI / Django)
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Récupère le token JWT stocké localement
 * @returns {string|null}
 */
const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Effectue une requête HTTP asynchrone sécurisée
 * @param {string} endpoint 
 * @param {object} options 
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    if (response.status === 401) {
      // Déconnexion automatique ou redirection si non autorisé
      localStorage.removeItem('token');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }

  // Renvoie null si pas de contenu (204 No Content)
  if (response.status === 204) return null;

  return response.json();
}

export const apiClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};
