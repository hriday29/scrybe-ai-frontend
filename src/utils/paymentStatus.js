// Payment status utility
// Checks if a user has completed payment

import { PAYMENT_GATING_ENABLED } from '../config/payment.js';

export function isPaymentComplete(user) {
  // If payment gating is disabled, always allow access
  if (!PAYMENT_GATING_ENABLED) {
    return true;
  }

  if (!user) return false;
  
  // Check custom claims from Firebase token for payment status
  // This gets set by backend after successful payment
  if (user.customClaims && user.customClaims.payment_complete === true) {
    return true;
  }
  
  // Check for payment_complete custom attribute on user object
  if (user.payment_complete === true) {
    return true;
  }
  
  // Check in localStorage as fallback (gets set after successful payment)
  try {
    const paymentData = localStorage.getItem(`payment_complete_${user.uid}`);
    if (paymentData === 'true') {
      return true;
    }
  } catch (e) {
    console.error('Error checking localStorage payment status:', e);
  }
  
  // Default: user needs to pay
  return false;
}
