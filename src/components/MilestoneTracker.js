import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Trophy, Target, Clock, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * MilestoneTracker Component
 * 
 * Displays price-movement milestone tracking for executed trades:
 * - Shows 25%, 50%, 75% progress buckets
 * - Displays historical achievement logs (permanent, never reset)
 * - Calculates current progress toward target
 * - Shows next milestone and price needed
 * 
 * Props:
 * - trade: Trade object with {ticker, entry_price, target, stop_loss, signal, _id}
 * - currentPrice: Current market price
 */
const MilestoneTracker = ({ trade, currentPrice }) => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState({
    percentage: 0,
    reached_buckets: [],
    next_bucket: null,
    bucket_prices: {}
  });

  // Calculate milestone progress
  useEffect(() => {
    if (!trade || !currentPrice) return;

    const calculateProgress = () => {
      const { entry_price, target, signal } = trade;
      
      // Validate required fields
      if (!entry_price || !target || !signal) {
        console.error('Missing required trade fields:', { entry_price, target, signal });
        return;
      }
      
      // Calculate percentage achieved
      let moveAchieved, totalMove, percentage;
      
      if (signal === 'BUY') {
        moveAchieved = currentPrice - entry_price;
        totalMove = target - entry_price;
      } else { // SHORT
        moveAchieved = entry_price - currentPrice;
        totalMove = entry_price - target;
      }
      
      percentage = totalMove !== 0 ? (moveAchieved / totalMove) * 100 : 0;
      
      // Determine reached buckets
      const reached = [];
      if (percentage >= 25) reached.push(25);
      if (percentage >= 50) reached.push(50);
      if (percentage >= 75) reached.push(75);
      
      // Calculate bucket prices
      const totalMoveAbs = Math.abs(target - entry_price);
      const bucketPrices = {};
      
      if (signal === 'BUY') {
        bucketPrices[25] = entry_price + (totalMoveAbs * 0.25);
        bucketPrices[50] = entry_price + (totalMoveAbs * 0.50);
        bucketPrices[75] = entry_price + (totalMoveAbs * 0.75);
      } else { // SHORT
        bucketPrices[25] = entry_price - (totalMoveAbs * 0.25);
        bucketPrices[50] = entry_price - (totalMoveAbs * 0.50);
        bucketPrices[75] = entry_price - (totalMoveAbs * 0.75);
      }
      
      // Find next unreached bucket
      const nextBucket = [25, 50, 75].find(b => !reached.includes(b)) || null;
      
      setProgress({
        percentage: Math.max(0, Math.min(100, percentage)),
        reached_buckets: reached,
        next_bucket: nextBucket,
        bucket_prices: bucketPrices
      });
    };

    calculateProgress();
  }, [trade, currentPrice]);

  // Fetch milestone logs from backend
  useEffect(() => {
    if (!trade) return;

    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/milestone-logs?ticker=${trade.ticker}&trade_id=${trade._id}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setMilestones(data.milestones || []);
      } catch (error) {
        console.error('Failed to fetch milestone logs:', error);
        setMilestones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [trade]);

  if (!trade) return null;

  const { signal } = trade;
  const isPositive = progress.percentage > 0;
  const progressColor = isPositive 
    ? signal === 'BUY' ? 'text-green-400' : 'text-blue-400'
    : 'text-red-400';
  
  const progressBgColor = isPositive
    ? signal === 'BUY' ? 'bg-green-500' : 'bg-blue-500'
    : 'bg-red-500';

  return (
    <div className="mt-4">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-t-xl p-4 border border-purple-200 dark:border-purple-800 border-b-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Milestone Tracker</h3>
              <p className="text-xs text-purple-600 dark:text-purple-400">Track your progress to target</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 flex items-center justify-center hover:scale-110 transition-transform"
          >
            {expanded ? <ChevronUp className="w-4 h-4 text-purple-600 dark:text-purple-400" /> : <ChevronDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
          </button>
        </div>
      </div>

      {/* Main Content with glass effect */}
      <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-b-xl p-4 border border-purple-200 dark:border-purple-800 border-t-0">
        {/* Current Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Progress to Target</span>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${progressColor}`}>
                {progress.percentage.toFixed(1)}%
              </span>
              {isPositive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                >
                  <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Enhanced Progress Bar with gradient */}
          <div className="relative h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className={`absolute h-full ${progressBgColor} rounded-full shadow-lg`}
              style={{
                background: isPositive 
                  ? signal === 'BUY' 
                    ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                    : 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)'
                  : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, progress.percentage)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            
            {/* Bucket Markers with enhanced styling */}
            {[25, 50, 75].map(bucket => {
              const isReached = progress.reached_buckets.includes(bucket);
              return (
                <div
                  key={bucket}
                  className="absolute top-0 h-full w-0.5 bg-white/40"
                  style={{ left: `${bucket}%` }}
                  title={`${bucket}% milestone`}
                >
                  {isReached && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="absolute -top-2 -left-2.5 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Trophy className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bucket Labels with better styling */}
          <div className="flex justify-between mt-2 px-1">
            {[25, 50, 75].map(bucket => {
              const isReached = progress.reached_buckets.includes(bucket);
              return (
                <div key={bucket} className="flex flex-col items-center">
                  <span
                    className={`text-xs font-bold ${
                      isReached 
                        ? 'text-yellow-600 dark:text-yellow-400' 
                        : 'text-gray-400 dark:text-gray-600'
                    }`}
                  >
                    {bucket}%
                  </span>
                  {isReached && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-1 h-1 bg-yellow-500 rounded-full mt-0.5"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Milestone Info with gradient card */}
        {progress.next_bucket && progress.bucket_prices[progress.next_bucket] && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800 shadow-sm mb-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                  Next: {progress.next_bucket}% Milestone
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-indigo-600 dark:text-indigo-400">Target Price:</span>
                  <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
                    ₹{progress.bucket_prices[progress.next_bucket].toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Historical Achievements (Expandable) */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-purple-200/50 dark:border-purple-800/50 pt-4 mt-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Clock className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Achievement History
                  </h4>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2 text-xs text-purple-600 dark:text-purple-400">Loading milestones...</span>
                  </div>
                ) : milestones.length === 0 ? (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Target className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">No milestones reached yet</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Keep tracking your progress!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {milestones.map((milestone, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
                              <Trophy className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <span className="text-sm font-bold text-yellow-900 dark:text-yellow-300">
                                {milestone.bucket_level}% Milestone
                              </span>
                              <p className="text-xs text-yellow-600 dark:text-yellow-500">
                                {milestone.percentage_achieved?.toFixed(1)}% achieved
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs bg-white/50 dark:bg-gray-900/30 rounded px-2 py-1.5">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600 dark:text-gray-400">Price:</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">
                              ₹{milestone.price_at_achievement?.toFixed(2)}
                            </span>
                          </div>
                          <span className="text-gray-500 dark:text-gray-500">
                            {new Date(milestone.achieved_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MilestoneTracker;
