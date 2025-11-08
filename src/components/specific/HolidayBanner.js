/**
 * HolidayBanner Component
 * 
 * Displays a prominent banner when the market is closed (weekends or NSE holidays).
 * Shows the holiday reason and next trading day to set correct user expectations.
 * 
 * Props:
 * - isHoliday (bool): Whether today is a market holiday
 * - holidayReason (string): Reason for closure (e.g., "Weekend", "NSE Holiday")
 * - nextTradingDay (string): Human-readable next trading day (e.g., "Monday, November 18, 2024")
 * 
 * Design:
 * - Eye-catching orange/amber theme for visibility
 * - Calendar icon for immediate recognition
 * - Clear messaging about market status
 * - Dismissible with local storage to avoid annoying users
 * 
 * Usage:
 * <HolidayBanner 
 *   isHoliday={true} 
 *   holidayReason="Weekend" 
 *   nextTradingDay="Monday, November 18, 2024" 
 * />
 */
import React, { useState, useEffect } from 'react';
import { CalendarX, X } from 'lucide-react';

const HolidayBanner = ({ isHoliday, holidayReason, nextTradingDay }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if banner was dismissed today (uses localStorage)
  useEffect(() => {
    const dismissedDate = localStorage.getItem('holidayBannerDismissed');
    const today = new Date().toDateString();
    
    if (dismissedDate === today) {
      setIsDismissed(true);
    } else {
      // Clear old dismissal if it's a new day
      localStorage.removeItem('holidayBannerDismissed');
      setIsDismissed(false);
    }
  }, [isHoliday]);

  const handleDismiss = () => {
    const today = new Date().toDateString();
    localStorage.setItem('holidayBannerDismissed', today);
    setIsDismissed(true);
  };

  // Don't show banner if market is open or user dismissed it
  if (!isHoliday || isDismissed) {
    return null;
  }

  return (
    <div className="rounded-2xl p-5 mb-6 bg-orange-50 border border-orange-200 shadow-soft-lg dark:bg-orange-900/30 dark:border-orange-600/40">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          <div className="bg-orange-100 p-3 rounded-xl shadow-inner dark:bg-orange-800/40">
            <CalendarX className="w-6 h-6 text-orange-600 dark:text-orange-300" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-orange-700 font-bold text-lg mb-1 flex items-center gap-1 dark:text-orange-200">
                <span>🏖️ Market is Closed Today</span>
              </h3>
              <p className="text-sm text-orange-800/90 mb-3 dark:text-orange-200/90">
                {holidayReason === 'Weekend' ? (
                  <>It's the weekend! Markets are closed for trading.</>
                ) : (
                  <>Today is a market holiday ({holidayReason}).</>
                )}
              </p>
              <div className="flex items-center gap-2 bg-white border border-orange-200 rounded-lg px-3 py-2 inline-flex shadow-sm dark:bg-orange-900/40 dark:border-orange-600/40">
                <span className="text-xs font-medium text-orange-600/90 dark:text-orange-300">Next Trading Day:</span>
                <span className="text-xs font-semibold text-orange-800 dark:text-orange-100">{nextTradingDay}</span>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-orange-400 hover:text-orange-600 transition-colors p-1 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800/30"
              aria-label="Dismiss holiday banner"
              title="Dismiss (will show again tomorrow)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-orange-100 dark:border-orange-700/40">
            <p className="text-xs text-orange-700/80 dark:text-orange-200/80">
              ℹ️ <strong>Note:</strong> Analysis shown is from the last trading day. Fresh predictions will be available on the next trading day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayBanner;
