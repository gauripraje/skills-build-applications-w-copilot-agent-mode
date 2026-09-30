// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName !== 'undefined' && codespaceName !== '') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

export const apiClient = {
  async get(endpoint) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  async post(endpoint, data) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },
};

export { API_BASE_URL };
