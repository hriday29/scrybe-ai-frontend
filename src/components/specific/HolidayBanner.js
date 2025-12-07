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
    <div className="rounded-xl p-6 mb-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 dark:border-amber-700/40">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-3 rounded-xl shadow-sm dark:from-amber-800/40 dark:to-orange-800/40">
            <CalendarX className="w-7 h-7 text-amber-600 dark:text-amber-300" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-amber-900 font-bold text-xl mb-2 flex items-center gap-2 dark:text-amber-100">
                <span>🏖️ Market is Closed Today</span>
              </h3>
              <p className="text-sm text-amber-800 mb-4 dark:text-amber-200/90">
                {holidayReason === 'Weekend' ? (
                  <>It's the weekend! Markets are closed for trading.</>
                ) : (
                  <>Today is a market holiday ({holidayReason}).</>
                )}
              </p>
              <div className="flex items-center gap-2 bg-white border border-amber-300 rounded-lg px-4 py-2.5 inline-flex shadow-sm dark:bg-amber-900/30 dark:border-amber-600/40">
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Next Trading Day:</span>
                <span className="text-sm font-bold text-amber-900 dark:text-amber-100">{nextTradingDay}</span>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-amber-600 hover:text-amber-800 transition-all duration-200 p-1.5 rounded-lg hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-800/30 dark:hover:text-amber-200"
              aria-label="Dismiss holiday banner"
              title="Dismiss (will show again tomorrow)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-amber-200/60 dark:border-amber-700/40">
            <div className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 text-base mt-0.5">ℹ️</span>
              <p className="text-xs text-amber-800 leading-relaxed dark:text-amber-200/90">
                <strong className="font-semibold">Note:</strong> Analysis shown is from the last trading day. Fresh predictions will be available on the next trading day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayBanner;
