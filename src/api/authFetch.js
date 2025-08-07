// src/api/authFetch.js

/**
 * A reusable function to make authenticated API calls.
 * It automatically gets the Firebase ID token and adds it to the request header.
 * @param {string} url - The API endpoint to call.
 * @param {object} currentUser - The user object from the useAuth() hook.
 * @param {object} options - Optional fetch options (like method, body, etc.).
 * @returns {Promise<any>} - The JSON response from the API.
 */
const authFetch = async (url, currentUser, options = {}) => {
  // 1. Check if the user is actually logged in. If not, stop here.
  if (!currentUser) {
    throw new Error("User is not authenticated. Cannot make an authenticated API call.");
  }

  // 2. Ask Firebase for the user's most current ID Token.
  // This is a special, temporary token that proves the user's identity.
  const token = await currentUser.getIdToken();

  // 3. Create the request headers. We spread any existing options.headers
  //    and then add our Authorization header.
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`, // This is the "ID card" your backend will check.
    'Content-Type': 'application/json' // We'll assume most requests send JSON data.
  };

  // 4. Perform the actual fetch request with the new, secure headers.
  const response = await fetch(url, { ...options, headers });

  // 5. Check if the backend responded with an error (like 401 Unauthorized).
  if (!response.ok) {
    // If there's an error, try to read the error message from the backend's response.
    const errorData = await response.json();
    throw new Error(errorData.error || 'The API request failed.');
  }

  // 6. If everything was successful, return the JSON data from the response.
  return response.json();
};

export default authFetch;