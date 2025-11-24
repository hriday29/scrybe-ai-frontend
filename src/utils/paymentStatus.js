// Mock payment status utility
// Replace with real API call to backend/payment provider in production

export function isPaymentComplete(user) {
  // For demo, always return false (user needs to pay)
  // In production, check backend for user's payment status
  return false;
}
