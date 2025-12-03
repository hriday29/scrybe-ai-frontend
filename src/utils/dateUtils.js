/**
 * Date Utilities
 * Helper functions for date formatting and manipulation
 */

/**
 * Format a date string or Date object to a readable format
 * Supports ISO strings, timestamps, and Date objects
 * 
 * @param {string|Date|number} date - The date to format (ISO string, timestamp, or Date object)
 * @param {string} format - Format type: 'short' (default), 'long', 'full', 'time'
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return 'N/A';

  try {
    // Handle different input types
    let dateObj;
    
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (typeof date === 'number') {
      dateObj = new Date(date);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      return 'N/A';
    }

    // Validate date
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }

    // Format based on type
    switch (format) {
      case 'long':
        return dateObj.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'full':
        return dateObj.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'time':
        return dateObj.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      case 'short':
      default:
        return dateObj.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

/**
 * Format a date with time information
 * @param {string|Date|number} date - The date to format
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date) => {
  if (!date) return 'N/A';

  try {
    let dateObj;
    
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (typeof date === 'number') {
      dateObj = new Date(date);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      return 'N/A';
    }

    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }

    const datePart = dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const timePart = dateObj.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${datePart} ${timePart}`;
  } catch (error) {
    console.error('Error formatting date time:', error);
    return 'N/A';
  }
};

/**
 * Get relative time (e.g., "2 days ago", "1 hour ago")
 * @param {string|Date|number} date - The date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return 'N/A';

  try {
    let dateObj;
    
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else if (typeof date === 'number') {
      dateObj = new Date(date);
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      return 'N/A';
    }

    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }

    const now = new Date();
    const seconds = Math.floor((now - dateObj) / 1000);

    if (seconds < 60) return 'just now';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    
    return formatDate(dateObj, 'short');
  } catch (error) {
    console.error('Error calculating relative time:', error);
    return 'N/A';
  }
};

/**
 * Get days between two dates
 * @param {string|Date|number} startDate - Start date
 * @param {string|Date|number} endDate - End date (defaults to today)
 * @returns {number} Number of days between dates
 */
export const getDaysBetween = (startDate, endDate = null) => {
  try {
    let start, end;

    if (typeof startDate === 'string') {
      start = new Date(startDate);
    } else if (typeof startDate === 'number') {
      start = new Date(startDate);
    } else if (startDate instanceof Date) {
      start = startDate;
    } else {
      return 0;
    }

    if (!endDate) {
      end = new Date();
    } else if (typeof endDate === 'string') {
      end = new Date(endDate);
    } else if (typeof endDate === 'number') {
      end = new Date(endDate);
    } else if (endDate instanceof Date) {
      end = endDate;
    } else {
      return 0;
    }

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 0;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  } catch (error) {
    console.error('Error calculating days between:', error);
    return 0;
  }
};
