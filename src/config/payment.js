// Payment gating configuration
// Set to true to enable payment gating, false to disable
export const PAYMENT_GATING_ENABLED = false;

// Payment configuration
export const PAYMENT_CONFIG = {
  enabled: PAYMENT_GATING_ENABLED,
  message: "Payment required to access the full application",
  features: [
    {
      title: "Full Access",
      description: "Access all features and analysis tools"
    },
    {
      title: "Priority Support",
      description: "Get priority customer support"
    },
    {
      title: "Advanced Analytics",
      description: "Unlock advanced market analysis features"
    }
  ]
};