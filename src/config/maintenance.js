// Maintenance mode configuration
// Set to true to enable maintenance mode, false to disable
export const MAINTENANCE_MODE = true;

// Maintenance configuration
export const MAINTENANCE_CONFIG = {
  enabled: MAINTENANCE_MODE,
  title: "Under Maintenance",
  message: "We're upgrading Scrybe AI to serve you better",
  estimatedDuration: "24 hours", // Display text for estimated duration
  contactEmail: "support@scrybe-ai.com",
  features: [
    {
      title: "Enhanced Analytics",
      description: "Upgrading our AI algorithms for better market insights"
    },
    {
      title: "Performance Boost",
      description: "Optimizing speed and reliability across all features"
    },
    {
      title: "Security Updates",
      description: "Implementing advanced security measures for your data"
    }
  ]
};