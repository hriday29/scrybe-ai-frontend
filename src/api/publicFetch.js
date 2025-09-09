// src/api/publicFetch.js

/**
 * A simple wrapper for public API calls that don't require authentication.
 * It standardizes error handling for public endpoints.
 *
 * @param {string} url The API endpoint to call.
 * @param {object} options Optional fetch options.
 * @returns {Promise<any>} A promise that resolves with the JSON response data.
 * @throws {Error} Throws an error if the request fails.
 */
const publicFetch = async (url, options = {}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `A server error occurred (Status: ${response.status}).`
      }));
      throw new Error(errorData.error || 'Public request failed.');
    }

    return response.json();
  } catch (error) {
    console.error("publicFetch Error:", error.message);
    throw error;
  }
};

export default publicFetch;