// In development, empty string uses Vite dev server proxy (/api -> http://localhost:5000)
// In production on Vercel, set VITE_API_URL to your live Render backend (e.g. https://morsebridge-api.onrender.com)
export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
