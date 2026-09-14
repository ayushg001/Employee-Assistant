// Base API URL configuration
// In local development: empty string '' uses Vite's proxy configured in vite.config.js
// In production on Render: uses VITE_API_URL from environment variables (e.g., https://your-backend.onrender.com)
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper to safely parse JSON from a fetch response without crashing
export async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return { message: 'Invalid response from server' };
    }
  }
  const text = await response.text();
  return { message: text || `Request failed with status ${response.status}` };
}
