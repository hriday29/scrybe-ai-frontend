import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Layers,
  Activity,
  BookOpen,
  LineChart,
  Sparkles,
  Target,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

const AppGuide = ({ navigateToTab }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const roadmapItems = [
    {
      title: "Stock Analysis",
      description:
        "Select any stock from our Nifty Smallcap 250 universe to receive an instant, institutional-grade AI report. Deep dive into technical indicators, sentiment analysis, and fundamental metrics.",
      benefit:
        "Saves hours of research with data-driven analysis covering 15+ technical indicators, AI sentiment, and market regime detection.",
      targetIndex: 1,
      icon: <BarChart3 className="w-8 h-8" />,
      colorClass: "blue",
      bgGradient: "from-blue-500 to-cyan-500",
      cardGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      iconBg: "from-blue-500 to-cyan-500",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-200 dark:border-blue-700",
      features: ["Scrybe Score (-100 to +100)", "Technical + Fundamental Analysis", "Real-time Market Data"],
    },
    {
      title: "Portfolio Manager",
      description:
        "Institutional-grade portfolio construction and management. View all 250 daily analyzed stocks with the AI's top 10 highest-conviction trades selected for execution. Complete transparency into portfolio decisions, sector allocation, and risk controls.",
      benefit:
        "Professional portfolio management with clear visibility into why stocks are selected or rejected, sector diversification limits, and institutional risk management.",
      targetIndex: 2,
      icon: <Layers className="w-8 h-8" />,
      colorClass: "purple",
      bgGradient: "from-purple-500 to-pink-500",
      cardGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      iconBg: "from-purple-500 to-pink-500",
      textColor: "text-purple-700 dark:text-purple-300",
      borderColor: "border-purple-200 dark:border-purple-700",
      features: ["250 Stocks Daily Analysis", "Top 10 Trade Selection", "Risk-Controlled Portfolio Construction"],
    },
    {
      title: "Fund Dashboard",
      description:
        "Real-time monitoring dashboard of your active positions. Track entry prices, targets, stop-losses, and live P&L with institutional-grade position tracking and execution management.",
      benefit:
        "Focused view of highest-conviction trades with complete transparency on risk management and exit strategy.",
      targetIndex: 3,
      icon: <TrendingUp className="w-8 h-8" />,
      colorClass: "green",
      bgGradient: "from-green-500 to-emerald-500",
      cardGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      iconBg: "from-green-500 to-emerald-500",
      textColor: "text-green-700 dark:text-green-300",
      borderColor: "border-green-200 dark:border-green-700",
      features: ["Live P&L Tracking", "Risk Management Metrics", "Entry/Exit Levels"],
    },
    {
      title: "Index Analysis",
      description:
        "Strategic overview of the entire market. AI analyzes Nifty 50, Nifty Smallcap 250, and sectoral indices to determine overall market regime and momentum.",
      benefit:
        "Align your trading decisions with broader market trends and smallcap universe momentum for better timing.",
      targetIndex: 4,
      icon: <LineChart className="w-8 h-8" />,
      colorClass: "cyan",
      bgGradient: "from-cyan-500 to-teal-500",
      cardGradient: "from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20",
      iconBg: "from-cyan-500 to-teal-500",
      textColor: "text-cyan-700 dark:text-cyan-300",
      borderColor: "border-cyan-200 dark:border-cyan-700",
      features: ["Market Regime Detection", "Sectoral Analysis", "Index Momentum Tracking"],
    },
    {
      title: "AI Track Record",
      description:
        "Fully transparent performance log of every closed trade signal. See wins, losses, and overall historical performance with complete honesty and detailed statistics.",
      benefit:
        "Build trust through transparency with honest historical performance data and detailed trade breakdowns.",
      targetIndex: 5,
      icon: <Activity className="w-8 h-8" />,
      colorClass: "pink",
      bgGradient: "from-pink-500 to-rose-500",
      cardGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
      iconBg: "from-pink-500 to-rose-500",
      textColor: "text-pink-700 dark:text-pink-300",
      borderColor: "border-pink-200 dark:border-pink-700",
      features: ["Complete Trade History", "Performance Metrics", "Win/Loss Analysis"],
    },
    {
      title: "The Rulebook",
      description:
        "Detailed guide to our disciplined, institutional-grade strategy. Learn about portfolio management rules, sector concentration limits, and risk controls.",
      benefit:
        "Understand the professional fund manager logic behind every decision with clear, documented trading rules.",
      targetIndex: 6,
      icon: <BookOpen className="w-8 h-8" />,
      colorClass: "orange",
      bgGradient: "from-orange-500 to-amber-500",
      cardGradient: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
      iconBg: "from-orange-500 to-amber-500",
      textColor: "text-orange-700 dark:text-orange-300",
      borderColor: "border-orange-200 dark:border-orange-700",
      features: ["Portfolio Rules", "Risk Management", "Selection Criteria"],
    },
  ];

  const quickStats = [
    { 
      icon: Target, 
      label: "250 Stocks", 
      sublabel: "Analyzed Daily", 
      bgGradient: "from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      textColor: "text-violet-700 dark:text-violet-300",
      borderColor: "border-violet-200 dark:border-violet-700"
    },
    { 
      icon: Zap, 
      label: "Top 10", 
      sublabel: "Selected Trades", 
      bgGradient: "from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20",
      iconColor: "text-teal-600 dark:text-teal-400",
      textColor: "text-teal-700 dark:text-teal-300",
      borderColor: "border-teal-200 dark:border-teal-700"
    },
    { 
      icon: Shield, 
      label: "2% Risk", 
      sublabel: "Per Trade Max", 
      bgGradient: "from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20",
      iconColor: "text-rose-600 dark:text-rose-400",
      textColor: "text-rose-700 dark:text-rose-300",
      borderColor: "border-rose-200 dark:border-rose-700"
    },
    { 
      icon: CheckCircle2, 
      label: "±60 Score", 
      sublabel: "High Conviction", 
      bgGradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      iconColor: "text-green-600 dark:text-green-400",
      textColor: "text-green-700 dark:text-green-300",
      borderColor: "border-green-200 dark:border-green-700"
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 animate-fadeIn">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 px-4 py-2 rounded-lg mb-4 border border-gray-200 dark:border-neutral-700">
          <Sparkles className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Your Institutional-Grade AI Trading Platform
          </span>
        </div>
        
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Welcome to Scrybe AI
        </h2>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Master the platform with this interactive guide. Click any card below to explore features
          and start making data-driven trading decisions.
        </p>
      </motion.div>

      {/* Quick Stats Bar - Enhanced with motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {quickStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            whileHover={{ scale: 1.02, y: -3 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <stat.icon className="w-7 h-7 text-gray-700 dark:text-gray-300 mb-3" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">
              {stat.label}
            </div>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {stat.sublabel}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Cards Grid - Enhanced institutional design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmapItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.08, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigateToTab(item.targetIndex)}
            className="group relative bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden"
          >
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/0 rounded-2xl pointer-events-none" />
            
            {/* Icon */}
            <div className="inline-flex p-3 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 mb-5">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="font-extrabold text-2xl text-gray-900 dark:text-gray-100 mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed min-h-[80px]">
              {item.description}
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {item.features.map((feature, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.08 + i * 0.05 }}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 font-semibold"
                >
                  {feature}
                </motion.span>
              ))}
            </div>

            {/* Benefit Box */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700">
              <div className="flex items-start gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-neutral-800">
                  <Info className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                </div>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Why This Matters
                </p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.benefit}
              </p>
            </div>

            {/* CTA Arrow */}
            <div className="mt-5 pt-4 border-t border-gray-200 dark:border-neutral-700 flex items-center justify-between text-gray-700 dark:text-gray-300 font-semibold">
              <span className="text-sm">Explore Feature</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center p-8 bg-gray-50 dark:bg-neutral-900 rounded-3xl border border-gray-200 dark:border-neutral-700"
      >
        <Sparkles className="w-12 h-12 text-gray-700 dark:text-gray-300 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Ready to Start Trading?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Explore each section to understand how Scrybe AI helps you make institutional-grade trading decisions
          with transparency, discipline, and data-driven insights.
        </p>
        <button
          onClick={() => navigateToTab(1)}
          className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl shadow-sm transition-colors"
        >
          Start with Stock Analysis
        </button>
      </motion.div>
    </div>
  );
};

export default AppGuide;
