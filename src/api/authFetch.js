// src/api/authFetch.js
const authFetch = async (url, currentUser, options = {}) => {
  if (!currentUser) {
    throw new Error("Authentication required. Please log in.");
  }
  try {
    const token = await currentUser.getIdToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
    const response = await fetch(url, {
      ...options,
      headers,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `An unexpected server error occurred (Status: ${response.status}).`
      }));
      throw new Error(errorData.error || 'Request failed.');
    }
    return response.json();
  } catch (error) {
    console.error("authFetch Error:", error.message);
    throw error;
  }
};
export default authFetch;