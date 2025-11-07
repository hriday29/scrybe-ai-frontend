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
    <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-2 border-orange-500/50 rounded-xl p-4 mb-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          <div className="bg-orange-500/30 p-3 rounded-lg">
            <CalendarX className="w-6 h-6 text-orange-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-orange-400 font-bold text-lg mb-1">
                🏖️ Market is Closed Today
              </h3>
              <p className="text-gray-200 text-base mb-2">
                {holidayReason === 'Weekend' ? (
                  <>It's the weekend! Markets are closed for trading.</>
                ) : (
                  <>Today is a market holiday ({holidayReason}).</>
                )}
              </p>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 inline-flex">
                <span className="text-sm text-gray-400">Next Trading Day:</span>
                <span className="text-sm font-semibold text-white">{nextTradingDay}</span>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-gray-400 hover:text-orange-400 transition-colors p-1 rounded-lg hover:bg-orange-500/10"
              aria-label="Dismiss holiday banner"
              title="Dismiss (will show again tomorrow)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-3 pt-3 border-t border-orange-500/20">
            <p className="text-xs text-gray-400">
              ℹ️ <strong>Note:</strong> Analysis shown is from the last trading day. 
              Fresh predictions will be available on the next trading day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayBanner;
