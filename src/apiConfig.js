// In development, we use relative URLs that will be proxied
// In production, we use the full URL (without /api since routes already include it)
const isDevelopment = process.env.NODE_ENV === 'development';
const API_BASE_URL = isDevelopment ? '/api' : 'https://www.scrybeai.app';

export { API_BASE_URL };