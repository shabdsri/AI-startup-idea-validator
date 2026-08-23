// API configuration for different environments
// Render's `host` property gives a bare hostname; we ensure it has https://
const rawUrl = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = rawUrl && !rawUrl.startsWith('http') ? `https://${rawUrl}` : rawUrl;

export default API_BASE_URL;
